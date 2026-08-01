import React, { useState, useEffect } from 'react';
import { Leaf, Search, ShoppingCart, Menu, X, Sun, Moon, PhoneCall, ShoppingBag } from 'lucide-react';

export type ViewState = 'home' | 'about' | 'categories' | 'shop' | 'quiz' | 'services' | 'blog' | 'contact' | 'product' | 'checkout';

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentView !== 'home'
          ? 'glass shadow-lg py-3 border-b border-primary/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigateView('home')} className="flex items-center gap-3 group text-left focus:outline-none">
            <img
              src="/logo.png"
              alt="Green Vatika Logo"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
            />
            <div>
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

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-full hover:bg-primary/10 text-foreground/80 hover:text-primary transition-colors border border-border/40"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-primary/10 text-foreground/80 hover:text-primary transition-colors border border-border/40"
              title="View Cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Checkout Icon Button Only */}
            <button
              onClick={() => onNavigateView('checkout')}
              className={`p-2.5 rounded-full transition-all border ${
                currentView === 'checkout'
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                  : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white'
              }`}
              title="Proceed to Order Checkout"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full hover:bg-primary/10 text-foreground/80 border border-border/40"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-background/95 backdrop-blur-xl border-b border-border/60 p-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateView(link.view);
                }}
                className={`px-4 py-3 rounded-xl text-base font-bold text-left transition-colors ${
                  currentView === link.view ? 'bg-primary text-white' : 'text-foreground hover:bg-primary/10'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateView('checkout');
                }}
                className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm text-center flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" /> Order Checkout Page
              </button>
              <a
                href="https://wa.me/919876543210?text=Hi%20Green%20Vatika,%20I%20want%20to%20inquire%20about%20plants"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-600 pt-2"
              >
                <PhoneCall className="h-4 w-4" /> Direct WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
