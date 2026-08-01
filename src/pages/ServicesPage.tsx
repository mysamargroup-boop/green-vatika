import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onBack: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBack }) => {
  return (
    <div className="pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-4 py-2.5 rounded-full border border-border/80 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Professional Landscaping Services
          </span>
        </div>

        <ServicesSection />
      </div>
    </div>
  );
};
