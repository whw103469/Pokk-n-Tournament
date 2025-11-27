import React from 'react';
import { Pokemon } from '../types';

interface PokemonSwitchMenuProps {
  roster: Pokemon[];
  activeId: number;
  onSwitch: (pokemon: Pokemon) => void;
  onCancel: () => void;
}

export const PokemonSwitchMenu: React.FC<PokemonSwitchMenuProps> = ({ roster, activeId, onSwitch, onCancel }) => {
  return (
    <div className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-md border-4 border-blue-800 shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">交换精灵</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {roster.map((poke) => (
            <button
              key={poke.id}
              disabled={poke.currentHp <= 0 || poke.id === activeId}
              onClick={() => onSwitch(poke)}
              className={`w-full flex items-center p-3 rounded border-2 transition-colors ${
                poke.id === activeId
                  ? 'bg-blue-100 border-blue-500 opacity-70 cursor-not-allowed'
                  : poke.currentHp <= 0
                  ? 'bg-gray-200 border-gray-400 opacity-50 cursor-not-allowed'
                  : 'bg-gray-50 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
              }`}
            >
              <img src={poke.spriteFront} alt={poke.name} className="w-12 h-12 mr-3" />
              <div className="flex-1 text-left">
                <div className="font-bold text-lg">{poke.name}</div>
                <div className="w-32">
                   <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${poke.currentHp < poke.maxHp * 0.2 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${(poke.currentHp / poke.maxHp) * 100}%` }}
                      ></div>
                   </div>
                   <div className="text-xs text-gray-500 text-right">{poke.currentHp}/{poke.maxHp}</div>
                </div>
              </div>
              {poke.id === activeId && <span className="text-xs font-bold text-blue-600 bg-blue-200 px-2 py-1 rounded">当前出战</span>}
              {poke.currentHp <= 0 && <span className="text-xs font-bold text-red-600 bg-red-200 px-2 py-1 rounded">濒死</span>}
            </button>
          ))}
        </div>
        <button
          onClick={onCancel}
          className="mt-4 w-full py-3 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition"
        >
          取消
        </button>
      </div>
    </div>
  );
};