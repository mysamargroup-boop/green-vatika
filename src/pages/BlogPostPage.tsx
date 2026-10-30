import React from 'react';
import { BlogPost, Plant } from '../types/nursery';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  BookOpen,
  Leaf,
  Table,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { blogPostsData, plantsData } from '../data/mockData';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { LazyImage } from '../components/LazyImage';

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
  const featuredPlants = plantsData.slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="pt-36 sm:pt-40 pb-24 bg-background text-foreground animate-in fade-in duration-300">
      {/* Broadened Luxury Editorial Container: max-w-[1550px] */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1550px] w-full">
        {/* Top Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-border/60">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors bg-card px-4 py-2 rounded-full border border-border/80 shadow-xs hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to All Guides
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-primary/20">
              <BookOpen className="h-3.5 w-3.5" /> Green Vatika Botanical Library
            </span>
          </div>
        </div>

        {/* Article Header (Broad and Centered Editorial Look) */}
        <div className="max-w-4xl mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-primary shadow-xs">
              {post.category}
            </span>
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 bg-secondary/60 px-3 py-1 rounded-full">
              <Clock className="h-3.5 w-3.5 text-primary" /> {post.readTime}
            </span>
            <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1 bg-secondary/60 px-3 py-1 rounded-full">
              <Calendar className="h-3.5 w-3.5 text-primary" /> {post.date}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-[1.18] tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-3 pb-1">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center font-extrabold text-sm border-2 border-primary/20">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-foreground">{post.author}</div>
                <div className="text-xs text-muted-foreground">Senior Propagator &amp; Horticulturist</div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-secondary hover:bg-primary/15 text-foreground hover:text-primary transition-colors border border-border/60 text-xs font-bold cursor-pointer"
              title="Share Article"
            >
              <Share2 className="h-3.5 w-3.5" /> Share Guide
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Editorial Grid (Article on Left 8/9 cols, Sticky Sidebar on Right 4/3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Article Content */}
          <article className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Featured Hero Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border/80 aspect-[16/9] bg-muted group">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Article Excerpt Callout */}
            <div className="p-6 sm:p-7 rounded-3xl bg-secondary/70 border-l-4 border-primary text-foreground font-semibold text-base sm:text-lg leading-relaxed shadow-xs">
              "{post.excerpt}"
            </div>

            {/* Article Body: Rich Sections or Fallback Paragraphs */}
            {post.sections && post.sections.length > 0 ? (
              <div className="space-y-10 pt-2">
                {post.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-4">
                    {section.heading && (
                      <div className="space-y-1 pt-6 border-t border-border/40 first:border-t-0 first:pt-0">
                        <h2 className="font-heading text-2xl sm:text-3xl font-black text-foreground flex items-center gap-3">
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
                    {section.paragraphs &&
                      section.paragraphs.map((para, pIdx) => (
                        <p key={pIdx} className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                          {para}
                        </p>
                      ))}

                    {/* Bullet Points */}
                    {section.bulletPoints && section.bulletPoints.length > 0 && (
                      <ul className="space-y-2.5 p-5 sm:p-6 rounded-2xl bg-card border border-border/70 shadow-xs">
                        {section.bulletPoints.map((point, ptIdx) => (
                          <li
                            key={ptIdx}
                            className="flex items-start gap-3 text-sm sm:text-base text-foreground/90 leading-snug"
                          >
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
                          <div className="p-3.5 bg-secondary/80 font-bold text-xs uppercase tracking-wider text-foreground border-b border-border/60 flex items-center gap-2">
                            <Table className="h-3.5 w-3.5 text-primary" /> {section.table.caption}
                          </div>
                        )}
                        <div className="overflow-x-auto [scrollbar-width:thin]">
                          <table className="w-full table-auto text-left text-xs sm:text-sm">
                            <thead className="bg-primary/10 text-primary font-black uppercase text-[11px] sm:text-xs tracking-wider border-b border-border/60">
                              <tr>
                                {section.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3 sm:p-4 leading-snug">
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
                                      className={`p-3 sm:p-4 text-foreground/90 leading-relaxed ${
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

                    {/* Key Takeaway Callout */}
                    {section.callout && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-foreground text-sm sm:text-base font-medium space-y-1">
                        <span className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                          <Lightbulb className="h-3.5 w-3.5" /> Practical Nursery Takeaway
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

            {/* Expert Green Vatika Horticulturist Tip Box */}
            <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-green-950 text-white shadow-xl space-y-3 border border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm uppercase tracking-wider">
                <Leaf className="h-4 w-4" /> Green Vatika Propagation Standard
              </div>
              <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
                Have specific questions about plant light levels, soil ratios, or monsoon root health? Get free 1-on-1 advice from senior nursery horticulturists via our WhatsApp helpline (+91 94794 80068).
              </p>
              <div className="pt-2">
                <a
                  href="https://wa.me/919479480068?text=Hello%20Green%20Vatika%20team,%20I%20have%20a%20question%20about%20your%20gardening%20guide!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#146934] hover:bg-[#10562b] text-white font-extrabold text-xs sm:text-sm transition-all"
                >
                  <WhatsAppIcon className="h-4 w-4 text-white" />
                  <span>Chat with Senior Horticulturist</span>
                </a>
              </div>
            </div>
          </article>

          {/* Right Column (Sticky Editorial Sidebar - 4/3 Cols) */}
          <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 space-y-6">
            {/* Table of Contents Widget */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-primary border-b border-border/60 pb-3">
                  <BookOpen className="h-4 w-4" /> Table of Contents
                </div>
                <ul className="space-y-2 text-xs sm:text-sm font-semibold">
                  {post.tableOfContents.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-foreground/80 hover:text-primary transition-colors py-1 cursor-default"
                    >
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Featured Plants Widget (Direct Botanical Links) */}
            <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Leaf className="h-3.5 w-3.5 text-primary" /> Plants in this Guide
                </span>
                <span className="text-[10px] text-muted-foreground font-bold">Nursery Stock</span>
              </div>

              <div className="space-y-3">
                {featuredPlants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => onSelectPlant(plant)}
                    className="flex items-center gap-3 p-2.5 rounded-2xl bg-secondary/30 hover:bg-secondary/60 border border-border/60 transition-all cursor-pointer group"
                  >
                    <LazyImage
                      src={plant.image}
                      alt={plant.name}
                      aspectRatio="aspect-[3/4]"
                      className="h-14 w-11 rounded-xl object-cover border shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-extrabold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                        {plant.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground italic truncate">
                        {plant.botanicalName}
                      </div>
                      <div className="text-xs font-black text-primary mt-0.5">₹{plant.price}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Plant Doctor Advice Box */}
            <div className="p-5 sm:p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-foreground space-y-3 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" /> Free Plant Doctor Support
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Send a photo of your leaf or plant to our WhatsApp team for instant diagnosis, watering schedules, and organic nutrient remedies.
              </p>
              <a
                href="https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20need%20plant%20doctor%20advice%20for%20my%20plant!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-full bg-[#146934] hover:bg-[#10562b] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <WhatsAppIcon className="h-4 w-4 text-white" />
                <span>Ask Plant Doctor Now</span>
              </a>
            </div>
          </aside>
        </div>

        {/* More Gardening Guides & Articles Grid */}
        <div className="mt-20 pt-12 border-t border-border/60 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-foreground">
              More Gardening Guides &amp; Articles
            </h3>
            <button
              onClick={onBack}
              className="text-xs font-extrabold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All 5 Guides</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <article
                key={rel.id}
                onClick={() => {
                  onSelectPost(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group rounded-3xl bg-card border border-border/80 hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-primary text-white shadow-xs">
                      {rel.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-muted-foreground font-semibold flex items-center gap-2">
                      <span>{rel.date}</span>
                      <span>•</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h4 className="font-heading font-extrabold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
