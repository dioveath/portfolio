import { XMLParser } from 'fast-xml-parser';

interface TileSet {
  firstGid: number;
  name: string;
  tileWidth: number;
  tileHeight: number;
  tiles?: { [key: number]: { 
    image: HTMLImageElement;
    width: number;
    height: number;
  }};
  image?: HTMLImageElement;
  imageWidth?: number;
  imageHeight?: number;
  columns?: number;
  isDecorative?: boolean;
}

interface Layer {
  id: number;
  name: string;
  width: number;
  height: number;
  data: number[][];
  type?: string;
  image?: HTMLImageElement;
}

export class GameMap {
  private layers: Layer[] = [];
  private tilesets: TileSet[] = [];
  public isLoaded: boolean = false;

  public tileWidth: number = 0;
  public tileHeight: number = 0;
  public width: number = 0;
  public height: number = 0;

  constructor() {}

  private async loadTilesetFromTSX(source: string, firstGid: number): Promise<TileSet> {
    const response = await fetch(`/assets/games/platformer/map/${source}`);
    const tsxContent = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
    const result = parser.parse(tsxContent);
    const tilesetData = result.tileset;

    const tileset: TileSet = {
      firstGid,
      name: tilesetData.name,
      tileWidth: parseInt(tilesetData.tilewidth),
      tileHeight: parseInt(tilesetData.tileheight),
      isDecorative: tilesetData.columns === '0' || !tilesetData.columns
    };

    // Handle single image tileset
    if (tilesetData.image) {
      const image = new Image();
      const imagePath = tilesetData.image.source.split('\\').pop();
      image.src = `/assets/games/platformer/map/${imagePath}`;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      tileset.image = image;
      tileset.imageWidth = parseInt(tilesetData.image.width);
      tileset.imageHeight = parseInt(tilesetData.image.height);
      
      // For platform tileset, ensure columns is correctly set
      if (!tileset.isDecorative) {
        tileset.columns = Math.floor(tileset.imageWidth / tileset.tileWidth);
      }
    }
    // Handle collection of images
    else if (tilesetData.tile) {
      tileset.tiles = {};
      const tiles = Array.isArray(tilesetData.tile) ? tilesetData.tile : [tilesetData.tile];
      for (const tile of tiles) {
        const image = new Image();
        const imagePath = tile.image.source.split('\\').pop();
        image.src = `/assets/games/platformer/map/${imagePath}`;
        await new Promise((resolve) => {
          image.onload = resolve;
        });
        tileset.tiles[parseInt(tile.id)] = {
          image,
          width: parseInt(tile.image.width),
          height: parseInt(tile.image.height)
        };
      }
    }

    return tileset;
  }

  async loadMap(mapPath: string) {
    try {
      const response = await fetch(mapPath);
      const mapData = await response.text();
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '',
      });
      const result = parser.parse(mapData);
      const mapInfo = result.map;

      // Set map dimensions from TMX file
      this.width = parseInt(mapInfo.width);
      this.height = parseInt(mapInfo.height);
      this.tileWidth = parseInt(mapInfo.tilewidth);
      this.tileHeight = parseInt(mapInfo.tileheight);

      // Load tilesets first
      const tilesetPromises = mapInfo.tileset.map(async (tileset: any) => {
        const source = tileset.source.split('\\').pop();
        return this.loadTilesetFromTSX(source, parseInt(tileset.firstgid));
      });
      this.tilesets = await Promise.all(tilesetPromises);

      // Load layers
      const layers = Array.isArray(mapInfo.layer) ? mapInfo.layer : [mapInfo.layer];
      this.layers = layers.map((layer: any) => {
        const data = layer.data["#text"].trim().split(',').map(Number);
        const layerData: number[][] = [];
        for (let y = 0; y < layer.height; y++) {
          layerData[y] = [];
          for (let x = 0; x < layer.width; x++) {
            layerData[y][x] = data[y * layer.width + x];
          }
        }
        return {
          id: parseInt(layer.id),
          name: layer.name,
          width: parseInt(layer.width),
          height: parseInt(layer.height),
          data: layerData,
        };
      });

      this.isLoaded = true;
    } catch (error) {
      console.error('Error loading map:', error);
      throw error;
    }
  }

  private drawDebugGrid(context: CanvasRenderingContext2D, scale: number): void {
    const scaledTileWidth = this.tileWidth * scale;
    const scaledTileHeight = this.tileHeight * scale;

    // Save current context state
    context.save();

    // Set grid style
    context.strokeStyle = 'rgba(255, 0, 0, 0.3)';
    context.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x <= this.width; x++) {
      context.beginPath();
      context.moveTo(x * scaledTileWidth, 0);
      context.lineTo(x * scaledTileWidth, this.height * scaledTileHeight);
      context.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= this.height; y++) {
      context.beginPath();
      context.moveTo(0, y * scaledTileHeight);
      context.lineTo(this.width * scaledTileWidth, y * scaledTileHeight);
      context.stroke();
    }

    // Draw tile coordinates for debugging
    context.fillStyle = 'rgba(255, 0, 0, 0.5)';
    context.font = '16px Arial';
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        context.fillText(
          `${x},${y}`,
          x * scaledTileWidth + scaledTileWidth / 2,
          y * scaledTileHeight + scaledTileHeight / 2
        );
      }
    }

    // Restore context state
    context.restore();
  }

  draw(context: CanvasRenderingContext2D, scale: number = 1): void {
    if (!this.isLoaded) return;

    // Draw all layers in order
    this.layers.forEach((layer) => {
      for (let y = 0; y < layer.height; y++) {
        for (let x = 0; x < layer.width; x++) {
          const tileId = layer.data[y][x];
          if (tileId === 0) continue; // Skip empty tiles

          // Find the tileset that contains this tile
          const tileset = this.findTilesetForGid(tileId);
          if (!tileset) continue;

          const localId = tileId - tileset.firstGid;
          const destX = x * this.tileWidth * scale;
          const destY = y * this.tileHeight * scale;

          try {
            // Handle oak_woods.tsx tileset (collection of images)
            if (tileset.isDecorative && tileset.tiles && tileset.tiles[localId]) {
              const tile = tileset.tiles[localId];
              
              // Calculate scaled dimensions while maintaining aspect ratio
              const aspectRatio = tile.width / tile.height;
              let scaledWidth = tile.width * scale;
              let scaledHeight = tile.height * scale;

              // Center horizontally and align bottom vertically
              const centerX = destX + (this.tileWidth * scale - scaledWidth) / 2;
              const bottomY = destY + this.tileHeight * scale - scaledHeight;

              context.drawImage(
                tile.image,
                0,
                0,
                tile.width,
                tile.height,
                Math.round(centerX),
                Math.round(bottomY),
                scaledWidth,
                scaledHeight
              );
            }
            // Handle platform tileset (oak_woods_platform_tileset.tsx)
            else if (tileset.image && tileset.columns) {
              const tilesPerRow = tileset.columns;
              const tileX = localId % tilesPerRow;
              const tileY = Math.floor(localId / tilesPerRow);

              // Calculate source coordinates based on tileset's tile size
              const sourceX = tileX * tileset.tileWidth;
              const sourceY = tileY * tileset.tileHeight;

              // Calculate destination size based on map's tile size
              const scaledTileWidth = this.tileWidth * scale;
              const scaledTileHeight = this.tileHeight * scale;

              // Draw the tile scaled to match the map's tile size
              context.drawImage(
                tileset.image,
                sourceX,
                sourceY,
                tileset.tileWidth,
                tileset.tileHeight,
                Math.round(destX),
                Math.round(destY) - scaledTileHeight,
                scaledTileWidth * 2, // Multiply by 2 since tileset is 32x32 but map is 16x16
                scaledTileHeight * 2
              );
            }
          } catch (error) {
            console.warn(`Failed to draw tile at (${x},${y}) with ID ${tileId}:`, error);
          }
        }
      }
    });

    // this.drawDebugGrid(context, scale);
  }

  private findTilesetForGid(gid: number): TileSet | undefined {
    // Search through tilesets to find the one that contains this gid
    for (let i = this.tilesets.length - 1; i >= 0; i--) {
      const tileset = this.tilesets[i];
      if (gid >= tileset.firstGid) {
        return tileset;
      }
    }
    return undefined;
  }

  getTileAt(x: number, y: number, layerName?: string): number {
    if (!this.isLoaded) return 0;

    const layer = layerName ? this.layers.find((l) => l.name === layerName) : this.layers[0];

    if (!layer) return 0;

    const tileX = Math.floor(x / this.tileWidth);
    const tileY = Math.floor(y / this.tileHeight);

    if (tileX < 0 || tileX >= layer.width || tileY < 0 || tileY >= layer.height) {
      return 0;
    }

    return layer.data[tileY][tileX];
  }

  isMapLoaded(): boolean {
    return this.isLoaded;
  }
}
