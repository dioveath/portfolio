import Scene from '../game/scene';
import Game from '../game/game';
import { PlayerState, PlayerStateMachine } from './player_state_machine';
import { GameMap } from './map';
import AudioManager from '../core/audio';

export default class ContraGameScene extends Scene {
  private _playerStateMachine: PlayerStateMachine;
  private _map: GameMap;
  private _playerX: number = 100;
  private _playerY: number = 400;
  private _playerVelocityY: number = 0;
  private _isJumping: boolean = false;
  private _facingRight: boolean = true;
  private _isMoving: boolean = false;
  private _isAttacking: boolean = false;
  private _attackComboTimer: number = 0;
  private _attackComboCount: number = 0;
  private readonly ATTACK_COMBO_WINDOW: number = 1; // seconds

  private readonly GROUND_Y: number = 560;
  private readonly GRAVITY: number = 980;
  private readonly JUMP_FORCE: number = -500;
  private readonly MOVE_SPEED: number = 200;
  private readonly MAP_SCALE: number = 2; // You can adjust this value as needed

  // Loading state
  private isLoading: boolean = true;
  private resourcesLoaded: boolean = false;

  private _audio: AudioManager;

  constructor(game: Game, width: number, height: number) {
    super();
    this.game = game;
    this.width = width;
    this.height = height;
    this._audio = game.audio;
    this._playerStateMachine = new PlayerStateMachine();
    this._map = new GameMap();

    this._playerX = width / 2;
    this._playerY = height / 2;
    this.GROUND_Y = height / 2 + 160;
  }

  private loadResources(): void {
    const loadMapPromise = this._map.loadMap('assets/games/platformer/map/first_level.tmx');
    const loadPlayerPromise = this._playerStateMachine.loadResources();

    // Wait for both promises to resolve
    Promise.all([loadMapPromise, loadPlayerPromise])
      .then(() => {
        this.resourcesLoaded = true;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Failed to load resources:', error);
        this.isLoading = false;
      });
  }

  private drawLoadingScreen(context: CanvasRenderingContext2D): void {
    // Clear the screen
    context.fillStyle = 'black';
    context.fillRect(0, 0, this.width, this.height);

    // Draw loading text
    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.textAlign = 'center';
    const loadingText = 'Loading...';
    context.fillText(loadingText, this.width / 2, this.height / 2);

    // Draw loading bar
    const barWidth = 200;
    const barHeight = 20;
    const barX = (this.width - barWidth) / 2;
    const barY = this.height / 2 + 20;

    // Draw border
    context.strokeStyle = 'white';
    context.strokeRect(barX, barY, barWidth, barHeight);

    // Draw progress
    context.fillStyle = 'white';
    const progress = this._map.getLoadingProgress();
    context.fillRect(barX, barY, barWidth * progress, barHeight);
  }

  private drawDebugPlayer(context: CanvasRenderingContext2D): void {
    // Get current frame dimensions
    const playerWidth = 50; // Matching the collision width used in update()
    const playerHeight = 50; // Using same height as width for consistency

    // Save context state
    context.save();

    // Set debug rectangle style
    context.strokeStyle = 'red';
    context.lineWidth = 2;

    // Draw player bounds rectangle
    context.strokeRect(
      Math.round(this._playerX - playerWidth / 2),
      Math.round(this._playerY - playerHeight / 2),
      playerWidth,
      playerHeight
    );

    // Draw center point
    context.fillStyle = 'red';
    context.beginPath();
    context.arc(Math.round(this._playerX), Math.round(this._playerY), 3, 0, Math.PI * 2);
    context.fill();

    // Restore context state
    context.restore();
  }

  override async init(): Promise<void> {
    this.loadResources();

    this._audio.loadSound('assets/games/platformer/music/bg.ogg', 'town_music', true);
    this._audio.playSound('town_music', 0.1);
  }

  private updatePlayerState(): void {
    if (this._isAttacking) {
      // Don't change state during attack animation
      return;
    }

    if (this._isJumping) {
      if (this._playerVelocityY > 0) {
        this._playerStateMachine.setState(PlayerState.FALLING);
      } else {
        this._playerStateMachine.setState(PlayerState.JUMPING);
      }
    } else if (this._isMoving) {
      this._playerStateMachine.setState(PlayerState.RUNNING);
    } else {
      this._playerStateMachine.setState(PlayerState.IDLE);
    }
  }

  override update(deltaTime: number): void {
    if (!this._playerStateMachine.isLoaded || !this.resourcesLoaded) return;

    // Update attack combo timer
    if (this._attackComboTimer > 0) {
      this._attackComboTimer -= deltaTime;
      if (this._attackComboTimer <= 0) {
        this._attackComboCount = 0;
      }
    }

    // Check if attack animation is finished
    const currentAnim = this._playerStateMachine.getCurrentAnimation();
    if (this._isAttacking && currentAnim?.isFinished()) {
      this._isAttacking = false;
      this._playerStateMachine.setState(PlayerState.IDLE);
    }

    // Handle attack input
    if (this.game.input.isKeyPressed(88) && !this._isAttacking) {
      // X key
      this._isAttacking = true;
      this._attackComboTimer = this.ATTACK_COMBO_WINDOW;
      this._attackComboCount = (this._attackComboCount + 1) % 2;
      this._playerStateMachine.setState(this._attackComboCount === 0 ? PlayerState.ATTACK1 : PlayerState.ATTACK2);
    }

    // Handle movement
    this._isMoving = false;
    if (!this._isAttacking) {
      if (this.game.input.isKeyPressed(37)) {
        // Left arrow
        this._playerX -= this.MOVE_SPEED * deltaTime;
        this._facingRight = false;
        this._isMoving = true;
      }
      if (this.game.input.isKeyPressed(39)) {
        // Right arrow
        this._playerX += this.MOVE_SPEED * deltaTime;
        this._facingRight = true;
        this._isMoving = true;
      }
    }

    // Handle jumping
    if (this.game.input.isKeyPressed(32) && !this._isJumping) {
      // Space
      this._playerVelocityY = this.JUMP_FORCE;
      this._isJumping = true;
    }

    // Apply gravity
    this._playerVelocityY += this.GRAVITY * deltaTime;
    this._playerY += this._playerVelocityY * deltaTime;

    // Clamp player X position to map bounds
    const mapWidthPixels = this._map.width * this._map.tileWidth * this.MAP_SCALE;

    const mapOffsetX = (this.game.width - mapWidthPixels) / 2;
    const playerWidth = 50; // Approximate player width
    const minX = mapOffsetX + playerWidth / 2;
    const maxX = mapOffsetX + mapWidthPixels - playerWidth / 2;

    this._playerX = Math.max(minX, Math.min(this._playerX, maxX));

    // Simple ground collision
    if (this._playerY > this.GROUND_Y) {
      this._playerY = this.GROUND_Y;
      this._playerVelocityY = 0;
      this._isJumping = false;
    }

    this.updatePlayerState();
  }

  override render(context: CanvasRenderingContext2D, deltaTime: number): void {
    if (this.isLoading) {
      this.drawLoadingScreen(context);
      return;
    }

    // Clear the canvas
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, this.width, this.height);
    context.imageSmoothingEnabled = false;

    this._map.draw(context, this.MAP_SCALE);

    // Draw player
    const currentAnim = this._playerStateMachine.getCurrentAnimation();
    if (currentAnim) {
      const sprite = currentAnim.getNextSprite(deltaTime);

      context.save();
      if (!this._facingRight) {
        context.scale(-1, 1);
        context.translate(-this._playerX * 2, 0);
      }
      context.drawImage(
        sprite.img,
        this._playerX - sprite.width,
        this._playerY - sprite.height,
        sprite.width * 2,
        sprite.height * 2
      );
      context.restore();
    }

    // Draw debug visualization
    // this.drawDebugPlayer(context);
  }

  destroy(): void {}
}
