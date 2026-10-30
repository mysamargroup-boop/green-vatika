import React, { useRef } from 'react';
import { Plant } from '../types/nursery';
import { LazyImage } from './LazyImage';
import { StarRating } from './StarRating';
import { ChevronLeft, ChevronRight, ShoppingCart, Zap, Heart, Eye, Flame, Leaf } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CuratedCollectionSliderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
  onBuyNowDirect: (plant: Plant) => void;
}

export const CuratedCollectionSlider: React.FC<CuratedCollectionSliderProps> = ({
  title,
  subtitle,
  badge = 'Handpicked Selection',
  plants,
  onSelectPlant,
  onAddToCart,
  onBuyNowDirect,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (plant: Plant, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(plant);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#0A4C36', '#16a34a', '#22c55e', '#fbbf24'],
    });
  };

  const handleBuyNow = (plant: Plant, e: React.MouseEvent) => {
    e.stopPropagation();
    onBuyNowDirect(plant);
  };

  if (!plants || plants.length === 0) return null;

  return (
    <section className="py-10 md:py-14 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header: Editorial Ugaao Luxury Serif Style - Strictly NO Capsule Pill Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-1.5">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Desktop Left/Right Carousel Controls */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="h-10 w-10 rounded-full border border-border/80 bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-all shadow-xs hover:scale-105"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="h-10 w-10 rounded-full border border-border/80 bg-card hover:bg-secondary flex items-center justify-center text-foreground transition-all shadow-xs hover:scale-105"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Slider - Scrollbar Completely Hidden on Mobile & Desktop */}
        <div
          ref={sliderRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth"
        >
          {plants.map((plant) => (
            <div
              key={plant.id}
              onClick={() => onSelectPlant(plant)}
              className="w-[240px] sm:w-[280px] md:w-[300px] shrink-0 snap-start group relative rounded-[18px] bg-card border border-border/70 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Product Image (3:4 aspect ratio with soft background) */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F7F7F7] dark:bg-secondary/40 flex items-center justify-center">
                <LazyImage
                  src={plant.image}
                  alt={plant.name}
                  aspectRatio="aspect-[3/4]"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges Overlay Top-Left */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                  {plant.badge && (
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md ${
                        plant.badge === 'Bestseller'
                          ? 'bg-[#0A4C36]'
                          : plant.badge === 'Sale'
                          ? 'bg-[#93113A]'
                          : 'bg-primary'
                      }`}
                    >
                      {plant.badge}
                    </span>
                  )}
                  {plant.discount && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#93113A] text-white shadow-md flex items-center gap-0.5">
                      <Flame className="h-2.5 w-2.5 fill-amber-300 text-amber-200" />
                      {plant.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Quick View Hover Pill */}
                <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hidden sm:block">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlant(plant);
                    }}
                    className="w-full py-2 rounded-full bg-white/95 text-foreground text-xs font-bold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-lg backdrop-blur-xs"
                  >
                    <Eye className="h-3.5 w-3.5" /> Quick View
                  </button>
                </div>
              </div>

              {/* Product Details Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  {/* Category & Star Rating */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span className="font-bold text-primary truncate uppercase tracking-wider text-[10px]">
                      {plant.category}
                    </span>
                    <StarRating rating={plant.rating} size="xs" showNumeric={true} reviewsCount={plant.reviewsCount} />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {plant.name}
                  </h3>

                  {/* Botanical Subtitle */}
                  <p className="text-xs text-muted-foreground italic line-clamp-1 mt-0.5">
                    {plant.botanicalName}
                  </p>
                </div>

                {/* Price & Action Button */}
                <div className="pt-2 border-t border-border/40 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-black text-foreground">₹{plant.price}</span>
                      {plant.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through font-bold">
                          ₹{plant.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      In Stock
                    </span>
                  </div>

                  {/* Ugaao-Style Dual CTA */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleBuyNow(plant, e)}
                      className="flex-1 py-2 px-3 rounded-full bg-[#0A4C36] hover:bg-[#073626] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-[#0A4C36]/20 transition-all hover:scale-[1.02]"
                    >
                      <Zap className="h-3 w-3 fill-amber-300 text-amber-200" /> Buy Now
                    </button>
                    <button
                      onClick={(e) => handleAddToCart(plant, e)}
                      title="Add to cart"
                      className="p-2 rounded-full border border-primary/20 bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors shrink-0"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
