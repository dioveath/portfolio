import SpriteSheet, { Sprite } from './sprite';


export default class SpriteAnimation {

    private _spriteSheet: SpriteSheet;
    private _sequence: number[];
    private _currentIndex: number;
    private _fps: number;
    private _time: number;
    private _previousTime: number;
    
    constructor(spriteSheet: SpriteSheet, fps: number, sequence: number[] = []) {
	this._spriteSheet = spriteSheet;

	if(sequence.length == 0)
	    this._sequence = Array.from({length: spriteSheet.spriteCount}, (_, i) => i+1);
	else
	    this._sequence = sequence;

	this._currentIndex = 0;
	this._time = 0;
	this._previousTime = 0;
	this._fps = fps;
    }

    getNextSprite(deltaTime: number): Sprite {
	this._time += deltaTime;

	if(this._time - this._previousTime > (1/this._fps)) {
	    this._currentIndex++;
	    this._previousTime = this._time;
	}

	let idx = this._sequence[(this._currentIndex % this._sequence.length)];

	return this._spriteSheet.getNumberedSprite(idx);	    
    }

}
