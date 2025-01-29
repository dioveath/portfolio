import SpriteAnimation from './game/animation';
import Game from './game/game';
import Scene from './game/scene';
import { Sprite } from './game/sprite';
import SpriteSheet from './game/sprite_sheet';
import MenuScene from './menu_scene';

export default class LoadingScene extends Scene {
  private _loadingSpriteSheet: SpriteSheet;
  private _loadingAnimation: SpriteAnimation;
  private _isLoaded = false;

  private _time: number;
  private _loadFor: number = 1;

  constructor(game: Game, sceneName: string, width: number, height: number) {
    super();
    this.game = game;
    this.id = sceneName;
    this.width = width;
    this.height = height;
  }

  override init(): void {
    let img = new Image();
    img.src = 'assets/_Run.png';

    img.onload = () => {
      this._loadingSpriteSheet = new SpriteSheet(img, 1200, 80, 120, 80, 9);
      this._loadingAnimation = new SpriteAnimation(this._loadingSpriteSheet, 8);
      this._isLoaded = true;
      this._time = 0;
    };
  }

  override update(deltaTime: number): void {
    this._time += deltaTime;
    if (this._time > this._loadFor) {
      this.game.replaceScene(new MenuScene(this.game, 'Menu Scene', this.game.width, this.game.height));
    }
  }

  override render(context: CanvasRenderingContext2D, deltaTime: number): void {
    context.save();
    context.translate(this.width / 2, this.height / 2);
    context.fillStyle = 'black';
    // context.fillStyle = "#1A202C";
    context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    this.drawText(context, 'Loading...', 0, 0, 'white', '12px NesFont', 'center');

    if (this._isLoaded) {
      this.drawSprite(context, 0, -60, this._loadingAnimation.getNextSprite(deltaTime));
    }

    context.restore();
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
    }
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

  override destroy(): void {}
}
