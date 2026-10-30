import React from 'react';
import { PackageCheck, Sprout, MessageCircle, ThermometerSun } from 'lucide-react';

export const TrustValueStrip: React.FC = () => {
  const perks = [
    {
      icon: PackageCheck,
      title: 'Farm-Fresh Nursery Handpick',
      subtitle: 'Healthy saplings cultivated organically in native soil and prepared for self-pickup',
      badge: 'Zero Shock Guarantee',
    },
    {
      icon: ThermometerSun,
      title: 'Sun & Climate Hardy',
      subtitle: 'Naturally acclimatized varieties grown under Central Indian heat (up to 45°C)',
      badge: 'Acclimatized Flora',
    },
    {
      icon: Sprout,
      title: 'Pot Optional (Save ₹60)',
      subtitle: 'Order in grower nursery polybags from ₹45 or upgrade to artisan terracotta pots',
      badge: 'Honest Pricing',
    },
    {
      icon: MessageCircle,
      title: 'Free Plant Doctor',
      subtitle: 'Direct lifetime care consultation with senior nursery horticulturists via WhatsApp',
      badge: '1-on-1 WhatsApp Support',
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 mb-10 sm:mb-14">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-[#FAF7F2] dark:bg-card rounded-[22px] p-5 sm:p-7 md:p-8 border border-[#EBE5DA] dark:border-border/80 shadow-xl shadow-primary/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3.5 sm:p-4 rounded-[16px] bg-white dark:bg-secondary/40 hover:bg-white/90 border border-[#EBE5DA]/80 dark:border-border/50 hover:border-primary/40 transition-all duration-300 group shadow-xs"
                >
                  <div className="h-12 w-12 rounded-xl bg-[#0A4C36]/10 text-[#0A4C36] dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0A4C36] group-hover:text-white transition-all shadow-xs">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading font-extrabold text-sm sm:text-base text-foreground leading-snug">
                      {perk.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                      {perk.subtitle}
                    </p>
                    <span className="inline-block text-[10px] font-bold text-[#0A4C36] dark:text-emerald-400 uppercase tracking-wider bg-[#0A4C36]/10 px-2.5 py-0.5 rounded-full mt-1">
                      {perk.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
