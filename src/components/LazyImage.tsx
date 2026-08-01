import React, { useState, useEffect, useRef } from 'react';
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
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${aspectRatio} ${className}`}>
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
        isInView && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-xs'
            }`}
          />
        )
      )}
    </div>
  );
};
