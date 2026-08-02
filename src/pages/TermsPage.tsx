import React from 'react';
import { ArrowLeft, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
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
            <FileText className="h-3.5 w-3.5" /> Terms of Service
          </span>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-primary to-emerald-900 text-white p-8 md:p-12 shadow-2xl space-y-4 mb-12 border border-slate-700/60">
          <div className="h-12 w-12 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold">Terms & Store Guidelines</h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-medium">
            Please review the terms governing orders, delivery timelines, and care guarantees at Green Vatika Nursery.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 bg-card rounded-3xl border border-border/80 p-8 shadow-xl">
          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> 1. Ordering & WhatsApp Confirmation
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium pl-7">
              Orders placed on Green Vatika generate a structured WhatsApp summary sent directly to our nursery dispatch team. An order is confirmed once payment or Cash-On-Delivery confirmation is acknowledged by our team.
            </p>
          </section>

          <hr className="border-border/60" />

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> 2. Delivery & Dispatch Timelines
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium pl-7">
              Local Narsinghpur orders are delivered within 24-48 hours. Express pan-India orders are dispatched within 2 business days in ventilated plant boxes with organic moisture soil wrapping.
            </p>
          </section>

          <hr className="border-border/60" />

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> 3. Plant Care Responsibilities
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium pl-7">
              Plants are living organisms. Every plant order includes a detailed sunlight, watering, and soil care card. Customers are encouraged to unpack plants immediately upon arrival and provide indirect sunlight.
            </p>
          </section>

          <hr className="border-border/60" />

          <section className="space-y-3">
            <h2 className="font-heading text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" /> 4. Customer Support & Disputes
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium pl-7">
              For order modifications, pincode inquiries, or bulk corporate plant orders, write to support@greenvatika.co or message our WhatsApp team at +91-98765-43210.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
