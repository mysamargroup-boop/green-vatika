import React, { useState, useMemo } from 'react';
import { Plant } from '../types/nursery';
import { plantsData } from '../data/mockData';
import { LazyImage } from './LazyImage';
import { Star, Heart, Eye, ShoppingCart, Search, Filter, Sun, Droplets, Wind, Sparkles, MessageSquare, Flame, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShopSectionProps {
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
  onBuyNowDirect: (plant: Plant) => void;
  selectedCategoryFilter?: string;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  onSelectPlant,
  onAddToCart,
  onBuyNowDirect,
  selectedCategoryFilter = 'All',
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedCategoryFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [wishlist, setWishlist] = useState<string[]>([]);

  const categories = ['All', 'Flowering', 'Outdoor', 'Bonsai', 'Pots'];

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (plant: Plant, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(plant);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#16a34a', '#22c55e', '#4ade80', '#86efac'],
    });
  };

  const handleBuyNow = (plant: Plant, e: React.MouseEvent) => {
    e.stopPropagation();
    onBuyNowDirect(plant);
  };

  const filteredPlants = useMemo(() => {
    return plantsData
      .filter((plant) => {
        const matchesCategory =
          activeTab === 'All' || plant.category.toLowerCase().includes(activeTab.toLowerCase());
        const matchesSearch =
          plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plant.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [activeTab, searchQuery, sortBy]);

  return (
    <section id="featured" className="py-10 md:py-14 relative scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 font-bold uppercase tracking-widest text-xs mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Handpicked Collection
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
              Featured Plants & Supplies
            </h2>
            <p className="text-muted-foreground mt-2 text-base font-medium">
              Healthy, vibrant plants grown with love & organic care at Green Vatika.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search plants, pots..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border/80 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary text-foreground shadow-sm font-semibold"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-card border border-border/80 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-foreground shadow-sm appearance-none pr-8 cursor-pointer font-bold"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated ★</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Category Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10 border-b border-border/40">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                  : 'bg-card text-foreground/80 hover:bg-primary/10 hover:text-primary border border-border/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Plant Cards Grid */}
        {filteredPlants.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl border border-dashed border-border p-8">
            <div className="text-4xl mb-3">🪴</div>
            <h3 className="font-heading text-xl font-bold text-foreground">No plants found matching your query</h3>
            <p className="text-muted-foreground mt-1 text-sm">Try clearing your search or switching categories.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('All');
              }}
              className="mt-4 px-6 py-2 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary/90"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredPlants.map((plant) => {
              const isWishlisted = wishlist.includes(plant.id);
              return (
                <div
                  key={plant.id}
                  onClick={() => onSelectPlant(plant)}
                  className="group relative rounded-2xl sm:rounded-3xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Image Container with Lazy Loading */}
                  <div className="relative aspect-square overflow-hidden bg-muted/40">
                    <LazyImage
                      src={plant.image}
                      alt={plant.name}
                      aspectRatio="aspect-square"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges Overlay Left */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
                      {plant.badge && (
                        <span
                          className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg border border-white/20 ${
                            plant.badge === 'Bestseller'
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                              : plant.badge === 'Sale'
                              ? 'bg-gradient-to-r from-red-600 to-rose-500'
                              : plant.badge === 'Eco Choice'
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-500'
                              : 'bg-primary'
                          }`}
                        >
                          {plant.badge}
                        </span>
                      )}

                      {/* Vibrant Gradient Discount Badge */}
                      {plant.discount && (
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-black bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white shadow-xl shadow-red-500/30 border border-white/30 flex items-center gap-0.5">
                          <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-300 text-amber-200" />
                          {plant.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button Right */}
                    <button
                      onClick={(e) => toggleWishlist(plant.id, e)}
                      className="absolute top-2 right-2 sm:top-3 sm:right-3 p-2 sm:p-2.5 rounded-full glass hover:bg-white text-foreground transition-all shadow-md z-10"
                      title="Add to Wishlist"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                          isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600 hover:text-red-500'
                        }`}
                      />
                    </button>

                    {/* Quick View Hover Button */}
                    <div className="absolute inset-x-0 bottom-2 sm:bottom-3 px-2 sm:px-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPlant(plant);
                        }}
                        className="w-full py-1.5 sm:py-2 rounded-full glass text-[10px] sm:text-xs font-extrabold text-foreground hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1 shadow-lg"
                      >
                        <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> View Details
                      </button>
                    </div>
                  </div>

                  {/* Card Info Body */}
                  <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-1">
                        <span className="font-extrabold text-primary truncate max-w-[80px] sm:max-w-none">{plant.category}</span>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 font-extrabold">
                          <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
                          <span>{plant.rating}</span>
                          <span className="text-muted-foreground font-normal hidden sm:inline">({plant.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading font-extrabold text-xs sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {plant.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground italic line-clamp-1 mb-2 sm:mb-3">
                        {plant.botanicalName}
                      </p>

                      {/* Care Badges & Packaging Note */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                        <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[11px] font-bold text-muted-foreground bg-secondary/80 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                          <Sun className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500" /> {plant.light.split(' ')[0]}
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[11px] font-bold text-muted-foreground bg-secondary/80 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                          <Droplets className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-500" /> {plant.water.split(' ')[0]}
                        </span>
                      </div>

                      {/* Pot Status Indicator */}
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground pb-1 border-t border-border/20 pt-1">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                          Grower Polybag
                        </span>
                        <span className="font-bold text-[9px] text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded shrink-0">
                          +Pot ₹60
                        </span>
                      </div>
                    </div>

                    {/* Price & Dual Action Buttons */}
                    <div className="pt-2 sm:pt-3 border-t border-border/40 space-y-2 sm:space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1 sm:gap-2">
                          <span className="text-base sm:text-xl font-black text-foreground">₹{plant.price}</span>
                          {plant.originalPrice && (
                            <span className="text-[10px] sm:text-xs text-muted-foreground line-through font-bold">
                              ₹{plant.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold hidden sm:inline">
                          In Stock
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={(e) => handleBuyNow(plant, e)}
                          className="flex-1 py-2 sm:py-2.5 px-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-[11px] sm:text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-600/20 transition-all whitespace-nowrap"
                        >
                          <Zap className="h-3.5 w-3.5 fill-amber-300 text-amber-200" /> Buy Now
                        </button>

                        <button
                          onClick={(e) => handleAddToCart(plant, e)}
                          title="Add to Cart"
                          className="p-2 sm:p-2.5 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors shrink-0 shadow-sm"
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
