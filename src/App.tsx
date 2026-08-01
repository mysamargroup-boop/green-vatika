import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header, ViewState } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CategorySection } from './components/CategorySection';
import { ShopSection } from './components/ShopSection';
import { PlantDetailModal } from './components/PlantDetailModal';
import { PlantQuiz } from './components/PlantQuiz';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Skeleton } from './components/Skeleton';
import { ScrollSkeletonContainer } from './components/ScrollSkeletonContainer';
import { Plant, CartItem } from './types/nursery';
import { plantsData } from './data/mockData';
import { Search, X, CheckCircle, ShoppingCart } from 'lucide-react';

// Dedicated Page View Imports
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const CategoriesPage = lazy(() =>
  import('./pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage }))
);
const ShopPage = lazy(() =>
  import('./pages/ShopPage').then((m) => ({ default: m.ShopPage }))
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const BlogPage = lazy(() =>
  import('./pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const ProductPage = lazy(() =>
  import('./pages/ProductPage').then((m) => ({ default: m.ProductPage }))
);
const OrderPage = lazy(() =>
  import('./pages/OrderPage').then((m) => ({ default: m.OrderPage }))
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [activeProductView, setActiveProductView] = useState<Plant | null>(null);
  const [directCheckoutPlant, setDirectCheckoutPlant] = useState<{
    plant: Plant;
    quantity: number;
    size: string;
    color: string;
  } | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial page load grey skeleton overlay
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Sync dark mode class with root html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // URL Hash Path Routing & Browser History listener
  useEffect(() => {
    const syncViewFromHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['about', 'categories', 'shop', 'quiz', 'services', 'blog', 'contact', 'product', 'checkout'].includes(hash)) {
        setCurrentView(hash as ViewState);
      } else {
        setCurrentView('home');
      }
    };

    // Initial check
    syncViewFromHash();

    window.addEventListener('hashchange', syncViewFromHash);
    return () => window.removeEventListener('hashchange', syncViewFromHash);
  }, []);

  // Smooth scroll & transition on view change + update URL hash
  const navigateToView = (view: ViewState) => {
    setIsNavigating(true);
    window.location.hash = view === 'home' ? '' : view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setCurrentView(view);
      setIsNavigating(false);
    }, 200);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (
    plant: Plant,
    quantity: number = 1,
    selectedSize?: string,
    selectedPotColor?: string
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.plant.id === plant.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { plant, quantity, selectedSize, selectedPotColor }];
    });
    showToast(`Added ${plant.name} to your garden cart! 🌿`);
  };

  const handleUpdateQuantity = (plantId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(plantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.plant.id === plantId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (plantId: string) => {
    setCartItems((prev) => prev.filter((item) => item.plant.id !== plantId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const openProductPage = (plant: Plant) => {
    setActiveProductView(plant);
    navigateToView('product');
  };

  const openOrderPageWithPlant = (
    plant: Plant,
    quantity: number = 1,
    size: string = '8 inch standard',
    color: string = 'Terracotta'
  ) => {
    setDirectCheckoutPlant({ plant, quantity, size, color });
    navigateToView('checkout');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const searchResults = searchQuery.trim()
    ? plantsData.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const PageFallbackSkeleton = () => (
    <div className="pt-28 pb-20 container mx-auto px-4 md:px-8 space-y-8">
      <Skeleton width="w-48" height="h-10" />
      <Skeleton width="w-full" height="h-72" borderRadius="rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton width="w-full" height="h-48" borderRadius="rounded-2xl" />
        <Skeleton width="w-full" height="h-48" borderRadius="rounded-2xl" />
        <Skeleton width="w-full" height="h-48" borderRadius="rounded-2xl" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans relative">
      {/* Initial Page Load Overlay Skeleton */}
      {initialLoading && (
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-6 space-y-4">
          <div className="text-center space-y-4 max-w-md w-full">
            <Skeleton width="w-16" height="h-16" borderRadius="rounded-2xl mx-auto" />
            <Skeleton width="w-3/4" height="h-6" className="mx-auto" />
            <Skeleton width="w-1/2" height="h-4" className="mx-auto" />
          </div>
        </div>
      )}

      {/* Top Page Transition Loader Bar */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary via-emerald-400 to-accent animate-pulse" />
      )}

      {/* Navigation Header */}
      <Header
        cartCount={totalCartCount}
        currentView={currentView}
        onNavigateView={(view) => navigateToView(view)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Multi-Page Content Router */}
      <main className={`transition-opacity duration-300 ${isNavigating ? 'opacity-40' : 'opacity-100'}`}>
        {currentView === 'home' && (
          <>
            <HeroSection />
            <ScrollSkeletonContainer height="h-80">
              <AboutSection />
            </ScrollSkeletonContainer>
            <ScrollSkeletonContainer height="h-96">
              <CategorySection
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  navigateToView('shop');
                }}
              />
            </ScrollSkeletonContainer>
            <ScrollSkeletonContainer height="h-[600px]">
              <ShopSection
                onSelectPlant={(plant) => openProductPage(plant)}
                onAddToCart={(plant) => handleAddToCart(plant)}
                onBuyNowDirect={(plant) => openOrderPageWithPlant(plant)}
                selectedCategoryFilter={selectedCategory}
              />
            </ScrollSkeletonContainer>
            <ScrollSkeletonContainer height="h-96">
              <PlantQuiz
                onSelectPlant={(plant) => openProductPage(plant)}
                onAddToCart={(plant) => handleAddToCart(plant)}
              />
            </ScrollSkeletonContainer>
            <ScrollSkeletonContainer height="h-96">
              <ServicesSection />
            </ScrollSkeletonContainer>
            <TestimonialsSection />
            <BlogSection />
            <ContactSection />
          </>
        )}

        {currentView === 'about' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <AboutPage onBack={() => navigateToView('home')} onNavigateContact={() => navigateToView('contact')} />
          </Suspense>
        )}

        {currentView === 'categories' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <CategoriesPage
              onBack={() => navigateToView('home')}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                navigateToView('shop');
              }}
            />
          </Suspense>
        )}

        {currentView === 'shop' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <ShopPage
              onBack={() => navigateToView('home')}
              onSelectPlant={(plant) => openProductPage(plant)}
              onAddToCart={(plant) => handleAddToCart(plant)}
              onBuyNowDirect={(plant) => openOrderPageWithPlant(plant)}
              selectedCategoryFilter={selectedCategory}
            />
          </Suspense>
        )}

        {currentView === 'quiz' && (
          <div className="pt-24 pb-16">
            <PlantQuiz
              onSelectPlant={(plant) => openProductPage(plant)}
              onAddToCart={(plant) => handleAddToCart(plant)}
            />
          </div>
        )}

        {currentView === 'services' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <ServicesPage onBack={() => navigateToView('home')} />
          </Suspense>
        )}

        {currentView === 'blog' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <BlogPage onBack={() => navigateToView('home')} />
          </Suspense>
        )}

        {currentView === 'contact' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <ContactPage onBack={() => navigateToView('home')} />
          </Suspense>
        )}

        {currentView === 'product' && activeProductView && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <ProductPage
              plant={activeProductView}
              onBack={() => navigateToView('shop')}
              onAddToCart={handleAddToCart}
              onSelectPlant={(plant) => openProductPage(plant)}
              onOpenOrderPage={(plant, qty, size, color) => openOrderPageWithPlant(plant, qty, size, color)}
            />
          </Suspense>
        )}

        {currentView === 'checkout' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <OrderPage
              cartItems={cartItems}
              directPlant={directCheckoutPlant}
              onBack={() => navigateToView('home')}
              onClearCart={handleClearCart}
            />
          </Suspense>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Plant Details Quick View Modal */}
      <PlantDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-card rounded-3xl border border-border shadow-2xl overflow-hidden p-6 space-y-4">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
              <input
                type="text"
                autoFocus
                placeholder="Search plants by name, category or air-purifying status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-full pl-12 pr-4 py-3.5 text-base focus:outline-none focus:border-primary text-foreground font-semibold"
              />
            </div>

            {searchQuery.trim() && (
              <div className="max-h-96 overflow-y-auto space-y-3 pt-2">
                <div className="text-xs font-bold uppercase text-muted-foreground">
                  Found {searchResults.length} Results
                </div>
                {searchResults.length === 0 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No matching plants found.
                  </div>
                ) : (
                  searchResults.map((plant) => (
                    <div
                      key={plant.id}
                      onClick={() => {
                        openProductPage(plant);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center justify-between p-3 rounded-2xl border border-border/60 hover:border-primary/40 hover:bg-secondary/40 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-sm text-foreground">{plant.name}</div>
                          <div className="text-xs text-primary font-bold">{plant.category} • ₹{plant.price}</div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(plant);
                        }}
                        className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-foreground text-background shadow-2xl border border-primary/30 animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="h-5 w-5 text-primary shrink-0" />
          <span className="text-sm font-extrabold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
