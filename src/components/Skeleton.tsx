import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  borderRadius = 'rounded-xl',
}) => {
  return (
    <div
      className={`bg-slate-200 dark:bg-slate-800 animate-pulse ${width} ${height} ${borderRadius} ${className}`}
    />
  );
};
