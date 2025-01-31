export default class Graphics {
  readonly _canvasId: string;
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;

  get context() {
    return this._context;
  }

  constructor(canvasId: string, width: number, height: number) {
    this._canvasId = canvasId;
    this._width = width;
    this._height = height;
    this.init();
  }

  private init(): void {
    this._canvas = document.getElementById(this._canvasId) as HTMLCanvasElement;
    if (this._canvas === undefined || this._canvas === null) {
			// throw new Error(`The canvas with id ${this._canvasId} does not exist.`);
      this._canvas = document.createElement('canvas') as HTMLCanvasElement;
			document.body.appendChild(this._canvas);
      this._canvas.setAttribute('id', this._canvasId);
    }

		console.log(`The canvas with id ${this._canvasId} has been initialized.`);
    this._canvas.width = this._width;
    this._canvas.height = this._height;
    this._context = this._canvas.getContext('2d');
		// this._canvas.remove();
  }
}