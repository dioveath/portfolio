import Game from './game';

export default abstract class Scene {
    id: string;
    width: number;
    height: number;
    game: Game;

    abstract init () : void;
    abstract update (deltaTime: number) : void;
    abstract render (context: CanvasRenderingContext2D, deltaTime: number): void;
    abstract destroy (): void;
}
