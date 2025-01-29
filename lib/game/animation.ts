import { Sprite } from './sprite';
import { BaseSpriteSheet } from './sprite';

export default class SpriteAnimation {
  private _spriteSheet: BaseSpriteSheet;
  private _sequence: number[];
  private _currentIndex: number;
  private _fps: number;
  private _time: number;
  private _previousTime: number;
  private _isLoop: boolean;
  private _isFinished: boolean;

  constructor(spriteSheet: BaseSpriteSheet, fps: number, sequence: number[] = [], isLoop: boolean = true) {
    this._spriteSheet = spriteSheet;
    this._fps = fps;
    this._sequence = sequence.length === 0 
      ? Array.from({ length: spriteSheet.spriteCount }, (_, i) => i) 
      : sequence;
    this._currentIndex = 0;
    this._time = 0;
    this._previousTime = 0;
    this._isLoop = isLoop;
    this._isFinished = false;
  }

  public getNextSprite(deltaTime: number): Sprite {
    // If animation is finished and not looping, return last frame
    if (this._isFinished && !this._isLoop) {
      return this._spriteSheet.getNumberedSprite(this._sequence[this._sequence.length - 1]);
    }

    this._time += deltaTime;
    const frameDuration = 1 / this._fps;

    if (this._time - this._previousTime >= frameDuration) {
      this._currentIndex++;
      
      if (this._currentIndex >= this._sequence.length) {
        if (this._isLoop) {
          this._currentIndex = 0;
        } else {
          this._currentIndex = this._sequence.length - 1;
          this._isFinished = true;
        }
      }
      
      this._previousTime = this._time;
    }

    return this._spriteSheet.getNumberedSprite(this._sequence[this._currentIndex]);
  }

  public reset(): void {
    this._currentIndex = 0;
    this._time = 0;
    this._previousTime = 0;
    this._isFinished = false;
  }

  public isFinished(): boolean {
    return this._isFinished;
  }

  public get isLoop(): boolean {
    return this._isLoop;
  }

  public set isLoop(value: boolean) {
    this._isLoop = value;
  }
}
