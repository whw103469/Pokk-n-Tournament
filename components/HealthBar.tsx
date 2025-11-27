import React from 'react';

interface HealthBarProps {
  current: number;
  max: number;
  label: string;
  color: 'green' | 'blue';
}

export const HealthBar: React.FC<HealthBarProps> = ({ current, max, label, color }) => {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));

  let barColorClass = 'bg-green-500';
  if (color === 'green') {
    if (percentage < 20) barColorClass = 'bg-red-500';
    else if (percentage < 50) barColorClass = 'bg-yellow-400';
  } else {
    barColorClass = 'bg-blue-500';
  }

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
        <span>{label}</span>
        <span>{Math.floor(current)}/{max}</span>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-600">
        <div
          className={`h-full ${barColorClass} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
