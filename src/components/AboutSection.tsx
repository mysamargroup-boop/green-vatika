import React from 'react';
import { Sprout, ChevronRight, Leaf, IndianRupee, GraduationCap, Recycle, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    { icon: Leaf, label: 'Healthy Plants' },
    { icon: IndianRupee, label: 'Affordable Prices' },
    { icon: GraduationCap, label: 'Expert Guidance' },
    { icon: Recycle, label: 'Eco Friendly' },
    { icon: Sprout, label: 'Organic Care' },
    { icon: MapPin, label: 'Local Nursery' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Column: Image Stack */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-background">
              <img
                src="https://images.pexels.com/photos/6508425/pexels-photo-6508425.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Green Vatika Nursery Owner caring for plants"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating 10+ Years Badge */}
            <div className="absolute -bottom-8 -right-8 hidden md:block glass rounded-3xl p-6 shadow-2xl max-w-[250px] border border-primary/20">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                  <Sprout className="h-7 w-7" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-xl text-foreground">10+ Years</div>
                  <div className="text-xs font-medium text-muted-foreground">Growing Green Homes</div>
                </div>
              </div>
            </div>

            {/* Overlapping Small Secondary Image */}
            <div className="absolute -top-6 -left-6 hidden md:block w-44 h-44 rounded-3xl overflow-hidden border-4 border-background shadow-xl">
              <img
                src="https://images.pexels.com/photos/11372382/pexels-photo-11372382.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="greenery closeup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Story & Highlights */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 font-bold uppercase tracking-widest text-xs">
              About Green Vatika
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-foreground">
              A trusted nursery <br />
              rooted in <span className="text-primary">green passion</span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Green Vatika is a trusted nursery dedicated to providing healthy, affordable, and premium-quality plants for homes, offices, gardens, balconies, and landscapes. Our mission is to make every space greener while helping people reconnect with nature.
            </p>

            {/* 6 Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary flex items-center justify-center shrink-0">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-foreground">{item.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white rounded-full h-12 px-7 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105"
              >
                Visit Our Nursery <ChevronRight className="h-4 w-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold rounded-full h-12 px-7 bg-background border-2 border-border/80 hover:bg-primary/5 hover:border-primary text-foreground transition-all"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
