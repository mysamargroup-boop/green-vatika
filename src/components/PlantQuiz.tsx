import React, { useState } from 'react';
import { Plant } from '../types/nursery';
import { plantsData } from '../data/mockData';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, Sun, Home, Shield, ShoppingCart } from 'lucide-react';

interface PlantQuizProps {
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
}

export const PlantQuiz: React.FC<PlantQuizProps> = ({ onSelectPlant, onAddToCart }) => {
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

  return (
    <section id="quiz" className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative scroll-mt-20 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Interactive Matcher
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            Find Your Perfect Plant Match
          </h2>
          <p className="text-muted-foreground text-base max-w-lg mx-auto">
            Answer 3 quick questions and our Green Vatika algorithm will recommend the ideal plants for your home.
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-card rounded-3xl border border-border/80 shadow-2xl p-6 md:p-10 relative overflow-hidden">
          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2 mb-8">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* Question Step 1: Placement */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <Home className="h-6 w-6 text-primary" />
                <h3 className="font-heading text-xl font-bold text-foreground">
                  1. Where do you plan to place your new plant?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className={`p-5 rounded-2xl border text-left transition-all hover:border-primary hover:shadow-md ${
                      placement === opt.id ? 'border-primary bg-primary/10' : 'border-border/80 bg-secondary/30'
                    }`}
                  >
                    <div className="font-bold text-foreground text-base mb-1">{opt.title}</div>
                    <div className="text-xs text-muted-foreground">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Step 2: Sunlight */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <Sun className="h-6 w-6 text-amber-500" />
                <h3 className="font-heading text-xl font-bold text-foreground">
                  2. How much sunlight does that spot receive?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                    className={`p-5 rounded-2xl border text-left transition-all hover:border-primary hover:shadow-md ${
                      light === opt.id ? 'border-primary bg-primary/10' : 'border-border/80 bg-secondary/30'
                    }`}
                  >
                    <div className="font-bold text-foreground text-base mb-1">{opt.title}</div>
                    <div className="text-xs text-muted-foreground">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Step 3: Care Effort */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-emerald-600" />
                <h3 className="font-heading text-xl font-bold text-foreground">
                  3. What is your gardening experience / effort level?
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className={`p-5 rounded-2xl border text-left transition-all hover:border-primary hover:shadow-md ${
                      effort === opt.id ? 'border-primary bg-primary/10' : 'border-border/80 bg-secondary/30'
                    }`}
                  >
                    <div className="font-bold text-foreground text-base mb-1">{opt.title}</div>
                    <div className="text-xs text-muted-foreground">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-2xl font-extrabold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-primary" /> Here Are Your Top Recommended Matches!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on your light & care preferences, these plants will thrive in your space.
                  </p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Retake Quiz
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                {getMatchedPlants().map((plant) => (
                  <div
                    key={plant.id}
                    className="bg-secondary/30 rounded-2xl border border-border/80 p-4 flex flex-col justify-between hover:border-primary transition-all"
                  >
                    <div>
                      <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full aspect-square object-cover rounded-xl mb-3"
                      />
                      <h4 className="font-bold text-base text-foreground line-clamp-1">{plant.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{plant.description}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                      <span className="font-extrabold text-foreground text-lg">₹{plant.price}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectPlant(plant)}
                          className="px-3 py-1.5 rounded-full bg-secondary text-xs font-bold hover:bg-primary/20"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onAddToCart(plant)}
                          className="p-2 rounded-full bg-primary text-white hover:bg-primary/90"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
