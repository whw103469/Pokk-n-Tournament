import React, { useEffect, useRef } from 'react';
import { BattleLog } from '../types';

interface LogBoxProps {
  logs: BattleLog[];
}

export const LogBox: React.FC<LogBoxProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="h-24 bg-gray-900 border-4 border-gray-700 rounded-lg p-2 overflow-y-auto font-mono text-white text-sm shadow-inner">
      {logs.length === 0 && <p className="text-gray-500 italic">战斗开始...</p>}
      {logs.map((log, idx) => (
        <div key={idx} className={`mb-1 ${log.source === 'enemy' ? 'text-red-300' : log.source === 'player' ? 'text-blue-300' : 'text-gray-300'}`}>
          {log.message}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};