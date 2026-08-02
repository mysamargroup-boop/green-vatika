import React from 'react';
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onBack }) => {
  return (
    <div className="pt-28 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-border/80 shadow-sm whitespace-nowrap shrink-0 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <span className="text-[11px] sm:text-xs font-extrabold text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            <ShieldCheck className="h-3.5 w-3.5" /> Customer Data Privacy
          </span>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-primary to-green-900 text-white p-8 md:p-12 shadow-2xl space-y-4 mb-12 border border-emerald-500/30">
          <div className="h-12 w-12 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold">Privacy Policy & Guarantees</h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-medium">
            At Green Vatika Nursery, we respect your privacy and protect your personal information. Last updated: August 2026.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 bg-card rounded-3xl border border-border/80 p-8 shadow-xl">
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> 1. Information We Collect
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium pl-7">
              When you place an order or contact us via WhatsApp, we collect basic customer delivery details such as your name, shipping address, pincode, contact number, and selected plant preferences solely for order fulfillment and delivery tracking.
            </p>
          </section>

          <hr className="border-border/60" />

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> 2. Use of Information
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium pl-7">
              Your details are exclusively used to dispatch organic nursery plants, issue WhatsApp order updates, process returns under our 7-day plant freshness warranty, and provide lifetime horticulturist advice. We never sell or share your data with third parties.
            </p>
          </section>

          <hr className="border-border/60" />

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> 3. 7-Day Plant Freshness & Transit Warranty
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium pl-7">
              All Green Vatika plants are hand-packed in eco-friendly protective cardboard boxes. If your plant arrives damaged or unhealthy, send us a photo on WhatsApp within 7 days for a 100% free plant replacement or full refund.
            </p>
          </section>

          <hr className="border-border/60" />

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> 4. Contact Nursery Help Desk
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium pl-7">
              If you have any questions regarding your personal information, please write to us at <span className="font-bold text-primary">support@greenvatika.co</span> or visit us at Niranjan Ward, Teen Puliya, Khairi Naka, Narsinghpur, MP - 487001.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
