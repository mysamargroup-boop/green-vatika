import React, { useState } from 'react';
import { Skeleton } from './Skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  skeletonClassName?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-square',
  skeletonClassName = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Grey Skeleton Shimmer Placeholder */}
      {!isLoaded && !hasError && (
        <Skeleton
          width="w-full"
          height="h-full"
          className={`absolute inset-0 z-10 ${skeletonClassName}`}
          borderRadius="rounded-none"
        />
      )}

      {/* Fallback Error Image */}
      {hasError ? (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center text-xs text-muted-foreground font-bold p-2 text-center">
          🌿 Green Vatika Plant
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        />
      )}
    </div>
  );
};
