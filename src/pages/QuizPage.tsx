import React from 'react';
import { ArrowLeft, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { PlantQuiz } from '../components/PlantQuiz';
import { Plant } from '../types/nursery';

interface QuizPageProps {
  onBack: () => void;
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onBack, onSelectPlant, onAddToCart }) => {
  return (
    <div className="pt-36 sm:pt-40 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 space-y-12">
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
              <Sparkles className="h-3.5 w-3.5" /> AI Botanical Matcher
            </span>
          </div>
        </div>

        {/* Distinct Hero Header */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white shadow-2xl border border-emerald-800/40 text-center max-w-4xl mx-auto">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md inline-block border border-white/15">
              Personalized Plant Recommender
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Find Your Ideal Plant Match in 60 Seconds
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl mx-auto">
              Answer 3 quick questions about your balcony sunlight, watering routine, and space to discover the exact acclimatized species that will thrive in your home.
            </p>
          </div>
        </div>

        {/* The Interactive Plant Quiz Component */}
        <div className="max-w-4xl mx-auto">
          <PlantQuiz
            onSelectPlant={onSelectPlant}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
};
