import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Search, Calendar, Clock, User, ArrowRight, Leaf } from 'lucide-react';
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
    <div className="pt-28 sm:pt-32 pb-24 bg-background text-foreground animate-in fade-in duration-300">
      {/* Top Breadcrumb Bar */}
      <div className="container mx-auto px-4 md:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors bg-card px-4 py-2 rounded-full border border-border shadow-xs hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-primary/20">
              <BookOpen className="h-3.5 w-3.5" /> Horticulturist Knowledge Base
            </span>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH Top Hero Section: Edge-to-Edge with Seamless Bottom Fade */}
      <div className="relative w-full min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center overflow-hidden bg-[#0A4C36] mb-12 border-b border-border/40">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/green-vatika/chatgpt_generated/chatgpt_image_1_1672x941.webp"
            alt="Green Vatika Botanical Nursery Journal"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[8000ms]"
          />
          {/* Dark Scrim Over Image for High-Contrast Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
          
          {/* Seamless Bottom Gradient Fade into Website Background */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content aligned within container */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 py-16 sm:py-20">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-300">
              Green Vatika Botanical Journal
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
              Evidence-Based Indian Gardening Wisdom
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-emerald-50/90 font-medium leading-relaxed max-w-2xl">
              Practical guides written directly by our nursery horticulturists on beating summer heat, organic soil composting, and getting continuous vibrant blooms.
            </p>

            {/* Featured Article Spotlight Card nestled inside hero */}
            {featuredPost && (
              <div
                onClick={() => onSelectPost(featuredPost)}
                className="mt-6 p-4 sm:p-5 rounded-2xl bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-2xl shadow-xl"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-300">
                    <BookOpen className="h-3.5 w-3.5 text-emerald-300" />
                    <span>FEATURED EDITORIAL GUIDE</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-white/80">
                      <Clock className="h-3 w-3" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <div className="font-heading font-extrabold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {featuredPost.title}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-full whitespace-nowrap shadow-md group-hover:scale-105 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 space-y-10">

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card p-4 rounded-2xl border border-border/80 shadow-xs">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-secondary/50 text-muted-foreground hover:bg-secondary border border-border/50'
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
              className="w-full bg-secondary/50 border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-medium"
            />
          </div>
        </div>

        {/* Section Heading: All Published Guides */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-foreground">
              All Published Guides ({filteredPosts.length})
            </h2>
            <span className="text-xs text-muted-foreground font-semibold">
              Showing {filteredPosts.length} expert articles
            </span>
          </div>

          {/* Published Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-3xl border border-dashed border-border p-8">
              <Leaf className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
              <h3 className="font-heading text-xl font-bold text-foreground">No Guides Found</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Try searching with different gardening keywords or clear your category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 rounded-full bg-primary text-white text-xs font-bold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => onSelectPost(post)}
                  className="group bg-card rounded-2xl sm:rounded-3xl border border-border/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      aspectRatio="aspect-[16/10]"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-400/20">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {post.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-heading font-extrabold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author & Read Action */}
                    <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <span className="font-bold text-foreground truncate max-w-[120px]">
                          {post.author}
                        </span>
                      </div>

                      <span className="font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>Read</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
