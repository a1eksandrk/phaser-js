import { Scene } from 'phaser';
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;

export class WelcomeScene extends Scene {
  title!: Phaser.GameObjects.Text;
  hint!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'WelcomeScene' });
  }

  create(): void {
    const { width } = this.sys.game.canvas;

    const titleText = 'StarFall';
    this.title = this.add.text(0, 200, titleText,
      { font: '128px Arial Bold', fill: '#FBFBAC' } as TextStyle);
    this.title.x = width / 2 - this.title.width / 2;

    const hintText = 'Click to start';
    this.hint = this.add.text(0, 350, hintText,
      { font: '24px Arial Bold', fill: '#FBFBAC' } as TextStyle);
    this.hint.x = width / 2 - this.hint.width / 2;
    this.hint.setInteractive({ cursor: 'pointer' });

    this.hint.on('pointerover', () => {
      this.hint.tint = 0x00ff00;
    });

    this.hint.on('pointerout', () => {
      this.hint.tint = 0xFBFBAC;
    });

    this.hint.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
