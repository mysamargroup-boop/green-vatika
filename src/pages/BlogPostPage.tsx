import React from 'react';
import { BlogPost, Plant } from '../types/nursery';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, Leaf, Table, Lightbulb } from 'lucide-react';
import { blogPostsData, plantsData } from '../data/mockData';

interface BlogPostPageProps {
  post: BlogPost;
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onSelectPlant: (plant: Plant) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  post,
  onBack,
  onSelectPost,
  onSelectPlant,
}) => {
  const relatedPosts = blogPostsData.filter((p) => p.id !== post.id).slice(0, 3);
  const featuredPlants = plantsData.slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-background text-foreground animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-foreground hover:text-primary transition-colors bg-card px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-border/80 shadow-sm whitespace-nowrap shrink-0 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Gardening Blog
          </button>
          <span className="text-[11px] sm:text-xs font-extrabold text-primary bg-primary/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            <BookOpen className="h-3.5 w-3.5" /> Gardening Knowledge Base
          </span>
        </div>

        {/* Main Article Header */}
        <article className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-primary shadow-sm">
                {post.category}
              </span>
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-primary" /> {post.readTime}
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between py-4 border-y border-border/60">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-sm border border-primary/20">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm text-foreground">{post.author}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-primary" /> Published on {post.date}
                  </div>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-colors border border-border/60"
                title="Share Article"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Featured Hero Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/80 aspect-[16/9] bg-muted">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Table of Contents (if available) */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <div className="p-6 rounded-3xl bg-secondary/70 border border-border/80 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-primary">
                <BookOpen className="h-4 w-4" /> Table of Contents &amp; Quick Navigation
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-sm">
                {post.tableOfContents.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Excerpt Callout */}
          <div className="p-6 rounded-3xl bg-primary/10 border border-primary/30 text-foreground font-semibold text-base sm:text-lg leading-relaxed shadow-sm">
            "{post.excerpt}"
          </div>

          {/* Article Body: Rich Sections or Fallback Paragraphs */}
          {post.sections && post.sections.length > 0 ? (
            <div className="space-y-10 pt-4">
              {post.sections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  {section.heading && (
                    <div className="space-y-1 pt-4 border-t border-border/40 first:border-t-0 first:pt-0">
                      <h2 className="font-heading text-2xl sm:text-3xl font-black text-foreground flex items-center gap-2.5">
                        <span className="h-6 w-1.5 rounded-full bg-primary shrink-0" />
                        {section.heading}
                      </h2>
                      {section.subheading && (
                        <p className="text-sm font-semibold text-muted-foreground pl-4">
                          {section.subheading}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Paragraphs */}
                  {section.paragraphs && section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                      {para}
                    </p>
                  ))}

                  {/* Bullet Points */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2 p-5 rounded-2xl bg-card border border-border/60 shadow-xs">
                      {section.bulletPoints.map((point, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/90 leading-snug">
                          <Leaf className="h-4 w-4 text-primary shrink-0 mt-1" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Comparison Table */}
                  {section.table && (
                    <div className="my-6 rounded-2xl overflow-hidden border border-border/80 shadow-md">
                      {section.table.caption && (
                        <div className="p-3 bg-secondary/80 font-bold text-xs uppercase tracking-wider text-muted-foreground border-b border-border/60 flex items-center gap-1.5">
                          <Table className="h-3.5 w-3.5 text-primary" /> {section.table.caption}
                        </div>
                      )}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-primary/10 text-primary font-black uppercase text-[11px] tracking-wider border-b border-border/60">
                            <tr>
                              {section.table.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-3.5 sm:p-4 whitespace-nowrap">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/40 bg-card">
                            {section.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-secondary/40 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`p-3.5 sm:p-4 text-foreground/90 ${
                                      cIdx === 0 ? 'font-bold text-foreground' : ''
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Callout box */}
                  {section.callout && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-foreground text-sm sm:text-base font-medium space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5" /> Key Takeaway
                      </span>
                      <p>{section.callout}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6 text-base sm:text-lg text-foreground/90 leading-relaxed font-normal pt-2">
              {post.content.map((paragraph, idx) => (
                <p key={idx} className="bg-card p-5 sm:p-6 rounded-2xl border border-border/60 shadow-xs">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Expert Green Vatika Tip Box */}
          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-green-950 text-white shadow-xl space-y-2 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm uppercase tracking-wider">
              <Leaf className="h-4 w-4" /> Green Vatika Expert Horticulturist Tip
            </div>
            <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
              Have specific questions about plant light levels, soil ratios, or pest management? Get free 1-on-1 advice from senior horticulturists via our WhatsApp support helpline (+91 9479480068).
            </p>
          </div>
        </article>

        {/* Recommended Plants for this Care Topic */}
        <div className="mt-16 pt-12 border-t border-border/60 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-flex items-center gap-1">
                <Leaf className="h-3.5 w-3.5" /> Recommended Plants
              </span>
              <h3 className="font-heading text-2xl font-extrabold text-foreground mt-2">
                Plants Featured in this Guide
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featuredPlants.map((plant) => (
              <div
                key={plant.id}
                onClick={() => onSelectPlant(plant)}
                className="group flex items-center gap-3 p-3 rounded-2xl bg-card border border-border/80 hover:border-primary/40 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="h-14 w-14 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="overflow-hidden">
                  <div className="font-extrabold text-xs text-foreground truncate group-hover:text-primary transition-colors">
                    {plant.name}
                  </div>
                  <div className="text-[11px] text-primary font-bold">
                    ₹{plant.price} • {plant.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles Grid */}
        <div className="mt-16 pt-12 border-t border-border/60 space-y-6">
          <h3 className="font-heading text-2xl font-extrabold text-foreground">
            More Gardening Guides & Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <article
                key={rel.id}
                onClick={() => {
                  onSelectPost(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group rounded-3xl bg-card border border-border/80 hover:border-primary/40 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-primary text-white">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-heading font-extrabold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
