import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from './Skeleton';

interface ScrollSkeletonContainerProps {
  children: React.ReactNode;
  height?: string;
  className?: string;
}

export const ScrollSkeletonContainer: React.FC<ScrollSkeletonContainerProps> = ({
  children,
  height = 'h-96',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Display smooth grey skeleton shimmer as section scrolls into view
          setTimeout(() => {
            setIsVisible(true);
          }, 350);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!isVisible ? (
        <div className={`w-full ${height} p-6 space-y-6 bg-card rounded-3xl border border-border/60 shadow-sm animate-in fade-in duration-300`}>
          <div className="flex items-center gap-4">
            <Skeleton width="w-12" height="h-12" borderRadius="rounded-2xl" />
            <div className="space-y-2 flex-1">
              <Skeleton width="w-48" height="h-5" />
              <Skeleton width="w-72" height="h-3" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-secondary/40 space-y-3">
                <Skeleton width="w-full" height="h-44" borderRadius="rounded-xl" />
                <Skeleton width="w-3/4" height="h-4" />
                <Skeleton width="w-1/2" height="h-3" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">{children}</div>
      )}
    </div>
  );
};
