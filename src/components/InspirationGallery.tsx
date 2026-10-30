import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, Eye, Leaf } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Plant } from '../types/nursery';
import { plantsData } from '../data/mockData';

interface InspirationGalleryProps {
  onSelectPlant?: (plant: Plant) => void;
}

export const InspirationGallery: React.FC<InspirationGalleryProps> = ({ onSelectPlant }) => {
  const scenes = [
    {
      id: 1,
      title: 'Vibrant Balcony Flower Garden',
      location: 'Apartment Balcony, Jabalpur',
      description: 'Morning sunlight paradise featuring Desi Red Rose, Dahlias & Yellow Marigold in terracotta planters.',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_2_1254x1254.webp',
      featuredPlantId: 'plant-1', // Desi Red Rose
      plantTag: 'Desi Gulab (₹70)',
    },
    {
      id: 2,
      title: 'Low-Maintenance Living Room Oasis',
      location: 'Indoor Lounge, Bhopal',
      description: 'Air-purifying green corner with thriving lush foliage requiring minimal watering and indirect daylight.',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_3_1254x1254.webp',
      featuredPlantId: 'plant-5', // Bougainvillea or Indoor
      plantTag: 'Foliage Plants (₹120)',
    },
    {
      id: 3,
      title: 'Sunny Terrace Bonsai Collection',
      location: 'Terrace Garden, Narsinghpur',
      description: 'Sculptural Adenium Desert Rose Bonsai thriving under intense 40°C central Indian summer sun.',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_6_1254x1254.webp',
      featuredPlantId: 'plant-3', // Adenium Bonsai
      plantTag: 'Adenium Bonsai (₹100)',
    },
    {
      id: 4,
      title: 'Festive Marigold & Dahlia Border',
      location: 'Villa Front Porch, Hoshangabad',
      description: 'Profuse blooming clusters in heavy clay pots welcoming guests with natural fragrance.',
      image: '/images/green-vatika/chatgpt_generated/chatgpt_image_4_1254x1254.webp',
      featuredPlantId: 'plant-2', // Marigold Genda
      plantTag: 'Genda Marigold (₹45)',
    },
  ];

  const handlePlantClick = (plantId: string) => {
    if (!onSelectPlant) return;
    const found = plantsData.find((p) => p.id === plantId) || plantsData[0];
    onSelectPlant(found);
  };

  return (
    <section className="py-14 md:py-20 bg-background border-t border-border/40 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Header - Strictly NO Capsule Pill Labels */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Real Homes, Real Blooms
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              Discover how plant parents across Central India style their balconies, living rooms, and sunny terraces with Green Vatika nursery plants.
            </p>
          </div>

          <a
            href="https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20want%20garden%20styling%20advice%20for%20my%20balcony"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0A4C36] hover:bg-[#073626] text-white font-bold text-sm shadow-md transition-all self-start md:self-auto shrink-0"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span>Consult Nursery Stylist</span>
          </a>
        </div>

        {/* 4-Card Aspirational Grid - Full Width Balance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border/80 shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-500 flex flex-col"
            >
              {/* Aspect 4:5 Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary/50">
                <img
                  src={scene.image}
                  alt={scene.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Top Location Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/20 shadow-sm">
                    {scene.location}
                  </span>
                </div>

                {/* Clickable Plant Tag Pill */}
                <button
                  onClick={() => handlePlantClick(scene.featuredPlantId)}
                  className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-slate-900 font-extrabold text-xs shadow-xl hover:bg-primary hover:text-white transition-all transform hover:scale-105 border border-white/50"
                  title="View Plant Details"
                >
                  <Leaf className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{scene.plantTag}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Text Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                    {scene.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {scene.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
