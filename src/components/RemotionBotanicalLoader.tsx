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
  subtext = 'Nurturing Authentic Indian Flora',
  className = '',
}) => {
  // Remotion-grade mathematical orbital dimensions
  const isFull = size === 'fullscreen';

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-5 select-none ${className}`}>
      {/* Remotion Concentric Orbital Motion Rig */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Radial Backlight Glow */}
        <div className="absolute inset-0 -m-6 rounded-full bg-emerald-500/15 blur-2xl animate-pulse" />

        {/* Master SVG Orbital Canvas */}
        <svg
          className="w-28 h-28 sm:w-32 sm:h-32 transform transition-transform"
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="remotionEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <linearGradient id="remotionWarmTerracotta" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            <filter id="remotionGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Dashed Orbital Ring (Clockwise Rotation - 8s) */}
          <circle
            cx="70"
            cy="70"
            r="60"
            stroke="currentColor"
            className="text-primary/20"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />

          <g className="animate-[spin_8s_linear_infinite] origin-[70px_70px]">
            {/* Outer Satellite Orbiter Node */}
            <circle
              cx="70"
              cy="10"
              r="4"
              fill="#10B981"
              filter="url(#remotionGlow)"
            />
            <circle
              cx="70"
              cy="10"
              r="2"
              fill="#FFFFFF"
            />
          </g>

          {/* Middle Counter-Rotating Progress Arc (Counter-Clockwise - 4s) */}
          <g className="animate-[spin_4s_linear_infinite_reverse] origin-[70px_70px]">
            <circle
              cx="70"
              cy="70"
              r="48"
              stroke="url(#remotionEmeraldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="90 180"
              filter="url(#remotionGlow)"
            />
          </g>

          {/* Inner Accent Ring (Clockwise - 3s) */}
          <g className="animate-[spin_3s_linear_infinite] origin-[70px_70px]">
            <circle
              cx="70"
              cy="70"
              r="36"
              stroke="url(#remotionWarmTerracotta)"
              strokeWidth="2"
              strokeDasharray="40 90"
              strokeLinecap="round"
            />
          </g>

          {/* Static Soft Track Circle */}
          <circle
            cx="70"
            cy="70"
            r="26"
            stroke="currentColor"
            className="text-primary/10"
            strokeWidth="1"
          />
        </svg>

        {/* Center Organic Botanical Sprout with Remotion Spring Breathing Motion */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-12 w-12 rounded-full bg-background/90 shadow-inner flex items-center justify-center border border-primary/25 backdrop-blur-sm animate-[bounce_2s_ease-in-out_infinite]">
            <svg
              className="w-6 h-6 text-primary filter drop-shadow-sm transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Organic Sprouting Leaves Path */}
              <path d="M12 22v-9" />
              <path d="M12 13c-3-2-6-1-7 2 3 2 6 1 7-2z" fill="#10B981" fillOpacity="0.35" />
              <path d="M12 9c3-3 6-2 7 1-3 2-6 1-7-1z" fill="#059669" fillOpacity="0.35" />
              <path d="M12 9V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Typography & Broadcast Shimmer */}
      <div className="text-center space-y-2">
        <div className="font-heading font-black text-lg sm:text-xl tracking-[0.22em] uppercase text-foreground drop-shadow-sm">
          {label}
        </div>
        <p className="text-xs sm:text-sm font-semibold text-muted-foreground tracking-wider uppercase flex items-center justify-center gap-1.5">
          <span>{subtext}</span>
          <span className="inline-flex space-x-1">
            <span className="h-1 w-1 rounded-full bg-primary animate-ping" />
          </span>
        </p>

        {/* Bottom Remotion Progress Gauge Sweep */}
        <div className="w-32 h-1 bg-border/60 rounded-full mx-auto overflow-hidden relative mt-2">
          <div className="h-full w-1/2 bg-gradient-to-r from-primary via-emerald-400 to-amber-500 rounded-full animate-[remotionSweep_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );

  if (isFull) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
        {content}
      </div>
    );
  }

  return content;
};
