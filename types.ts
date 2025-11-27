export type ElementType = '火' | '水' | '草' | '电' | '一般';

export interface Move {
  id: string;
  name: string;
  type: ElementType;
  power: number;
  accuracy: number;
  cost: number; // Mana/Energy cost
  description: string;
  priority?: number;
}

export interface Pokemon {
  id: number;
  name: string;
  spriteFront: string;
  spriteBack: string;
  type: ElementType;
  maxHp: number;
  currentHp: number;
  maxMp: number;
  currentMp: number;
  attack: number;
  defense: number;
  speed: number;
  moves: Move[];
}

export type BattlePhase = 'START' | 'PLAYER_TURN' | 'ENEMY_TURN' | 'ANIMATING' | 'SWITCHING' | 'GAME_OVER_WIN' | 'GAME_OVER_LOSE' | 'CHECKING';

export interface BattleLog {
  message: string;
  source: 'system' | 'player' | 'enemy';
}
