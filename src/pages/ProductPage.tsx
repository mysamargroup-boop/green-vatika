import React, { useState } from 'react';
import { Plant } from '../types/nursery';
import { LazyImage } from '../components/LazyImage';
import { plantsData } from '../data/mockData';
import {
  ArrowLeft,
  Star,
  Sun,
  Droplets,
  Wind,
  ShieldAlert,
  Check,
  ShoppingCart,
  ShoppingBag,
  MessageSquare,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Sparkles,
  Flame,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface ProductPageProps {
  plant: Plant;
  onBack: () => void;
  onAddToCart: (plant: Plant, quantity: number, size: string, color: string) => void;
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
  const [selectedSize, setSelectedSize] = useState<string>(plant.potSize || '8 inch standard');
  const [selectedPotColor, setSelectedPotColor] = useState<string>('Terracotta');
  const [activeTab, setActiveTab] = useState<'care' | 'details' | 'reviews'>('care');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const potColors = ['Terracotta', 'Matte White', 'Forest Green', 'Charcoal'];
  const sizeOptions = ['6 inch compact', '8 inch standard', '10 inch luxury'];

  // Alternative product gallery images
  const galleryImages = [
    plant.image,
    plant.hoverImage || plant.image,
    'https://images.pexels.com/photos/9412386/pexels-photo-9412386.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6508425/pexels-photo-6508425.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleAddToCart = () => {
    onAddToCart(plant, quantity, selectedSize, selectedPotColor);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#16a34a', '#22c55e', '#f59e0b'],
    });
  };

  const handleDirectWhatsAppBuy = () => {
    const messageText = encodeURIComponent(
      `🌿 *GREEN VATIKA INSTANT BUY ORDER*\n\n` +
      `*Plant:* ${plant.name}\n` +
      `*Category:* ${plant.category}\n` +
      `*Pot Size:* ${selectedSize}\n` +
      `*Planter Color:* ${selectedPotColor}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total Price:* ₹${plant.price * quantity}\n\n` +
      `Please process this order and send payment details!`
    );
    window.open(`https://wa.me/919479480068?text=${messageText}`, '_blank');
  };

  const relatedPlants = plantsData
    .filter((p) => p.category === plant.category && p.id !== plant.id)
    .slice(0, 4);

  return (
    <div className="pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8">
        {/* Back & Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-border/80 shadow-sm whitespace-nowrap shrink-0 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </button>

          <div className="text-xs font-semibold text-muted-foreground hidden sm:block">
            Home / Shop / <span className="text-primary font-bold">{plant.category}</span> / {plant.name}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            {/* Main Featured Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/80 bg-card">
              <LazyImage
                src={galleryImages[activeImageIndex]}
                alt={plant.name}
                aspectRatio="aspect-square"
                className="w-full h-full object-cover"
              />

              {plant.badge && (
                <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-amber-500 shadow-lg">
                  {plant.badge}
                </span>
              )}

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-3 rounded-full glass hover:bg-white text-foreground shadow-md transition-all"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Product link copied to clipboard!');
                  }}
                  className="p-3 rounded-full glass hover:bg-white text-foreground shadow-md transition-all"
                >
                  <Share2 className="h-5 w-5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === index
                      ? 'border-primary ring-2 ring-primary/30 scale-105'
                      : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <LazyImage src={img} alt="thumbnail" aspectRatio="aspect-square" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details, Options & Direct Order Actions */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-primary font-bold mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10">{plant.category} Collection</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{plant.rating}</span>
                  <span className="text-muted-foreground font-normal">({plant.reviewsCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                {plant.name}
              </h1>
              <p className="text-sm text-muted-foreground italic mt-1">{plant.botanicalName}</p>
            </div>

            {/* Price & Savings */}
            <div className="p-4 rounded-2xl bg-secondary/50 border border-border/80 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground font-semibold">Special Nursery Price</div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-foreground">₹{plant.price * quantity}</span>
                  {plant.originalPrice && (
                    <span className="text-sm sm:text-base text-muted-foreground line-through font-medium">
                      ₹{plant.originalPrice * quantity}
                    </span>
                  )}
                  {plant.discount && (
                    <span className="text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
                      SAVE {plant.discount}%
                    </span>
                  )}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> In Stock & Ready to Ship
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{plant.description}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-1">
                <Sun className="h-5 w-5 text-amber-500 mx-auto" />
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Sunlight</div>
                <div className="text-xs font-bold text-foreground line-clamp-1">{plant.light}</div>
              </div>

              <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-1">
                <Droplets className="h-5 w-5 text-blue-500 mx-auto" />
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Watering</div>
                <div className="text-xs font-bold text-foreground line-clamp-1">{plant.water}</div>
              </div>

              <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-1">
                <Wind className="h-5 w-5 text-emerald-600 mx-auto" />
                <div className="text-[10px] uppercase font-bold text-muted-foreground">Air Purifier</div>
                <div className="text-xs font-bold text-foreground">{plant.airPurifying ? 'NASA Certified' : 'Standard'}</div>
              </div>

              <div className="p-3 rounded-2xl bg-card border border-border/80 text-center space-y-1">
                <ShieldAlert className="h-5 w-5 text-purple-600 mx-auto" />
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
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary shadow-sm'
                        : 'border-border text-foreground hover:bg-secondary'
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
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                      selectedPotColor === color
                        ? 'border-primary bg-primary text-white shadow-md'
                        : 'border-border text-foreground hover:bg-secondary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase text-muted-foreground">Select Quantity</span>
              <div className="flex items-center border border-border rounded-full p-1 bg-secondary/50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8 rounded-full bg-card hover:bg-primary/20 font-bold text-foreground flex items-center justify-center shadow-xs"
                >
                  -
                </button>
                <span className="px-5 text-sm font-bold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8 rounded-full bg-card hover:bg-primary/20 font-bold text-foreground flex items-center justify-center shadow-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/80">
              <button
                onClick={handleDirectWhatsAppBuy}
                className="py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm shadow-xl shadow-[#25D366]/30 border border-emerald-300/30 transition-all flex items-center justify-center gap-2.5 hover:scale-[1.02] whitespace-nowrap"
              >
                <WhatsAppIcon className="h-5 w-5 text-white" />
                Buy Now on WhatsApp
              </button>

              <button
                onClick={() => onOpenOrderPage(plant, quantity, selectedSize, selectedPotColor)}
                className="py-3.5 px-6 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl shadow-slate-900/30 border border-slate-700/60 transition-all flex items-center justify-center gap-2.5 hover:scale-[1.02] whitespace-nowrap"
              >
                <ShoppingBag className="h-5 w-5 text-emerald-400" /> Proceed to Order Checkout
              </button>
            </div>

            {/* Delivery Assurance */}
            <div className="grid grid-cols-2 gap-4 pt-4 text-xs text-muted-foreground border-t border-border/40">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary shrink-0" />
                <span>Safely packed with 100% replacement guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-primary shrink-0" />
                <span>7-Day Freshness & Healthy Leaf Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-16 bg-card rounded-3xl border border-border/80 p-6 md:p-8 shadow-xl">
          {/* Segmented Control Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-secondary/60 p-1.5 rounded-2xl border border-border/60 mb-6">
            <button
              onClick={() => setActiveTab('care')}
              className={`flex-1 min-w-[140px] py-2.5 px-3.5 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap text-center ${
                activeTab === 'care'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
              }`}
            >
              Expert Care Guidelines
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 min-w-[140px] py-2.5 px-3.5 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap text-center ${
                activeTab === 'details'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
              }`}
            >
              Plant Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 min-w-[140px] py-2.5 px-3.5 sm:px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap text-center ${
                activeTab === 'reviews'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-[1.02]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
              }`}
            >
              Customer Reviews ({plant.reviewsCount})
            </button>
          </div>

          {activeTab === 'care' && (
            <div className="space-y-4">
              <h3 className="font-heading font-extrabold text-lg text-foreground flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> How to Care for Your {plant.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plant.careInstructions.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/40 border border-border/60">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/90 font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="text-xs text-muted-foreground font-bold uppercase">Botanical Name</span>
                <div className="font-bold text-foreground italic mt-0.5">{plant.botanicalName}</div>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="text-xs text-muted-foreground font-bold uppercase">Height Range</span>
                <div className="font-bold text-foreground mt-0.5">{plant.height}</div>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60">
                <span className="text-xs text-muted-foreground font-bold uppercase">Difficulty Level</span>
                <div className="font-bold text-foreground mt-0.5">{plant.difficulty}</div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="text-3xl font-extrabold text-amber-600">{plant.rating} / 5.0</div>
                <div className="text-xs text-muted-foreground">
                  Based on <strong>{plant.reviewsCount} customer ratings</strong>. 100% verified plant buyers.
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Kavita Roy', text: 'Arrived in pristine condition with 4 fresh leaves sprouting!', rating: 5, date: '2 days ago' },
                  { name: 'Sameer Sen', text: 'Healthy root system and beautiful ceramic planter.', rating: 5, date: '1 week ago' },
                ].map((rev, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-border/60 bg-secondary/30 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">{rev.name}</span>
                      <span className="text-muted-foreground">{rev.date}</span>
                    </div>
                    <p className="text-sm text-foreground/90 italic">"{rev.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Plants Section */}
        {relatedPlants.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Handpicked Recommendations
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mt-2">
                  You May Also Like
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedPlants.map((p) => (
                <div
                  key={p.id}
                  onClick={() => onSelectPlant(p)}
                  className="group relative rounded-2xl sm:rounded-3xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-square overflow-hidden bg-muted/40">
                    <LazyImage
                      src={p.image}
                      alt={p.name}
                      aspectRatio="aspect-square"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges Overlay Left */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
                      {p.badge && (
                        <span
                          className={`px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md border border-white/20 ${
                            p.badge === 'Bestseller'
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                              : p.badge === 'Sale'
                              ? 'bg-gradient-to-r from-red-600 to-rose-500'
                              : p.badge === 'Eco Choice'
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-500'
                              : 'bg-primary'
                          }`}
                        >
                          {p.badge}
                        </span>
                      )}

                      {p.discount && (
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[9px] sm:text-[10px] font-black bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white shadow-md border border-white/30 flex items-center gap-0.5">
                          <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-300 text-amber-200" />
                          {p.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-1">
                        <span className="font-extrabold text-primary truncate max-w-[80px] sm:max-w-none">{p.category}</span>
                        <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 font-extrabold">
                          <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
                          <span>{p.rating}</span>
                        </div>
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
                          <span className="text-base sm:text-lg font-black text-foreground">₹{p.price}</span>
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
                          className="flex-1 py-1.5 sm:py-2 px-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-extrabold text-[10px] sm:text-xs flex items-center justify-center gap-1 shadow-md transition-all whitespace-nowrap"
                        >
                          <Zap className="h-3 w-3 fill-amber-300 text-amber-200" /> Buy Now
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(p, 1, '8 inch standard', 'Terracotta');
                          }}
                          title="Add to Cart"
                          className="p-1.5 sm:p-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors shrink-0 shadow-sm"
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
    </div>
  );
};
