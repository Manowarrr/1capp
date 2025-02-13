import React from 'react';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  percentage, 
  label,
  size = 'md',
  ...props
}) => {
  const height = size === 'sm' ? 'h-2' : size === 'md' ? 'h-4' : 'h-6';

  return (
    <div className="w-full" {...props}>
      {label && (
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
      )}
      <div className={`w-full ${height} bg-gray-100 rounded-full overflow-hidden`}>
        <div
          className={`${height} bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${percentage}%` }}
        >
          {size === 'lg' && (
            <div className="h-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">{percentage}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar; 