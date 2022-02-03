import { Scene } from 'phaser';

export class GameScene extends Scene {
  spacesheep!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  speed!: number;
  direction = 0;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.speed = 0;
  }

  preload(): void {
    this.load.spritesheet('spaceship', 'assets/spaceship.png', { frameWidth: 33, frameHeight: 39 });
  }

  create(): void {
    this.spacesheep = this.physics.add.sprite(200, 200, 'spaceship');
    this.spacesheep.setScale(1.6);
  }

  update(): void {
    if (this.cursors.left.isDown) {
      if (this.speed == 0) {
        this.direction = -1;
      }

      if (this.direction == 1 && this.speed > 0) {
        this.speed -= 8;
      } else if (this.speed < 300) {
        this.speed += 4;
      }
    } else if (this.cursors.right.isDown) {
      if (this.speed == 0) {
        this.direction = 1;
      }

      if (this.direction == -1 && this.speed > 0) {
        this.speed -= 8;
      } else if (this.speed < 300) {
        this.speed += 4;
      }
    } else {
      if (this.speed > 0) {
        this.speed -= 2;
      }
    }

    this.spacesheep.setVelocityX(this.direction * this.speed);
  }
}
