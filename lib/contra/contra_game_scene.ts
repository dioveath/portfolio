import Scene from '../game/scene';
import Game from '../game/game';
import { PlayerState, PlayerStateMachine } from './player_state_machine';
import { GameMap } from './map';

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

  private readonly GRAVITY: number = 980;
  private readonly JUMP_FORCE: number = -500;
  private readonly MOVE_SPEED: number = 200;
  private readonly MAP_SCALE: number = 3; // You can adjust this value as needed

  constructor(game: Game, sceneName: string, width: number, height: number) {
    super();
    this.game = game;
    this.width = width;
    this.height = height;
    this._playerStateMachine = new PlayerStateMachine();
    this._map = new GameMap();
  }

  override async init(): Promise<void> {
    await this._playerStateMachine.loadResources();
    await this._map.loadMap('assets/games/platformer/map/first_level.tmx');
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
    if (!this._playerStateMachine.isLoaded) return;

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

    // Simple ground collision
    if (this._playerY > 400) {
      this._playerY = 400;
      this._playerVelocityY = 0;
      this._isJumping = false;
    }

    this.updatePlayerState();
  }

  override render(context: CanvasRenderingContext2D, deltaTime: number): void {
    // Clear the canvas
    context.clearRect(0, 0, this.width, this.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, this.width, this.height);
    context.imageSmoothingEnabled = false;

    this._map.draw(context, this.MAP_SCALE);

    if (!this._playerStateMachine.isLoaded) {
      // Draw loading screen
      context.fillStyle = 'white';
      context.font = '24px Arial';
      context.textAlign = 'center';
      const loadingText = `Loading... ${Math.floor(
        (this._playerStateMachine.resourcesLoaded / this._playerStateMachine.totalResources) * 100
      )}%`;
      context.fillText(loadingText, this.width / 2, this.height / 2);
      return;
    }

    // Draw player
    const currentAnim = this._playerStateMachine.getCurrentAnimation();
    if (currentAnim) {
      const sprite = currentAnim.getNextSprite(deltaTime);

      context.save();
      if (!this._facingRight) {
        context.scale(-1, 1);
        context.translate(-this._playerX * 2 - sprite.width * 2, 0);
      }
      context.drawImage(
        sprite.img,
        this._facingRight ? this._playerX : this._playerX,
        this._playerY,
        sprite.width * 2,
        sprite.height * 2
      );
      context.restore();
    }
  }

  destroy(): void {}
}
