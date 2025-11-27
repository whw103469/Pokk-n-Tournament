import React from 'react';
import { Pokemon, ElementType } from '../types';
import { HealthBar } from './HealthBar';

interface BattleSceneProps {
  playerPokemon: Pokemon;
  enemyPokemon: Pokemon;
  isPlayerHit: boolean;
  isEnemyHit: boolean;
  isPlayerAttacking: boolean;
  isEnemyAttacking: boolean;
  attackAnimationType?: ElementType;
}

export const BattleScene: React.FC<BattleSceneProps> = ({
  playerPokemon,
  enemyPokemon,
  isPlayerHit,
  isEnemyHit,
  isPlayerAttacking,
  isEnemyAttacking,
  attackAnimationType = '一般' as ElementType
}) => {

  // Dynamic Styles for Animations
  const getProjectileStyle = (type: ElementType) => {
    switch (type) {
        case '火': return 'bg-orange-500 shadow-[0_0_15px_rgba(255,100,0,0.8)]';
        case '水': return 'bg-blue-500 shadow-[0_0_15px_rgba(0,100,255,0.8)] opacity-80';
        case '草': return 'bg-green-500 shadow-[0_0_15px_rgba(0,255,100,0.8)] rounded-sm rotate-45';
        case '电': return 'bg-yellow-400 shadow-[0_0_20px_rgba(255,255,0,0.9)] skew-x-12';
        default: return 'bg-gray-300 shadow-sm'; // Normal
    }
  };

  return (
    <div className="relative w-full h-80 md:h-96 bg-gradient-to-b from-blue-300 via-blue-200 to-green-200 rounded-t-xl overflow-hidden border-b-4 border-gray-800 shadow-inner group">
      
      {/* CSS for Keyframe Animations */}
      <style>{`
        @keyframes playerAttack {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 1; transform: translate(20px, -20px) scale(1.5); }
          100% { transform: translate(200px, -150px) scale(0.5); opacity: 0; }
        }
        @keyframes enemyAttack {
          0% { transform: translate(0, 0) scale(1); opacity: 0; }
          20% { opacity: 1; transform: translate(-20px, 20px) scale(1.5); }
          100% { transform: translate(-200px, 150px) scale(0.5); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          75% { transform: translateX(5px) rotate(5deg); }
        }
        @keyframes flashRed {
          0%, 100% { filter: none; }
          50% { filter: sepia(1) hue-rotate(-50deg) saturate(3); }
        }
        @keyframes flashWhite {
          0%, 100% { filter: none; }
          50% { filter: brightness(3); }
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="absolute bottom-0 left-[-10%] w-[60%] h-24 bg-green-700/30 rounded-[100%] transform skew-x-12 z-0"></div>
      <div className="absolute top-20 right-[-10%] w-[60%] h-20 bg-green-700/20 rounded-[100%] transform -skew-x-12 z-0"></div>
      
      {/* Clouds */}
      <div className="absolute top-4 left-10 w-20 h-8 bg-white/40 rounded-full blur-md"></div>
      <div className="absolute top-12 right-1/3 w-32 h-10 bg-white/30 rounded-full blur-md"></div>

      {/* Enemy HUD */}
      <div className="absolute top-6 left-6 z-20 bg-white/90 p-3 rounded-lg rounded-tl-none border-l-4 border-t-2 border-red-500 shadow-lg min-w-[200px]">
        <div className="flex justify-between items-end mb-1">
            <h3 className="font-bold text-gray-800 text-lg">{enemyPokemon.name}</h3>
            <span className="text-xs text-gray-500 font-mono">Lv.50</span>
        </div>
        <HealthBar current={enemyPokemon.currentHp} max={enemyPokemon.maxHp} label="血量" color="green" />
      </div>

      {/* Enemy Sprite & FX */}
      <div className="absolute top-16 right-12 z-10 flex flex-col items-center">
        <div className="relative">
            <img
            src={enemyPokemon.spriteFront}
            alt={enemyPokemon.name}
            className={`w-32 h-32 md:w-40 md:h-40 object-contain transition-transform duration-100 relative z-10
                ${isEnemyHit ? 'animate-[shake_0.4s_ease-in-out] animate-[flashRed_0.4s_ease-in-out]' : ''} 
                ${isEnemyAttacking ? 'scale-110' : ''}`}
            />
            {/* Attack Projectile Originating from Enemy */}
            {isEnemyAttacking && (
                <div 
                    className={`absolute top-1/2 left-1/2 w-8 h-8 rounded-full z-20 ${getProjectileStyle(attackAnimationType)}`}
                    style={{ animation: 'enemyAttack 0.6s ease-in forwards' }}
                ></div>
            )}
        </div>
        <div className="w-32 h-4 bg-black/20 rounded-[100%] blur-sm mt-[-10px]"></div>
      </div>

      {/* Player HUD */}
      <div className="absolute bottom-8 right-6 z-20 bg-white/90 p-3 rounded-lg rounded-br-none border-r-4 border-b-2 border-blue-500 shadow-lg min-w-[220px]">
         <div className="flex justify-between items-end mb-1">
            <h3 className="font-bold text-gray-800 text-lg">{playerPokemon.name}</h3>
            <span className="text-xs text-gray-500 font-mono">Lv.50</span>
        </div>
        <HealthBar current={playerPokemon.currentHp} max={playerPokemon.maxHp} label="血量" color="green" />
        <div className="mt-1">
           <HealthBar current={playerPokemon.currentMp} max={playerPokemon.maxMp} label="蓝量" color="blue" />
        </div>
      </div>

      {/* Player Sprite & FX */}
      <div className="absolute bottom-4 left-12 z-10 flex flex-col items-center">
        <div className="relative">
             <img
                src={playerPokemon.spriteBack}
                alt={playerPokemon.name}
                className={`w-40 h-40 md:w-48 md:h-48 object-contain transition-transform duration-100 relative z-10
                    ${isPlayerHit ? 'animate-[shake_0.4s_ease-in-out] animate-[flashRed_0.4s_ease-in-out]' : ''} 
                    ${isPlayerAttacking ? 'scale-110' : ''}`}
                />
            {/* Attack Projectile Originating from Player */}
            {isPlayerAttacking && (
                <div 
                    className={`absolute top-1/4 right-1/4 w-8 h-8 rounded-full z-20 ${getProjectileStyle(attackAnimationType)}`}
                    style={{ animation: 'playerAttack 0.6s ease-in forwards' }}
                ></div>
            )}
        </div>
        <div className="w-40 h-5 bg-black/20 rounded-[100%] blur-sm mt-[-15px]"></div>
      </div>

      {/* Full Screen Impact Flash */}
       {(isPlayerHit || isEnemyHit) && (
           <div className={`absolute inset-0 z-30 pointer-events-none animate-[flashWhite_0.2s_ease-in-out] ${isPlayerHit ? 'bg-red-500/20' : 'bg-white/30'}`}></div>
       )}

    </div>
  );
};