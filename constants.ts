import { Pokemon, Move, ElementType } from './types';

export const TYPE_CHART: Record<ElementType, { strongAgainst: ElementType[]; weakAgainst: ElementType[] }> = {
  '火': { strongAgainst: ['草'], weakAgainst: ['水', '火'] },
  '水': { strongAgainst: ['火'], weakAgainst: ['草', '水'] },
  '草': { strongAgainst: ['水'], weakAgainst: ['火', '草'] },
  '电': { strongAgainst: ['水'], weakAgainst: ['电', '草'] },
  '一般': { strongAgainst: [], weakAgainst: [] } // 一般属性通常没有克制，也不抵抗（除幽灵外，此处简化）
};

export const MOVES: Record<string, Move> = {
  tackle: { id: 'tackle', name: '撞击', type: '一般', power: 40, accuracy: 100, cost: 0, description: '用身体撞向对手进行攻击。' },
  scratch: { id: 'scratch', name: '抓', type: '一般', power: 40, accuracy: 100, cost: 0, description: '用坚硬的爪子抓挠对手。' },
  ember: { id: 'ember', name: '火花', type: '火', power: 60, accuracy: 100, cost: 10, description: '发射微弱的火焰进行攻击。' },
  flamethrower: { id: 'flamethrower', name: '喷射火焰', type: '火', power: 90, accuracy: 100, cost: 25, description: '向对手发射剧烈的火焰。' },
  watergun: { id: 'watergun', name: '水枪', type: '水', power: 40, accuracy: 100, cost: 5, description: '向对手猛烈地喷射水流。' },
  hydropump: { id: 'hydropump', name: '水炮', type: '水', power: 110, accuracy: 80, cost: 30, description: '向对手喷射猛烈的水柱。' },
  vinewhip: { id: 'vinewhip', name: '藤鞭', type: '草', power: 45, accuracy: 100, cost: 5, description: '像鞭子一样挥动细长的藤蔓。' },
  solarbeam: { id: 'solarbeam', name: '日光束', type: '草', power: 120, accuracy: 100, cost: 40, description: '吸收光能后发射强力的光束。' },
  thundershock: { id: 'thundershock', name: '电击', type: '电', power: 40, accuracy: 100, cost: 5, description: '发出电流刺激对手。' },
  thunderbolt: { id: 'thunderbolt', name: '十万伏特', type: '电', power: 90, accuracy: 100, cost: 20, description: '向对手发出强力的电击。' },
  quickattack: { id: 'quickattack', name: '电光一闪', type: '一般', power: 40, accuracy: 100, cost: 5, description: '以迅雷不及掩耳之势扑向对手。', priority: 1 },
};

export const INITIAL_ROSTER: Pokemon[] = [
  {
    id: 6,
    name: '喷火龙',
    spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/6.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/6.gif',
    type: '火',
    maxHp: 180, currentHp: 180,
    maxMp: 100, currentMp: 100,
    attack: 84, defense: 78, speed: 100,
    moves: [MOVES.scratch, MOVES.ember, MOVES.flamethrower, MOVES.quickattack]
  },
  {
    id: 9,
    name: '水箭龟',
    spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/9.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/9.gif',
    type: '水',
    maxHp: 200, currentHp: 200,
    maxMp: 100, currentMp: 100,
    attack: 83, defense: 100, speed: 78,
    moves: [MOVES.tackle, MOVES.watergun, MOVES.hydropump, MOVES.scratch]
  },
  {
    id: 3,
    name: '妙蛙花',
    spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/3.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/3.gif',
    type: '草',
    maxHp: 190, currentHp: 190,
    maxMp: 120, currentMp: 120,
    attack: 82, defense: 83, speed: 80,
    moves: [MOVES.tackle, MOVES.vinewhip, MOVES.solarbeam, MOVES.scratch]
  },
  {
    id: 25,
    name: '皮卡丘',
    spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/25.gif',
    type: '电',
    maxHp: 150, currentHp: 150,
    maxMp: 100, currentMp: 100,
    attack: 90, defense: 55, speed: 120,
    moves: [MOVES.quickattack, MOVES.thundershock, MOVES.thunderbolt, MOVES.scratch]
  }
];

export const ENEMY_ROSTER: Pokemon[] = [
  {
    id: 150,
    name: '超梦',
    spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/150.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/150.gif',
    type: '一般',
    maxHp: 250, currentHp: 250,
    maxMp: 200, currentMp: 200,
    attack: 110, defense: 90, speed: 130,
    moves: [MOVES.quickattack, MOVES.thunderbolt, MOVES.flamethrower, MOVES.hydropump]
  },
   {
    id: 130,
    name: '暴鲤龙',
    spriteFront: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/130.gif',
    spriteBack: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/130.gif',
    type: '水',
    maxHp: 220, currentHp: 220,
    maxMp: 80, currentMp: 80,
    attack: 125, defense: 79, speed: 81,
    moves: [MOVES.tackle, MOVES.hydropump, MOVES.scratch, MOVES.watergun]
  }
];