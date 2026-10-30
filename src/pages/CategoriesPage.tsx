import React, { useState } from 'react';
import { ArrowLeft, Leaf, Sun, Droplets, Trees, Sprout, Package, Flower2, ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { categoriesData, plantsData } from '../data/mockData';
import { LazyImage } from '../components/LazyImage';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface CategoriesPageProps {
  onBack: () => void;
  onSelectCategory: (cat: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onBack, onSelectCategory }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Botanical curation metadata for each category
  const categoryHighlights: Record<string, {
    startingPrice: number;
    sunlight: string;
    watering: string;
    idealFor: string;
    keyPlants: string[];
  }> = {
    flowering: {
      startingPrice: 45,
      sunlight: '6-8 Hours Sun',
      watering: 'Alternate Days',
      idealFor: 'Balconies & Courtyards',
      keyPlants: ['Desi Red Rose', 'Yellow Marigold', 'Dinnerplate Dahlia', 'Aparajita'],
    },
    outdoor: {
      startingPrice: 100,
      sunlight: 'Direct Sun (Up to 45°C)',
      watering: 'Low to Moderate',
      idealFor: 'Open Terraces & Gardens',
      keyPlants: ['Adenium Obesum', 'Bougainvillea', 'Sun-Hardened Shrubs'],
    },
    bonsai: {
      startingPrice: 100,
      sunlight: 'Full Sunlight',
      watering: 'Once a Week',
      idealFor: 'Sculptural Balcony Decor',
      keyPlants: ['Fat-Caudex Adenium', 'Desert Rose', 'Succulent Bonsai'],
    },
    pots: {
      startingPrice: 60,
      sunlight: 'All-Weather Ceramic & Clay',
      watering: 'Porous Aerated Drainage',
      idealFor: 'Root Cooling & Healthy Growth',
      keyPlants: ['Baked Terracotta Gamla', 'Kiln-Fired Artisan Pots', 'Saucer Trays'],
    },
    fragrant: {
      startingPrice: 50,
      sunlight: '4-6 Hours Sun',
      watering: 'Keep Lightly Moist',
      idealFor: 'Morning Pooja & Evening Balcony',
      keyPlants: ['Desi Gulab', 'Arabian Mogra', 'Star Chandni', 'Sweet Jasmine'],
    },
    climbers: {
      startingPrice: 50,
      sunlight: 'Full Direct Sun',
      watering: 'Moderate',
      idealFor: 'Balcony Railings & Pergolas',
      keyPlants: ['Blue Aparajita Pea', 'Krishna Kamal Passion', 'Bougainvillea Vine'],
    },
  };

  const filteredCategories = selectedFilter === 'all'
    ? categoriesData
    : categoriesData.filter((c) => c.id === selectedFilter);

  const getCleanFilterName = (name: string) => {
    return name
      .replace(' Plants', '')
      .replace(' & Planters', '')
      .replace(' & Vines', '');
  };

  return (
    <div className="pt-36 sm:pt-40 pb-24 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 space-y-12">
        {/* Navigation Bar - Clean, Elevated, Zero Header Overlap */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors bg-card px-4 py-2 rounded-full border border-border shadow-xs hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-primary/20">
              <Leaf className="h-3.5 w-3.5" /> Direct Nursery Collections
            </span>
          </div>
        </div>

        {/* Hero Section: Botanical Showcase with Clean Outfit Typography */}
        <div className="relative rounded-[28px] overflow-hidden p-8 sm:p-12 md:p-16 bg-[#0A4C36] text-white shadow-2xl">
          {/* Ambient Botanical Backdrop Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-300">
              Green Vatika Curated Flora
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Botanical Collections & Categories
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
              Every sapling is organically cultivated in our native nursery soil beds at Teen Puliya, Narsinghpur. Hardened to withstand up to 45°C sun with zero acclimatization shock.
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-4 pt-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/15 flex items-center gap-2.5">
                <span className="font-heading font-black text-xl text-emerald-300">6</span>
                <span className="text-xs text-white/90 font-medium">Distinct Collections</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/15 flex items-center gap-2.5">
                <span className="font-heading font-black text-xl text-amber-300">100%</span>
                <span className="text-xs text-white/90 font-medium">Native Sun-Hardy</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/15 flex items-center gap-2.5">
                <span className="font-heading font-black text-xl text-white">₹45+</span>
                <span className="text-xs text-white/90 font-medium">Nursery Grower Rates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'bg-card text-muted-foreground hover:bg-secondary border border-border/70'
            }`}
          >
            All Collections ({categoriesData.length})
          </button>
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === cat.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-secondary border border-border/70'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Luxury 3-Column Botanical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCategories.map((cat) => {
            const highlight = categoryHighlights[cat.id] || {
              startingPrice: 50,
              sunlight: 'Direct Sunlight',
              watering: 'Moderate',
              idealFor: 'Balconies & Gardens',
              keyPlants: ['Fresh Nursery Stock'],
            };
            const cleanFilter = getCleanFilterName(cat.name);

            return (
              <div
                key={cat.id}
                className="group rounded-[24px] bg-card border border-border/80 overflow-hidden shadow-xs hover:shadow-2xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Header with Photography & Badges */}
                <div className="relative aspect-[16/11] overflow-hidden bg-secondary/30">
                  <LazyImage
                    src={cat.image}
                    alt={cat.name}
                    aspectRatio="aspect-[16/11]"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Variety Count Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/95 text-[#0A4C36] shadow-md border border-white/40">
                      {cat.count}+ Varieties
                    </span>
                  </div>

                  {/* Starting Price Pill */}
                  <div className="absolute bottom-3.5 left-3.5 z-10">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30">
                      Starts @ ₹{highlight.startingPrice}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="font-heading font-extrabold text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>

                    {/* Care Specs Micro Strip */}
                    <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-secondary/50 text-muted-foreground font-medium">
                        <Sun className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{highlight.sunlight}</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-xl bg-secondary/50 text-muted-foreground font-medium">
                        <Droplets className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{highlight.watering}</span>
                      </div>
                    </div>

                    {/* Popular Plant Chips */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Popular in this category:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {highlight.keyPlants.map((plantName, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold bg-primary/5 hover:bg-primary/10 text-primary px-2.5 py-0.5 rounded-md border border-primary/15 transition-colors"
                          >
                            {plantName}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action CTA Button */}
                  <div className="pt-4 border-t border-border/50">
                    <button
                      onClick={() => onSelectCategory(cleanFilter)}
                      className="w-full py-3 px-4 rounded-full bg-[#0A4C36] hover:bg-[#073626] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-[#0A4C36]/20 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Explore {cleanFilter} Plants</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Concierge Assistance Banner */}
        <div className="rounded-[24px] bg-[#FAF7F2] dark:bg-card border border-[#EBE5DA] dark:border-border/60 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading font-extrabold text-xl text-foreground">
              Looking for a specific plant or bulk nursery order?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
              We source and propagate hundreds of authentic native Indian varieties. Chat directly with our head propagator for custom availability.
            </p>
          </div>

          <a
            href="https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20am%20looking%20for%20a%20specific%20plant%20variety!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition-all shrink-0 hover:scale-105"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
