import React from 'react';
import { Leaf, ChevronRight, Home, Trees, Flower2, Apple, Sun, Sprout, Package, Wrench } from 'lucide-react';
import { categoriesData } from '../data/mockData';
import { LazyImage } from './LazyImage';

interface CategorySectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Home': return Home;
      case 'Trees': return Trees;
      case 'Flower2': return Flower2;
      case 'Apple': return Apple;
      case 'Sun': return Sun;
      case 'Sprout': return Sprout;
      case 'Package': return Package;
      case 'Wrench': return Wrench;
      default: return Leaf;
    }
  };

  return (
    <section id="section-categories" className="py-12 md:py-16 bg-background border-b border-border/40 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header (Ugaoo Clean Luxury Editorial Style - Strictly NO Pill Badges) */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12 space-y-2">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Explore by Category
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-xl mx-auto px-4">
            Acclimatized Indian plants, artisan terracotta planters, and organic gardening essentials — nurtured at Green Vatika.
          </p>
        </div>

        {/* Categories Circular Showcase - Ugaoo Pattern: Scrollbar Completely Hidden on Mobile */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-2 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x">
          {categoriesData.map((cat) => {
            const IconComponent = getCategoryIcon(cat.iconName);
            const cleanCategoryFilter = cat.name
              .replace(' Plants', '')
              .replace(' & Planters', '')
              .replace(' & Vines', '');

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cleanCategoryFilter)}
                className="group flex flex-col items-center text-center shrink-0 w-28 sm:w-auto snap-start cursor-pointer transition-transform duration-300 focus:outline-none"
              >
                {/* Round Circular Avatar with Dual Border Ring */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1 bg-card border-2 border-border/80 group-hover:border-primary shadow-xs group-hover:shadow-xl group-hover:shadow-primary/15 transition-all duration-300 mb-3 mx-auto flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <LazyImage
                      src={cat.image}
                      alt={cat.name}
                      aspectRatio="aspect-square"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-full"
                    />
                    {/* Subtle Glass Tint on Hover */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 rounded-full" />
                  </div>

                  {/* Micro Lucide Floating Icon Badge */}
                  <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-[#0A4C36] text-white flex items-center justify-center shadow-md border-2 border-background group-hover:scale-110 transition-transform">
                    <IconComponent className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Category Title - Responsive Text Wrapping */}
                <h3 className="font-sans font-bold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors leading-snug px-1 break-words">
                  {cat.name}
                </h3>

                {/* Subtitle / Variety Count */}
                <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold mt-0.5">
                  {cat.count}+ Varieties
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
