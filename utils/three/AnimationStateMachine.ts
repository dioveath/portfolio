import * as THREE from 'three';
import { InputState } from '../hooks/useInput';

export interface AnimationActionMap {
  [state: string]: THREE.AnimationAction;
}

export interface AnimationTransition {
  /** The state(s) from which this transition can be triggered */
  from: string[];
  /** The target state */
  to: string;
  /** A condition function that receives the current input state and returns true when the transition should occur */
  condition: (input: InputState) => boolean;
  /** Blend duration (in seconds) for the transition */
  blendDuration?: number;
  /** Whether the new state's animation should loop (default: true) */
  loop?: boolean;
  /** If looping, the number of times to loop (default: Infinity) */
  count?: number;
  /**
   * If true, no other transition will occur until the current animation finishes playing.
   * This flag only makes sense if count is finite.
   */
  lockUntilFinished?: boolean;
}

export interface AnimationSequenceItem {
  /** The state (animation name) to play */
  state: string;
  /** How many times to loop (or simply play once if loop is false) */
  count: number;
  /** Whether the animation should loop (default: true) */
  loop?: boolean;
}

export class AnimationStateMachine {
  private mixer: THREE.AnimationMixer;
  private actions: AnimationActionMap;
  private currentState: string;
  private transitions: AnimationTransition[] = [];
  private defaultBlendDuration: number;

  // Sequence mode properties:
  private sequenceQueue: AnimationSequenceItem[] = [];
  private currentLoopCount: number = 0;
  private onSequenceComplete?: () => void;

  // NEW: Transition lock safeguard
  private transitionLocked: boolean = false;

  constructor(
    mixer: THREE.AnimationMixer,
    actions: AnimationActionMap,
    initialState: string,
    defaultBlendDuration: number = 0.3
  ) {
    this.mixer = mixer;
    this.actions = actions;
    this.currentState = initialState;
    this.defaultBlendDuration = defaultBlendDuration;

    // Activate the initial state (by default, infinite loop)
    this.activateState(initialState, 0, true, Infinity);
  }

  public addTransition(transition: AnimationTransition) {
    this.transitions.push(transition);
  }

  /**
   * Called every frame to check if any transition should occur.
   * (Ignored when playing a sequence or if a locked transition is still running.)
   */
  public update(input: InputState) {
    // In sequence mode, ignore normal transitions.
    if (this.sequenceQueue.length > 0) return;
    // Do not check transitions if a locked animation is running.
    if (this.transitionLocked) return;

    for (const transition of this.transitions) {
      if (transition.from.includes(this.currentState) && transition.condition(input)) {
        this.transitionTo(
          transition.to,
          transition.blendDuration,
          transition.loop,
          transition.count,
          transition.lockUntilFinished
        );
        break; // Only one transition per frame.
      }
    }
  }

  /**
   * Transitions to a new state with the given parameters.
   * If lockUntilFinished is true, locks transitions until the new animation finishes.
   */
  private transitionTo(
    newState: string,
    blendDuration?: number,
    loop?: boolean,
    count?: number,
    lockUntilFinished?: boolean
  ) {
    if (newState === this.currentState) return;

    const fromAction = this.actions[this.currentState];
    const toAction = this.actions[newState];
    const duration = blendDuration !== undefined ? blendDuration : this.defaultBlendDuration;
    const shouldLoop = loop !== undefined ? loop : true;
    const loopCount = shouldLoop ? (count !== undefined ? count : Infinity) : 1;

    if (fromAction && toAction) {
      fromAction.fadeOut(duration);
      toAction.setLoop(shouldLoop ? THREE.LoopRepeat : THREE.LoopOnce, loopCount);
      toAction.clampWhenFinished = !shouldLoop;
      toAction.reset().fadeIn(duration).play();
    } else if (toAction) {
      toAction.setLoop(shouldLoop ? THREE.LoopRepeat : THREE.LoopOnce, loopCount);
      toAction.clampWhenFinished = !shouldLoop;
      toAction.reset().fadeIn(duration).play();
    }
    this.currentState = newState;

    // If the transition should be locked until the animation finishes,
    // set the lock flag and add an event listener.
    if (lockUntilFinished) {
      if (loopCount === Infinity) {
        console.warn(
          `AnimationStateMachine: Cannot lock transition on infinite loop animation for state "${newState}".`
        );
      } else {
        this.transitionLocked = true;
        const onFinished = (event: any) => {
          if (event.action === toAction) {
            this.mixer.removeEventListener('finished', onFinished);
            this.transitionLocked = false;
          }
        };
        this.mixer.addEventListener('finished', onFinished);
      }
    }
  }

  /**
   * Immediately activate a state with the given loop settings.
   */
  private activateState(newState: string, blendDuration: number, loop: boolean, count: number) {
    const action = this.actions[newState];
    if (action) {
      action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? count : 1);
      action.clampWhenFinished = !loop;
      action.reset().fadeIn(blendDuration).play();
    }
    this.currentState = newState;
  }

  /**
   * Plays a sequence of animations in order.
   * For example, play "idle" 3 times then "jump" 2 times.
   */
  public playSequence(sequence: AnimationSequenceItem[], onComplete?: () => void) {
    this.sequenceQueue = [...sequence];
    this.onSequenceComplete = onComplete;
    this.playNextInSequence();
  }

  private playNextInSequence() {
    if (this.sequenceQueue.length === 0) {
      if (this.onSequenceComplete) this.onSequenceComplete();
      return;
    }
    const next = this.sequenceQueue.shift()!;
    const action = this.actions[next.state];
    if (!action) return;
    const shouldLoop = next.loop !== undefined ? next.loop : true;
    const loopCount = shouldLoop ? next.count : 1;

    action.setLoop(shouldLoop ? THREE.LoopRepeat : THREE.LoopOnce, loopCount);
    action.clampWhenFinished = !shouldLoop;
    action.reset().fadeIn(this.defaultBlendDuration).play();
    this.currentState = next.state;
    this.currentLoopCount = 0;

    if (shouldLoop) {
      const onLoop = (event: any) => {
        if (event.action === action) {
          this.currentLoopCount++;
          if (this.currentLoopCount >= next.count) {
            this.mixer.removeEventListener('loop', onLoop);
            action.stop();
            setTimeout(() => this.playNextInSequence(), this.defaultBlendDuration * 1000);
          }
        }
      };
      this.mixer.addEventListener('loop', onLoop);
    } else {
      const onFinished = (event: any) => {
        if (event.action === action) {
          this.mixer.removeEventListener('finished', onFinished);
          setTimeout(() => this.playNextInSequence(), this.defaultBlendDuration * 1000);
        }
      };
      this.mixer.addEventListener('finished', onFinished);
    }
  }

  public getCurrentState(): string {
    return this.currentState;
  }
}
