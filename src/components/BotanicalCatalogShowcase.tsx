import React, { useState, useEffect } from 'react';
import { Plant } from '../types/nursery';
import { plantsData } from '../data/mockData';
import { StarRating } from './StarRating';
import { Sun, Droplets, ShieldCheck, Sparkles, ChevronRight, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface BotanicalCatalogShowcaseProps {
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
}

export const BotanicalCatalogShowcase: React.FC<BotanicalCatalogShowcaseProps> = ({
  onSelectPlant,
  onAddToCart,
}) => {
  // Select top showcase plants (exclude any hidden ones)
  const showcasePlants = plantsData.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance showcase every 5 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused || showcasePlants.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcasePlants.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, showcasePlants.length]);

  const activePlant = showcasePlants[activeIndex] || showcasePlants[0];

  if (!activePlant) return null;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#062419] via-[#0b3827] to-[#041a12] text-white shadow-2xl border border-emerald-500/30 group"
    >
      {/* Background Animated Gradient Orbs & Remotion Light Sweep */}
      <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse duration-1000" />
      <div className="absolute -bottom-20 -left-20 w-[380px] h-[380px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-black/40 pointer-events-none" />

      {/* Main Showcase Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 md:p-12">
        {/* Left Column: Editorial & Plant Focus (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-300 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md inline-flex items-center gap-1.5 border border-emerald-400/20 shadow-inner">
              <Sparkles className="h-3 w-3 text-emerald-300 animate-spin" />
              Greenhouse Spotlight
            </span>
            <span className="text-[11px] font-bold text-emerald-200 bg-emerald-950/70 px-3 py-1.5 rounded-full border border-emerald-500/20">
              Live Polyhouse Specimen #{activeIndex + 1} of {showcasePlants.length}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {activePlant.name}
            </h1>
            <p className="font-serif italic text-emerald-300/80 text-sm sm:text-base">
              {activePlant.botanicalName}
            </p>
          </div>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-xl line-clamp-3">
            {activePlant.description}
          </p>

          {/* Plant Care Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-black/25 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Sun className="h-3.5 w-3.5" /> Sunlight
              </div>
              <div className="text-xs text-white/90 font-medium truncate">
                {activePlant.light}
              </div>
            </div>

            <div className="bg-black/25 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Droplets className="h-3.5 w-3.5" /> Water Need
              </div>
              <div className="text-xs text-white/90 font-medium truncate">
                {activePlant.water}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-black/25 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" /> Acclimatized
              </div>
              <div className="text-xs text-white/90 font-medium truncate">
                100% Sun-Hardened
              </div>
            </div>
          </div>

          {/* Pricing & Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-black text-white">
                Rs {activePlant.price}
              </span>
              {activePlant.originalPrice && (
                <span className="text-base text-emerald-300/60 line-through font-semibold">
                  Rs {activePlant.originalPrice}
                </span>
              )}
              {activePlant.discount && (
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white uppercase tracking-wider">
                  {activePlant.discount}% OFF
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onSelectPlant(activePlant)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-emerald-100 text-emerald-950 font-black text-xs sm:text-sm transition-all transform hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
              >
                <span>Inspect Specimen</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onAddToCart(activePlant)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-700/60 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm border border-emerald-400/30 transition-all cursor-pointer"
              >
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: High-Impact Visual Stage (5 Cols) */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Orbital Biological Ring */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-dashed border-emerald-400/30 animate-[spin_24s_linear_infinite]" />
            <div className="absolute -inset-4 rounded-full border border-emerald-500/20 animate-[spin-reverse_32s_linear_infinite]" />

            {/* Showcase Image with Glowing Drop Shadow */}
            <div
              onClick={() => onSelectPlant(activePlant)}
              className="relative z-10 w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-400/40 bg-black/40 cursor-pointer transform group-hover:scale-103 transition-transform duration-500"
            >
              <img
                src={activePlant.image}
                alt={activePlant.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs font-bold text-white">
                <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {activePlant.category}
                </span>
                <span className="bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-extrabold">
                  Direct Polyhouse
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Progress Tabs Bar */}
      <div className="border-t border-emerald-800/50 bg-black/30 backdrop-blur-md px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
          {showcasePlants.map((plant, idx) => (
            <button
              key={plant.id}
              onClick={() => setActiveIndex(idx)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeIndex === idx
                  ? 'bg-emerald-500 text-white shadow-md scale-105'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {plant.name.split(' ')[0]} ({plant.price ? `Rs ${plant.price}` : ''})
            </button>
          ))}
        </div>

        <div className="text-[11px] text-emerald-300/80 font-medium flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span>Root-ball protected saplings shipped in grower nursery polybags</span>
        </div>
      </div>
    </div>
  );
};
