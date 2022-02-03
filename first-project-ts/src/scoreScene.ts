import { Scene } from 'phaser';
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;

type score = { starsCaught: number };

export class ScoreScene extends Scene {
  score!: number;
  result!: Phaser.GameObjects.Text;
  hint!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'ScoreScene' });
  }

  init(data: score): void {
    this.score = data.starsCaught;
  }

  create(): void {
    const resultText = 'Your score is ' + this.score + '!';
    this.result = this.add.text(200, 250, resultText,
      { font: '48px Arial Bold', fill: '#FBFBAC' } as TextStyle);

    const hintText = 'Click to restart';
    this.hint = this.add.text(300, 350, hintText,
      { font: '24px Arial Bold', fill: '#FBFBAC' } as TextStyle);

    this.input.on('pointerdown', () => {
      this.scene.start('WelcomeScene');
    });
  }
}
