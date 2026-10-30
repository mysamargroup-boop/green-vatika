import React from 'react';
import { Check, X, AlertTriangle, ShieldCheck, Leaf, Sparkles } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const comparisonData = [
    {
      feature: 'Climate Acclimatization',
      greenVatika: 'Grown in native Central Indian open beds (up to 45°C) — zero transplant shock.',
      roadside: 'Forced in delicate shade nets; wilt and drop leaves within 7-10 days.',
      genericOnline: 'Confined in dark shipping cartons for 5–7 days; high transit mortality.',
    },
    {
      feature: 'Root & Potting Mix',
      greenVatika: '90-Day organic vermicompost, aged cow dung, perlite & aerated coco-peat.',
      roadside: 'Dense, suffocating red clay or cheap roadside silt that causes root rot.',
      genericOnline: 'Unfertilized raw coco-peat with zero native micro-nutrients.',
    },
    {
      feature: 'Pest & Fungal Shield',
      greenVatika: '3-tier inspection + certified organic neem oil wash. 100% pest-free.',
      roadside: 'Common hidden mealybugs, spider mites & scale that infect other home plants.',
      genericOnline: 'Heavily chemical-treated before transit, wearing off after unboxing.',
    },
    {
      feature: 'Honest Pricing & Pot Choice',
      greenVatika: 'Direct grower rates from ₹45; pot-optional pricing saves ₹60 per plant.',
      roadside: 'Random unstandardized rates with hidden charges and poor pot quality.',
      genericOnline: 'Heavy markups (₹399 – ₹899) with non-negotiable cheap plastic containers.',
    },
    {
      feature: 'Post-Purchase Plant Care',
      greenVatika: 'Free lifetime 1-on-1 WhatsApp consultation with senior nursery horticulturists.',
      roadside: 'Zero support or care advice once the transaction is completed.',
      genericOnline: 'Generic AI chatbots or unhelpful email ticket queues with slow turnaround.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Heading: Ugaao Editorial Style - Strictly NO Capsule Pill Labels */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 space-y-2">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Green Vatika vs The Rest
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-medium max-w-xl mx-auto px-4">
            See why plant lovers trust our authentic nursery over roadside vendors and impersonal online marketplaces.
          </p>
        </div>

        {/* Comparison Table / Responsive Matrix */}
        <div className="overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full min-w-[760px] border-collapse text-left rounded-3xl overflow-hidden shadow-xl border border-border/80 bg-card">
            <thead>
              <tr className="border-b border-border/60">
                <th className="py-5 px-6 font-heading font-bold text-sm text-muted-foreground w-1/4">
                  Botanical Quality Parameter
                </th>
                <th className="py-5 px-6 bg-[#0A4C36] text-white font-heading font-extrabold text-base w-1/3 rounded-t-2xl sm:rounded-t-none relative">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                    <span>Green Vatika Nursery</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 block mt-0.5">
                    Authentic Central MP Nursery
                  </span>
                </th>
                <th className="py-5 px-6 font-heading font-bold text-sm text-foreground/80 w-1/5 bg-secondary/30">
                  Local Roadside Nurseries
                </th>
                <th className="py-5 px-6 font-heading font-bold text-sm text-foreground/80 w-1/5 bg-secondary/10">
                  Generic Online Stores
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs sm:text-sm">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                  {/* Parameter Name */}
                  <td className="py-4 px-6 font-bold text-foreground">
                    {row.feature}
                  </td>

                  {/* Green Vatika Highlight Column */}
                  <td className="py-4 px-6 bg-[#0A4C36]/5 dark:bg-[#0A4C36]/15 border-x-2 border-[#0A4C36] font-medium text-foreground">
                    <div className="flex items-start gap-2.5">
                      <div className="h-5 w-5 rounded-full bg-[#0A4C36] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{row.greenVatika}</span>
                    </div>
                  </td>

                  {/* Roadside Nurseries */}
                  <td className="py-4 px-6 text-muted-foreground bg-secondary/10">
                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                        <X className="h-3.5 w-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{row.roadside}</span>
                    </div>
                  </td>

                  {/* Generic Online Stores */}
                  <td className="py-4 px-6 text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span className="leading-snug">{row.genericOnline}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
