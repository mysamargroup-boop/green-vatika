import React from 'react';

interface RemotionBotanicalLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  label?: string;
  subtext?: string;
  className?: string;
}

export const RemotionBotanicalLoader: React.FC<RemotionBotanicalLoaderProps> = ({
  size = 'fullscreen',
  label = 'Green Vatika',
  subtext = 'Nurturing Authentic Flora',
  className = '',
}) => {
  const isFull = size === 'fullscreen';

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-6 select-none ${className}`}>
      {/* Botanical Emblem Spinner with Centered Logo */}
      <div className="relative flex items-center justify-center">
        {/* Soft Ambient Radial Backlight Glow */}
        <div className="absolute inset-0 -m-8 rounded-full bg-emerald-600/15 dark:bg-emerald-500/20 blur-2xl animate-pulse pointer-events-none" />

        {/* Concentric Rotating Precision Rings */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Static Soft Outer Guide Track */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-950/10 dark:border-emerald-100/10" />

          {/* Clockwise Emerald Spinner Arc */}
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#0A4C36] border-r-[#0A4C36] dark:border-t-emerald-400 dark:border-r-emerald-400 animate-spin" />

          {/* Counter-Clockwise Inner Accent Ring */}
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-amber-600 border-l-amber-600/60 dark:border-b-amber-400 dark:border-l-amber-400/60 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '2.5s' }}
          />

          {/* Inner Rounded Circle Badge Housing Official Green Vatika Logo */}
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-[#073626] shadow-xl border-2 border-[#0A4C36]/20 flex items-center justify-center p-2.5 transition-transform duration-300 hover:scale-105">
            <img
              src="/logo.png"
              alt="Green Vatika Logo"
              className="w-full h-full object-contain select-none pointer-events-none animate-pulse"
              style={{ animationDuration: '2.4s' }}
            />
          </div>
        </div>
      </div>

      {/* Luxury Botanical Typography */}
      <div className="text-center space-y-2">
        <div className="font-heading font-black text-xl sm:text-2xl tracking-[0.22em] uppercase text-[#0A4C36] dark:text-emerald-300 drop-shadow-xs">
          {label}
        </div>
        <p className="text-xs sm:text-sm font-semibold text-muted-foreground tracking-wider uppercase flex items-center justify-center gap-2">
          <span>{subtext}</span>
          <span className="inline-flex items-center space-x-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A4C36] dark:bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A4C36] dark:bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A4C36] dark:bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </p>
      </div>
    </div>
  );

  if (isFull) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5]/95 dark:bg-[#08140c]/95 backdrop-blur-md transition-opacity duration-300"
        role="status"
        aria-live="polite"
      >
        {content}
      </div>
    );
  }

  return content;
};
