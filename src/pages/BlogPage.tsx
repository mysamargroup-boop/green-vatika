import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Search, Calendar, Clock, User, ArrowRight, Sparkles, Filter, Leaf, ChevronRight } from 'lucide-react';
import { blogPostsData } from '../data/mockData';
import { BlogPost } from '../types/nursery';
import { LazyImage } from '../components/LazyImage';

interface BlogPageProps {
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onBack, onSelectPost }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories list derived from blog posts
  const categories = ['All', 'Outdoor Gardening', 'Balcony Gardening', 'Plant Care', 'Bonsai Care'];

  // Filtered posts
  const filteredPosts = blogPostsData.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Featured Hero Post
  const featuredPost = blogPostsData[0];

  return (
    <div className="pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 space-y-14">
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
              <BookOpen className="h-3.5 w-3.5" /> Horticulturist Knowledge Base
            </span>
          </div>
        </div>

        {/* Distinct Hero Header */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-green-950 text-white shadow-2xl border border-emerald-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md inline-block border border-white/15">
              Green Vatika Botanical Journal
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Evidence-Based Indian Gardening Wisdom
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal">
              Written directly by senior nursery propagators and soil specialists. Practical advice on beating summer loo, organic vermicomposting, and continuous flower blooming.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-secondary/40 text-muted-foreground hover:bg-secondary border border-border/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search plant guides, tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Featured Cover Story Article (Different from Home page 3 cards) */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <div className="bg-card rounded-3xl border border-border/80 overflow-hidden shadow-xl hover:border-primary/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[360px] overflow-hidden">
              <LazyImage
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary text-white shadow-md">
                  Featured Cover Story
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-medium">
                  <span className="text-primary font-bold bg-primary/10 px-2.5 py-1 rounded-md">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {featuredPost.date}
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground leading-tight hover:text-primary transition-colors cursor-pointer" onClick={() => onSelectPost(featuredPost)}>
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {featuredPost.tags && featuredPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {featuredPost.tags.slice(0, 4).map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-secondary px-2.5 py-0.5 rounded-md text-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <div className="h-7 w-7 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-[10px]">
                    GV
                  </div>
                  <span>{featuredPost.author}</span>
                </div>

                <button
                  onClick={() => onSelectPost(featuredPost)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Magazine Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-foreground">
              {selectedCategory === 'All' ? 'All Published Guides' : `${selectedCategory} Guides`} ({filteredPosts.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="group bg-card rounded-2xl border border-border/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {post.readTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {post.date}
                      </span>
                    </div>

                    <h4 className="font-heading font-extrabold text-lg text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Seasonal Gardening Calendar Card */}
        <div className="bg-card rounded-3xl border border-border/80 p-6 sm:p-10 shadow-lg space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Seasonal Action Guide
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              What to Do in Your Garden This Month
            </h3>
            <p className="text-sm text-muted-foreground">
              Horticultural checklist tailored for central and northern India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 space-y-2">
              <div className="text-emerald-500 font-bold text-xs uppercase tracking-wider">
                1. Pruning & Shaping
              </div>
              <h5 className="font-heading font-bold text-foreground">
                Prune Bougainvillea & Desi Gulab
              </h5>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Light pruning of spent flower stems stimulates dense new flowering nodes for the upcoming blooming cycle.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 space-y-2">
              <div className="text-amber-500 font-bold text-xs uppercase tracking-wider">
                2. Organic Feeding
              </div>
              <h5 className="font-heading font-bold text-foreground">
                Mustard Cake Liquid Fertilizer
              </h5>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Soak sarson khali for 48 hours, dilute 1:10 with water, and feed Adenium and flowering shrubs for heavy winter buds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 space-y-2">
              <div className="text-blue-500 font-bold text-xs uppercase tracking-wider">
                3. Watering Management
              </div>
              <h5 className="font-heading font-bold text-foreground">
                Reduce Adenium Watering
              </h5>
              <p className="text-muted-foreground text-xs leading-relaxed">
                As night temperatures drop below 20°C, slow down Adenium watering to once every 6 days to keep the caudex solid and rot-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
