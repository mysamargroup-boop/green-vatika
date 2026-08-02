import React, { useState } from 'react';
import { Heart, Instagram, Facebook, Youtube, Send, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { ViewState } from './Header';

interface FooterProps {
  onNavigateView?: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateView }) => {
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

  const nav = (view: ViewState, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateView) {
      onNavigateView(view);
    } else {
      window.location.hash = view === 'home' ? '' : view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border/80 pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/60">
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <button onClick={(e) => nav('home', e)} className="flex items-center gap-3 text-left group focus:outline-none">
              <img
                src="/logo.png"
                alt="Green Vatika Logo"
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="font-heading font-extrabold text-xl text-foreground">Green Vatika</div>
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">Premium Plant Nursery</div>
              </div>
            </button>

            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Bringing nature closer to your home. We grow healthy indoor plants, outdoor landscaping greenery, fruit varieties, succulents & organic care supplies.
            </p>

            {/* Contact Details Bar (Phone, Email, Website) */}
            <div className="space-y-2 pt-1 text-xs text-muted-foreground font-semibold">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>Niranjan Ward, Teen Puliya, Khairi Naka, Narsinghpur, MP - 487001</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 font-bold text-foreground">
                <a href="tel:9479480068" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span>9479480068</span>
                </a>
                <span className="text-border">|</span>
                <a href="https://greenvatika.co" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Globe className="h-3.5 w-3.5 text-primary" />
                  <span>greenvatika.co</span>
                </a>
                <span className="text-border">|</span>
                <a href="mailto:greenvatikanursery2026@gmail.com" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span>greenvatikanursery2026@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-colors"
                title="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-colors"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-secondary hover:bg-primary/20 text-foreground hover:text-primary transition-colors"
                title="YouTube"
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
              <li><button onClick={(e) => nav('home', e)} className="hover:text-primary transition-colors text-left">Home</button></li>
              <li><button onClick={(e) => nav('about', e)} className="hover:text-primary transition-colors text-left">About Us</button></li>
              <li><button onClick={(e) => nav('shop', e)} className="hover:text-primary transition-colors text-left">Shop Plants</button></li>
              <li><button onClick={(e) => nav('categories', e)} className="hover:text-primary transition-colors text-left">Categories</button></li>
              <li><button onClick={(e) => nav('services', e)} className="hover:text-primary transition-colors text-left">Services</button></li>
              <li><button onClick={(e) => nav('blog', e)} className="hover:text-primary transition-colors text-left">Gardening Blog</button></li>
              <li><button onClick={(e) => nav('privacy', e)} className="hover:text-primary transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={(e) => nav('terms', e)} className="hover:text-primary transition-colors text-left">Terms of Service</button></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-sm uppercase tracking-wider text-foreground">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><button onClick={(e) => nav('shop', e)} className="hover:text-primary transition-colors text-left">Indoor Air Purifiers</button></li>
              <li><button onClick={(e) => nav('shop', e)} className="hover:text-primary transition-colors text-left">Outdoor Garden Plants</button></li>
              <li><button onClick={(e) => nav('shop', e)} className="hover:text-primary transition-colors text-left">Flowering Climbers</button></li>
              <li><button onClick={(e) => nav('shop', e)} className="hover:text-primary transition-colors text-left">All-Season Fruit Trees</button></li>
              <li><button onClick={(e) => nav('shop', e)} className="hover:text-primary transition-colors text-left">Miniature Bonsai</button></li>
              <li><button onClick={(e) => nav('shop', e)} className="hover:text-primary transition-colors text-left">Organic Soil & Pots</button></li>
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
              rel="noopener noreferrer"
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
