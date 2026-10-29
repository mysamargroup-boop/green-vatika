import React, { useState } from 'react';
import { Plant } from '../types/nursery';
import { StarRating } from './StarRating';
import { X, Sun, Droplets, Wind, ShieldAlert, Check, ShoppingCart, MessageSquare, Heart, PackageCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

import { WhatsAppIcon } from './WhatsAppIcon';

interface PlantDetailModalProps {
  plant: Plant | null;
  onClose: () => void;
  onAddToCart: (plant: Plant, quantity: number, selectedSize: string, selectedPotColor: string, includePot?: boolean, potPrice?: number) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({ plant, onClose, onAddToCart }) => {
  if (!plant) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(plant.potSize || 'Standard Grower Bag');
  const [selectedPotColor, setSelectedPotColor] = useState<string>('Terracotta');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [includePot, setIncludePot] = useState<boolean>(false);

  const potPrice = 60;
  const unitPrice = plant.price + (includePot ? potPrice : 0);
  const originalUnitPrice = (plant.originalPrice || Math.round(plant.price * 1.6)) + (includePot ? potPrice : 0);
  const totalPrice = unitPrice * quantity;
  const totalOriginalPrice = originalUnitPrice * quantity;

  const potColors = ['Terracotta', 'Matte White', 'Forest Green', 'Charcoal'];
  const sizeOptions = ['Standard Grower Bag', 'Medium (1.5-2 ft)', 'Large (2.5+ ft)'];

  const handleAdd = () => {
    onAddToCart(plant, quantity, selectedSize, selectedPotColor, includePot, potPrice);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#16a34a', '#22c55e', '#f59e0b'],
    });
    onClose();
  };

  const handleWhatsAppBuy = () => {
    const text = encodeURIComponent(
      `*GREEN VATIKA ORDER INQUIRY*\n\n` +
      `*Plant:* ${plant.name}\n` +
      `*Botanical:* ${plant.botanicalName}\n` +
      `*Planter:* ${includePot ? `Add Handcrafted Terracotta Pot (+₹${potPrice})` : 'Nursery Grower Polybag (No Pot)'}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total Price:* ₹${totalPrice}\n\n` +
      `Please let me know how to pick up or arrange delivery!`
    );
    window.open(`https://wa.me/919479480068?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-card rounded-3xl border border-border shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass hover:bg-white text-foreground transition-all shadow-md"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left: Product Image - Full 3:4 Fill Edge-to-Edge Zero Whitespace */}
        <div className="w-full md:w-1/2 relative bg-secondary/30 aspect-[3/4] md:aspect-auto overflow-hidden">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover object-center"
          />
          {plant.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-primary shadow-md">
              {plant.badge}
            </span>
          )}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute bottom-4 left-4 p-3 rounded-full glass hover:bg-white text-foreground transition-all shadow-md"
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </button>
        </div>

        {/* Right: Product Details & Options */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between text-xs text-primary font-bold mb-1">
                <span>{plant.category} Plant</span>
                <StarRating rating={plant.rating} size="xs" showNumeric={true} reviewsCount={plant.reviewsCount} />
              </div>

              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                {plant.name}
              </h2>
              <p className="text-sm text-muted-foreground italic mt-0.5">{plant.botanicalName}</p>
            </div>

            {/* Price */}
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-foreground">₹{totalPrice}</span>
                {totalOriginalPrice && (
                  <span className="text-sm sm:text-base text-muted-foreground line-through font-medium">
                    ₹{totalOriginalPrice}
                  </span>
                )}
                {plant.discount && (
                  <span className="text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap shrink-0">
                    SAVE {plant.discount}%
                  </span>
                )}
              </div>
              {includePot && (
                <div className="text-[11px] text-primary font-bold mt-1">
                  Includes ₹{potPrice * quantity} for {quantity} handcrafted planter(s)
                </div>
              )}
            </div>

            {/* Refined Packaging Note */}
            <div className="p-3 rounded-2xl bg-secondary/50 border border-border/80 text-foreground text-xs font-semibold flex items-start gap-2.5 shadow-2xs">
              <PackageCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5 min-w-0">
                <span className="font-extrabold uppercase tracking-wide block text-xs">
                  Packaging &amp; Planter Notice
                </span>
                <p className="text-muted-foreground font-medium text-[11px] leading-relaxed">
                  Delivered in an eco-friendly nursery grower polybag with an enriched root-ball. Handcrafted terracotta gamla optional below.
                </p>
              </div>
            </div>

            {/* Interactive Pot Add-on Option Card */}
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
              className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                includePot
                  ? 'bg-muted/80 border-border/90 shadow-2xs'
                  : 'bg-secondary/40 border-border/70 hover:bg-secondary/60'
              }`}
            >
              <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-border/80 shrink-0 bg-background flex items-center justify-center p-1">
                <img
                  src="/images/green-vatika/pots/terracotta_pot_preview.webp"
                  alt="Handcrafted Terracotta Pot"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-extrabold text-foreground truncate">
                    Add Handcrafted Terracotta Pot (+₹{potPrice})
                  </h4>
                  <div
                    className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      includePot
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-muted-foreground/60 bg-transparent'
                    }`}
                  >
                    {includePot && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                  {includePot ? 'Planter added to this order' : 'Natural clay gamla with drainage hole'}
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{plant.description}</p>

            {/* Care Specs Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-secondary/50 border border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                  <Sun className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Sunlight</div>
                  <div className="text-xs font-bold text-foreground">{plant.light}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
                  <Droplets className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Watering</div>
                  <div className="text-xs font-bold text-foreground">{plant.water}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                  <Wind className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Air Purifier</div>
                  <div className="text-xs font-bold text-foreground">{plant.airPurifying ? 'NASA Certified' : 'Standard'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Pet Safe</div>
                  <div className="text-xs font-bold text-foreground">{plant.petFriendly ? 'Yes (Non-toxic)' : 'Keep Away'}</div>
                </div>
              </div>
            </div>

            {/* Option: Size Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Select Pot Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border/80 text-foreground hover:bg-secondary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Option: Pot Color Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Select Planter Color
              </label>
              <div className="flex items-center gap-2">
                {potColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedPotColor(color)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      selectedPotColor === color
                        ? 'border-primary bg-primary text-white'
                        : 'border-border/80 text-foreground hover:bg-secondary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Care Instructions Checklist */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                Expert Care Guide
              </label>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {plant.careInstructions.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quantity & Action Buttons Footer */}
          <div className="pt-6 border-t border-border/60 mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">Quantity</span>
              <div className="flex items-center border border-border rounded-full p-1 bg-secondary/40">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-7 w-7 rounded-full bg-card hover:bg-primary/10 font-bold text-foreground flex items-center justify-center"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-7 w-7 rounded-full bg-card hover:bg-primary/10 font-bold text-foreground flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>

              <button
                onClick={handleWhatsAppBuy}
                className="flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 text-white" /> Order WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
