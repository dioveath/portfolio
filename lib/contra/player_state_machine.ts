import SpriteAnimation from '../game/animation';
import SpriteSheetWithImages from '../game/sprite_sheet_images';

export enum PlayerState {
  IDLE = 'idle',
  RUNNING = 'running',
  JUMPING = 'jumping',
  FALLING = 'falling',
  ATTACK1 = 'attack1',
  ATTACK2 = 'attack2'
}

interface AnimationData {
  spriteSheet: SpriteSheetWithImages;
  animation: SpriteAnimation | null;
  frameCount: number;
  fps: number;
  isLoop?: boolean;
}

export class PlayerStateMachine {
  private _currentState: PlayerState = PlayerState.IDLE;
  private _animations: Map<PlayerState, AnimationData> = new Map();
  private _resourcesLoaded: number = 0;
  private _isLoaded: boolean = false;

  constructor() {
    this.initializeAnimations();
  }

  private initializeAnimations(): void {
    this._animations.set(PlayerState.IDLE, {
      spriteSheet: new SpriteSheetWithImages('assets/games/platformer/idle', 'adventurer-idle'),
      animation: null,
      frameCount: 3,
      fps: 4
    });

    this._animations.set(PlayerState.RUNNING, {
      spriteSheet: new SpriteSheetWithImages('assets/games/platformer/run', 'adventurer-run'),
      animation: null,
      frameCount: 6,
      fps: 8
    });

    this._animations.set(PlayerState.JUMPING, {
      spriteSheet: new SpriteSheetWithImages('assets/games/platformer/jump', 'adventurer-jump'),
      animation: null,
      frameCount: 4,
      fps: 10
    });

    this._animations.set(PlayerState.FALLING, {
      spriteSheet: new SpriteSheetWithImages('assets/games/platformer/fall', 'adventurer-fall'),
      animation: null,
      frameCount: 2,
      fps: 6
    });

    this._animations.set(PlayerState.ATTACK1, {
      spriteSheet: new SpriteSheetWithImages('assets/games/platformer/attack1', 'adventurer-attack1'),
      animation: null,
      frameCount: 5,
      fps: 8,
      isLoop: false
    });

    this._animations.set(PlayerState.ATTACK2, {
      spriteSheet: new SpriteSheetWithImages('assets/games/platformer/attack2', 'adventurer-attack2'),
      animation: null,
      frameCount: 4,
      fps: 8,
      isLoop: false
    });
  }

  public async loadResources(): Promise<void> {
    const loadPromises: Promise<void>[] = [];

    this._animations.forEach((data, state) => {
      loadPromises.push(
        data.spriteSheet.loadFrames(data.frameCount).then(() => {
          data.animation = new SpriteAnimation(data.spriteSheet, data.fps, [], data.isLoop ?? true);
          this._resourcesLoaded++;
        })
      );
    });

    await Promise.all(loadPromises);
    this._isLoaded = true;
  }

  public getCurrentAnimation(): SpriteAnimation | null {
    const data = this._animations.get(this._currentState);
    return data?.animation || null;
  }

  public setState(newState: PlayerState): void {
    if (this._currentState !== newState) {
      this._currentState = newState;
      // Reset animation when state changes
      const data = this._animations.get(this._currentState);
      if (data?.animation) {
        data.animation.reset()
      }
    }
  }

  public get resourcesLoaded(): number {
    return this._resourcesLoaded;
  }

  public get totalResources(): number {
    return this._animations.size;
  }

  public get isLoaded(): boolean {
    return this._isLoaded;
  }

}
