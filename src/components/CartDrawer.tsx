import React, { useState } from 'react';
import { CartItem } from '../types/nursery';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, Tag, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (
    plantId: string,
    quantity: number,
    selectedSize?: string,
    selectedPotColor?: string
  ) => void;
  onRemoveItem: (
    plantId: string,
    selectedSize?: string,
    selectedPotColor?: string
  ) => void;
  onClearCart: () => void;
  onNavigateCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateCheckout,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.plant.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingThreshold = 999;
  const shippingFee = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GREEN10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    } else {
      alert('Invalid promo code. Try "GREEN10" for 10% OFF!');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsList = cartItems
      .map(
        (item, i) =>
          `${i + 1}. ${item.plant.name} (${item.selectedSize || 'Standard'}, ${item.selectedPotColor || 'Terracotta'}) x${item.quantity} = ₹${
            item.plant.price * item.quantity
          }`
      )
      .join('\n');

    const orderText = encodeURIComponent(
      `🌿 *NEW ORDER FROM GREEN VATIKA WEBSITE*\n\n*Items Ordered:*\n${itemsList}\n\n*Summary:*\nSubtotal: ₹${subtotal}\nDiscount: -₹${discountAmount}\nShipping: ${
        shippingFee === 0 ? 'FREE' : `₹${shippingFee}`
      }\n*Total Amount: ₹${total}*\n\nPlease confirm availability and payment details!`
    );

    window.open(`https://wa.me/919876543210?text=${orderText}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card border-l border-border shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-lg font-extrabold text-foreground">
                Your Garden Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-secondary/50 border-b border-border/40">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="flex items-center gap-1 text-primary">
                <Truck className="h-3.5 w-3.5" /> Free Express Shipping
              </span>
              <span>
                {subtotal >= shippingThreshold
                  ? 'Unlocked 🎉'
                  : `Add ₹${shippingThreshold - subtotal} more`}
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-5xl">🪴</div>
                <h3 className="font-heading text-lg font-bold text-foreground">Your cart is empty</h3>
                <p className="text-xs text-muted-foreground">
                  Explore our nursery collection and add fresh greenery to your cart.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemKey = `${item.plant.id}-${item.selectedSize || 'standard'}-${item.selectedPotColor || 'terracotta'}`;
                return (
                  <div
                    key={itemKey}
                    className="flex items-center gap-4 p-3 rounded-2xl border border-border/80 bg-card hover:border-primary/30 transition-all shadow-sm"
                  >
                    <img
                      src={item.plant.image}
                      alt={item.plant.name}
                      className="h-16 w-16 rounded-xl object-cover border border-border shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-foreground line-clamp-1">{item.plant.name}</h4>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {item.selectedSize || 'Standard'} • {item.selectedPotColor || 'Terracotta'}
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-extrabold text-sm text-foreground">
                          ₹{item.plant.price * item.quantity}
                        </span>

                        {/* Quantity buttons */}
                        <div className="flex items-center border border-border rounded-full p-0.5 bg-secondary/40">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.plant.id,
                                item.quantity - 1,
                                item.selectedSize,
                                item.selectedPotColor
                              )
                            }
                            className="h-6 w-6 rounded-full hover:bg-card text-xs font-bold text-foreground flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-foreground">{item.quantity}</span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.plant.id,
                                item.quantity + 1,
                                item.selectedSize,
                                item.selectedPotColor
                              )
                            }
                            className="h-6 w-6 rounded-full hover:bg-card text-xs font-bold text-foreground flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onRemoveItem(item.plant.id, item.selectedSize, item.selectedPotColor)
                      }
                      className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-border/60 bg-card space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. GREEN10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-xl pl-9 pr-3 py-2 text-xs uppercase font-bold text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-secondary hover:bg-primary/20 text-xs font-bold text-foreground"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  ✓ Coupon GREEN10 applied (10% Discount)!
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-muted-foreground pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Promo Discount</span>
                    <span className="font-bold">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-foreground pt-2 border-t border-border/60">
                  <span>Total Amount</span>
                  <span className="text-lg text-primary">₹{total}</span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 rounded-full bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" /> Instant WhatsApp Checkout
                </button>
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateCheckout) onNavigateCheckout();
                  }}
                  className="w-full py-3 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Order Checkout <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
