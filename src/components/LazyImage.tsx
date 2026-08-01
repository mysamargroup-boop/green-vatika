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
      {!isLoaded && !hasError && src && (
        <Skeleton
          width="w-full"
          height="h-full"
          className={`absolute inset-0 z-10 ${skeletonClassName}`}
          borderRadius="rounded-none"
        />
      )}

      {/* Grayscale Low-Opacity Logo Fallback for Missing/Broken Images */}
      {hasError || !src ? (
        <div className="absolute inset-0 bg-secondary/60 flex flex-col items-center justify-center p-4 text-center space-y-2 select-none">
          <img
            src="/logo.png"
            alt="Green Vatika Logo Fallback"
            className="h-10 w-auto object-contain grayscale opacity-30 pointer-events-none"
          />
          <span className="text-[10px] font-extrabold text-muted-foreground/70 uppercase tracking-widest">
            Green Vatika
          </span>
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
