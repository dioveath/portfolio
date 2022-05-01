import SpriteAnimation from "../lib/game/animation";
import Game from "../lib/game/game";
import Scene from "../lib/game/scene";
import SpriteSheet, { Sprite } from "../lib/game/sprite";


export default class LogoScene extends Scene {

    private _loadingSpriteSheet : SpriteSheet;
    private _loadingAnimation : SpriteAnimation;
    private _isLoaded = false;

    constructor(game: Game, sceneName: string, width: number, height: number) {
	super();
	this.game = game;
	this.id = sceneName;
	this.width = width;
	this.height = height;
    }

    init(): void {

	let img = new Image();
	img.src = "assets/_Run.png";

	img.onload = () => {
	    this._loadingSpriteSheet = new SpriteSheet(img, 1200, 80, 120, 40, 9, 0, 40);
	    this._loadingAnimation = new SpriteAnimation(this._loadingSpriteSheet, 8);
	    this._isLoaded = true;
	}

    }
    update(deltaTime: number): void {
    }

    render(context: CanvasRenderingContext2D, deltaTime: number): void {
	context.save();
	context.translate(this.width/2, this.height/2);
	// context.fillStyle = "black";
	// context.fillStyle = "#1A202C";
	context.clearRect(-this.width/2, -this.height/2, this.width, this.height);

	if(this._isLoaded) {
	    this.drawSprite(context, 0, 0, this._loadingAnimation.getNextSprite(deltaTime));
	}

	context.beginPath();
	context.moveTo(this.width/2, -this.height/2);
	context.lineTo(this.width/2, this.height/2);
	context.closePath();
	context.strokeStyle="white";
	context.stroke();

	context.restore();
    }

    drawSprite(ctx: CanvasRenderingContext2D, x: number, y: number, sprite: Sprite) {
	ctx.drawImage(sprite.img,
		      sprite.x, sprite.y,
		      sprite.width, sprite.height,
		      x - sprite.width/2, y - sprite.height/2,
		      sprite.width, sprite.height);
    }    

    destroy(): void {
        // throw new Error("Method not implemented.");
    }

}
