import React, { useState } from 'react';
import { CartItem, Plant } from '../types/nursery';
import { LazyImage } from '../components/LazyImage';
import { ArrowLeft, MessageSquare, ShieldCheck, Tag, Truck, Calendar, MapPin, Phone, User, CheckCircle2, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface OrderPageProps {
  cartItems: CartItem[];
  directPlant?: { plant: Plant; quantity: number; size: string; color: string } | null;
  onBack: () => void;
  onClearCart: () => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  cartItems,
  directPlant,
  onBack,
  onClearCart,
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  // Modern Date & Time Picker State
  const [selectedDateOption, setSelectedDateOption] = useState<'today' | 'tomorrow' | 'dayAfter' | 'custom'>('tomorrow');
  const [customDate, setCustomDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Morning (9:00 AM - 12:00 PM)');

  const [orderNotes, setOrderNotes] = useState('');

  // Discount & Promo state
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Derive order items list
  const itemsToOrder: { plant: Plant; quantity: number; size: string; color: string }[] = directPlant
    ? [directPlant]
    : cartItems.map((item) => ({
        plant: item.plant,
        quantity: item.quantity,
        size: item.selectedSize || '8 inch standard',
        color: item.selectedPotColor || 'Terracotta',
      }));

  const subtotal = itemsToOrder.reduce((acc, item) => acc + item.plant.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GREEN10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } else {
      alert('Invalid coupon! Use "GREEN10" for 10% OFF.');
    }
  };

  const getDateLabel = (): string => {
    const today = new Date();
    if (selectedDateOption === 'today') {
      return `Today (${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
    }
    if (selectedDateOption === 'tomorrow') {
      const tmrw = new Date(today);
      tmrw.setDate(today.getDate() + 1);
      return `Tomorrow (${tmrw.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
    }
    if (selectedDateOption === 'dayAfter') {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 2);
      return `In 2 Days (${nextDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
    }
    return customDate || 'Custom Date';
  };

  const handlePlaceOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !address || !pincode) {
      alert('Please fill in your Name, Phone Number, Address, and Pincode.');
      return;
    }

    let itemsFormatted = itemsToOrder
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.plant.name}*\n   Size: ${item.size} | Color: ${item.color}\n   Qty: ${
            item.quantity
          } x ₹${item.plant.price} = ₹${item.plant.price * item.quantity}`
      )
      .join('\n\n');

    const finalDeliverySchedule = `${getDateLabel()} — ${selectedTimeSlot}`;

    const whatsappMessage = encodeURIComponent(
      `🌿 *GREEN VATIKA — NEW NURSERY ORDER*\n` +
      `----------------------------------------\n` +
      `👤 *CUSTOMER DETAILS:*\n` +
      `Name: ${fullName}\n` +
      `Phone: ${phone}\n` +
      `Address: ${address}, ${city} - ${pincode}\n` +
      `📅 *Delivery Schedule:* ${finalDeliverySchedule}\n` +
      `${orderNotes ? `Notes: ${orderNotes}\n` : ''}` +
      `----------------------------------------\n` +
      `🪴 *ITEMS ORDERED:*\n` +
      `${itemsFormatted}\n` +
      `----------------------------------------\n` +
      `💰 *BILLING SUMMARY:*\n` +
      `Subtotal: ₹${subtotal}\n` +
      `${discountAmount > 0 ? `Discount: -₹${discountAmount}\n` : ''}` +
      `Shipping: ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}\n` +
      `*FINAL TOTAL: ₹${total}*\n` +
      `----------------------------------------\n` +
      `Please confirm my order and send payment details!`
    );

    onClearCart();
    window.open(`https://wa.me/919479480068?text=${whatsappMessage}`, '_blank');
  };

  const timeSlots = [
    { label: 'Morning Slot', time: 'Morning (9:00 AM - 12:00 PM)' },
    { label: 'Afternoon Slot', time: 'Afternoon (12:00 PM - 4:00 PM)' },
    { label: 'Evening Slot', time: 'Evening (4:00 PM - 8:00 PM)' },
  ];

  return (
    <div className="pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Header & Back Button (Centered Title) */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 sm:mb-8 text-center">
          <button
            onClick={onBack}
            className="sm:absolute sm:left-0 inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-border/80 shadow-sm whitespace-nowrap shrink-0 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Shop
          </button>
          <h1 className="font-heading text-xl sm:text-3xl font-extrabold text-foreground text-center">
            Order Checkout & WhatsApp Placement
          </h1>
        </div>

        <form onSubmit={handlePlaceOrderWhatsApp} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Shipping Information Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1 Address */}
            <div className="bg-card rounded-3xl border border-border/80 p-6 md:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-border/60 pb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="font-heading text-xl font-extrabold text-foreground">
                  1. Delivery Address & Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-secondary/50 border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-secondary/50 border border-border/80 rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary text-foreground"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House/Flat No., Building Name, Street / Locality"
                    className="w-full bg-secondary/50 border border-border/80 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    City / District *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. New Delhi"
                    className="w-full bg-secondary/50 border border-border/80 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 110001"
                    className="w-full bg-secondary/50 border border-border/80 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 Modernized Date & Time Calendar Selector */}
            <div className="bg-card rounded-3xl border border-border/80 p-6 md:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" />
                  <h2 className="font-heading text-xl font-extrabold text-foreground">
                    2. Select Preferred Delivery Schedule
                  </h2>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">
                  Express Delivery Available
                </span>
              </div>

              {/* Date Option Cards (Modernized Calendar Selector) */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center justify-between">
                  <span>Select Delivery Date</span>
                  <span className="text-[11px] text-primary font-bold">✨ Fast Nursery Slot Dispatch</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'today', title: 'Today', subtitle: 'Same Day Express' },
                    { id: 'tomorrow', title: 'Tomorrow', subtitle: 'Recommended Slot' },
                    { id: 'dayAfter', title: 'In 2 Days', subtitle: 'Standard Slot' },
                    { id: 'custom', title: 'Custom Date', subtitle: 'Pick Specific Day' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDateOption(d.id as any)}
                      className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                        selectedDateOption === d.id
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/30 shadow-md'
                          : 'border-border/80 bg-secondary/30 hover:border-primary/40'
                      }`}
                    >
                      <div className="font-extrabold text-xs sm:text-sm text-foreground flex items-center justify-between">
                        <span>{d.title}</span>
                        {selectedDateOption === d.id && (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground mt-1">
                        {d.subtitle}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedDateOption === 'custom' && (
                  <div className="mt-4 p-4 rounded-2xl bg-secondary/40 border border-primary/30 space-y-2 animate-in fade-in duration-200">
                    <label className="block text-xs font-bold text-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" /> Choose Your Custom Date
                    </label>
                    <div className="relative max-w-xs">
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full bg-card border border-border/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-foreground focus:outline-none focus:border-primary shadow-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Delivery Time Slots */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-primary" /> Select Preferred Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`py-3 px-4 rounded-2xl border text-xs font-extrabold transition-all flex items-center justify-between ${
                        selectedTimeSlot === slot.time
                          ? 'border-primary bg-primary text-white shadow-md'
                          : 'border-border/80 bg-secondary/30 text-foreground hover:bg-secondary'
                      }`}
                    >
                      <span>{slot.label}</span>
                      {selectedTimeSlot === slot.time && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Notes */}
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">
                  Delivery Notes (Optional)
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Call before arrival, leave at door"
                  className="w-full bg-secondary/50 border border-border/80 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary text-foreground"
                />
              </div>
            </div>

            {/* Delivery Guarantee Info */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-6 flex items-start gap-4">
              <ShieldCheck className="h-8 w-8 text-emerald-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-heading font-extrabold text-base text-foreground">
                  Green Vatika 100% Safe Delivery Guarantee
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-medium">
                  All plants are packed in breathable transit boxes with soil-moisture locks. If any plant suffers transit damage, we provide an immediate 100% free replacement.
                </p>
              </div>
            </div>
          </div>

          {/* Right Col: Order Items & Pricing Summary */}
          <div className="space-y-6">
            <div className="bg-card rounded-3xl border border-border/80 p-6 shadow-xl space-y-4">
              <h2 className="font-heading text-lg font-extrabold text-foreground border-b border-border/60 pb-3">
                Order Items ({itemsToOrder.length})
              </h2>

              {/* Items List */}
              <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                {itemsToOrder.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-secondary/40 border border-border/60"
                  >
                    <LazyImage
                      src={item.plant.image}
                      alt={item.plant.name}
                      aspectRatio="aspect-square"
                      className="h-14 w-14 rounded-xl object-cover border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-foreground line-clamp-1">{item.plant.name}</div>
                      <div className="text-[11px] text-muted-foreground font-semibold">
                        {item.size} • {item.color}
                      </div>
                      <div className="text-xs font-extrabold text-primary mt-0.5">
                        {item.quantity} x ₹{item.plant.price} = ₹{item.plant.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Form */}
              <div className="pt-2 border-t border-border/60">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Coupon (GREEN10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-secondary/60 border border-border rounded-xl pl-9 pr-2 py-2 text-xs uppercase font-extrabold text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={applyPromo}
                    className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-primary/20 text-xs font-bold text-foreground"
                  >
                    Apply
                  </button>
                </div>

                {promoApplied && (
                  <div className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Coupon GREEN10 applied (10% OFF)!
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-muted-foreground pt-3 border-t border-border/60 font-semibold">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-foreground">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-extrabold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Nursery Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-foreground pt-3 border-t border-border/80">
                  <span>Final Total</span>
                  <span className="text-xl text-primary font-heading">₹{total}</span>
                </div>
              </div>

              {/* Confirm WhatsApp Order Button (Single Line & Solid WhatsApp Green) */}
              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 px-3 sm:px-6 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#25D366]/30 border border-emerald-300/30 transition-all flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] whitespace-nowrap overflow-hidden text-ellipsis"
              >
                <WhatsAppIcon className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-white shrink-0" />
                <span className="whitespace-nowrap">Confirm Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
