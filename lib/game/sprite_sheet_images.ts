import { Sprite, BaseSpriteSheet } from './sprite';

export default class SpriteSheetWithImages extends BaseSpriteSheet {
  private _frames: HTMLImageElement[] = [];
  private _srcPath: string;
  private _prefix: string;
  private _loaded: boolean = false;

  constructor(srcPath: string, prefix: string) {
    super();
    this._srcPath = srcPath;
    this._prefix = prefix;
  }

  public async loadFrames(frameCount: number): Promise<void> {
    this._spriteCount = frameCount;
    const loadPromises: Promise<void>[] = [];

    for (let i = 0; i < frameCount; i++) {
      const frameNumber = i.toString().padStart(2, '0');
      const framePath = `${this._srcPath}/${this._prefix}-${frameNumber}.png`;

      loadPromises.push(
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            this._frames[i] = img;
            if (!this._width) this._width = img.width;
            if (!this._height) this._height = img.height;
            resolve();
          };
          img.onerror = () => reject(new Error(`Failed to load frame: ${framePath}`));
          img.src = framePath;
        })
      );
    }

    await Promise.all(loadPromises);
    this._loaded = true;
  }

  public getNumberedSprite(idx: number): Sprite {
    if (!this._loaded) throw new Error('Frames not loaded yet');
    if (idx >= this._spriteCount) throw new Error(`Frame index ${idx} out of bounds`);

    return {
      x: 0,
      y: 0,
      width: this._width,
      height: this._height,
      img: this._frames[idx],
    };
  }

  public isLoaded(): boolean {
    return this._loaded;
  }
}
