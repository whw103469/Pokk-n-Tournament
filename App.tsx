import React, { useState, useEffect } from 'react';
import { BattleScene } from './components/BattleScene';
import { BattleMenu } from './components/BattleMenu';
import { LogBox } from './components/LogBox';
import { PokemonSwitchMenu } from './components/PokemonSwitchMenu';
import { INITIAL_ROSTER, ENEMY_ROSTER, TYPE_CHART } from './constants';
import { Pokemon, Move, BattleLog, BattlePhase, ElementType } from './types';

function App() {
  const [playerRoster, setPlayerRoster] = useState<Pokemon[]>(JSON.parse(JSON.stringify(INITIAL_ROSTER)));
  const [enemyRoster, setEnemyRoster] = useState<Pokemon[]>(JSON.parse(JSON.stringify(ENEMY_ROSTER)));
  
  const [activePlayerId, setActivePlayerId] = useState<number>(playerRoster[0].id);
  const [activeEnemyId, setActiveEnemyId] = useState<number>(enemyRoster[0].id);

  const [phase, setPhase] = useState<BattlePhase>('START');
  const [logs, setLogs] = useState<BattleLog[]>([]);

  // Animation States
  const [isPlayerHit, setIsPlayerHit] = useState(false);
  const [isEnemyHit, setIsEnemyHit] = useState(false);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
  const [currentAttackType, setCurrentAttackType] = useState<ElementType>('一般');

  // Derived state
  const playerActive = playerRoster.find(p => p.id === activePlayerId)!;
  const enemyActive = enemyRoster.find(p => p.id === activeEnemyId)!;

  const addLog = (message: string, source: 'system' | 'player' | 'enemy') => {
    setLogs(prev => [...prev, { message, source }]);
  };

  const calculateDamage = (attacker: Pokemon, defender: Pokemon, move: Move) => {
    const isCrit = Math.random() < 0.0625;
    let multiplier = 1;
    
    const typeData = TYPE_CHART[move.type];

    // Type effectiveness
    if (typeData.strongAgainst.includes(defender.type)) {
      multiplier *= 2;
    }
    // Resistance
    if (typeData.weakAgainst.includes(defender.type)) {
      multiplier *= 0.5;
    }

    if (isCrit) multiplier *= 1.5;

    // Damage Formula
    const damage = Math.floor(
      ((((2 * 50 / 5 + 2) * attacker.attack * move.power / defender.defense) / 50) + 2) * multiplier
    );

    return { damage, isCrit, multiplier };
  };

  const handleTurn = async (playerMove: Move | 'SWITCH', switchTarget?: Pokemon) => {
    if (phase !== 'PLAYER_TURN' && !(phase === 'SWITCHING' && playerMove === 'SWITCH')) return;
    
    // If just switching (no turn cost logic for now, or immediate switch)
    if (playerMove === 'SWITCH' && switchTarget) {
         setPhase('ANIMATING');
         addLog(`回来吧，${playerActive.name}!`, 'player');
         await new Promise(r => setTimeout(r, 500));
         setActivePlayerId(switchTarget.id);
         addLog(`去吧，${switchTarget.name}!`, 'player');
         await new Promise(r => setTimeout(r, 500));
         
         // Enemy gets a free hit? For simplicity, switching ends turn
         // But let's check speed priority logic in future. 
         // For now, let's say switching takes a turn.
         setPhase('ANIMATING'); // Continue animating for enemy turn
    } else {
        setPhase('ANIMATING');
    }

    // Local refs to track active pokemon (needed if switch happened)
    // Note: React state updates are async, so we use IDs to find current state in Roster arrays
    let currentPlayer = playerRoster.find(p => p.id === (playerMove === 'SWITCH' && switchTarget ? switchTarget.id : activePlayerId))!;
    let currentEnemy = enemyRoster.find(p => p.id === activeEnemyId)!;

    // 1. Determine Turn Order & Moves
    let firstActor: 'player' | 'enemy' = 'player';
    let enemyMove = currentEnemy.moves[Math.floor(Math.random() * currentEnemy.moves.length)];
    
    // Basic AI
    if (currentEnemy.currentHp < currentEnemy.maxHp * 0.3) {
       const strongMove = currentEnemy.moves.find(m => m.power > 80 && m.cost <= currentEnemy.currentMp);
       if (strongMove) enemyMove = strongMove;
    }

    if (playerMove === 'SWITCH') {
        firstActor = 'player'; // Switch happens first
    } else {
        if (currentEnemy.speed > currentPlayer.speed) firstActor = 'enemy';
        // Priority moves
        if (playerMove.priority && !enemyMove.priority) firstActor = 'player';
        if (playerMove.priority && enemyMove.priority && currentPlayer.speed < currentEnemy.speed) firstActor = 'enemy';
    }

    const executeAttack = async (attackerId: number, defenderId: number, move: Move, isPlayer: boolean) => {
        // Fetch latest state inside async function
        const attacker = (isPlayer ? playerRoster : enemyRoster).find(p => p.id === attackerId);
        const defender = (isPlayer ? enemyRoster : playerRoster).find(p => p.id === defenderId);

        if (!attacker || attacker.currentHp <= 0) return false;
        if (!defender || defender.currentHp <= 0) return false;

        // Set Move Type for Animation
        setCurrentAttackType(move.type);

        // Deduct MP
        const updateMp = (prev: Pokemon[]) => {
            return prev.map(p => p.id === attackerId ? { ...p, currentMp: Math.max(0, p.currentMp - move.cost) } : p);
        };
        if (isPlayer) setPlayerRoster(updateMp); else setEnemyRoster(updateMp);

        addLog(`${attacker.name} 使用了 ${move.name}！`, isPlayer ? 'player' : 'enemy');

        // Animation: Attack
        if (isPlayer) setIsPlayerAttacking(true); else setIsEnemyAttacking(true);
        await new Promise(r => setTimeout(r, 600)); // Wait for attack animation
        if (isPlayer) setIsPlayerAttacking(false); else setIsEnemyAttacking(false);

        // Calc Damage
        const { damage, isCrit, multiplier } = calculateDamage(attacker, defender, move);
        const actualDamage = Math.min(damage, defender.currentHp);

        // Animation: Hit
        if (isPlayer) setIsEnemyHit(true); else setIsPlayerHit(true);
        await new Promise(r => setTimeout(r, 400)); // Hit flash duration
        if (isPlayer) setIsEnemyHit(false); else setIsPlayerHit(false);

        // Update HP
        const updateHp = (prev: Pokemon[]) => {
            return prev.map(p => p.id === defenderId ? { ...p, currentHp: Math.max(0, p.currentHp - actualDamage) } : p);
        };
        if (isPlayer) setEnemyRoster(updateHp); else setPlayerRoster(updateHp);

        // Logs
        let effectMsg = "";
        if (multiplier > 1) effectMsg = "效果拔群！";
        if (multiplier < 1) effectMsg = "效果一般...";
        const critMsg = isCrit ? "击中要害！" : "";
        
        if (effectMsg || critMsg) {
             addLog(`${effectMsg}${critMsg}`, 'system');
        }
        addLog(`造成了 ${actualDamage} 点伤害！`, 'system');

        // Check Faint
        if (defender.currentHp - actualDamage <= 0) {
            addLog(`${defender.name} 倒下了!`, 'system');
            return true; // Someone fainted
        }
        return false;
    };

    // --- EXECUTE TURN SEQUENCE ---
    let battleEnded = false;

    // First Action
    if (firstActor === 'player') {
        if (playerMove !== 'SWITCH') {
            battleEnded = await executeAttack(activePlayerId, activeEnemyId, playerMove, true) || false;
        } else {
            // Switch already handled visually above, just wait a bit
            await new Promise(r => setTimeout(r, 500));
        }
    } else {
        battleEnded = await executeAttack(activeEnemyId, activePlayerId, enemyMove, false) || false;
    }

    if (battleEnded) {
        setPhase('CHECKING');
        return;
    }
    
    // Pause between turns
    await new Promise(r => setTimeout(r, 500));

    // Second Action
    if (firstActor === 'player') {
         // Enemy attacks second
         // Note: If player switched, enemy still attacks the new target (activePlayerId was updated)
         // But we need to make sure we target the correct ID. 
         const targetId = playerMove === 'SWITCH' && switchTarget ? switchTarget.id : activePlayerId;
         battleEnded = await executeAttack(activeEnemyId, targetId, enemyMove, false) || false;
    } else {
        // Player attacks second
         if (playerMove !== 'SWITCH') {
            battleEnded = await executeAttack(activePlayerId, activeEnemyId, playerMove, true) || false;
         }
    }

    // End Turn
    setPhase('CHECKING');
  };

  // Check Game State (Win/Loss/Switch)
  useEffect(() => {
     if (phase !== 'CHECKING') return;
     
     const currentPlayer = playerRoster.find(p => p.id === activePlayerId);
     const currentEnemy = enemyRoster.find(p => p.id === activeEnemyId);
     
     if (!currentPlayer || !currentEnemy) {
        setPhase('PLAYER_TURN'); 
        return;
     }

     if (currentPlayer.currentHp <= 0) {
         const hasOthers = playerRoster.some(p => p.currentHp > 0);
         if (!hasOthers) {
             setPhase('GAME_OVER_LOSE');
             addLog('你没有可用的精灵了！你输了！', 'system');
         } else {
             setPhase('SWITCHING');
             addLog('你的精灵倒下了，请选择下一只！', 'system');
         }
     } else if (currentEnemy.currentHp <= 0) {
         const hasOthers = enemyRoster.some(p => p.currentHp > 0);
         if (!hasOthers) {
             setPhase('GAME_OVER_WIN');
             addLog('对手被击败了！你赢了！', 'system');
         } else {
            // Auto switch enemy
            const nextEnemy = enemyRoster.find(p => p.currentHp > 0);
            if (nextEnemy) {
                setTimeout(() => {
                     addLog(`对手派出了 ${nextEnemy.name}!`, 'enemy');
                     setActiveEnemyId(nextEnemy.id);
                     setPhase('PLAYER_TURN');
                }, 1500);
            }
         }
     } else {
         setPhase('PLAYER_TURN');
     }
  }, [playerRoster, enemyRoster, activePlayerId, activeEnemyId, phase]); 

  // Start game
  useEffect(() => {
    setTimeout(() => {
        addLog(`野生的 ${enemyActive.name} 出现了!`, 'enemy');
        addLog(`就决定是你了，${playerActive.name}!`, 'player');
        setPhase('PLAYER_TURN');
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwitch = (pokemon: Pokemon) => {
    // If switching due to faint (forced)
    if (playerActive.currentHp <= 0) {
        setActivePlayerId(pokemon.id);
        addLog(`去吧，${pokemon.name}!`, 'player');
        setPhase('PLAYER_TURN');
    } else {
        // Strategic switch during turn
        handleTurn('SWITCH', pokemon);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-2xl bg-gray-200 rounded-xl shadow-2xl overflow-hidden border-8 border-gray-400 relative">
        
        {/* Header */}
        <div className="bg-red-600 p-2 border-b-4 border-red-800 flex justify-between items-center text-white shadow-md z-10 relative">
            <h1 className="font-bold text-lg italic tracking-wider">宝可梦对决</h1>
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse border border-white"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 border border-white"></div>
            </div>
        </div>

        {/* Game Area */}
        <div className="bg-white p-4 relative">
            <BattleScene 
                playerPokemon={playerActive} 
                enemyPokemon={enemyActive}
                isPlayerHit={isPlayerHit}
                isEnemyHit={isEnemyHit}
                isPlayerAttacking={isPlayerAttacking}
                isEnemyAttacking={isEnemyAttacking}
                attackAnimationType={currentAttackType}
            />
            
            <div className="mt-4">
                <LogBox logs={logs} />
            </div>

            <div className="mt-4 h-32 md:h-40 bg-gray-800 rounded-lg p-2 border-4 border-gray-600 shadow-inner">
                {phase === 'GAME_OVER_WIN' || phase === 'GAME_OVER_LOSE' ? (
                    <div className="h-full flex flex-col items-center justify-center text-white">
                        <h2 className="text-2xl font-bold mb-2">{phase === 'GAME_OVER_WIN' ? '胜利！' : '失败...'}</h2>
                        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600 font-bold">再玩一次</button>
                    </div>
                ) : (
                    <BattleMenu 
                        moves={playerActive.moves} 
                        onAttack={(move) => handleTurn(move)} 
                        onSwitch={() => setPhase('SWITCHING')}
                        disabled={phase !== 'PLAYER_TURN'}
                        currentMp={playerActive.currentMp}
                    />
                )}
            </div>
        </div>

        {/* Switch Menu Overlay */}
        {phase === 'SWITCHING' && (
            <PokemonSwitchMenu 
                roster={playerRoster} 
                activeId={activePlayerId} 
                onSwitch={handleSwitch}
                onCancel={() => {
                     // Can only cancel if current pokemon is alive
                     if (playerActive.currentHp > 0) setPhase('PLAYER_TURN');
                }}
            />
        )}
      </div>
    </div>
  );
}

export default App;
