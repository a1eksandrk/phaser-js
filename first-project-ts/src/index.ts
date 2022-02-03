import Phaser, { Game } from 'phaser';
import GameConfig = Phaser.Types.Core.GameConfig;

import { GameScene } from '@/gameScene';
import { WelcomeScene } from '@/welcomeScene';
import { ScoreScene } from '@/scoreScene';

const config: GameConfig = {
  title: 'StarFall',
  width: 800,
  height: 600,
  parent: 'game',
  scene: [WelcomeScene, GameScene, ScoreScene],
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  backgroundColor: '#18216D'
};

export class StarFallGame extends Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  new StarFallGame(config);
});
