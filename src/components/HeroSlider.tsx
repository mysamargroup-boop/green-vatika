import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Flame, Tag } from 'lucide-react';

import { WhatsAppIcon } from './WhatsAppIcon';

interface Slide {
  id: number;
  badge: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle: string;
  discountText?: string;
  ctaText: string;
  ctaLink: string;
  bgGradient: string;
  accentColor: string;
  image: string;
}

export const HeroSlider: React.FC = () => {
  const slides: Slide[] = [
    {
      id: 1,
      badge: 'MONSOON SEASON SALE',
      badgeIcon: <Flame className="h-3.5 w-3.5 fill-amber-300 text-amber-200" />,
      title: 'Vibrant Monsoon Plant Fest — Up to 40% OFF',
      subtitle: 'Nurture your balcony with fresh, rain-loving flowering plants & lush indoor greenery.',
      discountText: 'FLAT 40% OFF',
      ctaText: 'Explore Special Sale',
      ctaLink: '#featured',
      bgGradient: 'from-emerald-900 via-teal-900 to-slate-900',
      accentColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      badge: 'NASA AIR PURIFIERS',
      badgeIcon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />,
      title: 'Breathe Pure Air at Home with NASA Certified Plants',
      subtitle: 'Eliminate indoor toxins with Snake Plant, Peace Lily, Areca Palm & Rubber Plants.',
      discountText: 'BUY 2 GET 1 FREE',
      ctaText: 'Shop Air Purifiers',
      ctaLink: '#categories',
      bgGradient: 'from-green-900 via-emerald-950 to-slate-950',
      accentColor: 'text-green-300',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      badge: 'NURSERY EXCLUSIVE',
      badgeIcon: <Sparkles className="h-3.5 w-3.5 text-amber-300" />,
      title: 'Exotic Bonsai & Organic Fruit Trees Collection',
      subtitle: 'Grown with 100% organic compost at Green Vatika 15-acre organic greenhouses.',
      discountText: 'STARTS @ ₹199',
      ctaText: 'View Nursery Collection',
      ctaLink: '#featured',
      bgGradient: 'from-teal-950 via-emerald-900 to-emerald-950',
      accentColor: 'text-amber-300',
      image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      badge: 'EXPERT CONSULTATION',
      badgeIcon: <Tag className="h-3.5 w-3.5 text-sky-300" />,
      title: 'Free WhatsApp Consultation with Senior Horticulturist',
      subtitle: 'Get tailored advice on plant light requirements, soil mix, watering & pest protection.',
      discountText: '100% FREE DOCTOR CARE',
      ctaText: 'Chat on WhatsApp',
      ctaLink: 'https://wa.me/919479480068?text=Hi%20Green%20Vatika,%20I%20need%20plant%20care%20guidance',
      bgGradient: 'from-slate-900 via-emerald-950 to-teal-900',
      accentColor: 'text-sky-300',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Auto-play timer (4 seconds per slide)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      handlePrev();
    }
  };

  return (
    <section className="py-8 md:py-12 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Slider Card Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary/20 bg-card group"
        >
          {/* Slides Carousel Wrapper */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="w-full shrink-0 relative min-h-[360px] sm:min-h-[420px] md:min-h-[440px] flex items-center"
              >
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-90 sm:opacity-85 mix-blend-multiply`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-3xl text-white space-y-4">
                  {/* Badge & Discount Tag */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md">
                      {slide.badgeIcon}
                      {slide.badge}
                    </span>

                    {slide.discountText && (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg border border-amber-300/40">
                        {slide.discountText}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="font-heading font-extrabold text-2xl sm:text-4xl md:text-5xl leading-tight tracking-tight drop-shadow-md">
                    {slide.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium max-w-xl leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {/* CTA Button */}
                  <div className="pt-2">
                    {slide.ctaLink.startsWith('http') ? (
                      <a
                        href={slide.ctaLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/30 transition-all hover:scale-105"
                      >
                        <WhatsAppIcon className="h-5 w-5 text-white" /> {slide.ctaText} <ArrowRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <a
                        href={slide.ctaLink}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-primary/30 transition-all hover:scale-105"
                      >
                        <Sparkles className="h-4 w-4 text-amber-300" /> {slide.ctaText} <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Top-Right Arrow Navigation Controls */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 p-1 rounded-full shadow-xl">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-[11px] font-extrabold text-white px-1">
              {currentIndex + 1} / {slides.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Bottom Pagination Dots */}
          <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-7 bg-primary shadow-lg shadow-primary/50'
                    : 'w-2 bg-white/40 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
