import AudioManager from '../core/audio';
import Graphics from '../core/graphics';
import Input from '../core/input';
import Scene from './scene';

import * as THREE from 'three';

export default class Game {
  private _loopId: number;
  private _gameName: string;
  private _scenes: Scene[];
  private _graphics: Graphics;
  private _input: Input;
  private _audio: AudioManager;

  private _width: number;
  private _height: number;
  private _canvasTexture: THREE.CanvasTexture | null = null;

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get input() {
    return this._input;
  }

  get audio() {
    return this._audio;
  }

  constructor(gameName: string, canvasId: string, width: number, height: number) {
    this._gameName = gameName;
    this._width = width;
    this._height = height;
    this._graphics = new Graphics(canvasId, this._width, this._height);
    this._input = new Input();
    this._audio = new AudioManager();

    this.init();
  }

  private init(): void {
    document.title = this._gameName;
    this._scenes = [];
    this._input.registerListener();
  }

  public startGame(): void {
    this.gameLoop();
  }

  public addScene(scene: Scene): void {
    this._scenes.push(scene);
    scene.init();
  }

  public replaceScene(scene: Scene): void {
    for (let i = this._scenes.length - 1; i >= 0; i--) {
      let s: Scene = this._scenes[i];
      s.destroy();
      this._scenes.splice(i, 1);
    }
    this._scenes.push(scene);
    scene.init();
  }

  public removeScene(id: string): void {
    for (let i = 0; i < this._scenes.length; i++) {
      let s: Scene = this._scenes[i];
      if (s.id === id) {
        s.destroy();
        this._scenes.splice(i, 1);
        break;
      }
    }
  }

  private _previousTime: number = Date.now();

  public gameLoop(): void {
    let deltaTime: number = (performance.now() - this._previousTime) / 1000;
    this._previousTime = performance.now();

    for (let i = 0; i < this._scenes.length; i++) {
      this._scenes[i].update(deltaTime);
    }

    for (let i = 0; i < this._scenes.length; i++) {
      this._scenes[i].render(this._graphics.context, deltaTime);
    }

    if(this._canvasTexture) {
      this._canvasTexture.needsUpdate = true;
    }

    this._loopId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  public setCanvasTexture(texture: THREE.CanvasTexture): void {
    this._canvasTexture = texture;
  }

  public destroy(): void {
    for (let i = 0; i < this._scenes.length; i++) {
      this._scenes[i].destroy();
    }

    this._input.destroy();
    this._audio.destroy();
    window.cancelAnimationFrame(this._loopId);

    if(this._canvasTexture) {
      this._canvasTexture.dispose();
    }

    console.log('destroying game');
  }
}
