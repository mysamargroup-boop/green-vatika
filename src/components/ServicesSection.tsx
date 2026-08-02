import React, { useState } from 'react';
import { servicesData } from '../data/mockData';
import { Service } from '../types/nursery';
import { Compass, ShieldCheck, Home, Layers, Gift, Stethoscope, Check, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return Compass;
      case 'ShieldCheck': return ShieldCheck;
      case 'Home': return Home;
      case 'Layers': return Layers;
      case 'Gift': return Gift;
      case 'Stethoscope': return Stethoscope;
      default: return Compass;
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setSelectedService(null);
    }, 2500);
  };

  return (
    <section id="services" className="py-10 md:py-14 relative scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            Professional Nursery Services
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            Complete Landscaping & Plant Care
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            From balcony transformations to corporate green walls, our expert horticulturists handle it all.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((srv) => {
            const IconComponent = getIcon(srv.iconName);
            return (
              <div
                key={srv.id}
                className="group rounded-3xl bg-card border border-border/80 p-6 md:p-8 shadow-xl hover:border-primary/50 transition-all flex flex-col justify-between hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold text-foreground">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {srv.description}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                        <Check className="h-4 w-4 text-primary shrink-0" /> {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-border/60 mt-6 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{srv.priceTag}</span>
                  <button
                    onClick={() => setSelectedService(srv)}
                    className="px-4 py-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold transition-all"
                  >
                    Book Service Inquiry
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Booking Modal (Centered) */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="fixed inset-0" onClick={() => setSelectedService(null)} />
          <div className="relative z-10 w-full max-w-lg bg-background rounded-3xl border border-primary/20 shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-foreground transition-colors border border-border/40"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs font-bold text-primary uppercase">Service Inquiry</span>
              <h3 className="font-heading text-2xl font-extrabold text-foreground mt-1">
                {selectedService.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Fill in your contact details for a free site visit & consultation quote.
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8" />
                </div>
                <h4 className="font-heading text-xl font-bold text-foreground">Inquiry Received!</h4>
                <p className="text-xs text-muted-foreground">
                  Our senior horticulturist will call you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">Phone Number (WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">Site Location / Address</label>
                  <input
                    type="text"
                    required
                    placeholder="City, Locality"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground mb-1">Specific Requirements (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your space size, sunlight, or preferences..."
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-foreground"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all"
                >
                  Submit Consultation Request
                </button>

                <div className="text-center pt-2">
                  <a
                    href="https://wa.me/919479480068"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-500" /> Prefer instant WhatsApp chat instead?
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
