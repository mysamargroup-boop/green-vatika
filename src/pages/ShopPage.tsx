import React, { useState, useMemo } from 'react';
import { Plant } from '../types/nursery';
import { plantsData } from '../data/mockData';
import { LazyImage } from '../components/LazyImage';
import { StarRating } from '../components/StarRating';
import { CustomSelect } from '../components/CustomSelect';
import { BotanicalCatalogShowcase } from '../components/BotanicalCatalogShowcase';
import { ArrowLeft, Search, Filter, Sun, Droplets, ShoppingCart, Heart, Eye, CheckCircle2, PackageCheck, Sparkles, ChevronRight, X, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShopPageProps {
  onBack: () => void;
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
  onBuyNowDirect: (plant: Plant) => void;
  selectedCategoryFilter?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onBack,
  onSelectPlant,
  onAddToCart,
  onBuyNowDirect,
  selectedCategoryFilter = 'All',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(selectedCategoryFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [lightFilter, setLightFilter] = useState<string>('all');
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
          activeCategory === 'All' ||
          plant.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
          (activeCategory === 'Flowering' && plant.category === 'Outdoor');

        const matchesSearch =
          plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plant.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLight =
          lightFilter === 'all' ||
          plant.light.toLowerCase().includes(lightFilter.toLowerCase());

        return matchesCategory && matchesSearch && matchesLight;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [activeCategory, searchQuery, sortBy, lightFilter]);

  const hasActiveFilters = activeCategory !== 'All' || lightFilter !== 'all' || searchQuery.trim() !== '';

  const clearFilters = () => {
    setActiveCategory('All');
    setLightFilter('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="pt-36 sm:pt-40 pb-20 bg-background text-foreground animate-in fade-in duration-300">
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
              <PackageCheck className="h-3.5 w-3.5" /> Live Nursery Inventory ({plantsData.length} Varieties)
            </span>
          </div>
        </div>

        {/* Animated Botanical Showcase & Greenhouse Spotlight */}
        <BotanicalCatalogShowcase
          onSelectPlant={onSelectPlant}
          onAddToCart={onAddToCart}
        />

        {/* Filter & Sort Command Bar */}
        <div className="bg-card rounded-2xl border border-border/80 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-secondary/40 text-muted-foreground hover:bg-secondary border border-border/60'
                  }`}
                >
                  {cat === 'All' ? `All Varieties (${plantsData.length})` : cat}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls with Luxury Modern Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sunlight Filter */}
              <CustomSelect
                value={lightFilter}
                onChange={(val) => setLightFilter(val)}
                options={[
                  { value: 'all', label: 'All Sunlight Levels' },
                  { value: 'direct', label: 'Direct Sunlight (Full Sun)' },
                  { value: 'partial', label: 'Partial Shade / Morning Sun' },
                ]}
                className="w-full sm:w-auto min-w-[190px]"
                ariaLabel="Filter by Sunlight"
              />

              {/* Sort By Dropdown */}
              <CustomSelect
                value={sortBy}
                onChange={(val) => setSortBy(val)}
                options={[
                  { value: 'featured', label: 'Sort: Featured Stock' },
                  { value: 'price-low', label: 'Price: Low to High (Rs)' },
                  { value: 'price-high', label: 'Price: High to Low (Rs)' },
                  { value: 'rating', label: 'Highest Customer Rating' },
                ]}
                className="w-full sm:w-auto min-w-[190px]"
                ariaLabel="Sort Nursery Plants"
              />

              {/* Search Bar */}
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search plant name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-xl pl-8 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Active Filter Indicators Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/50 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Active filters:</span>
                {activeCategory !== 'All' && (
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">
                    Category: {activeCategory}
                  </span>
                )}
                {lightFilter !== 'all' && (
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">
                    Sunlight: {lightFilter}
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">
                    "{searchQuery}"
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-destructive hover:underline flex items-center gap-1"
              >
                <X className="h-3 w-3" /> Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-muted-foreground font-medium px-1">
          <span>Showing <strong>{filteredPlants.length}</strong> verified plant varieties</span>
          <span>Open central Indian polyhouse cultivated</span>
        </div>

        {/* Product Cards Grid (Matching Senior UI/UX isolated framing) */}
        {filteredPlants.length === 0 ? (
          <div className="bg-card rounded-3xl border border-border/80 p-12 text-center space-y-4">
            <PackageCheck className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="font-heading font-extrabold text-xl text-foreground">
              No matching plants found
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              Try resetting your search query or selecting "All Varieties" to view our complete nursery catalog.
            </p>
            <button
              onClick={clearFilters}
              className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-primary/90 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlants.map((plant) => (
              <div
                key={plant.id}
                onClick={() => onSelectPlant(plant)}
                className="group relative bg-card rounded-2xl border border-border/80 hover:border-primary/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Product Image Stage (3:4 Full Fill Frame, Zero Whitespace) */}
                <div className="relative aspect-[3/4] w-full bg-secondary/30 flex items-center justify-center overflow-hidden border-b border-border/40">
                  <LazyImage
                    src={plant.image}
                    alt={plant.name}
                    aspectRatio="aspect-[3/4]"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges & Discount Overlay Left */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {plant.discount && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-rose-500 shadow-md border border-white/20">
                        {plant.discount}% OFF
                      </span>
                    )}
                    {plant.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary text-white shadow-xs">
                        {plant.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(plant.id, e)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-black/80 hover:bg-white text-foreground shadow-xs transition-transform active:scale-90"
                    title="Add to Wishlist"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        wishlist.includes(plant.id)
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-primary">{plant.category}</span>
                    </div>

                    <div>
                      <h3 className="font-heading font-extrabold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                        {plant.name}
                      </h3>
                      <p className="text-[11px] text-muted-foreground italic font-medium">
                        {plant.botanicalName}
                      </p>
                    </div>

                    {/* Star Rating */}
                    <div className="pt-0.5">
                      <StarRating
                        rating={plant.rating}
                        reviewsCount={plant.reviewsCount}
                        size="sm"
                      />
                    </div>

                    {/* Price Presentation */}
                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="font-heading font-black text-xl text-primary">
                        ₹{plant.price}
                      </span>
                      {plant.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through font-medium">
                          MRP ₹{plant.originalPrice}
                        </span>
                      )}
                      {plant.originalPrice && (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          {Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)}% off
                        </span>
                      )}
                    </div>

                    {/* Packaging Notice Pill */}
                    <div className="text-[11px] text-muted-foreground bg-secondary/40 px-2.5 py-1 rounded-lg border border-border/40 font-medium">
                      Shipped in root-ball grower polybag. (Pot optional)
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-border/50 grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => handleAddToCart(plant, e)}
                      className="w-full bg-secondary hover:bg-secondary/80 text-foreground font-bold py-2.5 rounded-xl text-xs transition-colors border border-border/80 flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Cart
                    </button>
                    <button
                      onClick={(e) => handleBuyNow(plant, e)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 rounded-xl text-xs transition-all shadow-xs"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Nursery Packaging & Delivery Guarantee Banner */}
        <div className="bg-card rounded-3xl border border-border/80 p-6 sm:p-10 shadow-lg space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Nursery Standards
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Why We Ship in Root-Balled Grower Polybags
            </h3>
            <p className="text-sm text-muted-foreground">
              Our packaging is designed by horticulturists to protect delicate root systems during transit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-secondary/30 border border-border/60 space-y-2">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-heading font-bold text-foreground">
                Prevents Transit Root Shock
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Ceramic and heavy clay pots break easily in transit, shattering root balls. Grower nursery sleeves keep the root ball compact, moist, and intact.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-secondary/30 border border-border/60 space-y-2">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-heading font-bold text-foreground">
                Optional Terracotta Pot Add-on
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Want your plant delivered in an authentic clay gamla? Add our 8-Inch Handcrafted Terracotta Gamla for just ₹60 per plant.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-secondary/30 border border-border/60 space-y-2">
              <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-heading font-bold text-foreground">
                Living Organic Soil Enriched
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Every sapling comes with pure organic vermicompost, cow dung manure, and neem cake so your plant has active nutrition for 60 days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
