import React from 'react';
import { ArrowLeft, Sprout, ShieldCheck, MapPin, Users, Heart, Award, CheckCircle2, Trees, Sun, Clock, Phone, ChevronRight } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigateContact }) => {
  const milestones = [
    {
      year: '2016',
      title: 'Humble Beginnings in Narsinghpur',
      description: 'Founded with a modest 1-acre plot near Teen Puliya, Khairi Naka, propagating native desi gulab and marigold with natural compost.',
    },
    {
      year: '2019',
      title: 'Expansion to 15-Acre Organic Polyhouses',
      description: 'Expanded production to large-scale shade net polyhouses, establishing dedicated mother beds for Adenium bonsai and Bougainvillea grafting.',
    },
    {
      year: '2022',
      title: 'Terracotta Kiln Partnership',
      description: 'Partnered directly with local clay artisans to introduce porous terracotta gamlas tailored specifically to prevent Indian summer root rot.',
    },
    {
      year: '2024',
      title: '5,000+ Gardeners Landmark',
      description: 'Reached over 5,000 active balcony and terrace gardeners across Madhya Pradesh with personalized WhatsApp care support.',
    },
    {
      year: '2026',
      title: 'Direct Nursery Digital Platform',
      description: 'Launched our direct digital presence offering transparent rates, authentic botanical specifications, and honest nursery packaging.',
    },
  ];

  const pillars = [
    {
      icon: Sun,
      title: 'Natural Sun Acclimatization',
      description: 'Our plants are grown under open central Indian weather (tested up to 47°C summer heat). They never suffer transition shock when moved to your sunny balcony.',
    },
    {
      icon: Sprout,
      title: 'Living Organic Microbial Soil',
      description: 'Every sapling is potted with our signature mix of aged cow dung vermicompost, river loam, and neem cake, ensuring vigorous root microbial health.',
    },
    {
      icon: Trees,
      title: 'Bonsai & Grafting Excellence',
      description: 'Decade-old grafting expertise in Adenium caudex sculpting and multi-color Bougainvilleas that deliver dense, continuous flower clusters.',
    },
    {
      icon: ShieldCheck,
      title: '100% Honest Nursery Transparency',
      description: 'No hidden packaging tricks. We clearly state pot inclusions, provide exact live rates, and ship in protective nursery grower bags or clay pots.',
    },
  ];

  const team = [
    {
      name: 'Rajkumar Patel',
      role: 'Founder & Master Horticulturist',
      experience: '15+ Years in Tropical Flora Cultivation',
      specialty: 'Specimen Adenium Bonsai & Landscaping Architecture',
    },
    {
      name: 'Ramesh Patel',
      role: 'Greenhouse & Propagation Head',
      experience: '12+ Years Nursery Operations',
      specialty: 'Desi Gulab Grafting & Organic Vermicomposting',
    },
    {
      name: 'Kavita Verma',
      role: 'Plant Health & Soil Nutrition Specialist',
      experience: '8+ Years Botanical Research',
      specialty: 'Organic Pest Protection & Plant Doctor Consultations',
    },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      {/* Top Breadcrumb Bar */}
      <div className="container mx-auto px-4 md:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors bg-card px-4 py-2 rounded-full border border-border shadow-xs hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-primary/20">
              <Sprout className="h-3.5 w-3.5" /> 10+ Years Nursery Legacy
            </span>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH Top Hero Section: Edge-to-Edge with Seamless Bottom Fade */}
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center overflow-hidden bg-[#0A4C36] mb-14 border-b border-border/40">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/green-vatika/chatgpt_generated/chatgpt_image_3_1254x1254.webp"
            alt="Green Vatika Nursery Polyhouses"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[8000ms]"
          />
          {/* Dark Scrim Over Image for High-Contrast Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          
          {/* Seamless Bottom Gradient Fade into Website Background */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content aligned within container */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 py-16 sm:py-20">
          <div className="max-w-3xl space-y-5 text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-black/40 px-3.5 py-1.5 rounded-full backdrop-blur-md inline-block border border-white/15">
              Rooted in Passion, Growing Green Homes
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              About Green Vatika Nursery
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
              Based in Niranjan Ward, Teen Puliya, Narsinghpur, Green Vatika is dedicated to growing hardy, authentic Indian flora that brings nature, fragrance, and serenity directly into everyday Indian homes.
            </p>

            {/* Impact Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 max-w-2xl">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-lg">
                <div className="font-heading font-black text-2xl sm:text-3xl text-emerald-300">10+</div>
                <div className="text-xs text-white/80 font-medium mt-0.5">Years Heritage</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-lg">
                <div className="font-heading font-black text-2xl sm:text-3xl text-amber-300">15+</div>
                <div className="text-xs text-white/80 font-medium mt-0.5">Acres Greenhouses</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-lg">
                <div className="font-heading font-black text-2xl sm:text-3xl text-teal-300">50K+</div>
                <div className="text-xs text-white/80 font-medium mt-0.5">Saplings Grown</div>
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-lg">
                <div className="font-heading font-black text-2xl sm:text-3xl text-lime-300">5,000+</div>
                <div className="text-xs text-white/80 font-medium mt-0.5">Happy Gardeners</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 space-y-16">

        {/* Narrative & Philosophy Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-border/80">
              <img
                src="/images/green-vatika/hero/hero_green_vatika_nursery.webp"
                alt="Green Vatika Greenhouse in Narsinghpur"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-card border border-border p-5 rounded-2xl shadow-xl max-w-[240px] hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-sm text-foreground">Verified Local Nursery</div>
                  <div className="text-[11px] text-muted-foreground">Khairi Naka, Narsinghpur</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Our Story & Ground Reality
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
              Why Commercial Nursery Plants Die, and How We Do It Differently
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Most commercially sold decorative plants come from artificial, climate-controlled greenhouses where they are fed synthetic liquid fertilizers and packed into dense clay soil. The moment they are placed on an Indian balcony under 42°C heat, the leaves scorch, buds drop, and the plant perishes within weeks.
              </p>
              <p>
                At <strong className="text-foreground">Green Vatika</strong>, every single mother plant and sapling is cultivated in open polyhouses exposed to the genuine seasons of Madhya Pradesh. We use natural organic vermicompost, seasoned mustard cake (sarson khali), and well-aerated sandy loam soil.
              </p>
              <p>
                When you buy from us, you get a robust, sun-hardened plant with an active root network that thrives from Day 1 in your garden.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onNavigateContact}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer"
              >
                <span>Visit Us in Person</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <a
                href="https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20want%20to%20know%20more%20about%20your%20nursery."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground font-bold px-6 py-3 rounded-xl transition-all border border-border text-xs sm:text-sm"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* The 4 Core Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              The Green Vatika Philosophy
            </h2>
            <p className="text-sm text-muted-foreground">
              Horticultural standards that ensure healthy growth in every garden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={i}
                  className="bg-card rounded-2xl border border-border/80 p-6 space-y-4 hover:border-primary/40 hover:shadow-lg transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nursery Heritage Milestones Timeline */}
        <div className="bg-card rounded-3xl border border-border/80 p-8 sm:p-12 space-y-10 shadow-lg">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Chronicle
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Our Journey Over the Past Decade
            </h2>
            <p className="text-sm text-muted-foreground">
              How a small local nursery blossomed into a trusted botanical sanctuary.
            </p>
          </div>

          <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-6 space-y-8">
            {milestones.map((item, i) => (
              <div key={i} className="relative pl-6 sm:pl-8 group">
                {/* Timeline Node */}
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-card group-hover:scale-125 transition-transform" />
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-primary uppercase tracking-wider">
                    {item.year}
                  </span>
                  <h3 className="font-heading font-extrabold text-base sm:text-lg text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nursery Specialist Team */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              The Plantsmen
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Meet Our Horticulturists
            </h2>
            <p className="text-sm text-muted-foreground">
              Experienced hands dedicated to root aeration, balanced nutrition, and healthy plant development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border/80 p-6 space-y-4 hover:border-primary/40 shadow-sm transition-all"
              >
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center font-heading font-extrabold text-foreground text-sm border border-border">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-foreground">
                    {member.name}
                  </h3>
                  <div className="text-xs font-bold text-primary mt-0.5">
                    {member.role}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">
                    {member.experience}
                  </div>
                </div>
                <div className="pt-3 border-t border-border/60 text-xs text-muted-foreground">
                  <strong className="text-foreground">Specialty:</strong> {member.specialty}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Physical Visit Invitation Banner */}
        <div className="rounded-3xl bg-secondary/50 border border-border p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto">
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-foreground">
            Experience the Greenery in Person
          </h3>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Walk through our 15-acre greenhouses, inspect live blooming Adenium and Desi Rose benches, and consult our horticulturists directly.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={onNavigateContact}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Get Directions to Nursery
            </button>
            <a
              href="tel:9479480068"
              className="bg-card hover:bg-muted text-foreground border border-border font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all"
            >
              Call 9479480068
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
