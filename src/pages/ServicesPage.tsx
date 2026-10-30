import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Sun, Trees, Droplets, CheckCircle2, ChevronRight, Calculator, Phone, Clock, FileText, Wrench } from 'lucide-react';
import { LazyImage } from '../components/LazyImage';

interface ServicesPageProps {
  onBack: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBack }) => {
  // Interactive Project Cost Estimator state
  const [spaceType, setSpaceType] = useState<'balcony' | 'terrace' | 'lawn' | 'doctor'>('balcony');
  const [areaSize, setAreaSize] = useState<number>(100);

  const calculateEstimate = () => {
    switch (spaceType) {
      case 'balcony':
        return Math.max(2499, Math.round(areaSize * 28));
      case 'terrace':
        return Math.max(7999, Math.round(areaSize * 22));
      case 'lawn':
        return Math.max(12999, Math.round(areaSize * 18));
      case 'doctor':
        return 199;
      default:
        return 2499;
    }
  };

  const servicesDetailed = [
    {
      id: 'balcony-setup',
      title: 'Balcony & Terrace Garden Transformation',
      subtitle: 'Complete turnkey setup with customized planters, drip irrigation, and sunlight-matched flowering plants.',
      image: '/images/green-vatika/categories/outdoor.webp',
      price: 'Starting from ₹2,499',
      timeline: '2 to 3 Days Completion',
      scope: [
        'Sunlight Audit & Microclimate Analysis (Direct sun vs shade mapping)',
        'Lightweight Potting Mix (Vermicompost + Cocopeat + Sand to avoid slab load)',
        'Drip Irrigation or Sub-Irrigation Saucer Trays to protect balcony tiles',
        'Acclimatized Flowering Climbers & Shrubs (Bougainvillea, Desi Gulab, Aparajita)',
        '30-Day Growth Guarantee with Free First Repotting Inspection',
      ],
      whatsappMsg: 'Hi Green Vatika, I am interested in your Balcony & Terrace Garden Setup service.',
    },
    {
      id: 'landscape-architecture',
      title: 'Villa, Farmhouse & Lawn Landscape Architecture',
      subtitle: 'Comprehensive exterior grounds planning, green lawn turfing, hedge structuring, and flowering tree avenues.',
      image: '/images/green-vatika/hero/hero_green_vatika_nursery.webp',
      price: 'Starting from ₹9,999',
      timeline: '5 to 10 Days Project',
      scope: [
        'Topographical Soil Quality & pH Assessment',
        'Bermuda / Mexican Grass Turf Laying with Organic Root Activator',
        'Perimeter Hedge Borders (Duranta, Ficus, Yellow Tecoma, Hibiscus)',
        'Specimen Adenium & Royal Palm Anchor Plantings',
        'Automated Timer Irrigation Setup & Monthly Maintenance AMC option',
      ],
      whatsappMsg: 'Hi Green Vatika, I want to discuss Villa & Farmhouse Landscape Architecture.',
    },
    {
      id: 'plant-doctor',
      title: 'Plant Doctor & Home Health Diagnostic Visit',
      subtitle: 'Struggling with yellowing leaves, lack of blooming, root rot, or mealybugs? Our senior horticulturists diagnose and cure your garden.',
      image: '/images/green-vatika/categories/flowering.webp',
      price: '₹199 / Consultation',
      timeline: 'Same-day / 24-hr Scheduling',
      scope: [
        'Visual Inspection of Leaves, Caudex, Roots, and Soil Compaction',
        'Identification of Pests (Spider mites, Aphids, Mealybugs, Leaf miners)',
        'Custom Nutrition & Feeding Plan (Mustard cake, bone meal, seaweed tonic)',
        'Live Pruning Demonstration to Trigger Dormant Flower Buds',
        'Direct WhatsApp Horticulturist Support for 14 Days Following Visit',
      ],
      whatsappMsg: 'Hi Green Vatika, I need a Plant Doctor consultation for my sick garden plants.',
    },
    {
      id: 'corporate-greening',
      title: 'Corporate Office & Commercial Biophilic Design',
      subtitle: 'NASA-certified air-purifying indoor flora, living vertical green walls, and stress-reducing plant displays for workspaces.',
      image: '/images/green-vatika/categories/pots.webp',
      price: 'Custom Corporate Quotes',
      timeline: 'Flexible Turnaround',
      scope: [
        'Low-Light Tolerance Specimen Selection (ZZ Plant, Snake Plant, Areca Palm)',
        'Self-Watering Modern Planters Designed for Office Carpet Floors',
        'Zero-Odor Organic Soil Conditioning',
        'Bi-Weekly Scheduled Pruning, Leaf Polishing, and Health Audit',
        'Hassle-Free Replacement for Any Plant Losing Vitality',
      ],
      whatsappMsg: 'Hi Green Vatika, I would like to inquire about Corporate Office Plant Maintenance.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Site Inspection & Sunlight Audit',
      description: 'We inspect your space in person or via video call to measure square footage, hours of unfiltered sunlight, and water accessibility.',
    },
    {
      step: '02',
      title: 'Custom Plant Selection Matrix',
      description: 'We draft a botanical selection suited to your maintenance availability—selecting species proven to withstand central Indian weather.',
    },
    {
      step: '03',
      title: 'Soil Conditioning & Installation',
      description: 'Our team delivers enriched soil, terracotta or designer planters, installs drip piping, and plants each specimen with root-ball care.',
    },
    {
      step: '04',
      title: '30-Day Growth Warranty',
      description: 'We conduct follow-up health checkups and provide organic feeding schedules so your new garden establishes lush, permanent roots.',
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
              <ShieldCheck className="h-3.5 w-3.5" /> Professional Nursery Services
            </span>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH Top Hero Section: Edge-to-Edge with Seamless Bottom Fade */}
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center overflow-hidden bg-[#0A4C36] mb-14 border-b border-border/40">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/green-vatika/chatgpt_generated/chatgpt_image_6_1254x1254.webp"
            alt="Green Vatika Landscaping and Services"
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
              Turnkey Green Architecture & Horticultural Care
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
              Transforming Spaces Into Flourishing Living Oases
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
              Whether you want a blooming terrace, a pristine farmhouse lawn, or expert treatment for suffering plants, Green Vatika brings senior nursery horticulturists directly to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#estimator"
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm"
              >
                Calculate Estimated Cost
              </a>
              <a
                href="https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20want%20to%20book%20a%20landscaping%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 rounded-xl transition-all text-xs sm:text-sm backdrop-blur-md"
              >
                Book WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 space-y-16">

        {/* Comprehensive Service Cards (Wide Landscape Split Layout) */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Comprehensive Offerings
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Our Professional Horticultural Services
            </h2>
            <p className="text-sm text-muted-foreground">
              Designed specifically for the central Indian climate, ensuring sustainable plant vitality.
            </p>
          </div>

          <div className="space-y-8">
            {servicesDetailed.map((srv, idx) => (
              <div
                key={srv.id}
                className="bg-card rounded-3xl border border-border/80 overflow-hidden shadow-lg hover:border-primary/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Media Side (5 cols) */}
                <div className={`lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <LazyImage
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-emerald-300 border border-emerald-400/30">
                      {srv.price}
                    </span>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                      {srv.timeline}
                    </span>
                  </div>
                </div>

                {/* Details Side (7 cols) */}
                <div className={`lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-4">
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {srv.subtitle}
                    </p>

                    {/* Scope Checklist */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Included Scope of Work:
                      </div>
                      <div className="space-y-2">
                        {srv.scope.map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                    <a
                      href={`https://wa.me/919479480068?text=${encodeURIComponent(srv.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer"
                    >
                      <span>Inquire for This Service</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                    <span className="text-xs text-muted-foreground font-medium">
                      Site visit available across MP
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Process Section */}
        <div className="bg-card rounded-3xl border border-border/80 p-8 sm:p-12 space-y-10 shadow-lg">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Execution Methodology
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              How Our Service Process Works
            </h2>
            <p className="text-sm text-muted-foreground">
              A transparent, 4-step horticultural protocol to ensure 100% plant survival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div
                key={i}
                className="bg-secondary/40 rounded-2xl p-6 border border-border/60 space-y-3 relative overflow-hidden"
              >
                <div className="font-heading font-black text-3xl text-primary/30">
                  {step.step}
                </div>
                <h3 className="font-heading font-extrabold text-base text-foreground">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Instant Cost Estimator */}
        <div id="estimator" className="bg-card rounded-3xl border border-primary/30 p-8 sm:p-12 space-y-8 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <Calculator className="h-3.5 w-3.5" /> Instant Estimate Tool
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Estimate Your Gardening Project
            </h2>
            <p className="text-sm text-muted-foreground">
              Select your space type and approximate area to get an instant cost ballpark.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Input Controls (7 cols) */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground">
                  1. Select Space or Service Type:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSpaceType('balcony')}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-bold ${
                      spaceType === 'balcony'
                        ? 'border-primary bg-primary/10 text-primary shadow-xs'
                        : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    Balcony Garden Setup
                  </button>
                  <button
                    onClick={() => setSpaceType('terrace')}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-bold ${
                      spaceType === 'terrace'
                        ? 'border-primary bg-primary/10 text-primary shadow-xs'
                        : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    Terrace Garden Layout
                  </button>
                  <button
                    onClick={() => setSpaceType('lawn')}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-bold ${
                      spaceType === 'lawn'
                        ? 'border-primary bg-primary/10 text-primary shadow-xs'
                        : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    Farmhouse / Villa Lawn
                  </button>
                  <button
                    onClick={() => setSpaceType('doctor')}
                    className={`p-3 rounded-xl text-left border transition-all text-xs font-bold ${
                      spaceType === 'doctor'
                        ? 'border-primary bg-primary/10 text-primary shadow-xs'
                        : 'border-border bg-secondary/30 text-muted-foreground hover:bg-secondary'
                    }`}
                  >
                    Plant Doctor Visit
                  </button>
                </div>
              </div>

              {spaceType !== 'doctor' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="uppercase tracking-wider text-foreground">
                      2. Approximate Area:
                    </span>
                    <span className="text-primary font-black text-sm">
                      {areaSize} Sq. Ft.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={areaSize}
                    onChange={(e) => setAreaSize(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-secondary rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>50 Sq. Ft. (Small Balcony)</span>
                    <span>500 Sq. Ft.</span>
                    <span>1000+ Sq. Ft. (Large Terrace)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Calculated Output Card (5 cols) */}
            <div className="md:col-span-5 bg-gradient-to-br from-emerald-950 to-green-950 text-white rounded-2xl p-6 sm:p-8 space-y-5 border border-emerald-800/60 shadow-xl">
              <div className="text-xs uppercase tracking-widest text-emerald-300 font-bold">
                Estimated Turnkey Price
              </div>
              <div className="space-y-1">
                <div className="font-heading font-black text-3xl sm:text-4xl text-white">
                  ₹{calculateEstimate().toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-emerald-200">
                  {spaceType === 'doctor' ? 'Per consultation visit' : `Includes plants, enriched soil, planters & setup`}
                </div>
              </div>

              <div className="pt-2 border-t border-white/15 space-y-2 text-xs text-emerald-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Transparent itemized billing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Zero hidden mobilization fees</span>
                </div>
              </div>

              <a
                href={`https://wa.me/919479480068?text=${encodeURIComponent(`Hi Green Vatika, I used your online estimator for ${spaceType} (${areaSize} sq ft). Estimated: ₹${calculateEstimate()}. I want to discuss details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 rounded-xl transition-all shadow-md text-xs sm:text-sm text-center block"
              >
                Confirm Quote on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="bg-card rounded-3xl border border-border/80 p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Common Questions
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Services FAQ
            </h3>
          </div>

          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-1.5">
              <h4 className="font-heading font-bold text-foreground">
                Do you provide soil, planters, and drip pipes, or do I need to buy them?
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                We handle the complete turnkey process. We bring our organic vermicompost soil mix, selected terracotta or fiber planters, drip tubing, and acclimatized plants. You do not need to purchase anything separately.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-1.5">
              <h4 className="font-heading font-bold text-foreground">
                What areas do you service for physical visits?
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                We provide physical site visits across Narsinghpur, Kareli, Gadarwara, Gotegaon, and surrounding regions in Madhya Pradesh. For larger farmhouse projects, we also service Jabalpur and Bhopal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-1.5">
              <h4 className="font-heading font-bold text-foreground">
                What happens if a plant dies after installation?
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Every landscaping project comes with our 30-Day Growth Warranty. If any plant fails to acclimatize despite following the care regimen, our team replaces it free of charge.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
