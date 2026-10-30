import React from 'react';
import { MessageCircle, Heart, Stethoscope, PhoneCall, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WhatsAppDoctorBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#0A4C36] text-white relative overflow-hidden">
      {/* Decorative botanical ambient orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          {/* Left Text */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-200 border border-white/15">
              <Stethoscope className="h-3.5 w-3.5" /> 100% Free Plant Doctor Consultation
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white">
              Stuck with plant care? <br />
              <span className="text-emerald-300">We're here to help.</span>
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 font-medium max-w-xl leading-relaxed">
              Yellow leaves? Pest trouble? Wondering which pot size or fertilizer to use? Send a photo on WhatsApp to our senior nursery horticulturists and get instant guidance.
            </p>
          </div>

          {/* Right Action CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919479480068?text=Hello%20Green%20Vatika%20Doctor%2C%20I%20need%20expert%20care%20advice%20for%20my%20plants!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>Chat With Plant Doctor</span>
            </a>

            <a
              href="tel:+919479480068"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
            >
              <PhoneCall className="h-4 w-4" />
              <span>+91 94794 80068</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
