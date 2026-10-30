import React, { useState } from 'react';
import { blogPostsData } from '../data/mockData';
import { BlogPost } from '../types/nursery';
import { BookOpen, Calendar, Clock, User, ArrowRight, X } from 'lucide-react';

interface BlogSectionProps {
  onSelectPost?: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handlePostClick = (post: BlogPost) => {
    if (onSelectPost) {
      onSelectPost(post);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <section id="section-blog" className="py-10 md:py-14 relative scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title - Strictly NO Capsule Pill Labels */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 space-y-2">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground">
            Gardening Tips & Guides
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base px-4">
            Expert advice from Green Vatika horticulturists to keep your green friends flourishing.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPostsData.map((post) => (
            <article
              key={post.id}
              onClick={() => handlePostClick(post)}
              className="group rounded-3xl bg-card border border-border/80 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 text-xs font-extrabold px-3 py-1 rounded-full bg-primary text-white shadow-md">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer Link */}
              <div className="p-6 pt-0 flex items-center gap-2 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                Read Full Article <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-card rounded-3xl border border-border shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full glass hover:bg-white text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto p-6 md:p-8 space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-primary text-white">
                  {selectedPost.category}
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-primary" /> By {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-primary" /> {selectedPost.date}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/60 text-sm text-foreground/90 leading-relaxed">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
