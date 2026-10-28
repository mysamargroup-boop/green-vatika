import React from 'react';
import { ShoppingCart, MapPin, ChevronRight, Star, Leaf, IndianRupee, GraduationCap, Recycle, Sprout } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[100vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Background Gradients & Overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-background to-[#F1F8E9] dark:from-[#08140c] dark:via-background dark:to-[#0c1c11]" />
        <div className="absolute inset-0 opacity-20 dark:opacity-30">
          <img
            src="/images/green-vatika/hero/hero_green_vatika_nursery.webp"
            alt="Green Vatika Nursery background"
            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-overlay"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* Static Ambient Accent Orbs */}
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
      <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

      {/* GPU-Accelerated Lag-Free Falling Leaves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <Leaf
            key={i}
            className="absolute text-primary/30 animate-falling-leaf pointer-events-none"
            style={{
              left: `${12 + i * 16}%`,
              width: `${20 + (i % 3) * 6}px`,
              height: `${20 + (i % 3) * 6}px`,
              animationDuration: `${10 + i * 2.5}s`,
              animationDelay: `${-i * 2.2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Headline & Content */}
          <div className="space-y-6">
            {/* Top Rating Badge */}
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 shadow-sm border border-primary/20">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 shrink-0" />
              <span className="text-xs font-bold tracking-wider uppercase text-primary">
                Rated 4.9 ★ • 5000+ Happy Customers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight text-foreground">
              Bringing Nature <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-emerald-500 to-primary bg-clip-text text-transparent">
                  Closer to Your Home
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full text-accent/60"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path d="M2 9 Q100 -2 198 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Discover healthy indoor plants, outdoor plants, fruit plants, flowering plants, succulents, and gardening essentials — all in one place.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#featured"
                className="inline-flex items-center justify-center gap-2 text-base font-bold text-white rounded-full h-14 px-8 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 group"
              >
                <ShoppingCart className="h-5 w-5" /> Shop Plants
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 text-base font-semibold rounded-full h-14 px-8 bg-background/80 hover:bg-primary/10 text-foreground border-2 border-primary/30 backdrop-blur shadow-sm transition-all hover:border-primary"
              >
                <MapPin className="h-5 w-5 text-primary" /> Visit Nursery
              </a>
            </div>

            {/* Customer Social Proof Avatars */}
            <div className="pt-4 flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  src="https://i.pravatar.cc/80?img=47"
                  className="h-11 w-11 rounded-full border-2 border-background object-cover shadow-sm"
                  alt="customer"
                />
                <img
                  src="https://i.pravatar.cc/80?img=12"
                  className="h-11 w-11 rounded-full border-2 border-background object-cover shadow-sm"
                  alt="customer"
                />
                <img
                  src="https://i.pravatar.cc/80?img=32"
                  className="h-11 w-11 rounded-full border-2 border-background object-cover shadow-sm"
                  alt="customer"
                />
                <img
                  src="https://i.pravatar.cc/80?img=45"
                  className="h-11 w-11 rounded-full border-2 border-background object-cover shadow-sm"
                  alt="customer"
                />
                <img
                  src="https://i.pravatar.cc/80?img=15"
                  className="h-11 w-11 rounded-full border-2 border-background object-cover shadow-sm"
                  alt="customer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="text-xs font-medium text-muted-foreground mt-0.5">
                  Trusted by <span className="font-bold text-foreground">5000+ plant lovers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Collage & Floating Stats */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Background Image Tile */}
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 rotate-2 border-4 border-background">
                <img
                  src="/images/green-vatika/hero/hero_green_vatika_nursery.webp"
                  alt="green vatika hero plants"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Smaller Overlapping Image 1 - Desi Rose */}
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-3xl overflow-hidden shadow-xl border-4 border-background">
                <img
                  src="/images/green-vatika/flowering/Red_Rose_Gulab_Rs70.webp"
                  alt="Desi Red Rose in Gamla"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Smaller Overlapping Image 2 - Adenium Bonsai */}
              <div className="absolute -top-6 -right-6 w-40 h-40 rounded-3xl overflow-hidden shadow-xl border-4 border-background">
                <img
                  src="/images/green-vatika/outdoor/Adenium_Bonsai_Rs100.webp"
                  alt="Adenium Desert Rose Bonsai"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Glass Stats Badge Left */}
              <div className="absolute top-10 -left-10 glass rounded-2xl p-4 shadow-xl border border-white/40 animate-floaty">
                <div className="text-2xl font-heading font-extrabold text-primary">5000+</div>
                <div className="text-xs font-semibold text-muted-foreground">Plants Sold</div>
              </div>

              {/* Floating Glass Stats Badge Right */}
              <div
                className="absolute bottom-16 -right-8 glass rounded-2xl p-4 shadow-xl border border-white/40 animate-floaty"
                style={{ animationDelay: '-3s' }}
              >
                <div className="text-2xl font-heading font-extrabold text-primary">100+</div>
                <div className="text-xs font-semibold text-muted-foreground">Plant Varieties</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar (6 Feature Badges) */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 glass rounded-3xl p-4 shadow-lg border border-primary/10">
          <div className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-primary/5 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Leaf className="h-5 w-5" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-foreground">Healthy Plants</div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-primary/5 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <IndianRupee className="h-5 w-5" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-foreground">Affordable Prices</div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-primary/5 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-foreground">Expert Guidance</div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-primary/5 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Recycle className="h-5 w-5" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-foreground">Eco Friendly</div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-primary/5 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Sprout className="h-5 w-5" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-foreground">Organic Care</div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-primary/5 transition-colors">
            <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="text-xs sm:text-sm font-bold text-foreground">Local Nursery</div>
          </div>
        </div>
      </div>
    </section>
  );
};
