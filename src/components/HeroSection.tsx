import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, MapPin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroSectionProps {
  onShopClick?: () => void;
  onVisitClick?: () => void;
}

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  ctaText: string;
  ctaSecondaryText: string;
  image: string;
  targetCategory?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick, onVisitClick }) => {
  const slides: HeroSlide[] = [
    {
      id: 1,
      tagline: 'Authentic Indian Flora',
      title: 'Bringing Nature Into Your Space',
      subtitle:
        'Discover healthy indoor plants, fragrant desi roses, sculptural adenium bonsai, and artisanal terracotta planters — freshly nurtured at Green Vatika.',
      ctaText: 'Shop Live Plants',
      ctaSecondaryText: 'Visit Nursery (Teen Puliya)',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_1_1672x941.webp',
    },
    {
      id: 2,
      tagline: 'Zero Transplant Shock',
      title: 'From Our Nursery Beds to Your Home',
      subtitle:
        'Naturally acclimatized to Central Indian heat (up to 45°C). 100% organic compost-grown saplings with thriving roots, ready for direct pickup.',
      ctaText: 'Explore Flowering & Roses',
      ctaSecondaryText: 'Direct Nursery Pickup',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_2_1254x1254.webp',
    },
    {
      id: 3,
      tagline: 'Sun-Hardy Succulents',
      title: 'Sculptural Adenium Bonsai & Planters',
      subtitle:
        'Thick fat-trunk desert roses that flourish under full sun with minimal watering. Save ₹60 with our pot-optional nursery grower rates.',
      ctaText: 'View Bonsai Collection',
      ctaSecondaryText: 'Chat on WhatsApp',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_5_1254x1254.webp',
    },
    {
      id: 4,
      tagline: 'Handcrafted Clay Pottery',
      title: 'Artisanal Terracotta Planters & Soil',
      subtitle:
        'Porous earthen gamlas crafted by local potters to cool roots by 8°C in May heat, paired with nutrient-dense vermicompost soil mixes.',
      ctaText: 'Shop Planters & Soil',
      ctaSecondaryText: 'Consult Plant Doctor',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_4_1254x1254.webp',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  };

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-[500px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[680px] flex items-center overflow-hidden bg-[#0A4C36]"
    >
      {/* Background Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Edge-to-Edge Image with Smooth Zoom (Ken Burns Cinematic Pan/Scale) */}
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover object-center transform transition-transform duration-[8000ms] ease-out ${
              idx === currentSlide ? 'scale-108' : 'scale-100'
            }`}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />

          {/* Ugaao-Style Rich Gradient Scrim: Crisp White Text Visibility Guarantee */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 md:from-black/80 md:via-black/50 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
      ))}

      {/* Main Slide Content Container */}
      <div className="container mx-auto px-4 md:px-8 relative z-20 pt-20 pb-20 sm:py-24">
        <div className="max-w-2xl space-y-4 sm:space-y-6 text-white">
          {/* Subtle Clean Kicker (NO Capsule Pill) */}
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-300/90">
            {slides[currentSlide].tagline}
          </div>

          {/* Main Headline: Editorial Serif Typography with Clean Text Wrapping */}
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-md break-words">
            {slides[currentSlide].title}
          </h1>

          {/* Subtitle with Clean Responsive Wrapping */}
          <p className="text-sm sm:text-base md:text-lg text-emerald-50/90 font-medium leading-relaxed max-w-xl break-words">
            {slides[currentSlide].subtitle}
          </p>

          {/* Action CTAs: Rich Botanical Green Button + Secondary Ghost Button */}
          <div className="flex flex-wrap items-center gap-3 pt-2 sm:pt-4">
            <button
              onClick={() => {
                if (onShopClick) onShopClick();
              }}
              className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-[#0A4C36] hover:bg-[#073626] text-white text-sm sm:text-base font-bold shadow-xl shadow-black/30 hover:scale-105 transition-all cursor-pointer border border-emerald-400/30"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{slides[currentSlide].ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                if (currentSlide === 2) {
                  window.open(
                    'https://wa.me/919479480068?text=Hello%20Green%20Vatika%2C%20I%20am%20interested%20in%20your%20Bonsai%20collection!',
                    '_blank'
                  );
                } else if (currentSlide === 3) {
                  window.open(
                    'https://wa.me/919479480068?text=Hello%20Green%20Vatika%20Plant%20Doctor%2C%20I%20need%20advice%20for%20my%20garden!',
                    '_blank'
                  );
                } else if (onVisitClick) {
                  onVisitClick();
                }
              }}
              className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-5 sm:px-7 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm sm:text-base font-semibold backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              {currentSlide === 2 || currentSlide === 3 ? (
                <WhatsAppIcon className="h-4 w-4 text-emerald-300" />
              ) : (
                <MapPin className="h-4 w-4 text-emerald-300" />
              )}
              <span>{slides[currentSlide].ctaSecondaryText}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Left/Right Navigation Arrows */}
      <div className="hidden sm:flex absolute inset-y-0 inset-x-4 z-20 items-center justify-between pointer-events-none">
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="pointer-events-auto h-11 w-11 rounded-full bg-black/40 hover:bg-[#0A4C36] text-white/90 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg cursor-pointer"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="pointer-events-auto h-11 w-11 rounded-full bg-black/40 hover:bg-[#0A4C36] text-white/90 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg cursor-pointer"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Slide Navigation Dots (Ugaao Style) */}
      <div className="absolute bottom-6 inset-x-0 z-20 flex items-center justify-center gap-2 pointer-events-auto">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide
                ? 'w-8 h-2 bg-emerald-400'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
