import React from 'react';
import { Move } from '../types';

interface BattleMenuProps {
  moves: Move[];
  onAttack: (move: Move) => void;
  onSwitch: () => void;
  disabled: boolean;
  currentMp: number;
}

export const BattleMenu: React.FC<BattleMenuProps> = ({ moves, onAttack, onSwitch, disabled, currentMp }) => {
  const [view, setView] = React.useState<'MAIN' | 'ATTACK'>('MAIN');

  if (view === 'MAIN') {
    return (
      <div className="grid grid-cols-2 gap-2 h-full">
        <button
          onClick={() => setView('ATTACK')}
          disabled={disabled}
          className="bg-red-500 hover:bg-red-600 text-white font-bold text-xl rounded-lg shadow border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          战斗
        </button>
        <button
          disabled={disabled} // Bag not implemented yet
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-xl rounded-lg shadow border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          背包
        </button>
        <button
          onClick={onSwitch}
          disabled={disabled}
          className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-lg shadow border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          精灵
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xl rounded-lg shadow border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all"
        >
          逃跑
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-2 gap-2 flex-grow">
        {moves.map((move) => {
            const cantAfford = currentMp < move.cost;
            return (
                <button
                key={move.id}
                onClick={() => onAttack(move)}
                disabled={disabled || cantAfford}
                className={`relative p-2 rounded-lg text-left shadow border-b-4 transition-all active:border-b-0 active:translate-y-1
                    ${move.type === '火' ? 'bg-orange-100 border-orange-300 text-orange-900 hover:bg-orange-200' :
                    move.type === '水' ? 'bg-blue-100 border-blue-300 text-blue-900 hover:bg-blue-200' :
                    move.type === '草' ? 'bg-green-100 border-green-300 text-green-900 hover:bg-green-200' :
                    move.type === '电' ? 'bg-yellow-100 border-yellow-300 text-yellow-900 hover:bg-yellow-200' :
                    'bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200'}
                    ${(disabled || cantAfford) ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                `}
                >
                <div className="font-bold text-sm md:text-base">{move.name}</div>
                <div className="flex justify-between text-xs mt-1 opacity-70">
                    <span>{move.type}</span>
                    <span>蓝耗: {move.cost}</span>
                </div>
                </button>
            );
        })}
      </div>
      <button 
        onClick={() => setView('MAIN')}
        className="mt-2 text-xs text-gray-500 underline hover:text-gray-800 text-center"
      >
        返回
      </button>
    </div>
  );
};