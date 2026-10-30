import React, { useState, useEffect } from 'react';
import { Leaf, Search, ShoppingCart, Menu, X, Sun, Moon, PhoneCall, ShoppingBag, Truck, ShieldCheck, MapPin, Clock, Phone } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export type ViewState = 'home' | 'about' | 'categories' | 'shop' | 'quiz' | 'services' | 'blog' | 'blog-post' | 'contact' | 'product' | 'checkout' | 'privacy' | 'terms';

interface HeaderProps {
  cartCount: number;
  currentView: ViewState;
  onNavigateView: (view: ViewState) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  currentView,
  onNavigateView,
  onOpenCart,
  onOpenSearch,
  isDarkMode,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks: { name: string; view: ViewState }[] = [
    { name: 'Home', view: 'home' },
    { name: 'About Us', view: 'about' },
    { name: 'Categories', view: 'categories' },
    { name: 'Shop Catalog', view: 'shop' },
    { name: 'Plant Matcher', view: 'quiz' },
    { name: 'Services', view: 'services' },
    { name: 'Blog', view: 'blog' },
    { name: 'Contact', view: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || currentView !== 'home'
            ? 'glass shadow-lg border-b border-primary/10'
            : 'bg-background/90 dark:bg-background/90 backdrop-blur-md border-b border-border/40'
        }`}
      >
        {/* Top Botanical Announcement Strip (Ugaoo Theme Pattern - Pure SVG Icons, Zero Emojis) */}
        <div className="bg-[#0A4C36] text-white text-[10px] sm:text-xs font-semibold py-1.5 px-4 text-center tracking-wide">
          <div className="container mx-auto flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-emerald-300" />
              <span>Direct Nursery Pickup Active (Teen Puliya, Narsinghpur)</span>
            </span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-300" />
              <span className="text-amber-200">Online Courier Delivery Paused</span>
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-emerald-300" />
              <span>WhatsApp Inquiries: +91 94794 80068</span>
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => onNavigateView('home')} className="flex items-center gap-3 group text-left focus:outline-none">
              <img
                src="/logo.png"
                alt="Green Vatika Logo"
                className="h-10 w-auto shrink-0 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="hidden sm:block">
                <div className="font-heading font-extrabold text-lg leading-tight tracking-tight text-foreground">
                  Green Vatika
                </div>
                <div className="text-[10px] uppercase tracking-widest text-primary font-bold">
                  Premium Nursery
                </div>
              </div>
            </button>

            {/* Desktop Navigation Tabs to Separate Pages */}
            <nav className="hidden lg:flex items-center gap-1 bg-background/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/50 shadow-sm">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.view}
                    onClick={() => onNavigateView(link.view)}
                    className={`relative px-3.5 py-1.5 text-sm font-semibold transition-all rounded-full ${
                      isActive
                        ? 'text-primary bg-primary/10 font-extrabold shadow-xs'
                        : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Actions & Buttons */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                className="p-2.5 rounded-full hover:bg-primary/10 text-foreground/80 hover:text-primary transition-colors border border-border/40"
                title="Search Plants"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Dark/Light Theme Toggle (Desktop Only, inside sidebar on mobile) */}
              <button
                onClick={onToggleTheme}
                className="hidden sm:flex p-2.5 rounded-full hover:bg-primary/10 text-foreground/80 hover:text-primary transition-colors border border-border/40"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
              </button>

              {/* Single Cart Drawer Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full hover:bg-primary/10 text-foreground/80 hover:text-primary transition-colors border border-border/40"
                title="View Cart"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full hover:bg-primary/10 text-foreground/80 border border-border/40"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Height Mobile Drawer Menu with High Z-Index Overlay outside <header> */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Full-Height Drawer Panel */}
        <div
          className={`absolute top-0 bottom-0 right-0 h-full w-full max-w-xs bg-background border-l border-border/80 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header Inside Sidebar */}
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-border/60 mb-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
                <div>
                  <div className="font-heading font-extrabold text-base text-foreground leading-tight">
                    Green Vatika
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-primary font-bold">
                    Premium Nursery
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-primary/10 text-foreground/80 border border-border/40"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView(link.view);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-bold text-left transition-colors ${
                    currentView === link.view
                      ? 'bg-primary text-white shadow-md'
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Section with Dark Mode Toggle & Order Buttons */}
          <div className="pt-4 space-y-3">
            {/* Dark Mode Switcher Option */}
            <div className="py-2 border-t border-border/60">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2 px-1">
                Appearance
              </div>
              <button
                onClick={onToggleTheme}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors text-foreground font-bold text-sm"
              >
                <div className="flex items-center gap-2.5">
                  {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
                <div className={`w-10 h-5.5 rounded-full p-0.5 transition-colors flex items-center ${isDarkMode ? 'bg-primary justify-end' : 'bg-slate-300 justify-start'}`}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </div>
              </button>
            </div>

            {/* Direct Checkout & WhatsApp Buttons */}
            <a
              href="https://wa.me/919479480068?text=Hi%20Green%20Vatika,%20I%20want%20to%20inquire%20about%20plants"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 py-1"
            >
              <WhatsAppIcon className="h-4 w-4 text-emerald-500" /> Direct WhatsApp Order
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
