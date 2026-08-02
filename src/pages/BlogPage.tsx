import React from 'react';
import { BlogSection } from '../components/BlogSection';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface BlogPageProps {
  onBack: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBack }) => {
  return (
    <div className="pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-border/80 shadow-sm whitespace-nowrap shrink-0 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <span className="text-[11px] sm:text-xs font-extrabold text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            <BookOpen className="h-3.5 w-3.5" /> Gardening Knowledge Base
          </span>
        </div>

        <BlogSection />
      </div>
    </div>
  );
};
