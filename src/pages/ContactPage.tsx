import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronRight, Navigation, Car, Train, ShieldCheck, Heart } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

interface ContactPageProps {
  onBack: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gardenType, setGardenType] = useState('Balcony / Terrace');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Green Vatika,\nName: ${name || 'Visitor'}\nPhone: ${phone || 'Not provided'}\nGarden Type: ${gardenType}\nMessage: ${message || 'I would like to visit the nursery / inquire about plants.'}`
    );
    window.open(`https://wa.me/919479480068?text=${text}`, '_blank');
  };

  return (
    <div className="pt-36 sm:pt-40 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 space-y-16">
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-5">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors bg-card px-4 py-2 rounded-full border border-border shadow-xs hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-primary/20">
              <MapPin className="h-3.5 w-3.5" /> Physical Nursery & Support
            </span>
          </div>
        </div>

        {/* Distinct Hero Header */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white shadow-2xl border border-emerald-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md inline-block border border-white/15">
              Visit Us in Narsinghpur, Madhya Pradesh
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Connect With Green Vatika Nursery
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Come walk through our polyhouses, hand-select your flowering specimens, or talk directly with our master propagators for personalized garden planning.
            </p>
          </div>
        </div>

        {/* Power 2-Column Split: Comprehensive Guide (Left) & Inquiry Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Nursery Details & Amenities (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-card rounded-3xl border border-border/80 p-6 sm:p-8 space-y-6 shadow-md">
              <div className="space-y-2">
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Nursery Location
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
                  Our Facility & Operating Hours
                </h2>
              </div>

              {/* Address Micro-Card */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-secondary/40 border border-border/60">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm sm:text-base text-foreground">
                    Green Vatika Nursery
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    Niranjan Ward, Teen Puliya, Khairi Naka, Narsinghpur, Madhya Pradesh – 487001
                  </p>
                  <div className="mt-2 text-xs font-bold text-primary">
                    Landmark: Near Teen Puliya Bridge, Khairi Naka Road
                  </div>
                </div>
              </div>

              {/* Operating Timings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <Clock className="h-4 w-4" /> Nursery Visiting Hours
                  </div>
                  <div className="text-xs text-foreground font-semibold">
                    Open All 7 Days (Mon - Sun)
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Morning: <strong>8:00 AM – 1:00 PM</strong><br />
                    Evening: <strong>4:00 PM – 8:00 PM</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-primary">
                    <Phone className="h-4 w-4" /> Direct Nursery Desk
                  </div>
                  <div className="text-xs text-foreground font-semibold">
                    Call & WhatsApp Support
                  </div>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Primary: <a href="tel:9479480068" className="font-bold text-primary hover:underline">9479480068</a></div>
                    <div>Support: <a href="tel:9179812429" className="font-bold text-primary hover:underline">9179812429</a></div>
                  </div>
                </div>
              </div>

              {/* Nursery Amenities Badges */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  Visitor Amenities Available on Location:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-foreground">
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Free On-Site Parking</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Guided Plant Walk</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Live Potting Station</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-background border border-border">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Safe Root-Ball Packing</span>
                  </div>
                </div>
              </div>

              {/* Transit Directions */}
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-primary" /> How to Reach the Nursery:
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Train className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span><strong>By Train:</strong> 3.5 km (approx. 10 mins) from Narsinghpur Railway Station. Direct autos and e-rickshaws available to Teen Puliya.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Car className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span><strong>By Road:</strong> Located on Khairi Naka connector road with wide vehicle access and turning space for cars and pickup trucks.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Pre-Visit / Inquiry Form (5 cols) */}
          <div className="lg:col-span-5 bg-card rounded-3xl border border-border/80 p-6 sm:p-8 space-y-6 shadow-md">
            <div className="space-y-2">
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Direct Contact
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-foreground">
                Send a Query or Pre-Book
              </h3>
              <p className="text-xs text-muted-foreground">
                Planning a nursery visit or need customized plant guidance? Leave a message.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
                <h4 className="font-heading font-bold text-foreground">
                  Inquiry Received!
                </h4>
                <p className="text-xs text-muted-foreground">
                  Our nursery team will contact you shortly via phone or WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Phone / WhatsApp Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Garden or Inquiry Type:
                  </label>
                  <select
                    value={gardenType}
                    onChange={(e) => setGardenType(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="Balcony / Terrace">Balcony / Terrace Flowering Plants</option>
                    <option value="Adenium Bonsai">Adenium Bonsai & Specimen Plants</option>
                    <option value="Terracotta Gamlas">Handcrafted Terracotta Pots & Soil Mix</option>
                    <option value="Landscaping Service">Full Lawn / Farmhouse Landscaping</option>
                    <option value="Plant Doctor Visit">Sick Plants / Plant Doctor Diagnosis</option>
                    <option value="Physical Nursery Visit">Planning a Physical Nursery Visit</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Message / Plant Wishlist:
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what plants you need, your balcony sunlight hours, or when you plan to visit..."
                    className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> Send Direct to WhatsApp
                  </button>

                  <button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/80 text-foreground border border-border font-bold py-2.5 rounded-xl transition-all text-xs cursor-pointer"
                  >
                    Submit as Website Callback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Nursery FAQ */}
        <div className="bg-card rounded-3xl border border-border/80 p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Visiting Guidance
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              Frequently Asked Visit Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50 space-y-1.5">
              <h4 className="font-heading font-bold text-foreground">
                Can I handpick my own plants from the greenhouse beds?
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Yes! Every visitor is free to walk through our shade polyhouses and choose the exact plant, flower color, and caudex shape they prefer.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50 space-y-1.5">
              <h4 className="font-heading font-bold text-foreground">
                Are terracotta pots and potting soil available on the spot?
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Yes, we keep 8-inch and 10-inch handcrafted clay gamlas and ready-to-use organic vermicompost soil bags in stock for instant purchase and potting.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50 space-y-1.5">
              <h4 className="font-heading font-bold text-foreground">
                How do you pack plants for transport in a personal car?
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                We place all root-balled saplings into secure nursery grower sleeves with moisture-retention wrapping to prevent soil spills inside your vehicle.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50 space-y-1.5">
              <h4 className="font-heading font-bold text-foreground">
                Is parking available for cars and two-wheelers?
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Yes, we have dedicated wide parking space in front of the nursery premises near Teen Puliya with easy turnaround space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
