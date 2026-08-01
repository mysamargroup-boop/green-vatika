import React from 'react';
import { testimonialsData } from '../data/mockData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary/40 relative scroll-mt-20 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            ★ ★ ★ ★ ★ Customer Stories
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            Loved by 5000+ Plant Enthusiasts
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Real feedback from home gardeners, interior designers, and nursery visitors across India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialsData.map((t) => (
            <div
              key={t.id}
              className="bg-card rounded-3xl p-6 md:p-8 border border-border/80 shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between relative"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-foreground/90 text-sm md:text-base leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <div className="font-heading font-bold text-sm text-foreground flex items-center gap-1.5">
                      {t.name}
                      {t.verified && (
                        <span title="Verified Buyer">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary fill-primary/20" />
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full hidden sm:inline-block">
                  Purchased: {t.purchasedPlant}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
