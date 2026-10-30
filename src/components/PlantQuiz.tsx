import React, { useState } from 'react';
import { Plant } from '../types/nursery';
import { plantsData } from '../data/mockData';
import { RotateCcw, CheckCircle2, Sun, Home, Shield, ShoppingCart } from 'lucide-react';

interface PlantQuizProps {
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
  isPageMode?: boolean;
}

export const PlantQuiz: React.FC<PlantQuizProps> = ({ onSelectPlant, onAddToCart, isPageMode = false }) => {
  const [step, setStep] = useState<number>(1);
  const [placement, setPlacement] = useState<string>('');
  const [light, setLight] = useState<string>('');
  const [effort, setEffort] = useState<string>('');

  const resetQuiz = () => {
    setStep(1);
    setPlacement('');
    setLight('');
    setEffort('');
  };

  const getMatchedPlants = (): Plant[] => {
    return plantsData.filter((plant) => {
      if (placement === 'balcony' && plant.category !== 'Outdoor' && plant.category !== 'Flowering' && plant.category !== 'Fruit') {
        return false;
      }
      if (light === 'low' && plant.light === 'Direct Sunlight') {
        return false;
      }
      if (effort === 'easy' && plant.difficulty !== 'Easy') {
        return false;
      }
      return true;
    }).slice(0, 3);
  };

  const content = (
    <div className="container mx-auto px-4 md:px-8 max-w-5xl lg:max-w-6xl">
      {/* Header - Aligned Center */}
      <div className="text-center mb-8 sm:mb-10 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-block border border-primary/20">
          Personalized Botanical Matcher
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Find Your Perfect Plant Match
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto px-4 leading-relaxed">
          Answer 3 quick questions and our Green Vatika algorithm will recommend the ideal acclimatized plants for your home.
        </p>
      </div>

      {/* Quiz Box - Single Spacious Box */}
      <div className="bg-card rounded-3xl border border-border/80 shadow-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full bg-secondary rounded-full h-2.5 mb-8 sm:mb-10 overflow-hidden">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Question Step 1: Placement */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 mx-auto">
                <Home className="h-6 w-6 text-primary shrink-0" />
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground text-center">
                  1. Where do you plan to place your new plant?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Select the primary space where your plant will live
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                { id: 'living', title: 'Living Room', desc: 'Spacious indoor ambient area' },
                { id: 'bedroom', title: 'Bedroom Nightstand', desc: 'Oxygen purifying night companion' },
                { id: 'balcony', title: 'Sunny Balcony & Terrace', desc: 'Outdoor direct sunlight & fresh air' },
                { id: 'office', title: 'Office / Study Desk', desc: 'Compact desk top green accent' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setPlacement(opt.id);
                    setStep(2);
                  }}
                  className={`p-6 rounded-2xl border text-center transition-all hover:border-primary hover:shadow-md hover:scale-[1.01] ${
                    placement === opt.id ? 'border-primary bg-primary/10 shadow-xs' : 'border-border/80 bg-secondary/30'
                  }`}
                >
                  <div className="font-bold text-foreground text-base sm:text-lg mb-1">{opt.title}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question Step 2: Sunlight */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 mx-auto">
                <Sun className="h-6 w-6 text-amber-500 shrink-0" />
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground text-center">
                  2. How much sunlight does that spot receive?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Natural sunlight determines which botanical species will thrive
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {[
                { id: 'direct', title: 'Direct Sunlight', desc: '6+ hours of full sun' },
                { id: 'bright', title: 'Bright Indirect Light', desc: 'Near large window, bright shade' },
                { id: 'low', title: 'Low / Artificial Light', desc: 'Away from windows, AC room' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setLight(opt.id);
                    setStep(3);
                  }}
                  className={`p-6 rounded-2xl border text-center transition-all hover:border-primary hover:shadow-md hover:scale-[1.01] ${
                    light === opt.id ? 'border-primary bg-primary/10 shadow-xs' : 'border-border/80 bg-secondary/30'
                  }`}
                >
                  <div className="font-bold text-foreground text-base sm:text-lg mb-1">{opt.title}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question Step 3: Care Effort */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 mx-auto">
                <Shield className="h-6 w-6 text-emerald-600 shrink-0" />
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground text-center">
                  3. What is your gardening experience / effort level?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                We will match varieties suited to your daily watering routine
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                { id: 'easy', title: 'Beginner / Hard-to-Kill', desc: 'Water once a week, low effort' },
                { id: 'moderate', title: 'Gardening Enthusiast', desc: 'Happy to mist, prune & fertilize' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setEffort(opt.id);
                    setStep(4);
                  }}
                  className={`p-6 rounded-2xl border text-center transition-all hover:border-primary hover:shadow-md hover:scale-[1.01] ${
                    effort === opt.id ? 'border-primary bg-primary/10 shadow-xs' : 'border-border/80 bg-secondary/30'
                  }`}
                >
                  <div className="font-bold text-foreground text-base sm:text-lg mb-1">{opt.title}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Heading Aligned Center */}
            <div className="text-center space-y-2 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 mx-auto">
                <CheckCircle2 className="h-7 w-7 text-primary shrink-0" />
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground text-center">
                  Here Are Your Top Recommended Matches!
                </h3>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Based on your light & care preferences, these nursery-grown species will thrive effortlessly in your space.
              </p>
            </div>

            {/* Matched Plant Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {getMatchedPlants().map((plant) => (
                <div
                  key={plant.id}
                  className="bg-secondary/30 rounded-2xl border border-border/80 p-5 flex flex-col justify-between hover:border-primary hover:shadow-lg transition-all group"
                >
                  <div>
                    <div className="relative overflow-hidden rounded-xl mb-4 aspect-square bg-card">
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {plant.originalPrice && plant.originalPrice > plant.price && (
                        <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
                          Save {Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-base sm:text-lg text-foreground line-clamp-1">{plant.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                      {plant.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-extrabold text-foreground text-xl">₹{plant.price}</span>
                      {plant.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">₹{plant.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectPlant(plant)}
                        className="px-3.5 py-1.5 rounded-full bg-secondary text-xs font-bold text-foreground hover:bg-primary/20 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onAddToCart(plant)}
                        className="p-2.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-transform active:scale-95 shadow-xs"
                        aria-label={`Add ${plant.name} to cart`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Retake Quiz Centered */}
            <div className="flex justify-center items-center pt-8 border-t border-border/60 mt-8">
              <button
                onClick={resetQuiz}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border bg-card hover:bg-secondary text-sm font-bold text-foreground shadow-xs hover:border-primary transition-all hover:scale-105"
              >
                <RotateCcw className="h-4 w-4 text-primary" /> Retake Plant Matcher Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (isPageMode) {
    return <div id="section-quiz" className="w-full">{content}</div>;
  }

  return (
    <section id="section-quiz" className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative scroll-mt-20 border-y border-border/40">
      {content}
    </section>
  );
};
