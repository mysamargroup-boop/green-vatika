import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ArrowLeft, Sprout, ShieldCheck, MapPin, Users, Heart } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigateContact }) => {
  return (
    <div className="pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-4 py-2.5 rounded-full border border-border/80 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
            About Green Vatika Nursery
          </span>
        </div>

        {/* Dedicated Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 bg-gradient-to-r from-emerald-900 via-primary to-green-800 text-white shadow-2xl mb-16">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-300 border border-emerald-400/30">
              <Sprout className="h-3.5 w-3.5" /> Our 10-Year Legacy
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Rooted in Passion, Growing Green Homes
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-medium">
              Established in 2016, Green Vatika has grown into one of India’s most trusted plant nurseries spanning 15+ acres of organic greenhouses, serving 5000+ satisfied plant lovers.
            </p>
          </div>
        </div>

        {/* About Component Section */}
        <AboutSection />

        {/* Core Values Grid */}
        <div className="mt-16 bg-card rounded-3xl border border-border/80 p-8 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
              Why Plant Lovers Choose Green Vatika
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              Every plant is hand-reared by senior horticulturists using 100% organic vermicompost and eco-friendly soil mixes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-secondary/40 border border-border/60 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                <Sprout className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base text-foreground">100% Organic Soil</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                No chemical sprays or synthetic boosters. Only natural neem cakes and seaweed bio-fertilizer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/40 border border-border/60 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base text-foreground">Replacement Guarantee</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                7-day leaf freshness warranty. If a plant gets damaged during transit, we replace it free of cost.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/40 border border-border/60 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base text-foreground">Free Plant Doctors</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                Lifetime consultation support via WhatsApp for light, watering, or leaf care advice.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/40 border border-border/60 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base text-foreground">Eco Packaging</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                Plastic-free jute wrapping and recyclable cardboard transit boxes engineered for airflow.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <TestimonialsSection />
        </div>
      </div>
    </div>
  );
};
