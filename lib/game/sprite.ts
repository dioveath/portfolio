export interface Sprite {
    x: number,
    y: number,
    width: number,
    height: number,
    img: HTMLImageElement
}


export default class SpriteSheet {

    private _spWidth: number;
    private _spHeight: number;
    private _imgWidth: number;
    private _imgHeight: number;
    private _rows: number;
    private _columns: number;
    private _img: HTMLImageElement;
    private _spriteCount: number;


    constructor(img: HTMLImageElement,
		imgWidth: number,
		imgHeight: number,
		spWidth: number,
		spHeight: number,
		spriteCount: number = 0){
	this._img = img;
	this._imgWidth = imgWidth;
	this._imgHeight = imgHeight;
	this._spWidth = spWidth;
	this._spHeight = spHeight;

	this._columns = Math.floor(this._imgWidth/this._spWidth);
	this._rows = Math.floor(this._imgHeight/this._spHeight);

	this._spriteCount = spriteCount || this._rows * this._columns;

    }

    get spriteCount () {
	return this._spriteCount;
    }

    
    public getSprite(i: number, j: number): Sprite {
	return {
	    x: j * this._spWidth,
	    y: i * this._spHeight,
	    width: this._spWidth,
	    height: this._spHeight,
	    img: this._img
	};
    }

    public getNumberedSprite(idx: number){
	if(idx > this._spriteCount) throw "No sprite for the idx: " + idx;

	return {
	    x: (idx % this._columns) * this._spWidth,
	    y: Math.floor(idx / this._columns) * this._spHeight,
	    width: this._spWidth,
	    height: this._spHeight,
	    img: this._img
	};
    }

}

