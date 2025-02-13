import React from 'react';

interface ProgressBarProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, size = 'md' }) => {
  const height = size === 'sm' ? 'h-2' : size === 'md' ? 'h-4' : 'h-6';

  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-gray-100 rounded-full overflow-hidden`}>
        <div
          className={`${height} bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 