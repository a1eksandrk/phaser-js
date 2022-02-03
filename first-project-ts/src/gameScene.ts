import Phaser, { Scene } from 'phaser';

import StaticGroup = Phaser.Physics.Arcade.StaticGroup;
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;
import Image = Phaser.Physics.Arcade.Image;

export class GameScene extends Scene {
  delta!: number;
  lastStarTime!: number;
  starsCaught!: number;
  starsFallen!: number;
  starFallSpeed!: number;

  sand!: StaticGroup;
  info!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {
    this.delta = 1000;
    this.lastStarTime = 0;
    this.starsCaught = 0;
    this.starsFallen = 0;
    this.starFallSpeed = 100;
  }

  preload(): void {
    this.load.setBaseURL(
      'https://raw.githubusercontent.com/mariyadavydova/' +
      'starfall-phaser3-typescript/master/'
    );
    this.load.image('star', 'assets/star.png');
    this.load.image('sand', 'assets/sand.jpg');
  }

  create(): void {
    this.sand = this.physics.add.staticGroup({
      key: 'sand',
      frameQuantity: 20
    });
    Phaser.Actions.PlaceOnLine(this.sand.getChildren(), new Phaser.Geom.Line(20, 580, 820, 580));
    this.sand.refresh();

    this.info = this.add.text(10, 10, '',
      { font: '24px Arial Bold', fill: '#FBFBAC' } as TextStyle);
  }

  update(time: number): void {
    const diff = time - this.lastStarTime;

    if (diff > this.delta) {
      this.lastStarTime = time;

      if (this.delta > 500) {
        this.delta -= 5;
      }

      this.emitStar();

      if (this.starFallSpeed < 400) {
        this.starFallSpeed += 5;
      }
    }

    this.info.text =
      this.starsCaught + ' caught - ' +
      this.starsFallen + ' fallen (max 3)';
  }

  private onClick(star: Image): () => void {
    return () => {
      star.setTint(0x00ff00);
      star.setVelocity(0, 0);
      this.starsCaught += 1;

      this.tweens.add({
        targets: star,
        scale: 0.5,
        duration: 500,
        ease: 'Bounce',
        onComplete: () => {
          star.destroy();
        }
      });
    };
  }

  private onFall(star: Image): () => void {
    return () => {
      star.setTint(0xff0000);
      this.starsFallen += 1;

      this.cameras.main.shake(100, 0.01);

      this.time.delayedCall(100, (star: Image) => {
        star.destroy();

        if (this.starsFallen > 2) {
          this.scene.start('ScoreScene',
            { starsCaught: this.starsCaught });
        }
      }, [star], this);
    };
  }

  private emitStar(): void {
    const x = Phaser.Math.Between(25, 775);
    const y = 26;

    const star = this.physics.add.sprite(x, y, 'star');
    star.setDisplaySize(50, 50);
    star.setVelocity(0, this.starFallSpeed);
    star.setInteractive({ cursor: 'pointer' });

    star.on('pointerdown', this.onClick(star));
    this.physics.add.collider(star, this.sand, this.onFall(star), undefined);
  }
}
