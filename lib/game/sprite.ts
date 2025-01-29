export interface Sprite {
  x: number;
  y: number;
  width: number;
  height: number;
  img: HTMLImageElement;
}

export abstract class BaseSpriteSheet {
  protected _width: number = 0;
  protected _height: number = 0;
  protected _spriteCount: number = 0;

  abstract getNumberedSprite(idx: number): Sprite;

  get spriteCount(): number {
    return this._spriteCount;
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }
}


