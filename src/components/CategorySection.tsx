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
    <section id="categories" className="py-10 md:py-14 bg-background border-b border-border/40 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-primary">
            <Leaf className="h-3.5 w-3.5" /> Explore Collections
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Browse by Category
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-medium">
            Everything you need to build a lush, thriving green space — curated with care by Green Vatika.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categoriesData.map((cat) => {
            const IconComponent = getCategoryIcon(cat.iconName);
            return (
              <a
                key={cat.id}
                href="#featured"
                onClick={() => onSelectCategory(cat.name.replace(' Plants', '').replace(' & Planters', ''))}
                className="group relative overflow-hidden rounded-3xl bg-card border border-border/60 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 block"
              >
                {/* Aspect Square Image Container with Lazy Loading */}
                <div className="aspect-square overflow-hidden relative">
                  <LazyImage
                    src={cat.image}
                    alt={cat.name}
                    aspectRatio="aspect-square"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                </div>

                {/* Top Corner Variety Badge */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1.5 z-10">
                  <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 shadow-md border border-emerald-400/30">
                    {cat.count}+ Varieties
                  </span>
                </div>

                {/* Category Details & Icon Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 text-white z-10 space-y-1">
                  {/* Category Lucide Icon Badge */}
                  <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-xl bg-emerald-500/25 backdrop-blur-md border border-emerald-300/40 text-emerald-300 flex items-center justify-center mb-1 shadow-md">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>

                  <div className="font-heading font-extrabold text-sm sm:text-lg leading-tight text-white drop-shadow-sm">
                    {cat.name}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/80 font-medium line-clamp-1">
                    {cat.description}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
