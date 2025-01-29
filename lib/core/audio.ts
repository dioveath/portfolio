export class Sound {
  private _player: HTMLAudioElement;
  private _playPromise: Promise<void>;

  constructor(srcPath: string, loop: boolean) {
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
    this._playPromise = this._player.play();
  }

  public pause(): void {
		if (!this._player) return
    this._player.pause();
  }

  public stop(): void {
		if (!this._player) return
    this._player.currentTime = 0;
  }

  public async destroy(): Promise<void> {
		if (!this._player) return
    if (this._playPromise) await this._playPromise;
    this.pause();
    this.stop();
    this._player = undefined;
  }
}

export default class AudioManager {
  private _sounds: { [name: string]: Sound };

  constructor() {
    this._sounds = {};
  }

  public loadSound(srcPath: string, soundName: string, loop: boolean = false, onload: () => void = undefined) {
    this._sounds[soundName] = new Sound(srcPath, loop);
  }

  public playSound(soundName: string, volume: number = 1.0) {
    console.log('playing sound: ' + soundName);
    if (this._sounds[soundName] !== undefined) {
      this._sounds[soundName].play(volume);
    }
  }

  public stopSound(soundName: string) {
    if (this._sounds[soundName] !== undefined) this._sounds[soundName].stop();
  }

  public pauseAll() {
    for (let sound in this._sounds) {
      this._sounds[sound].pause();
    }
  }

  public stopAll() {
    for (let sound in this._sounds) {
      this._sounds[sound].stop();
    }
  }

  public destroy(): void {
    console.log(`destroying ${Object.keys(this._sounds).length} sounds..!`);
    for (let sound in this._sounds) {
      this._sounds[sound].destroy();
    }
  }
}
