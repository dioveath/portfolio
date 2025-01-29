import ContraGameScene from './contra/contra_game_scene';
import AudioManager from './core/audio';
import Game from './game/game';
import Scene from './game/scene';
import { Sprite } from './game/sprite';

export default class MenuScene extends Scene {
  private _games: string[];
  private _currentIndex = 0;
  private _navKeyPressed = false;
  private _audio: AudioManager;

  constructor(game: Game, sceneName: string, width: number, height: number) {
    super();
    this.game = game;
    this.id = sceneName;
    this.width = width;
    this.height = height;
    this._audio = game.audio;
  }

  init(): void {
    this._games = [
      'CONTRA',
      'SUPER MARIO',
      'TETRIS II',
      'TANK 90',
      'ADVENTURE ISLAND',
      'BOMBER MAN',
      'SNOW BROTHERS',
      'DOUBLE DRAGON',
    ];

    this._audio.loadSound('assets/audios/isee_nes.mp3', 'menu_music1', true);
    this._audio.loadSound('assets/audios/menu_nav_up.wav', 'menu_nav_up', false);
    this._audio.loadSound('assets/audios/menu_nav_down.wav', 'menu_nav_down', false);
    this._audio.loadSound('assets/audios/game_over.wav', 'game_over', false);
    this._audio.playSound('menu_music1', 0.3);
  }

  update(deltaTime: number): void {
    if (!this._navKeyPressed) {
      if (this.game.input.isKeyPressed(38)) {
        this._currentIndex--;
        this._navKeyPressed = true;
        this._audio.playSound('menu_nav_up', 0.7);
      } else if (this.game.input.isKeyPressed(40)) {
        this._currentIndex++;
        this._navKeyPressed = true;
        this._audio.playSound('menu_nav_down', 0.7);
      } else if (this.game.input.isKeyPressed(32) || this.game.input.isKeyPressed(13)) {
        this._navKeyPressed = true;
        this._audio.playSound('game_over', 0.7);
        this.game.replaceScene(new ContraGameScene(this.game, 'Contra Game', this.game.width, this.game.height));
      }
    } else {
      if (
        !this.game.input.isKeyPressed(38) &&
        !this.game.input.isKeyPressed(40) &&
        !this.game.input.isKeyPressed(32) &&
        !this.game.input.isKeyPressed(13)
      ) {
        this._navKeyPressed = false;
      }
    }

    this._currentIndex = Math.max(0, Math.min(this._currentIndex, this._games.length - 1));
  }

  render(context: CanvasRenderingContext2D, deltaTime: number): void {
    context.save();
    context.translate(this.width / 2, this.height / 2);

    context.fillStyle = 'black';
    context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    this.drawText(context, '1200 IN 1', 0, -240, 'pink', '16px NesFont', 'center');
    this.drawText(context, 'PUSH SEL . START BUTTON', 0, -200, 'cyan', '16px NesFont', 'center');
    this.drawText(context, 'COMING SOON', 0, -160, 'pink', '16px NesFont', 'center');

    for (let i = 0; i < this._games.length; i++) {
      this.drawText(
        context,
        i + 1 + '.' + this._games[i],
        -130,
        (i - this._games.length / 2) * 20,
        'green',
        '16px NesFont',
        'right'
      );
    }

    let arrowHex = '➔';
    this.drawText(
      context,
      String.fromCharCode(parseInt(arrowHex, 16)),
      -150,
      (this._currentIndex - this._games.length / 2) * 20,
      'white',
      '16px NesFont',
      'center'
    );

    context.restore();
  }

  drawSprite(ctx: CanvasRenderingContext2D, x: number, y: number, sprite: Sprite) {
    ctx.drawImage(
      sprite.img,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
      x - sprite.width / 2,
      y - sprite.height / 2,
      sprite.width,
      sprite.height
    );
  }

  drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    color: string,
    font: string,
    align: string
  ) {
    (ctx.fillStyle = color), (ctx.font = font);

    let size = ctx.measureText(text);
    if (align == 'center') {
      ctx.fillText(text, x - size.width / 2, y);
    } else if (align == 'left') {
      ctx.fillText(text, x - size.width, y);
    } else if (align == 'right') {
      ctx.fillText(text, x, y);
    }
  }

  destroy(): void {
		this._audio.destroy();
	}
}
