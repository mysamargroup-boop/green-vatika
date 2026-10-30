import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PlantQuiz } from '../components/PlantQuiz';
import { Plant } from '../types/nursery';

interface QuizPageProps {
  onBack: () => void;
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onBack, onSelectPlant, onAddToCart }) => {
  return (
    <div className="pt-32 sm:pt-36 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl space-y-8">
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

        {/* The Interactive Plant Quiz Component (Single Box, Spacious Width) */}
        <div>
          <PlantQuiz
            isPageMode={true}
            onSelectPlant={onSelectPlant}
            onAddToCart={onAddToCart}
          />
        </div>
      </div>
    </div>
  );
};
