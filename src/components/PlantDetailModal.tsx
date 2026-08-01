import React, { useState } from 'react';
import { Plant } from '../types/nursery';
import { X, Star, Sun, Droplets, Wind, ShieldAlert, Check, ShoppingCart, MessageSquare, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlantDetailModalProps {
  plant: Plant | null;
  onClose: () => void;
  onAddToCart: (plant: Plant, quantity: number, selectedSize: string, selectedPotColor: string) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({ plant, onClose, onAddToCart }) => {
  if (!plant) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>(plant.potSize || '8 inch pot');
  const [selectedPotColor, setSelectedPotColor] = useState<string>('Terracotta');
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);

  const potColors = ['Terracotta', 'Matte White', 'Forest Green', 'Charcoal'];
  const sizeOptions = ['6 inch compact', '8 inch standard', '10 inch luxury'];

  const handleAdd = () => {
    onAddToCart(plant, quantity, selectedSize, selectedPotColor);
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
      `Hi Green Vatika, I would like to purchase:\n🌿 Plant: ${plant.name}\nPot Size: ${selectedSize}\nPot Color: ${selectedPotColor}\nQty: ${quantity}\nPrice: ₹${plant.price * quantity}`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
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

        {/* Left: Product Image */}
        <div className="w-full md:w-1/2 relative bg-muted/30 aspect-square md:aspect-auto">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
          {plant.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-amber-500 shadow-md">
              {plant.badge}
            </span>
          )}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute bottom-4 left-4 p-3 rounded-full glass hover:bg-white text-foreground transition-all shadow-md"
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
          </button>
        </div>

        {/* Right: Product Details & Options */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[90vh]">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between text-xs text-primary font-bold mb-1">
                <span>{plant.category} Plant</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{plant.rating}</span>
                  <span className="text-muted-foreground font-normal">({plant.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                {plant.name}
              </h2>
              <p className="text-sm text-muted-foreground italic mt-0.5">{plant.botanicalName}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-foreground">₹{plant.price * quantity}</span>
              {plant.originalPrice && (
                <span className="text-base text-muted-foreground line-through font-medium">
                  ₹{plant.originalPrice * quantity}
                </span>
              )}
              {plant.discount && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-600">
                  Save {plant.discount}%
                </span>
              )}
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
                <MessageSquare className="h-4 w-4" /> Order WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
