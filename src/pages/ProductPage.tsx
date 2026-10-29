import React, { useState } from 'react';
import { Plant } from '../types/nursery';
import { LazyImage } from '../components/LazyImage';
import { plantsData } from '../data/mockData';
import { StarRating } from '../components/StarRating';
import {
  ArrowLeft,
  Sun,
  Droplets,
  Wind,
  ShieldAlert,
  Check,
  ShoppingCart,
  ShoppingBag,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  PackageCheck,
  Leaf,
  Info,
  CheckCircle2,
  Flame,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ComingSoonShippingModal } from '../components/ComingSoonShippingModal';

interface ProductPageProps {
  plant: Plant;
  onBack: () => void;
  onAddToCart: (plant: Plant, quantity: number, size: string, color: string, includePot?: boolean, potPrice?: number) => void;
  onSelectPlant: (plant: Plant) => void;
  onOpenOrderPage: (plant: Plant, quantity: number, size: string, color: string) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  plant,
  onBack,
  onAddToCart,
  onSelectPlant,
  onOpenOrderPage,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(plant.potSize || 'Standard Grower Bag');
  const [selectedPotColor, setSelectedPotColor] = useState<string>('Terracotta');
  const [activeTab, setActiveTab] = useState<'care' | 'details' | 'reviews'>('care');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [includePot, setIncludePot] = useState<boolean>(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState<boolean>(false);

  const potPrice = 60;
  const unitPrice = plant.price + (includePot ? potPrice : 0);
  const originalUnitPrice = (plant.originalPrice || Math.round(plant.price * 1.6)) + (includePot ? potPrice : 0);
  const calculatedTotal = unitPrice * quantity;
  const calculatedOriginalTotal = originalUnitPrice * quantity;

  const potColors = ['Terracotta', 'Matte White', 'Forest Green', 'Charcoal'];
  const sizeOptions = ['Standard Grower Bag', 'Medium (1.5-2 ft)', 'Large (2.5+ ft)'];

  // Authentic product images only (Zero external placeholder/stock lifestyle photos)
  const rawImages = [plant.image, plant.hoverImage].filter(Boolean) as string[];
  const galleryImages = Array.from(new Set(rawImages));
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleAddToCart = () => {
    onAddToCart(plant, quantity, selectedSize, selectedPotColor, includePot, potPrice);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#16a34a', '#22c55e', '#f59e0b'],
    });
  };

  const handleDirectWhatsAppBuy = () => {
    const messageText = encodeURIComponent(
      `*GREEN VATIKA DIRECT ORDER*\n\n` +
      `*Plant:* ${plant.name}\n` +
      `*Botanical:* ${plant.botanicalName}\n` +
      `*Category:* ${plant.category}\n` +
      `*Planter Option:* ${includePot ? `Add Handcrafted Terracotta Pot (+₹${potPrice})` : 'Nursery Grower Polybag (No Pot)'}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total Price:* ₹${calculatedTotal}\n\n` +
      `Please share availability and local delivery/pickup details in Narsinghpur!`
    );
    window.open(`https://wa.me/919479480068?text=${messageText}`, '_blank');
  };

  // Always curate 4 recommendations (category matches first, then popular items, excluding current plant)
  const categoryMatches = plantsData.filter((p) => p.category === plant.category && p.id !== plant.id);
  const fallbackMatches = plantsData.filter((p) => p.category !== plant.category && p.id !== plant.id);
  const relatedPlants = [...categoryMatches, ...fallbackMatches].slice(0, 4);

  return (
    <div className="pt-24 pb-28 sm:pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back & Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-border/80 shadow-xs whitespace-nowrap shrink-0 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </button>

          <nav aria-label="Breadcrumb" className="text-xs font-semibold text-muted-foreground hidden sm:block">
            Home / Shop / <span className="text-primary font-bold">{plant.category}</span> / {plant.name}
          </nav>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Image Gallery (Full 3:4 Aspect Ratio, Edge-to-Edge Fill, Zero Whitespace) */}
          <div className="space-y-4">
            {/* Main Featured Image - Exact 3:4 Box Filled Edge-to-Edge */}
            <div className="relative w-full aspect-[3/4] rounded-3xl sm:rounded-[2rem] overflow-hidden border border-border/80 shadow-xl bg-secondary/30 group">
              <LazyImage
                src={galleryImages[activeImageIndex] || plant.image}
                alt={plant.name}
                aspectRatio="aspect-[3/4]"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {plant.badge && (
                <span className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-white bg-primary shadow-lg border border-white/20 z-10">
                  {plant.badge}
                </span>
              )}

              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-2 z-10">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="p-2.5 sm:p-3 rounded-full bg-background/85 backdrop-blur-md hover:bg-background text-foreground shadow-md transition-all border border-border/60 hover:scale-110"
                >
                  <Heart className={`h-4 w-4 sm:h-4.5 sm:w-4.5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Product link copied to clipboard!');
                  }}
                  aria-label="Share product"
                  className="p-2.5 sm:p-3 rounded-full bg-background/85 backdrop-blur-md hover:bg-background text-foreground shadow-md transition-all border border-border/60 hover:scale-110"
                >
                  <Share2 className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Gallery Thumbnails (3:4 ratio matching full image format) */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 pt-1">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`View product image ${index + 1}`}
                    className={`w-18 sm:w-20 aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all p-0 ${
                      activeImageIndex === index
                        ? 'border-primary ring-2 ring-primary/30 shadow-md scale-105'
                        : 'border-border/70 opacity-70 hover:opacity-100 hover:border-primary/40'
                    }`}
                  >
                    <LazyImage src={img} alt={`${plant.name} angle ${index + 1}`} aspectRatio="aspect-[3/4]" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details, Refined Note, Planter Add-on & Actions */}
          <div className="space-y-5 sm:space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary">{plant.category} Collection</span>
                <StarRating rating={plant.rating} size="sm" showNumeric={true} reviewsCount={plant.reviewsCount} />
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                {plant.name}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground italic mt-1">{plant.botanicalName}</p>
            </div>

            {/* Special Nursery Price Box */}
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground font-semibold">Special Direct Nursery Price</div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-foreground">₹{calculatedTotal}</span>
                  {calculatedOriginalTotal && (
                    <span className="text-sm sm:text-base text-muted-foreground line-through font-medium">
                      ₹{calculatedOriginalTotal}
                    </span>
                  )}
                  {plant.discount && (
                    <span className="text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
                      SAVE {plant.discount}%
                    </span>
                  )}
                </div>
                {includePot && (
                  <div className="text-[11px] text-primary font-bold mt-1">
                    Includes ₹{potPrice * quantity} for {quantity} handcrafted terracotta planter(s)
                  </div>
                )}
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> In Stock &amp; Ready for Delivery
                </div>
              </div>
            </div>

            {/* Redesigned Packaging Note (Phase 3: Refined Neutral Surface, Zero Red Border, Zero Emojis) */}
            <div
              role="note"
              className="p-3.5 sm:p-4 rounded-2xl bg-secondary/50 border border-border/80 text-foreground text-xs sm:text-sm flex items-start gap-3 shadow-2xs"
            >
              <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                <PackageCheck className="h-4.5 w-4.5" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <span className="font-extrabold uppercase tracking-wider block text-xs text-foreground">
                  Packaging &amp; Planter Notice
                </span>
                <p className="text-muted-foreground font-medium text-xs leading-relaxed">
                  Plant is safely delivered in an eco-friendly nursery grower polybag with an enriched root-ball. You can choose to add a handcrafted terracotta gamla below for a nominal charge.
                </p>
              </div>
            </div>

            {/* Redesigned Planter Add-on UI (Phase 8: Subtle Neutral Surface Tint, ZERO Heavy Colored Outlines) */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-foreground">
                    Optional Planter Add-on
                  </label>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-foreground/80 border border-border/60">
                    Recommended
                  </span>
                </div>
                <span className="text-xs font-extrabold text-foreground">+₹{potPrice} each</span>
              </div>

              <div
                role="checkbox"
                aria-checked={includePot}
                tabIndex={0}
                onClick={() => setIncludePot(!includePot)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    setIncludePot(!includePot);
                  }
                }}
                className={`p-3 rounded-xl border flex items-center gap-3.5 cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  includePot
                    ? 'bg-muted/80 border-border/90 shadow-2xs'
                    : 'bg-secondary/40 border-border/70 hover:bg-secondary/60'
                }`}
              >
                <div className="relative h-14 w-14 rounded-xl overflow-hidden border border-border/80 shrink-0 bg-background flex items-center justify-center p-1">
                  <img
                    src="/images/green-vatika/pots/terracotta_pot_preview.webp"
                    alt="Handcrafted Terracotta Pot"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-extrabold text-foreground truncate">
                      Handcrafted Terracotta Planter (+₹{potPrice})
                    </h4>
                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        includePot
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-muted-foreground/60 bg-transparent'
                      }`}
                    >
                      {includePot && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                    {includePot
                      ? 'Handcrafted baked terracotta pot added to this plant'
                      : 'Click to add a natural porous baked clay gamla with drainage hole'}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{plant.description}</p>

            {/* Quick Plant Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-1">
                <Sun className="h-4.5 w-4.5 text-amber-500 mx-auto" />
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Sunlight</div>
                <div className="text-xs font-bold text-foreground line-clamp-1">{plant.light}</div>
              </div>

              <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-1">
                <Droplets className="h-4.5 w-4.5 text-blue-500 mx-auto" />
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Watering</div>
                <div className="text-xs font-bold text-foreground line-clamp-1">{plant.water}</div>
              </div>

              <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-1">
                <Wind className="h-4.5 w-4.5 text-emerald-600 mx-auto" />
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Air Purifier</div>
                <div className="text-xs font-bold text-foreground">{plant.airPurifying ? 'NASA Verified' : 'Natural'}</div>
              </div>

              <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-1">
                <ShieldAlert className="h-4.5 w-4.5 text-purple-600 mx-auto" />
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Pet Friendly</div>
                <div className="text-xs font-bold text-foreground">{plant.petFriendly ? 'Pet Safe' : 'Caution'}</div>
              </div>
            </div>

            {/* Customizer: Size */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                1. Select Pot Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center truncate ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary shadow-2xs'
                        : 'border-border/80 text-foreground hover:bg-secondary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Customizer: Planter Color */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                2. Select Planter Color
              </label>
              <div className="flex flex-wrap gap-2">
                {potColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedPotColor(color)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      selectedPotColor === color
                        ? 'border-primary bg-primary text-white shadow-xs'
                        : 'border-border/80 text-foreground hover:bg-secondary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold uppercase text-muted-foreground">Select Quantity</span>
              <div className="flex items-center border border-border/80 rounded-full p-1 bg-secondary/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="h-7 w-7 rounded-full bg-card hover:bg-primary/20 font-bold text-foreground flex items-center justify-center shadow-2xs transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-xs sm:text-sm font-bold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="h-7 w-7 rounded-full bg-card hover:bg-primary/20 font-bold text-foreground flex items-center justify-center shadow-2xs transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Desktop / Tablet Primary Action Buttons (Hidden on small mobile where sticky footer handles it) */}
            <div className="hidden sm:grid sm:grid-cols-2 gap-3.5 pt-4 border-t border-border/80">
              <button
                onClick={handleDirectWhatsAppBuy}
                className="py-3.5 px-5 rounded-2xl bg-[#146934] hover:bg-[#10562b] text-white font-extrabold text-sm border border-[#146934] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] whitespace-nowrap cursor-pointer"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 text-white" />
                Buy Now on WhatsApp
              </button>

              <button
                onClick={() => setIsShippingModalOpen(true)}
                className="py-3.5 px-5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md border border-slate-700/60 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] whitespace-nowrap cursor-pointer"
              >
                <ShoppingBag className="h-4.5 w-4.5 text-emerald-400" /> Proceed to Order Checkout
              </button>
            </div>

            {/* Delivery Assurance */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] sm:text-xs text-muted-foreground border-t border-border/50">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary shrink-0" />
                <span>Safely packed with 100% replacement guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-primary shrink-0" />
                <span>7-Day Freshness &amp; Healthy Leaf Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs (Phase 6: Responsive Grid, No Clipped Labels, Zero Emojis) */}
        <div className="mt-14 sm:mt-16 bg-card rounded-3xl border border-border/80 p-5 sm:p-7 shadow-sm">
          {/* Responsive Segmented Control Tabs */}
          <div
            role="tablist"
            className="grid grid-cols-3 gap-1.5 p-1.5 bg-secondary/60 rounded-2xl border border-border/60 mb-6"
          >
            <button
              role="tab"
              id="tab-care"
              aria-selected={activeTab === 'care'}
              aria-controls="panel-care"
              onClick={() => setActiveTab('care')}
              className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center truncate ${
                activeTab === 'care'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
              }`}
            >
              Care Guidelines
            </button>
            <button
              role="tab"
              id="tab-details"
              aria-selected={activeTab === 'details'}
              aria-controls="panel-details"
              onClick={() => setActiveTab('details')}
              className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center truncate ${
                activeTab === 'details'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
              }`}
            >
              Specifications
            </button>
            <button
              role="tab"
              id="tab-reviews"
              aria-selected={activeTab === 'reviews'}
              aria-controls="panel-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all text-center truncate ${
                activeTab === 'reviews'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
              }`}
            >
              Reviews ({plant.reviewsCount})
            </button>
          </div>

          {/* Care Guidelines Panel */}
          {activeTab === 'care' && (
            <div id="panel-care" role="tabpanel" aria-labelledby="tab-care" className="space-y-4">
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-foreground flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary shrink-0" /> How to Care for Your {plant.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {plant.careInstructions.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-secondary/40 border border-border/60">
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications Panel */}
          {activeTab === 'details' && (
            <div id="panel-details" role="tabpanel" aria-labelledby="tab-details" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-sm">
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Botanical Name</span>
                <div className="font-bold text-foreground italic mt-0.5">{plant.botanicalName}</div>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Height Range</span>
                <div className="font-bold text-foreground mt-0.5">{plant.height}</div>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Difficulty Level</span>
                <div className="font-bold text-foreground mt-0.5">{plant.difficulty}</div>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Sunlight Needs</span>
                <div className="font-bold text-foreground mt-0.5">{plant.light}</div>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Watering Frequency</span>
                <div className="font-bold text-foreground mt-0.5">{plant.water}</div>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Packaging</span>
                <div className="font-bold text-foreground mt-0.5">Grower Polybag (Root-Balled)</div>
              </div>
            </div>
          )}

          {/* Customer Reviews Panel (Phase 9: Golden SVG Stars, Zero Hardcoded Glyphs) */}
          {activeTab === 'reviews' && (
            <div id="panel-reviews" role="tabpanel" aria-labelledby="tab-reviews" className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-3.5">
                  <StarRating rating={plant.rating} size="lg" showNumeric={true} />
                  <div>
                    <div className="font-extrabold text-sm text-foreground">Top Rated Nursery Plant</div>
                    <div className="text-xs text-muted-foreground">Based on {plant.reviewsCount} verified customer reviews</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-card border border-border/80 text-foreground shadow-2xs">
                  Verified Local Buyers
                </span>
              </div>

              {/* Reviews Slider */}
              <div className="relative overflow-hidden rounded-2xl bg-secondary/30 border border-border/60 py-4">
                <div className="flex gap-4 animate-marquee whitespace-nowrap [animation-duration:28s] hover:[animation-play-state:paused]">
                  {[
                    { name: 'Kavita Roy', location: 'Delhi', text: 'Arrived in pristine condition with fresh green leaves sprouting and moist roots.', rating: 5, date: '2 days ago' },
                    { name: 'Sameer Sen', location: 'Mumbai', text: 'Healthy root system and sturdy nursery bag. Very happy with the purchase.', rating: 5, date: '1 week ago' },
                    { name: 'Anita Verma', location: 'Bangalore', text: 'Packed with eco-friendly protective cushioning. Plant is thriving on my balcony.', rating: 5, date: '3 days ago' },
                    { name: 'Dr. Rajesh Patel', location: 'Ahmedabad', text: 'Soil mix is rich and organic. Growing fast under indirect morning sun.', rating: 5, date: '5 days ago' },
                    { name: 'Priya Sharma', location: 'Indore', text: 'Fast delivery across MP. Nursery team answered my soil queries on WhatsApp.', rating: 5, date: 'Yesterday' },
                    { name: 'Amit Kulkarni', location: 'Bhopal', text: 'High quality sapling acclimatized well to outdoor terrace heat.', rating: 5, date: '4 days ago' },
                  ].map((rev, idx) => (
                    <div
                      key={idx}
                      className="min-w-[270px] sm:min-w-[300px] max-w-[320px] p-4 rounded-2xl bg-card border border-border/80 shadow-2xs space-y-2 shrink-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-xs text-foreground">{rev.name}</div>
                          <div className="text-[10px] text-muted-foreground font-medium">{rev.location} • {rev.date}</div>
                        </div>
                        <StarRating rating={rev.rating} size="xs" />
                      </div>
                      <p className="text-xs text-foreground/90 font-medium leading-relaxed whitespace-normal line-clamp-2">
                        "{rev.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recommended & Related Plants Section (Phase 4: Always Balanced 4-Item Grid, Clean Wrapping) */}
        {relatedPlants.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Handpicked Recommendations
                </span>
                <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground mt-2">
                  You May Also Like
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {relatedPlants.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectPlant(p)}
                  className="group relative rounded-2xl sm:rounded-3xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Clean 3:4 Full Fill Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30 flex items-center justify-center">
                    <LazyImage
                      src={p.image}
                      alt={p.name}
                      aspectRatio="aspect-[3/4]"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges Overlay */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
                      {p.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white bg-primary shadow-xs">
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body with Clean Text Wrapping */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      {/* Category & Star Rating */}
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-1 min-w-0">
                        <span className="font-extrabold text-primary truncate max-w-[90px] sm:max-w-none">{p.category}</span>
                        <StarRating rating={p.rating} size="xs" showNumeric={true} />
                      </div>

                      {/* Title */}
                      <h4 className="font-heading font-extrabold text-xs sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {p.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-muted-foreground italic line-clamp-1 mb-2">
                        {p.botanicalName}
                      </p>

                      {/* Care Badges */}
                      <div className="flex items-center gap-1 mb-2.5 flex-wrap">
                        <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded-md">
                          <Sun className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500" /> {p.light.split(' ')[0]}
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded-md">
                          <Droplets className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-500" /> {p.water.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-2 border-t border-border/40 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm sm:text-base font-black text-foreground">₹{p.price}</span>
                          {p.originalPrice && (
                            <span className="text-[10px] sm:text-xs text-muted-foreground line-through font-bold">
                              ₹{p.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold hidden sm:inline">
                          In Stock
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenOrderPage(p, 1, '8 inch standard', 'Terracotta');
                          }}
                          className="flex-1 py-1.5 sm:py-2 px-2 rounded-full bg-primary hover:bg-primary/90 text-white font-extrabold text-[10px] sm:text-xs flex items-center justify-center gap-1 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
                        >
                          <Zap className="h-3 w-3" /> Buy Now
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(p, 1, '8 inch standard', 'Terracotta');
                          }}
                          title="Add to Cart"
                          aria-label={`Add ${p.name} to cart`}
                          className="p-1.5 sm:p-2 rounded-full bg-secondary hover:bg-primary hover:text-white text-foreground transition-colors shrink-0 shadow-2xs cursor-pointer"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Phase 5: Mobile Fixed Bottom Navigation & Action Bar (Mobile Only: lg:hidden) */}
      <aside
        aria-label="Mobile Product Actions"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border/80 shadow-2xl px-4 py-2.5 pb-[calc(0.65rem+env(safe-area-inset-bottom))] flex items-center justify-between gap-3"
      >
        <div className="min-w-0">
          <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Total</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-foreground">₹{calculatedTotal}</span>
            {calculatedOriginalTotal && (
              <span className="text-xs text-muted-foreground line-through font-medium">₹{calculatedOriginalTotal}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border/80 shadow-2xs transition-colors shrink-0"
            title="Add to Cart"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={handleDirectWhatsAppBuy}
            className="py-2.5 px-4 rounded-xl bg-[#146934] hover:bg-[#10562b] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <WhatsAppIcon className="h-4 w-4 text-white" />
            Buy on WhatsApp
          </button>
        </div>
      </aside>

      {/* Online Shipping Coming Soon Modal */}
      <ComingSoonShippingModal
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
        plant={plant}
        quantity={quantity}
        includePot={includePot}
        potPrice={potPrice}
        totalAmount={calculatedTotal}
      />
    </div>
  );
};
