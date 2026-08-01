import React from 'react';
import { CategorySection } from '../components/CategorySection';
import { ArrowLeft, Leaf } from 'lucide-react';

interface CategoriesPageProps {
  onBack: () => void;
  onSelectCategory: (cat: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onBack, onSelectCategory }) => {
  return (
    <div className="pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-4 py-2.5 rounded-full border border-border/80 shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
            <Leaf className="h-3.5 w-3.5" /> All Plant Collections
          </span>
        </div>

        <CategorySection onSelectCategory={onSelectCategory} />
      </div>
    </div>
  );
};
