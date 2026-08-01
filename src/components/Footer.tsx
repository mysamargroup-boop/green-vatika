import React, { useState } from 'react';
import { Leaf, Heart, Instagram, Facebook, Youtube, Send, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-card border-t border-border/80 pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/60">
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Green Vatika Logo"
                className="h-10 w-auto object-contain"
              />
              <div>
                <div className="font-heading font-extrabold text-xl text-foreground">Green Vatika</div>
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">Premium Plant Nursery</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Bringing nature closer to your home. We grow healthy indoor plants, outdoor landscaping greenery, fruit varieties, succulents & organic care supplies.
            </p>

            <div className="flex items-start gap-2 text-xs text-muted-foreground font-semibold pt-1">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>Niranjan Ward, Teen Puliya, Khairi Naka, Narsinghpur, Madhya Pradesh - 487001</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-foreground">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#featured" className="hover:text-primary transition-colors">Shop Plants</a></li>
              <li><a href="#categories" className="hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#blog" className="hover:text-primary transition-colors">Gardening Blog</a></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-foreground">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#featured" className="hover:text-primary transition-colors">Indoor Air Purifiers</a></li>
              <li><a href="#featured" className="hover:text-primary transition-colors">Outdoor Garden Plants</a></li>
              <li><a href="#featured" className="hover:text-primary transition-colors">Flowering Climbers</a></li>
              <li><a href="#featured" className="hover:text-primary transition-colors">All-Season Fruit Trees</a></li>
              <li><a href="#featured" className="hover:text-primary transition-colors">Miniature Bonsai</a></li>
              <li><a href="#featured" className="hover:text-primary transition-colors">Organic Soil & Pots</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-foreground">
              Join Green Club
            </h4>
            <p className="text-xs text-muted-foreground">
              Subscribe to receive weekly plant care tips, new arrival alerts & 10% discount coupon!
            </p>

            {subscribed ? (
              <div className="text-xs font-bold text-emerald-600 bg-emerald-500/10 p-3 rounded-xl">
                ✓ Thank you for subscribing! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <div>
            © {new Date().getFullYear()} Green Vatika Nursery. All Rights Reserved.
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            Crafted with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> by{' '}
            <a
              href="https://instagram.com/shubham__nema"
              target="_blank"
              rel="noreferrer"
              className="font-extrabold text-primary hover:underline"
            >
              Samar
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
