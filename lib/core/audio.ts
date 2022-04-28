export class Sound {

    private _player: HTMLAudioElement;

    constructor(srcPath: string, loop: boolean){
	this._player = new Audio();
	this._player.src = srcPath;
	this._player.loop = loop;
    }

    public get loop(): boolean {
	return this._player.loop;
    }

    public set loop(value: boolean) {
	this._player.loop = value;
    }

    public play(volume: number = 1.0): void {
	this.stop();
	this._player.volume = volume;
	this._player.play();
    }

    public pause(): void {
	this._player.pause();
    }

    public stop(): void{
	this._player.currentTime = 0;
    }

    public destroy(): void {
	this.pause();
	this.stop();
	this._player = undefined;
	console.log("destroying sound.!");
    }

}


export default class AudioManager {

    private _sounds: { [name: string]: Sound };

    constructor(){
	this._sounds = {}; 
    }

    public loadSound(srcPath: string, soundName: string, loop: boolean = false, onload: () => void = undefined){
	this._sounds[soundName] = new Sound(srcPath, loop);
    }

    public playSound(soundName: string, volume: number = 1.0){
	if(this._sounds[soundName] !== undefined){
	    this._sounds[soundName].play(volume);
	}
    }

    public stopSound(soundName: string){
	if(this._sounds[soundName] !== undefined)
	    this._sounds[soundName].stop();	
    }

    public pauseAll(soundName: string){
	for(let sound in this._sounds){
	    this._sounds[sound].pause();
 	}
    }

    public stopAll(soundName: string){
	for(let sound in this._sounds){
	    this._sounds[sound].stop();
 	}
    }

    public destroy(): void{
	for(let sound in this._sounds){
	    this._sounds[sound].destroy();
 	}
	console.log("destroying audio..!");
    }

}
