import React from 'react';
import { Sun, Sprout, HeartPulse, CheckCircle2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { LazyImage } from './LazyImage';

interface NurseryPillarsSectionProps {
  onExploreClick?: () => void;
  onVisitClick?: () => void;
}

export const NurseryPillarsSection: React.FC<NurseryPillarsSectionProps> = ({
  onExploreClick,
  onVisitClick,
}) => {
  const pillars = [
    {
      icon: Sun,
      title: 'Sun-Hardened in Open Beds',
      highlight: '45°C Climate Hardy',
      description:
        'Raised directly under natural Indian sun & humidity in Teen Puliya, Narsinghpur. Unlike delicate greenhouse-forced plants, ours never wilt or drop leaves when placed on your balcony.',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_6_1254x1254.webp',
      badge: 'Zero Transplant Shock',
    },
    {
      icon: Sprout,
      title: '90-Day Organic Potting Science',
      highlight: 'Vermicompost Enriched',
      description:
        'Cultivated in slow-cured cow dung manure, aerated coco-peat, and natural neem-shielded soil. We never use cheap suffocating red clay or unfertile roadside silt.',
      image: '/images/green-vatika/categories/flowering.webp',
      badge: 'Certified Organic Soil',
    },
    {
      icon: HeartPulse,
      title: 'Lifetime 1-on-1 Plant Doctor',
      highlight: 'Direct WhatsApp Concierge',
      description:
        'Yellow leaves? Pest trouble? Send a quick photo on WhatsApp (+91 94794 80068). Our senior nursery horticulturists guide you through watering, feeding, and repotting forever.',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_2_1254x1254.webp',
      badge: 'Free Lifetime Support',
    },
  ];

  const stats = [
    { value: '5,000+', label: 'Happy Plant Parents', sub: 'Across Central India' },
    { value: '150+', label: 'Botanical Varieties', sub: 'Sun & Shade Hardy' },
    { value: '4.9 ★', label: 'Google Nursery Rating', sub: 'Verified Gardeners' },
    { value: '100%', label: 'Organic Care Guarantee', sub: 'Zero Chemical Stress' },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] dark:bg-card/40 border-y border-[#EBE5DA] dark:border-border/60 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        {/* Section Header: Modern Clean Outfit Typography (Strictly NO Capsule Pill Badges) */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16 space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Why Green Vatika Plants Flourish in Indian Homes
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-2xl mx-auto">
            Unlike commercial sellers who force plants under delicate shade cloths, our saplings are raised with love, native soil beds, and organic nutrition.
          </p>
        </div>

        {/* 3 Modern Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14 md:mb-18">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-[20px] bg-white dark:bg-card border border-[#EBE5DA] dark:border-border/70 overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
                  <LazyImage
                    src={item.image}
                    alt={item.title}
                    aspectRatio="aspect-[16/10]"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-white/95 dark:bg-card/95 text-[#0A4C36] dark:text-emerald-400 shadow-md border border-[#EBE5DA] dark:border-border/60">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary">
                      <Icon className="h-4 w-4" />
                      <span>{item.highlight}</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EBE5DA] dark:border-border/50 flex items-center justify-between text-xs font-bold text-[#0A4C36] dark:text-emerald-400">
                    <span>Nursery Quality Verified</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Metrics Bar */}
        <div className="rounded-[20px] bg-white dark:bg-card border border-[#EBE5DA] dark:border-border/70 p-6 sm:p-8 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#EBE5DA] dark:divide-border/50">
            {stats.map((st, i) => (
              <div key={i} className={`space-y-1 ${i > 0 ? 'pt-4 md:pt-0' : ''}`}>
                <div className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-[#0A4C36] dark:text-emerald-400">
                  {st.value}
                </div>
                <div className="font-bold text-xs sm:text-sm text-foreground">
                  {st.label}
                </div>
                <div className="text-[11px] text-muted-foreground font-medium">
                  {st.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
