import { BaseSpriteSheet, Sprite } from './sprite';

export default class SpriteSheet extends BaseSpriteSheet {
  private _spWidth: number;
  private _spHeight: number;
  private _imgWidth: number;
  private _imgHeight: number;
  private _offsetX: number;
  private _offsetY: number;
  private _rows: number;
  private _columns: number;
  private _img: HTMLImageElement;

  constructor(
    img: HTMLImageElement,
    imgWidth: number,
    imgHeight: number,
    spWidth: number,
    spHeight: number,
    spriteCount: number = 0,
    offsetX: number = 0,
    offsetY: number = 0
  ) {
    super();
    this._img = img;
    this._imgWidth = imgWidth;
    this._imgHeight = imgHeight;
    this._spWidth = spWidth;
    this._spHeight = spHeight;
    this._offsetX = offsetX;
    this._offsetY = offsetY;
    this._width = spWidth;
    this._height = spHeight;

    this._columns = Math.floor(this._imgWidth / this._spWidth);
    this._rows = Math.floor(this._imgHeight / this._spHeight);

    this._spriteCount = spriteCount || this._rows * this._columns;
  }

  public getSprite(i: number, j: number): Sprite {
    return {
      x: this._offsetX + j * this._spWidth,
      y: this._offsetY + i * this._spHeight,
      width: this._spWidth,
      height: this._spHeight,
      img: this._img,
    };
  }

  public getNumberedSprite(idx: number): Sprite {
    if (idx > this._spriteCount) throw 'No sprite for the idx: ' + idx;

    return {
      x: this._offsetX + (idx % this._columns) * this._spWidth,
      y: this._offsetY + Math.floor(idx / this._columns) * this._spHeight,
      width: this._spWidth,
      height: this._spHeight,
      img: this._img,
    };
  }
}
