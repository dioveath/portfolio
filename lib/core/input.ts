export default class Input {

    private _keys: bool[255];
    private _keyDownHandle: any;
    private _keyUpHandle: any;

    constructor(){
	this._keys = Array.from({length: 255}, (_, i) => false);
    }

    public isKeyPressed(keyCode: number): boolean {
	return this._keys[keyCode];
    }

    private registerListener() : void {
	this._keyDownHandle = document.addEventListener('keydown', this.handleKeyDown.bind(this));
	this._keyUpHandle = document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private removeListener(): void {
	document.removeEventListener('keydown', this._keyDownHandle);
	document.removeEventListener('keup', this._keyUpHandle);
    }

    private handleKeyDown(event: KeyboardEvent) : boolean{
	this._keys[event.keyCode] = true;
	event.preventDefault();
	return false;
    }

    private handleKeyUp(event: KeyboardEvent): boolean {
	this._keys[event.keyCode] = false;
	event.preventDefault();
	return false;	
    }

}
