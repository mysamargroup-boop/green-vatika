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
  Check,
  ShoppingCart,
  ShoppingBag,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  PackageCheck,
  Leaf,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShieldCheck,
  User,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

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
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [includePot, setIncludePot] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const potPrice = 60;
  const unitPrice = plant.price + (includePot ? potPrice : 0);
  const originalUnitPrice = (plant.originalPrice || Math.round(plant.price * 1.6)) + (includePot ? potPrice : 0);
  const calculatedTotal = unitPrice * quantity;
  const calculatedOriginalTotal = originalUnitPrice * quantity;

  const potColors = ['Terracotta', 'Matte White', 'Forest Green', 'Charcoal'];
  const sizeOptions = ['Standard Grower Bag', 'Medium (1.5-2 ft)', 'Large (2.5+ ft)'];

  // Authentic product images only (Side gallery thumbnails)
  const rawImages = [plant.image, plant.hoverImage].filter(Boolean) as string[];
  const galleryImages = Array.from(new Set(rawImages));
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleAddToCart = () => {
    onAddToCart(plant, quantity, selectedSize, selectedPotColor, includePot, potPrice);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0A4C36', '#146934', '#C88A3B'],
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

  // Always curate 4 recommendations
  const categoryMatches = plantsData.filter((p) => p.category === plant.category && p.id !== plant.id);
  const fallbackMatches = plantsData.filter((p) => p.category !== plant.category && p.id !== plant.id);
  const relatedPlants = [...categoryMatches, ...fallbackMatches].slice(0, 4);

  // FAQs for this plant
  const faqs = [
    {
      q: `How is my ${plant.name} packaged for delivery?`,
      a: `Every ${plant.name} is delivered in a breathable, specialized plant transit box. The root ball is fortified with nutrient-rich soil and a moisture-lock seal to prevent any transit dehydration or root shock.`
    },
    {
      q: 'What is the Green Vatika 7-Day Live Plant Replacement Guarantee?',
      a: 'We guarantee 100% healthy arrival. If your plant suffers transit shock, broken stems, or wilting within 7 days of delivery, simply WhatsApp us a photo (+91 94794 80068) and we will send a free replacement or complete refund immediately.'
    },
    {
      q: 'How should I care for this plant upon unboxing?',
      a: 'Unbox gently, place in a shaded, well-ventilated spot for 24-48 hours to acclimate, and check the topsoil. Water only if the top 1-inch soil feels completely dry. Avoid direct scorching sun on Day 1.'
    },
    {
      q: 'Can I add a decorative ceramic or terracotta gamla?',
      a: 'Yes! You can toggle the "Planter Add-on" (+₹60) to receive an artisanal handcrafted terracotta pot. If not selected, the plant arrives in our professional nursery root-ball grower sleeve.'
    },
    {
      q: 'How do I contact the Plant Doctor for watering or fertilizer questions?',
      a: 'Our senior horticulturists are available on WhatsApp (+91 94794 80068). Send pictures of your plant anytime for free customized watering advice, pest diagnosis, and organic bloom boosters.'
    }
  ];

  // Customer Reviews Data
  const customerReviews = [
    {
      name: 'Kavita Roy',
      location: 'Delhi',
      rating: 5,
      date: '2 days ago',
      title: 'Healthy roots & fresh buds!',
      text: `Ordered ${plant.name} and received it in pristine condition with lush green leaves and multiple fresh buds. Soil was moist and packaging was top-notch.`
    },
    {
      name: 'Sameer Sen',
      location: 'Mumbai',
      rating: 5,
      date: '1 week ago',
      title: 'Surpassed nursery expectations',
      text: 'Sturdy root system and vibrant foliage. Much healthier than local market saplings. Acclimated within 2 days on my balcony.'
    },
    {
      name: 'Anita Verma',
      location: 'Bengaluru',
      rating: 5,
      date: '3 days ago',
      title: 'Exceptional transit packaging',
      text: 'Packed with breathable soil-lock carton. No dropped leaves or soil spillage. Highly recommended for plant lovers!'
    },
    {
      name: 'Dr. Rajesh Patel',
      location: 'Ahmedabad',
      rating: 5,
      date: '5 days ago',
      title: 'Thriving with continuous blooms',
      text: 'The organic soil mix included has great drainage. The plant has started flowering vigorously after following the care guidelines.'
    }
  ];

  return (
    <div className="pt-24 pb-28 sm:pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Back & Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors bg-card px-4 py-2 rounded-full border border-border/80 shadow-xs whitespace-nowrap shrink-0 hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </button>

          <nav aria-label="Breadcrumb" className="text-xs font-semibold text-muted-foreground hidden sm:block">
            Home / Shop / <span className="text-primary font-bold">{plant.category}</span> / {plant.name}
          </nav>
        </div>

        {/* Product Above-The-Fold Grid: Fits Compactly Without Forcing Downward Scroll */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left Column (5 Cols on large displays): Compact 3:4 Image with Side Thumbnails */}
          <div className="lg:col-span-5 flex flex-col-reverse sm:flex-row gap-3 items-start">
            {/* Vertical Thumbnails on Side (Standard E-Commerce Pattern) */}
            {galleryImages.length > 1 && (
              <div className="flex flex-row sm:flex-col gap-2.5 sm:w-16 md:w-20 shrink-0 w-full overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`View product image ${index + 1}`}
                    className={`w-14 sm:w-16 md:w-18 aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all p-0 shrink-0 cursor-pointer ${
                      activeImageIndex === index
                        ? 'border-primary ring-2 ring-primary/30 shadow-md scale-102'
                        : 'border-border/70 opacity-70 hover:opacity-100 hover:border-primary/40'
                    }`}
                  >
                    <LazyImage
                      src={img}
                      alt={`${plant.name} angle ${index + 1}`}
                      aspectRatio="aspect-[3/4]"
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Featured Image: Compact Height (Fits Above the Fold Without Scrolling) */}
            <div className="relative flex-1 w-full max-h-[460px] sm:max-h-[490px] aspect-[3/4] rounded-3xl overflow-hidden border border-border/80 shadow-lg bg-secondary/30 group mx-auto">
              <LazyImage
                src={galleryImages[activeImageIndex] || plant.image}
                alt={plant.name}
                aspectRatio="aspect-[3/4]"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-104"
              />

              {plant.badge && (
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider text-white bg-primary shadow-md border border-white/20 z-10">
                  {plant.badge}
                </span>
              )}

              <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="p-2 sm:p-2.5 rounded-full bg-background/90 backdrop-blur-md hover:bg-background text-foreground shadow-md transition-all border border-border/60 hover:scale-110 cursor-pointer"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                    }`}
                  />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Product link copied to clipboard!');
                  }}
                  aria-label="Share product"
                  className="p-2 sm:p-2.5 rounded-full bg-background/90 backdrop-blur-md hover:bg-background text-foreground shadow-md transition-all border border-border/60 hover:scale-110 cursor-pointer"
                >
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Details, Reviews Beside Price, Action Buttons with Distinct Colors */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Title & Botanical Name */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  {plant.category} Collection
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> In Stock &amp; Freshly Propagated
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-foreground leading-tight">
                {plant.name}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground italic mt-0.5">{plant.botanicalName}</p>
            </div>

            {/* Special Price & Review Rating Box (Reviews Placed Right by Price) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-secondary/50 border border-border/80 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div>
                <div className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">
                  Direct Nursery Price
                </div>
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-foreground font-heading">
                    ₹{calculatedTotal}
                  </span>
                  {calculatedOriginalTotal && (
                    <span className="text-sm sm:text-base text-muted-foreground line-through font-semibold">
                      ₹{calculatedOriginalTotal}
                    </span>
                  )}
                  {plant.discount && (
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                      SAVE {plant.discount}%
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Inclusive of all taxes {includePot ? `• Includes +₹${potPrice * quantity} planter` : '• Delivered in root-ball grower sleeve'}
                </div>
              </div>

              {/* Reviews Right Next to Price */}
              <div className="bg-card px-3.5 py-2 rounded-xl border border-border/80 flex flex-col items-start sm:items-end">
                <StarRating rating={plant.rating} size="sm" showNumeric={true} reviewsCount={plant.reviewsCount} />
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="h-3 w-3" /> 100% Verified Customer Reviews
                </span>
              </div>
            </div>

            {/* Action Buttons with Distinct Colors (Right Below Price) */}
            <div className="space-y-2.5 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Button 1: Buy Now / Proceed to Checkout (Deep Botanical Forest Green #0A4C36) */}
                <button
                  onClick={() => onOpenOrderPage(plant, quantity, selectedSize, selectedPotColor)}
                  className="py-3.5 px-5 rounded-2xl bg-[#0A4C36] hover:bg-[#073626] text-white font-extrabold text-sm shadow-lg shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
                >
                  <ShoppingBag className="h-4.5 w-4.5 text-white" />
                  <span>Buy Now • ₹{calculatedTotal}</span>
                </button>

                {/* Button 2: WhatsApp Direct Order (Official WhatsApp Brand Green #146934) */}
                <button
                  onClick={handleDirectWhatsAppBuy}
                  className="py-3.5 px-5 rounded-2xl bg-[#146934] hover:bg-[#0f5329] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5 text-white" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>

              {/* Button 3: Add to Garden Cart (Distinct Amber/Secondary Tone) */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-5 rounded-2xl bg-secondary/80 hover:bg-secondary text-foreground font-extrabold text-xs sm:text-sm border-2 border-primary/40 hover:border-primary transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingCart className="h-4.5 w-4.5 text-primary" />
                <span>Add to Garden Cart</span>
              </button>
            </div>

            {/* Customizer: Quantity & Planter Options */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground">Quantity:</span>
                  <div className="flex items-center border border-border/80 rounded-full p-0.5 bg-secondary/40">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="h-7 w-7 rounded-full bg-card hover:bg-primary/20 font-bold text-foreground flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3.5 text-xs font-black text-foreground">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="h-7 w-7 rounded-full bg-card hover:bg-primary/20 font-bold text-foreground flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Planter Add-on Toggle */}
                <div
                  role="checkbox"
                  aria-checked={includePot}
                  tabIndex={0}
                  onClick={() => setIncludePot(!includePot)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border cursor-pointer transition-all ${
                    includePot
                      ? 'border-primary bg-primary/10 text-primary font-extrabold'
                      : 'border-border/80 bg-secondary/30 text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-md border flex items-center justify-center ${
                      includePot ? 'border-primary bg-primary text-white' : 'border-muted-foreground bg-card'
                    }`}
                  >
                    {includePot && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <span className="text-xs">Add Handcrafted Terracotta Pot (+₹{potPrice})</span>
                </div>
              </div>
            </div>

            {/* Quick Plant Care Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60">
                <span className="text-[10px] text-muted-foreground font-bold uppercase block">Sunlight</span>
                <span className="font-extrabold text-foreground">{plant.light.split(' ')[0]}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60">
                <span className="text-[10px] text-muted-foreground font-bold uppercase block">Watering</span>
                <span className="font-extrabold text-foreground">{plant.water.split(' ')[0]}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60">
                <span className="text-[10px] text-muted-foreground font-bold uppercase block">Care Level</span>
                <span className="font-extrabold text-foreground">{plant.difficulty}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-secondary/40 border border-border/60">
                <span className="text-[10px] text-muted-foreground font-bold uppercase block">Guarantee</span>
                <span className="font-extrabold text-emerald-600">7-Day Transit</span>
              </div>
            </div>

            {/* Packaging & Safety Reassurance */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-1">
              <div className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Moisture-lock ventilated transit box</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>100% Free replacement warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plant Care Specifications & Detailed Info */}
        <div className="mt-14 sm:mt-16 bg-card rounded-3xl border border-border/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-foreground flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" /> Plant Specifications &amp; Care Guide
            </h3>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              Horticulturist Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plant.careInstructions.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-secondary/40 border border-border/60">
                <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Customer Reviews Section (User: "prodcut page par neche reviews") */}
        <div className="mt-14 sm:mt-16 bg-card rounded-3xl border border-border/80 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                Customer Testimonials
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
                Verified Customer Reviews for {plant.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Real feedback from plant lovers who ordered from Green Vatika Nursery.
              </p>
            </div>

            {/* Scorecard Pill */}
            <div className="flex items-center gap-4 bg-secondary/50 p-4 rounded-2xl border border-border/80">
              <div className="text-center">
                <div className="text-3xl font-black text-foreground font-heading">{plant.rating}</div>
                <div className="text-[10px] text-muted-foreground font-bold">Out of 5.0</div>
              </div>
              <div className="border-l border-border/80 pl-4 space-y-1">
                <StarRating rating={plant.rating} size="sm" />
                <div className="text-xs text-muted-foreground font-semibold">
                  Based on <strong>{plant.reviewsCount}</strong> verified reviews
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {customerReviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-secondary/30 border border-border/70 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          Verified Buyer
                        </span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {rev.location} • {rev.date}
                      </div>
                    </div>
                  </div>
                  <StarRating rating={rev.rating} size="xs" />
                </div>

                <div className="font-bold text-xs sm:text-sm text-foreground">{rev.title}</div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  "{rev.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dedicated Frequently Asked Questions Section (User: "prodcut page par neche faqs") */}
        <div className="mt-14 sm:mt-16 bg-card rounded-3xl border border-border/80 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-border/60 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-flex items-center gap-1">
              <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked Questions
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground mt-2">
              Everything You Need to Know About Ordering {plant.name}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Common questions answered by our nursery horticulturists.
            </p>
          </div>

          {/* Accordion Questions */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isOpen ? 'border-primary/40 bg-secondary/30 shadow-xs' : 'border-border/70 bg-card'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in duration-200 border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct WhatsApp Question Helper */}
          <div className="p-4 rounded-2xl bg-secondary/50 border border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-muted-foreground font-medium text-center sm:text-left">
              Have a question not listed here? Ask our senior nursery staff directly.
            </span>
            <a
              href={`https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20have%20a%20question%20about%20${encodeURIComponent(plant.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-primary hover:underline font-extrabold whitespace-nowrap"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 text-primary" />
              <span>Ask on WhatsApp (+91 9479480068)</span>
            </a>
          </div>
        </div>

        {/* Handpicked Recommendations Grid */}
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
                  className="group relative rounded-2xl sm:rounded-3xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30 flex items-center justify-center">
                    <LazyImage
                      src={p.image}
                      alt={p.name}
                      aspectRatio="aspect-[3/4]"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-3.5 sm:p-4 space-y-2">
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                      {p.category}
                    </div>
                    <div className="font-heading font-extrabold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {p.name}
                    </div>
                    <div className="flex items-baseline justify-between pt-1 border-t border-border/40">
                      <span className="text-sm sm:text-base font-black text-foreground">₹{p.price}</span>
                      <StarRating rating={p.rating} size="xs" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Action Bar */}
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
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border/80 shadow-2xs transition-colors shrink-0 cursor-pointer"
            title="Add to Cart"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
          </button>

          <button
            onClick={() => onOpenOrderPage(plant, quantity, selectedSize, selectedPotColor)}
            className="py-2.5 px-3.5 rounded-xl bg-[#0A4C36] hover:bg-[#073626] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            Buy Now
          </button>

          <button
            onClick={handleDirectWhatsAppBuy}
            className="p-2.5 rounded-xl bg-[#146934] hover:bg-[#10562b] text-white font-extrabold text-xs flex items-center justify-center shadow-sm transition-all shrink-0 cursor-pointer"
            title="Buy on WhatsApp"
            aria-label="Buy on WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      </aside>
    </div>
  );
};
