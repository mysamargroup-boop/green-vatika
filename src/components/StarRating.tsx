import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showNumeric?: boolean;
  reviewsCount?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 'sm',
  showNumeric = false,
  reviewsCount,
  className = '',
}) => {
  // Constrain rating to 0 - maxStars
  const clampedRating = Math.max(0, Math.min(rating, maxStars));

  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }[size];

  const textSizeClasses = {
    xs: 'text-[10px]',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${className}`}
      role="img"
      aria-label={`Rated ${clampedRating} out of ${maxStars} stars`}
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: maxStars }).map((_, index) => {
          const fillLevel = Math.max(0, Math.min(1, clampedRating - index));
          const isFull = fillLevel >= 0.85;
          const isHalf = fillLevel >= 0.35 && fillLevel < 0.85;

          if (isFull) {
            return (
              <Star
                key={index}
                className={`${sizeClasses} text-amber-400 fill-amber-400 shrink-0`}
              />
            );
          }

          if (isHalf) {
            // Half star via dual-layer SVG clip
            return (
              <div key={index} className={`relative ${sizeClasses} shrink-0`}>
                {/* Muted background star */}
                <Star className={`absolute inset-0 ${sizeClasses} text-muted-foreground/30 fill-muted/20`} />
                {/* 50% clipped golden star */}
                <div className="absolute inset-0 overflow-hidden w-[50%]">
                  <Star className={`${sizeClasses} text-amber-400 fill-amber-400`} />
                </div>
              </div>
            );
          }

          // Unfilled star
          return (
            <Star
              key={index}
              className={`${sizeClasses} text-muted-foreground/30 fill-muted/20 shrink-0`}
            />
          );
        })}
      </div>

      {showNumeric && (
        <span className={`font-extrabold text-foreground ${textSizeClasses}`}>
          {clampedRating.toFixed(1)}
        </span>
      )}

      {reviewsCount !== undefined && (
        <span className={`text-muted-foreground font-medium ${textSizeClasses}`}>
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
