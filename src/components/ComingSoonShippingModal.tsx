import React from 'react';
import { Plant, CartItem } from '../types/nursery';
import { X, Truck, Phone, MapPin, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ComingSoonShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant?: Plant | null;
  quantity?: number;
  includePot?: boolean;
  potPrice?: number;
  totalAmount?: number;
  cartItems?: CartItem[];
}

export const ComingSoonShippingModal: React.FC<ComingSoonShippingModalProps> = ({
  isOpen,
  onClose,
  plant,
  quantity = 1,
  includePot = false,
  potPrice = 60,
  totalAmount,
  cartItems,
}) => {
  if (!isOpen) return null;

  // Calculate price if not explicitly provided
  const unitPrice = plant ? plant.price + (includePot ? potPrice : 0) : 0;
  const calculatedTotal = totalAmount ?? (plant ? unitPrice * quantity : 0);

  // Build WhatsApp pre-filled message
  const handleWhatsAppInquiry = () => {
    let messageText = '';
    if (plant) {
      messageText =
        `🌿 *GREEN VATIKA - PLANT PURCHASE INQUIRY*\n\n` +
        `Hello Green Vatika Team,\n` +
        `I would like to inquire about purchasing:\n` +
        `• *Plant:* ${plant.name}\n` +
        `• *Botanical:* ${plant.botanicalName}\n` +
        `• *Quantity:* ${quantity}\n` +
        `• *Planter:* ${includePot ? `Added Handcrafted Planter (+₹${potPrice})` : 'Nursery Grower Polybag (No Pot)'}\n` +
        `• *Estimated Total:* ₹${calculatedTotal}\n\n` +
        `Since online direct courier shipping is coming soon, please let me know about local nursery pickup or personal delivery options in Narsinghpur.`;
    } else if (cartItems && cartItems.length > 0) {
      const itemsSummary = cartItems
        .map(
          (item, idx) =>
            `${idx + 1}. ${item.plant.name} (x${item.quantity}) - ₹${
              (item.plant.price + (item.includePot ? item.potPrice || 60 : 0)) * item.quantity
            }`
        )
        .join('\n');
      messageText =
        `🌿 *GREEN VATIKA - BULK CART INQUIRY*\n\n` +
        `Hello Green Vatika Team,\n` +
        `I have selected the following plants on your website:\n\n${itemsSummary}\n\n` +
        `*Total Cart Value:* ₹${totalAmount || 'Enquire'}\n\n` +
        `Please share availability and how I can collect or receive them in Narsinghpur.`;
    } else {
      messageText =
        `🌿 *GREEN VATIKA - DIRECT INQUIRY*\n\n` +
        `Hello Green Vatika Team,\n` +
        `I am visiting your website and would like to order healthy plants. Please let me know how I can pick up or arrange delivery!`;
    }

    window.open(`https://wa.me/919479480068?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-secondary/80 hover:bg-secondary text-foreground/80 hover:text-foreground transition-all border border-border/40"
          title="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Truck className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
            Online Courier Shipping Coming Soon!
          </span>
        </div>

        {/* Modal Title */}
        <h3 className="font-heading text-2xl sm:text-3xl font-black text-foreground leading-tight">
          Pan-India Direct Courier Shipping Starting Soon 🌿
        </h3>

        <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
          Hum jald hi pure India me secured live-plant doorstep courier packaging &amp; online payment shuru kar rahe hain. Abhi ke liye aap seedhe <strong className="text-foreground">WhatsApp</strong> par order book kar sakte hain ya nursery visit kar sakte hain!
        </p>

        {/* Selected Plant / Cart Preview Box */}
        {plant && (
          <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-secondary/60 border border-border/80 flex items-center gap-3.5">
            <img
              src={plant.image}
              alt={plant.name}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover border border-border/80 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider block">
                Selected Plant
              </span>
              <h4 className="font-heading font-extrabold text-sm sm:text-base text-foreground truncate">
                {plant.name}
              </h4>
              <p className="text-[11px] text-muted-foreground italic truncate">
                {plant.botanicalName}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-xs sm:text-sm font-black text-foreground">
                  ₹{calculatedTotal}
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">
                  (Qty: {quantity})
                </span>
                {includePot ? (
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    +Pot Included (₹{potPrice})
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    Plant Only (Polybag)
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Features / Assurance */}
        <div className="grid grid-cols-2 gap-2.5 mt-5">
          <div className="p-2.5 rounded-xl bg-background border border-border/60 flex items-center gap-2 text-[11px] font-bold text-foreground">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>100% Healthy Plant Guarantee</span>
          </div>
          <div className="p-2.5 rounded-xl bg-background border border-border/60 flex items-center gap-2 text-[11px] font-bold text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>Direct Nursery Wholesale Rates</span>
          </div>
        </div>

        {/* Primary Call to Action: WhatsApp Order Query */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleWhatsAppInquiry}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#146934] hover:bg-[#10562b] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-green-900/25 border border-[#146934] transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01]"
          >
            <WhatsAppIcon className="h-5 w-5 text-white" />
            <span>Chat &amp; Order on WhatsApp</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            <a
              href="tel:+919479480068"
              className="flex-1 py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center justify-center gap-2 border border-border/60 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>Call: 9479480068</span>
            </a>

            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-background hover:bg-secondary text-muted-foreground hover:text-foreground font-bold text-xs border border-border/60 transition-colors"
            >
              Browse Plants
            </button>
          </div>
        </div>

        {/* Nursery Address Footer */}
        <div className="mt-5 pt-4 border-t border-border/60 flex items-start gap-2 text-[11px] text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>
            <strong>Nursery Location:</strong> Teen Puliya, Khairi Naka, Niranjan Ward, Narsinghpur (M.P.) — Open 7 Days (8 AM - 8 PM).
          </span>
        </div>
      </div>
    </div>
  );
};
