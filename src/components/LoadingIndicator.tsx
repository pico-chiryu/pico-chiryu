import React from 'react';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingIndicator;
