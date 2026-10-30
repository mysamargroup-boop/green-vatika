import React, { useState, useEffect } from 'react';
import { CartItem, Plant } from '../types/nursery';
import { LazyImage } from '../components/LazyImage';
import {
  ArrowLeft,
  ShieldCheck,
  Tag,
  Truck,
  Calendar,
  MapPin,
  Phone,
  User,
  Mail,
  CheckCircle2,
  Clock,
  Lock,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Banknote,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface OrderPageProps {
  cartItems: CartItem[];
  directPlant?: { plant: Plant; quantity: number; size: string; color: string } | null;
  onBack: () => void;
  onClearCart: () => void;
  onUpdateQuantity?: (plantId: string, quantity: number, size?: string, color?: string) => void;
  onRemoveItem?: (plantId: string, size?: string, color?: string) => void;
}

// Common Indian Pincode Directory for smart auto-fill
const PINCODE_MAP: Record<string, { city: string; state: string }> = {
  '487001': { city: 'Narsinghpur', state: 'Madhya Pradesh' },
  '487110': { city: 'Gadarwara', state: 'Madhya Pradesh' },
  '487221': { city: 'Kareli', state: 'Madhya Pradesh' },
  '487225': { city: 'Gotegaon', state: 'Madhya Pradesh' },
  '482001': { city: 'Jabalpur', state: 'Madhya Pradesh' },
  '462001': { city: 'Bhopal', state: 'Madhya Pradesh' },
  '452001': { city: 'Indore', state: 'Madhya Pradesh' },
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '110019': { city: 'South Delhi', state: 'Delhi' },
  '122001': { city: 'Gurugram', state: 'Haryana' },
  '201301': { city: 'Noida', state: 'Uttar Pradesh' },
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '411001': { city: 'Pune', state: 'Maharashtra' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh' },
  '302001': { city: 'Jaipur', state: 'Rajasthan' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat' },
};

export const OrderPage: React.FC<OrderPageProps> = ({
  cartItems,
  directPlant,
  onBack,
  onClearCart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  // Local mutable state for items to order if directPlant is used
  const [directOrderState, setDirectOrderState] = useState(directPlant);

  useEffect(() => {
    setDirectOrderState(directPlant);
  }, [directPlant]);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Madhya Pradesh');
  const [orderNotes, setOrderNotes] = useState('');

  // Delivery Fulfillment Mode: Online home delivery is paused; Direct Nursery Pickup is active
  const [deliveryMode, setDeliveryMode] = useState<'nursery_pickup' | 'delivery_paused'>('nursery_pickup');

  // Delivery Scheduling
  const [selectedDateOption, setSelectedDateOption] = useState<'today' | 'tomorrow' | 'dayAfter' | 'custom'>('tomorrow');
  const [customDate, setCustomDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Morning (9:00 AM - 12:00 PM)');

  // Payment Method: 'upi' | 'cod' | 'whatsapp'
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'whatsapp'>('upi');

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Order Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [confirmedOrderSummary, setConfirmedOrderSummary] = useState<any>(null);

  // Derive order items list
  const itemsToOrder = directOrderState
    ? [directOrderState]
    : cartItems.map((item) => ({
        plant: item.plant,
        quantity: item.quantity,
        size: item.selectedSize || '8 inch standard',
        color: item.selectedPotColor || 'Terracotta',
      }));

  const subtotal = itemsToOrder.reduce((acc, item) => acc + item.plant.price * item.quantity, 0);

  // Online delivery is temporarily paused; Direct Nursery Pickup is 100% Free
  const shippingFee = 0;
  const total = Math.max(0, subtotal - discountAmount);

  // Auto-detect Indian city/state on Pincode entry
  const handlePincodeChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 6);
    setPincode(cleaned);
    if (cleaned.length === 6 && PINCODE_MAP[cleaned]) {
      setCity(PINCODE_MAP[cleaned].city);
      setStateName(PINCODE_MAP[cleaned].state);
    }
  };

  // Promo code handler
  const handleApplyPromo = (e?: React.FormEvent, codeToApply?: string) => {
    if (e) e.preventDefault();
    const code = (codeToApply || promoCode).trim().toUpperCase();
    if (!code) return;

    if (code === 'GREEN10' || code === 'WELCOME10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscountAmount(disc);
      setAppliedPromo(code);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } else if (code === 'GREEN50') {
      if (subtotal >= 399) {
        setDiscountAmount(50);
        setAppliedPromo(code);
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
      } else {
        alert('Coupon GREEN50 is valid on orders of ₹399 and above.');
      }
    } else if (code === 'FREESHIP') {
      setDiscountAmount(shippingFee);
      setAppliedPromo(code);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } else {
      alert('Invalid coupon! Try GREEN10 for 10% OFF or GREEN50.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
    setPromoCode('');
  };

  const handleAdjustQuantity = (plantId: string, currentQty: number, delta: number, size: string, color: string) => {
    const nextQty = currentQty + delta;
    if (directOrderState && directOrderState.plant.id === plantId) {
      if (nextQty <= 0) {
        onBack();
      } else {
        setDirectOrderState({ ...directOrderState, quantity: nextQty });
      }
    } else if (onUpdateQuantity) {
      if (nextQty <= 0 && onRemoveItem) {
        onRemoveItem(plantId, size, color);
      } else {
        onUpdateQuantity(plantId, nextQty, size, color);
      }
    }
  };

  const getDateLabel = (): string => {
    const today = new Date();
    if (selectedDateOption === 'today') {
      return `Today (${today.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}) — Same Day Express`;
    }
    if (selectedDateOption === 'tomorrow') {
      const tmrw = new Date(today);
      tmrw.setDate(today.getDate() + 1);
      return `Tomorrow (${tmrw.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}) — Recommended Slot`;
    }
    if (selectedDateOption === 'dayAfter') {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 2);
      return `In 2 Days (${nextDay.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}) — Standard Slot`;
    }
    return customDate ? `Custom Date: ${customDate}` : 'Preferred Date Slot';
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim()) {
      alert('Please fill in your Full Name and Mobile Number.');
      return;
    }

    if (itemsToOrder.length === 0) {
      alert('Your cart is empty. Please add plants to order.');
      onBack();
      return;
    }

    setIsSubmitting(true);

    const generatedId = `GV-${Math.floor(10000 + Math.random() * 90000)}`;
    const schedule = `${getDateLabel()} [${selectedTimeSlot}]`;

    const pickupLocation = 'Green Vatika Nursery, Khairi Naka, Teen Puliya, Niranjan Ward, Narsinghpur (MP) 487001';

    const summary = {
      orderId: generatedId,
      fullName,
      phone,
      email,
      deliveryMode: 'Direct Nursery Self-Pickup (Free)',
      address: pickupLocation,
      schedule,
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI / Instant QR Payment'
          : paymentMethod === 'cod'
          ? 'Pay on Pickup at Nursery'
          : 'WhatsApp Assisted Order',
      items: itemsToOrder.map((item) => ({
        name: item.plant.name,
        botanicalName: item.plant.botanicalName,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        unitPrice: item.plant.price,
        itemTotal: item.plant.price * item.quantity,
        image: item.plant.image,
      })),
      subtotal,
      discountAmount,
      shippingFee: 0,
      total,
      notes: orderNotes,
    };

    setConfirmedOrderId(generatedId);
    setConfirmedOrderSummary(summary);
    setIsSubmitting(false);

    // Trigger celebratory confetti
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });

    // Clear cart in parent
    onClearCart();
  };

  const openWhatsAppConfirmation = () => {
    if (!confirmedOrderSummary) return;

    const itemsFormatted = confirmedOrderSummary.items
      .map(
        (it: any, idx: number) =>
          `${idx + 1}. *${it.name}*\n   Planter: ${it.size} | ${it.color}\n   Qty: ${it.quantity} × ₹${it.unitPrice} = ₹${it.itemTotal}`
      )
      .join('\n\n');

    const msg = encodeURIComponent(
      `*GREEN VATIKA — NURSERY PICKUP ORDER #${confirmedOrderSummary.orderId}*\n` +
      `====================================\n` +
      `*CUSTOMER DETAILS:*\n` +
      `• Name: ${confirmedOrderSummary.fullName}\n` +
      `• Phone: ${confirmedOrderSummary.phone}\n` +
      `• Fulfillment: Direct Nursery Self-Pickup (100% Free)\n` +
      `• Pickup Location: Green Vatika Nursery, Khairi Naka, Teen Puliya, Narsinghpur (MP)\n` +
      `• Pickup Day & Slot: ${confirmedOrderSummary.schedule}\n` +
      `• Payment Mode: ${confirmedOrderSummary.paymentMethod}\n` +
      `${confirmedOrderSummary.notes ? `• Notes: ${confirmedOrderSummary.notes}\n` : ''}` +
      `====================================\n` +
      `*RESERVED PLANTS:*\n\n` +
      `${itemsFormatted}\n\n` +
      `====================================\n` +
      `*BILLING BREAKDOWN:*\n` +
      `• Subtotal: ₹${confirmedOrderSummary.subtotal}\n` +
      `${confirmedOrderSummary.discountAmount > 0 ? `• Discount: -₹${confirmedOrderSummary.discountAmount}\n` : ''}` +
      `• Pickup Service: FREE (Online Home Delivery Paused)\n` +
      `• *TOTAL PAYABLE: ₹${confirmedOrderSummary.total}*\n` +
      `====================================\n` +
      `Hello Green Vatika Team! I have placed an order for direct pickup at Teen Puliya nursery. Please confirm availability.`
    );

    window.open(`https://wa.me/919479480068?text=${msg}`, '_blank');
  };

  // ORDER CONFIRMATION VIEW (SUCCESS STATE)
  if (confirmedOrderId && confirmedOrderSummary) {
    return (
      <div className="pt-24 pb-20 bg-background text-foreground min-h-screen animate-in fade-in duration-300">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          {/* Success Banner Card */}
          <div className="bg-card rounded-3xl border border-border/80 p-6 sm:p-10 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center border-2 border-emerald-500/30">
              <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                Order Confirmed
              </span>
              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-foreground">
                Thank You, {confirmedOrderSummary.fullName.split(' ')[0]}!
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                Your Green Vatika order <strong className="text-foreground font-extrabold">#{confirmedOrderId}</strong> has been received and scheduled for nursery transit preparation.
              </p>
            </div>

            {/* Order Details Grid */}
            <div className="bg-secondary/40 rounded-2xl border border-border/60 p-4 sm:p-6 text-left space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-border/60">
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Fulfillment Mode</span>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{confirmedOrderSummary.deliveryMode}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Address / Location</span>
                  <p className="font-semibold text-foreground mt-0.5">{confirmedOrderSummary.address}</p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Contact Number</span>
                  <p className="font-semibold text-foreground mt-0.5">{confirmedOrderSummary.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-border/60">
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Scheduled Slot</span>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {confirmedOrderSummary.schedule}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">Payment Method</span>
                  <p className="font-semibold text-foreground mt-0.5">{confirmedOrderSummary.paymentMethod}</p>
                </div>
              </div>

              {/* Items List */}
              <div>
                <span className="text-[11px] font-bold text-muted-foreground uppercase block mb-2">
                  Items Ordered ({confirmedOrderSummary.items.length})
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {confirmedOrderSummary.items.map((it: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2 rounded-xl bg-card border border-border/60"
                    >
                      <LazyImage
                        src={it.image}
                        alt={it.name}
                        aspectRatio="aspect-[3/4]"
                        className="h-12 w-9 rounded-lg object-cover border border-border/40 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-xs text-foreground truncate">{it.name}</div>
                        <div className="text-[10px] text-muted-foreground">
                          {it.size} • {it.color}
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-foreground shrink-0">
                        {it.quantity} × ₹{it.unitPrice} = ₹{it.itemTotal}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Amount */}
              <div className="flex items-center justify-between pt-3 border-t border-border/60 font-extrabold text-sm sm:text-base">
                <span>Total Amount Paid / Payable:</span>
                <span className="text-primary font-heading text-lg sm:text-xl">
                  ₹{confirmedOrderSummary.total}
                </span>
              </div>
            </div>

            {/* WhatsApp live dispatch action */}
            <div className="space-y-3 pt-2">
              <button
                onClick={openWhatsAppConfirmation}
                className="w-full py-4 px-6 rounded-full bg-[#146934] hover:bg-[#10562b] text-white font-extrabold text-sm shadow-xl shadow-green-900/20 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5 text-white" />
                <span>Track &amp; Confirm Live on WhatsApp</span>
              </button>

              <button
                onClick={onBack}
                className="w-full py-3 px-6 rounded-full bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs sm:text-sm transition-all border border-border/80 cursor-pointer"
              >
                Continue Shopping Plants
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART GUARD
  if (itemsToOrder.length === 0) {
    return (
      <div className="pt-24 pb-20 bg-background text-foreground min-h-[70vh] flex items-center justify-center animate-in fade-in duration-300">
        <div className="text-center p-8 max-w-md space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-secondary text-muted-foreground flex items-center justify-center border border-border/60">
            <ShoppingBag className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-extrabold text-foreground">Your Order Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Explore our curated flowering plants and botanical nursery collection to start your checkout.
          </p>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Browse Plants Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 pb-24 bg-[#FAF8F5] dark:bg-[#0D1812] text-foreground min-h-screen animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Top Breadcrumb & Trust Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-border/60">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-4 py-2 rounded-full border border-border/80 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Shop
          </button>

          <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full font-bold">
              <Lock className="h-3.5 w-3.5" /> 256-Bit SSL Secure Checkout
            </span>
            <span className="hidden md:inline text-muted-foreground/60">•</span>
            <span className="hidden md:inline font-medium">Helpline: +91 94794 80068</span>
          </div>
        </div>

        {/* Important Notice: Online Home Delivery Paused • Direct Nursery Pickup Active (100% English) */}
        <div className="mb-5 rounded-3xl border-2 border-amber-500/40 bg-amber-500/10 p-4 sm:p-5 text-amber-950 dark:text-amber-100 shadow-sm flex flex-col sm:flex-row items-start gap-4">
          <div className="h-10 w-10 rounded-2xl bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading font-extrabold text-sm sm:text-base text-amber-950 dark:text-amber-100">
                Notice: Online Home Delivery Is Currently Paused
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/25 text-amber-900 dark:text-amber-200 border border-amber-500/40">
                Temporarily Unavailable
              </span>
            </div>
            <p className="text-xs text-amber-900/90 dark:text-amber-200/90 leading-relaxed font-medium">
              Direct online courier and doorstep delivery is temporarily closed. All orders placed on our website are currently fulfilled via <strong>Direct Nursery Self-Pickup (Free of charge)</strong> at Green Vatika Nursery, Khairi Naka, Teen Puliya, Narsinghpur (ready for collection in 2 hours). For special bulk transport or out-of-town delivery requests, please connect directly with our team on WhatsApp at <strong>+91 94794 80068</strong>.
            </p>
          </div>
        </div>

        {/* Nursery Pickup Active Announcement Strip */}
        <div className="mb-6 p-4 rounded-2xl bg-[#0A4C36] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
              <MapPin className="h-4.5 w-4.5 text-emerald-400" />
            </div>
            <div>
              <span className="font-bold text-emerald-200 block text-xs sm:text-sm">
                Direct Nursery Self-Pickup Active — 100% FREE
              </span>
              <span className="text-[11px] text-white/80 font-normal">
                Your plants will be inspected, watered, and prepared for collection within 2 hours.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <span className="text-[10px] sm:text-xs font-extrabold bg-emerald-800/80 text-emerald-200 px-3 py-1 rounded-full border border-emerald-400/20">
              Teen Puliya, Narsinghpur
            </span>
          </div>
        </div>

        {/* Main 2-Column Responsive Checkout Grid */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Cols 1-7): Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Customer Contact Information */}
            <div className="bg-card rounded-3xl border border-border/80 p-5 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-border/60 pb-3.5">
                <div className="h-7 w-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <h2 className="font-heading text-lg sm:text-xl font-extrabold text-foreground">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Anand Verma"
                      className="w-full bg-secondary/40 border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    WhatsApp Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-secondary/40 border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all"
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-0.5 block">
                    Used for live delivery dispatch and plant care advice.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anand@example.com"
                      className="w-full bg-secondary/40 border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Fulfillment & Collection Method */}
            <div className="bg-card rounded-3xl border border-border/80 p-5 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                    2
                  </div>
                  <h2 className="font-heading text-lg sm:text-xl font-extrabold text-foreground">
                    Fulfillment Method
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                  Nursery Pickup Active
                </span>
              </div>

              {/* Delivery Fulfillment Selector (Direct Nursery Pickup Active | Online Delivery Paused) */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
                  Order Collection Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Card 1: Direct Nursery Pickup (Active & Selected) */}
                  <div
                    onClick={() => setDeliveryMode('nursery_pickup')}
                    className="p-4 rounded-2xl border-2 border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs cursor-pointer relative transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" /> Direct Nursery Pickup
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                        Active • 100% Free
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">
                      Inspect &amp; collect your saplings directly from Green Vatika nursery beds. Ready in 2 hours.
                    </p>
                  </div>

                  {/* Card 2: Doorstep Courier Delivery (Disabled / Paused) */}
                  <div
                    className="p-4 rounded-2xl border border-dashed border-border/80 bg-secondary/30 opacity-70 cursor-not-allowed relative"
                    title="Online doorstep delivery is temporarily paused"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" /> Doorstep Delivery
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                        Temporarily Paused
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground/80 leading-snug">
                      Online home courier delivery is currently suspended. All orders are fulfilled via nursery pickup or WhatsApp inquiry.
                    </p>
                  </div>
                </div>

                {/* Direct Nursery Pickup Location Details Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                    <MapPin className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>Nursery Collection Address (Ready within 2 hours):</span>
                  </div>
                  <div className="text-xs text-foreground leading-relaxed pl-6 space-y-1">
                    <div className="font-bold text-sm text-foreground">Green Vatika Nursery</div>
                    <div>Khairi Naka, Teen Puliya, Niranjan Ward, Narsinghpur, Madhya Pradesh 487001</div>
                    <div className="text-muted-foreground font-medium pt-1">
                      Operating Hours: <strong>7:00 AM – 8:00 PM</strong> (Open 7 Days a Week) • Helpline: <strong>+91 94794 80068</strong>
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>No delivery address needed. Simply arrive, show your order ID, and collect your fresh plants.</span>
                  </div>
                </div>

                {/* WhatsApp Custom Freight Inquiry Pill */}
                <div className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 font-medium text-muted-foreground">
                    <WhatsAppIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Need special bulk transportation or out-of-town delivery?</span>
                  </div>
                  <a
                    href="https://wa.me/919479480068?text=Hello%20Green%20Vatika%20Team!%20I%20need%20special%20transportation/delivery%20for%20my%20plant%20order."
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-primary hover:underline whitespace-nowrap"
                  >
                    Chat with Botanist
                  </a>
                </div>
              </div>
            </div>

            {/* Step 3: Preferred Delivery Schedule & Time Slot (Ugaoo Feature) */}
            <div className="bg-card rounded-3xl border border-border/80 p-5 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                    3
                  </div>
                  <h2 className="font-heading text-lg sm:text-xl font-extrabold text-foreground">
                    {deliveryMode === 'nursery_pickup' ? 'Pickup Schedule' : 'Delivery Schedule'}
                  </h2>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                  {deliveryMode === 'nursery_pickup' ? 'Ready in 2 Hours' : 'Nursery Care Dispatch'}
                </span>
              </div>

              {/* Date Option Pills */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-2.5">
                  {deliveryMode === 'nursery_pickup' ? 'Choose Preferred Pickup Day' : 'Choose Preferred Delivery Day'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'today', title: 'Today', subtitle: 'Same Day Express' },
                    { id: 'tomorrow', title: 'Tomorrow', subtitle: 'Recommended Slot' },
                    { id: 'dayAfter', title: 'In 2 Days', subtitle: 'Standard Slot' },
                    { id: 'custom', title: 'Custom Date', subtitle: 'Pick a Day' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDateOption(d.id as any)}
                      className={`p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                        selectedDateOption === d.id
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/20 shadow-xs'
                          : 'border-border/80 bg-secondary/30 hover:border-primary/40'
                      }`}
                    >
                      <div className="font-bold text-xs text-foreground flex items-center justify-between">
                        <span>{d.title}</span>
                        {selectedDateOption === d.id && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        )}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{d.subtitle}</div>
                    </button>
                  ))}
                </div>

                {selectedDateOption === 'custom' && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-secondary/40 border border-primary/30 space-y-1.5 animate-in fade-in duration-200">
                    <label className="block text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> Select Specific Date
                    </label>
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="bg-card border border-border/80 rounded-xl px-3.5 py-2 text-xs font-bold text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                )}
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" /> Preferred Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    'Morning (9:00 AM - 12:00 PM)',
                    'Afternoon (12:00 PM - 4:00 PM)',
                    'Evening (4:00 PM - 8:00 PM)',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2.5 px-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'border-primary bg-primary text-white shadow-xs'
                          : 'border-border/80 bg-secondary/30 text-foreground hover:bg-secondary'
                      }`}
                    >
                      <span>{slot.split(' (')[0]}</span>
                      {selectedTimeSlot === slot && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Notes */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Call upon arrival, leave with security guard"
                  className="w-full bg-secondary/40 border border-border/80 rounded-xl px-4 py-2.5 text-xs font-semibold text-foreground focus:outline-none focus:border-primary focus:bg-card transition-all"
                />
              </div>
            </div>

            {/* Step 4: Payment Method Selection */}
            <div className="bg-card rounded-3xl border border-border/80 p-5 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-border/60 pb-3.5">
                <div className="h-7 w-7 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                  4
                </div>
                <h2 className="font-heading text-lg sm:text-xl font-extrabold text-foreground">
                  Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    paymentMethod === 'upi'
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border/80 bg-secondary/20 hover:border-border'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs sm:text-sm text-foreground flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-primary" /> UPI / QR Code / Net Banking
                      </span>
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Fast &amp; Instant
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pay safely via Google Pay, PhonePe, Paytm, or BHIM QR on delivery confirmation.
                    </p>
                  </div>
                </div>

                {/* Cash on Delivery (COD) Option */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    paymentMethod === 'cod'
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border/80 bg-secondary/20 hover:border-border'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs sm:text-sm text-foreground flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-primary" /> Pay on Pickup at Nursery (Cash or UPI)
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Zero Advance
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Inspect your fresh healthy plants first at our Teen Puliya nursery beds, then pay in cash, Google Pay, or UPI.
                    </p>
                  </div>
                </div>

                {/* WhatsApp Assisted Order Option */}
                <div
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    paymentMethod === 'whatsapp'
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border/80 bg-secondary/20 hover:border-border'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => setPaymentMethod('whatsapp')}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs sm:text-sm text-foreground flex items-center gap-2">
                        <WhatsAppIcon className="h-4 w-4 text-[#146934]" /> WhatsApp Assisted Booking
                      </span>
                      <span className="text-[10px] font-extrabold text-[#146934] bg-emerald-500/10 px-2 py-0.5 rounded">
                        Direct Nursery
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Chat directly with our nursery manager on WhatsApp to customize pot colors or plant sizes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ugaoo-Inspired Botanical Guarantee Banner */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-foreground">
                  Green Vatika 100% Healthy Plant Transit Warranty
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every plant is shipped in breathable root-ball containers with soil-moisture locks. If any plant suffers transit shock or damage, we provide a guaranteed immediate 100% free replacement.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 8-12): Sticky Order Summary & Checkout Action */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-card rounded-3xl border border-border/80 p-5 sm:p-7 shadow-lg space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h2 className="font-heading text-lg font-extrabold text-foreground">
                  Order Summary
                </h2>
                <span className="text-xs font-bold text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                  {itemsToOrder.length} {itemsToOrder.length === 1 ? 'Plant' : 'Plants'}
                </span>
              </div>

              {/* Itemized Cart Items List */}
              <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                {itemsToOrder.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-secondary/30 border border-border/60"
                  >
                    <LazyImage
                      src={item.plant.image}
                      alt={item.plant.name}
                      aspectRatio="aspect-[3/4]"
                      className="h-16 w-12 rounded-xl object-cover border border-border/60 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-foreground truncate">{item.plant.name}</div>
                      <div className="text-[10px] text-muted-foreground font-semibold">
                        {item.size} • {item.color}
                      </div>
                      <div className="text-xs font-extrabold text-primary mt-1">
                        ₹{item.plant.price * item.quantity}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-border/80 rounded-full p-0.5 bg-card shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleAdjustQuantity(item.plant.id, item.quantity, -1, item.size, item.color)
                        }
                        className="h-6 w-6 rounded-full hover:bg-secondary text-foreground flex items-center justify-center transition-colors cursor-pointer"
                        title="Decrease"
                      >
                        {item.quantity === 1 ? <Trash2 className="h-3 w-3 text-red-500" /> : <Minus className="h-3 w-3" />}
                      </button>
                      <span className="w-6 text-center text-xs font-extrabold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleAdjustQuantity(item.plant.id, item.quantity, 1, item.size, item.color)
                        }
                        className="h-6 w-6 rounded-full hover:bg-secondary text-foreground flex items-center justify-center transition-colors cursor-pointer"
                        title="Increase"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="pt-3 border-t border-border/60 space-y-2.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Discount code (e.g. GREEN10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-secondary/50 border border-border rounded-xl pl-9 pr-3 py-2 text-xs uppercase font-extrabold text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleApplyPromo(e)}
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-extrabold transition-all cursor-pointer shadow-xs"
                  >
                    Apply
                  </button>
                </div>

                {appliedPromo ? (
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 p-2 rounded-xl flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> Coupon <strong>{appliedPromo}</strong> applied (-₹{discountAmount})
                    </span>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-red-500 hover:text-red-700 text-[11px] font-bold underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-semibold">
                    <span>Quick Apply:</span>
                    <button
                      type="button"
                      onClick={() => handleApplyPromo(undefined, 'GREEN10')}
                      className="text-primary hover:underline font-bold"
                    >
                      GREEN10 (10% OFF)
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => handleApplyPromo(undefined, 'GREEN50')}
                      className="text-primary hover:underline font-bold"
                    >
                      GREEN50 (₹50 OFF)
                    </button>
                  </div>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 text-xs text-muted-foreground pt-3 border-t border-border/60 font-semibold">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-foreground">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-extrabold">
                    <span>Discount Savings</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Fulfillment Service</span>
                  <span className="text-emerald-600 font-extrabold">FREE (Nursery Pickup)</span>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground/80">
                  <span>Home Courier Delivery</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">Temporarily Paused</span>
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground/80">
                  <span>Estimated Taxes</span>
                  <span>Inclusive of 5% GST</span>
                </div>

                <div className="flex justify-between text-base sm:text-lg font-extrabold text-foreground pt-3 border-t border-border/80">
                  <span>Grand Total</span>
                  <span className="text-xl sm:text-2xl text-primary font-heading">₹{total}</span>
                </div>
              </div>

              {/* Final Order Placement Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-[#146934] hover:bg-[#0f5329] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-green-900/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer disabled:opacity-50"
              >
                <Lock className="h-4.5 w-4.5 text-white/90" />
                <span>Reserve for Nursery Pickup • ₹{total}</span>
              </button>

              <div className="text-[11px] text-center text-muted-foreground font-medium flex items-center justify-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Safe payment &amp; 7-day live plant health replacement guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
