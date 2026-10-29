import React, { useState } from 'react';
import { ArrowLeft, Leaf, Sun, Droplets, Sparkles, Flower2, Trees, Sprout, Package, ChevronRight, HelpCircle, CheckCircle2 } from 'lucide-react';
import { categoriesData, plantsData } from '../data/mockData';
import { LazyImage } from '../components/LazyImage';

interface CategoriesPageProps {
  onBack: () => void;
  onSelectCategory: (cat: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onBack, onSelectCategory }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Detailed botanical metadata for distinct category showcase
  const categoryDetails: Record<string, {
    sunlight: string;
    watering: string;
    idealSeason: string;
    difficulty: string;
    varieties: string[];
    tagline: string;
  }> = {
    flowering: {
      sunlight: '6-8 Hours Direct Sunlight',
      watering: 'Moderate (Alternate days)',
      idealSeason: 'Year-Round (Peak Spring & Summer)',
      difficulty: 'Beginner to Intermediate',
      varieties: ['Desi Red Gulab', 'Yellow Marigold', 'Adenium Bonsai', 'Dahlia Hybrid', 'Aparajita'],
      tagline: 'Vibrant, high-nectar blooms that attract Indian pollinators and thrive in high heat.'
    },
    outdoor: {
      sunlight: 'Direct Full Sunlight (45°C+ Tolerant)',
      watering: 'Low to Moderate',
      idealSeason: 'All 12 Months',
      difficulty: 'Easy / Low Maintenance',
      varieties: ['Bougainvillea Spectabilis', 'Adenium Obesum', 'Yellow Kaner', 'Tecoma Stans'],
      tagline: 'Hardy sun-loving specimens cultivated to resist harsh central Indian loo and dry winds.'
    },
    bonsai: {
      sunlight: 'Bright Direct Sunlight',
      watering: 'Low (Once or twice a week)',
      idealSeason: 'Summer & Monsoon',
      difficulty: 'Intermediate',
      varieties: ['Adenium Caudex Bonsai', 'Ficus Microcarpa', 'Jade Plant Specimen'],
      tagline: 'Sculptural caudexes and aged root systems trained over years by Green Vatika artisans.'
    },
    pots: {
      sunlight: 'Weather Resistant',
      watering: 'Porous Clay Drainage',
      idealSeason: 'All Seasons',
      difficulty: 'Standard Garden Ware',
      varieties: ['8-Inch Terracotta Gamla', '10-Inch Deep Clay Pot', 'Handmade Saucer Trays'],
      tagline: 'Hand-thrown, kiln-fired natural clay pots that naturally cool plant roots in hot weather.'
    },
    fragrant: {
      sunlight: '4-6 Hours Sunlight',
      watering: 'Keep Soil Lightly Moist',
      idealSeason: 'Summer & Monsoon Nights',
      difficulty: 'Easy',
      varieties: ['Desi Damask Rose', 'Bela Mogra', 'Star Chandni', 'Raat Ki Rani'],
      tagline: 'Sweet, intoxicating traditional Indian fragrances perfect for pooja and balcony evenings.'
    },
    climbers: {
      sunlight: '6+ Hours Direct Sunlight',
      watering: 'Regular During Active Growth',
      idealSeason: 'Monsoon through Spring',
      difficulty: 'Fast Growing & Vigorous',
      varieties: ['Blue Aparajita (Butterfly Pea)', 'Krishna Kamal (Passionflower)', 'Bougainvillea Climber'],
      tagline: 'Vigorous vines ideal for boundary walls, balcony railings, trellises, and living pergolas.'
    }
  };

  const filteredCategories = selectedFilter === 'all'
    ? categoriesData
    : categoriesData.filter((c) => c.id === selectedFilter);

  return (
    <div className="pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 space-y-12">
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors bg-card px-4 py-2 rounded-full border border-border shadow-xs hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-primary/20">
              <Leaf className="h-3.5 w-3.5" /> Direct Nursery Collections
            </span>
          </div>
        </div>

        {/* Distinct Hero Header */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white shadow-2xl border border-emerald-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md inline-block border border-white/15">
              Flora Encyclopedia & Collections
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Explore Our Botanical Categories
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Every plant at Green Vatika is naturally acclimatized under open central Indian weather. Discover specialized collections curated for high blooms, summer endurance, and root aeration.
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/15 flex items-center gap-2.5">
                <span className="font-heading font-extrabold text-xl text-emerald-300">6+</span>
                <span className="text-xs text-white/80 font-medium">Distinct Collections</span>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/15 flex items-center gap-2.5">
                <span className="font-heading font-extrabold text-xl text-amber-300">100%</span>
                <span className="text-xs text-white/80 font-medium">Acclimatized Species</span>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/15 flex items-center gap-2.5">
                <span className="font-heading font-extrabold text-xl text-teal-300">₹45+</span>
                <span className="text-xs text-white/80 font-medium">Direct Nursery Rates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-card text-muted-foreground hover:bg-secondary border border-border'
            }`}
          >
            All Collections ({categoriesData.length})
          </button>
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedFilter === cat.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-secondary border border-border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Distinct Horizontal Showcase Cards (Completely Different from Home Page 3-column square grid) */}
        <div className="space-y-8">
          {filteredCategories.map((cat, index) => {
            const meta = categoryDetails[cat.id] || {
              sunlight: 'Direct or Filtered Light',
              watering: 'Moderate',
              idealSeason: 'All Year',
              difficulty: 'Beginner',
              varieties: ['Healthy Nursery Stock'],
              tagline: cat.description,
            };

            const isEven = index % 2 === 0;

            return (
              <div
                key={cat.id}
                className="group bg-card rounded-3xl border border-border/80 overflow-hidden shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Image Section (5 cols) */}
                <div className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] overflow-hidden ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <LazyImage
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30">
                      {cat.count}+ Live Varieties
                    </span>
                  </div>
                </div>

                {/* Content Section (7 cols) */}
                <div className={`lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                        Collection Spotlight
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
                      {cat.name}
                    </h2>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {meta.tagline}
                    </p>

                    {/* Care Specs Micro-Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                      <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
                        <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold mb-1">
                          <Sun className="h-3.5 w-3.5 shrink-0" /> Sunlight
                        </div>
                        <div className="text-xs font-semibold text-foreground leading-tight">
                          {meta.sunlight}
                        </div>
                      </div>

                      <div className="bg-secondary/40 rounded-xl p-3 border border-border/50">
                        <div className="flex items-center gap-1.5 text-blue-500 text-xs font-bold mb-1">
                          <Droplets className="h-3.5 w-3.5 shrink-0" /> Watering
                        </div>
                        <div className="text-xs font-semibold text-foreground leading-tight">
                          {meta.watering}
                        </div>
                      </div>

                      <div className="col-span-2 sm:col-span-1 bg-secondary/40 rounded-xl p-3 border border-border/50">
                        <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-bold mb-1">
                          <Sparkles className="h-3.5 w-3.5 shrink-0" /> Best Season
                        </div>
                        <div className="text-xs font-semibold text-foreground leading-tight">
                          {meta.idealSeason}
                        </div>
                      </div>
                    </div>

                    {/* Popular Varieties Tags */}
                    <div className="pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        Popular Varieties in Nursery:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {meta.varieties.map((v, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium bg-background px-3 py-1 rounded-lg border border-border text-foreground"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => onSelectCategory(cat.name.replace(' Plants', '').replace(' & Planters', '').replace(' & Vines', ''))}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:scale-102 text-xs sm:text-sm cursor-pointer"
                    >
                      <span>Explore {cat.name} in Shop</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <span className="text-xs text-muted-foreground font-medium">
                      Healthy root-ball packaging guaranteed
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botanical Care Matrix (Dedicated Educational Table) */}
        <div className="bg-card rounded-3xl border border-border/80 p-6 sm:p-10 shadow-lg space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Horticultural Guide
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Category Care Reference Matrix
            </h3>
            <p className="text-sm text-muted-foreground">
              Quick guidelines developed by Green Vatika horticulturists for optimal growth in Indian climate zones.
            </p>
          </div>

          <div className="overflow-x-auto [scrollbar-width:thin]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/50 text-foreground font-bold">
                  <th className="p-3 sm:p-4 rounded-l-xl">Collection</th>
                  <th className="p-3 sm:p-4">Direct Sunlight</th>
                  <th className="p-3 sm:p-4">Watering Schedule</th>
                  <th className="p-3 sm:p-4">Recommended Soil Mix</th>
                  <th className="p-3 sm:p-4 rounded-r-xl">Recommended Pot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Flowering Plants</td>
                  <td className="p-3 sm:p-4">6 - 8 Hours</td>
                  <td className="p-3 sm:p-4">Alternate Days (Early morning)</td>
                  <td className="p-3 sm:p-4">50% Soil + 30% Vermicompost + 20% Sand</td>
                  <td className="p-3 sm:p-4">10-12" Terracotta Gamla</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Outdoor Shrubs</td>
                  <td className="p-3 sm:p-4">Full Sunlight</td>
                  <td className="p-3 sm:p-4">When top 2 inches feel dry</td>
                  <td className="p-3 sm:p-4">Garden loam + aged cow dung manure</td>
                  <td className="p-3 sm:p-4">12-14" Breathable Clay Pot</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Bonsai & Caudex</td>
                  <td className="p-3 sm:p-4">Bright Direct Sun</td>
                  <td className="p-3 sm:p-4">Once every 4-5 days (Strictly avoid overwatering)</td>
                  <td className="p-3 sm:p-4">Coarse sand + volcanic cinder + compost</td>
                  <td className="p-3 sm:p-4">Shallow ceramic or terracotta bonsai tray</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Fragrant Night Bloomers</td>
                  <td className="p-3 sm:p-4">4 - 6 Hours Morning Sun</td>
                  <td className="p-3 sm:p-4">Keep consistently moist (not soggy)</td>
                  <td className="p-3 sm:p-4">Leaf mould + rich organic compost</td>
                  <td className="p-3 sm:p-4">10" Terracotta Gamla</td>
                </tr>
                <tr className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 sm:p-4 font-bold text-foreground">Climbers & Vines</td>
                  <td className="p-3 sm:p-4">6+ Hours Direct Sun</td>
                  <td className="p-3 sm:p-4">Regular watering during flowering</td>
                  <td className="p-3 sm:p-4">Nitrogen-rich organic garden mix</td>
                  <td className="p-3 sm:p-4">14"+ Deep Planter with Trellis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* WhatsApp Help Banner */}
        <div className="rounded-3xl bg-emerald-950 p-6 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-800">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Looking for a Specific Rare Plant Variety?
            </h4>
            <p className="text-xs sm:text-sm text-emerald-200">
              We cultivate custom graft varieties and specimen plants on pre-order at our Narsinghpur greenhouse.
            </p>
          </div>
          <a
            href="https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20am%20looking%20for%20a%20specific%20plant%20variety%20not%20listed%20online."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-md transition-all hover:scale-105"
          >
            Ask Head Horticulturist on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
