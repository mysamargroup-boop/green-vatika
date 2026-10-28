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

        {/* Categories Grid - 3 Columns on Mobile (Strictly Clean: Only Name & Image), 6 Columns on Desktop */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-5">
          {categoriesData.map((cat) => {
            const IconComponent = getCategoryIcon(cat.iconName);
            return (
              <a
                key={cat.id}
                href="#featured"
                onClick={() => onSelectCategory(cat.name.replace(' Plants', '').replace(' & Planters', '').replace(' & Vines', ''))}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-card border border-border/60 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500 block"
              >
                {/* Aspect Square Image Container with Lazy Loading */}
                <div className="aspect-square overflow-hidden relative">
                  <LazyImage
                    src={cat.image}
                    alt={cat.name}
                    aspectRatio="aspect-square"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Smooth Dark Gradient for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </div>

                {/* Top Corner Variety Badge - Desktop/Tablet Only */}
                <div className="hidden sm:flex absolute top-2.5 right-2.5 sm:top-3 sm:right-3 items-center gap-1.5 z-10">
                  <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 shadow-md border border-emerald-400/30">
                    {cat.count}+ Varieties
                  </span>
                </div>

                {/* Category Details & Bottom Name */}
                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4 text-white z-10 flex flex-col justify-end">
                  {/* Category Lucide Icon Badge - Desktop Only */}
                  <div className="hidden sm:flex h-8 w-8 rounded-xl bg-emerald-500/25 backdrop-blur-md border border-emerald-300/40 text-emerald-300 items-center justify-center mb-1.5 shadow-md">
                    <IconComponent className="h-4 w-4" />
                  </div>

                  {/* Clean Category Name (Only Name Visible on Mobile at Bottom) */}
                  <div className="font-heading font-extrabold text-[11px] sm:text-base leading-tight text-white drop-shadow-md text-center sm:text-left line-clamp-1">
                    {cat.name}
                  </div>

                  {/* Description - Desktop Only */}
                  <div className="hidden sm:block text-[11px] text-white/80 font-medium line-clamp-1 mt-0.5">
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
