import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header, ViewState } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HeroSlider } from './components/HeroSlider';
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
import { TrustValueStrip } from './components/TrustValueStrip';
import { InspirationGallery } from './components/InspirationGallery';
import { Footer } from './components/Footer';
import { RemotionBotanicalLoader } from './components/RemotionBotanicalLoader';
import { NurseryChatbot } from './components/NurseryChatbot';
import { Skeleton } from './components/Skeleton';
import { ScrollSkeletonContainer } from './components/ScrollSkeletonContainer';
import { Plant, CartItem } from './types/nursery';
import { plantsData, blogPostsData } from './data/mockData';
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
const PrivacyPage = lazy(() =>
  import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage }))
);
const TermsPage = lazy(() =>
  import('./pages/TermsPage').then((m) => ({ default: m.TermsPage }))
);
import { ProductPage } from './pages/ProductPage';
import { OrderPage } from './pages/OrderPage';
const BlogPostPage = lazy(() =>
  import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage }))
);
const QuizPage = lazy(() =>
  import('./pages/QuizPage').then((m) => ({ default: m.QuizPage }))
);

const getCategorySlug = (category: string) => {
  return (category || 'plants')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [activeProductView, setActiveProductView] = useState<Plant | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<any | null>(null);
  const [directCheckoutPlant, setDirectCheckoutPlant] = useState<{
    plant: Plant;
    quantity: number;
    size: string;
    color: string;
  } | null>(null);

  const [comingSoonPlant, setComingSoonPlant] = useState<Plant | null>(null);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState<boolean>(false);

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial page load & manual scroll restoration guarantee
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const isTestMode = typeof window !== 'undefined' && window.location.search.includes('loading_test');
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, isTestMode ? 2500 : 350);
    return () => clearTimeout(timer);
  }, []);

  // Ensure scroll is anchored to top (0, 0) and dispatch GA4 pageview on view change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname + (window.location.hash || ''),
      });
    }
  }, [currentView, activeProductView]);

  // Dynamic Document Title & Meta Description updater based on currentView & active product
  useEffect(() => {
    const metaMap: Record<ViewState, { title: string; desc: string }> = {
      home: {
        title: 'Green Vatika — Premium Plant Nursery | Indoor, Outdoor & Flowering Plants',
        desc: 'Green Vatika is a trusted premium plant nursery offering healthy indoor plants, outdoor plants, flowering plants, fruit trees, succulents, bonsai and organic gardening essentials.',
      },
      about: {
        title: 'About Us — Green Vatika Nursery',
        desc: 'Learn about Green Vatika Nursery, our 10+ year legacy, 15 acres of organic greenhouses, and our commitment to bringing healthy greenery to your home.',
      },
      categories: {
        title: 'Plant Categories — Green Vatika Nursery',
        desc: 'Explore our wide range of plant categories including Indoor, Outdoor, Flowering, Fruit trees, Succulents, Bonsai, Pots, and Gardening Tools.',
      },
      shop: {
        title: 'Shop Plants & Gardening Supplies — Green Vatika Nursery',
        desc: 'Browse our complete catalog of air-purifying house plants, fruit trees, exotic succulents, and handcrafted pots with express delivery.',
      },
      quiz: {
        title: 'Plant Matcher Quiz — Find Your Perfect Plant | Green Vatika',
        desc: 'Take our interactive plant quiz to discover the ideal indoor or outdoor plants tailored to your light, watering, and space preferences.',
      },
      services: {
        title: 'Landscape & Gardening Services — Green Vatika Nursery',
        desc: 'Professional garden landscaping, AMC plant maintenance, terrace garden setups, living green wall installations, and plant doctor consultations.',
      },
      blog: {
        title: 'Plant Care & Gardening Blog — Green Vatika Nursery',
        desc: 'Read expert advice from senior horticulturists on houseplant care, watering tips, balcony gardening, and NASA air-purifying plants.',
      },
      'blog-post': {
        title: selectedBlogPost ? `${selectedBlogPost.title} — Green Vatika Nursery Blog` : 'Gardening Guide — Green Vatika Nursery',
        desc: selectedBlogPost ? selectedBlogPost.excerpt : 'Detailed plant care advice and gardening tips from expert horticulturists.',
      },
      contact: {
        title: 'Contact Us & Nursery Location — Green Vatika Nursery',
        desc: 'Visit Green Vatika Nursery at Niranjan Ward, Teen Puliya, Khairi Naka, Narsinghpur, MP or reach out via WhatsApp for plant orders.',
      },
      product: {
        title: activeProductView ? `${activeProductView.name} — Green Vatika Nursery` : 'Plant Details — Green Vatika Nursery',
        desc: activeProductView ? activeProductView.description : 'Detailed plant specifications, care instructions, and online ordering.',
      },
      checkout: {
        title: 'Order Checkout — Green Vatika Nursery',
        desc: 'Complete your plant purchase with express delivery scheduling and instant WhatsApp confirmation.',
      },
      privacy: {
        title: 'Privacy Policy — Green Vatika Nursery',
        desc: 'Read the privacy policy of Green Vatika Nursery regarding customer data protection and safe orders.',
      },
      terms: {
        title: 'Terms of Service — Green Vatika Nursery',
        desc: 'Read the terms and conditions for purchasing plants and landscaping services from Green Vatika Nursery.',
      },
    };

    const currentMeta = metaMap[currentView] || metaMap.home;
    document.title = currentMeta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentMeta.desc);
    }
  }, [currentView, activeProductView]);

  // Sync dark mode class with root html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Clean URL Path & Hash Routing listener (Instant sync, clean paths /shop, /product?id=...)
  useEffect(() => {
    const syncViewFromUrl = () => {
      const pathSegments = window.location.pathname.replace(/^\//, '').split('/');
      const rawPath = pathSegments[0] ? pathSegments[0].toLowerCase() : '';
      const rawHash = window.location.hash.replace('#', '');
      const [hashView, hashQuery] = rawHash.split('?');
      const cleanView = (rawPath || hashView || '').toLowerCase();
      const searchParams = new URLSearchParams(window.location.search || (hashQuery ? `?${hashQuery}` : ''));

      if (cleanView === 'product') {
        const queryId = searchParams.get('id');
        let plantId = queryId;
        if (!plantId) {
          if (pathSegments.length >= 3 && pathSegments[2]) {
            plantId = pathSegments[2];
          } else if (pathSegments.length >= 2 && pathSegments[1]) {
            plantId = pathSegments[1];
          }
        }

        if (plantId) {
          const found = plantsData.find((p) => p.id === plantId);
          if (found) setActiveProductView(found);
          else setActiveProductView(plantsData[0]);
        } else {
          setActiveProductView((prev) => prev || plantsData[0]);
        }
        setCurrentView('product');
      } else if (cleanView === 'blog' || cleanView === 'blog-post') {
        const postId = searchParams.get('id') || pathSegments[1];
        if (postId) {
          const found = blogPostsData.find((b) => b.id === postId);
          if (found) {
            setSelectedBlogPost(found);
            setCurrentView('blog-post');
          } else {
            setCurrentView('blog');
          }
        } else {
          setCurrentView(cleanView === 'blog-post' ? 'blog-post' : 'blog');
        }
      } else if (['about', 'categories', 'shop', 'quiz', 'services', 'contact', 'checkout', 'privacy', 'terms'].includes(cleanView)) {
        setCurrentView(cleanView as ViewState);
      } else {
        setCurrentView('home');
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    syncViewFromUrl();
    window.addEventListener('hashchange', syncViewFromUrl);
    window.addEventListener('popstate', syncViewFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncViewFromUrl);
      window.removeEventListener('popstate', syncViewFromUrl);
    };
  }, []);

  // Lightning-fast clean URL router (Instant 0ms transition, clean paths)
  const navigateToView = (view: ViewState) => {
    if (view !== 'checkout') {
      setDirectCheckoutPlant(null);
    }
    let targetPath = '';
    if (view === 'home') {
      targetPath = '/';
    } else if (view === 'product') {
      const plant = activeProductView || plantsData[0];
      const catSlug = getCategorySlug(plant.category);
      targetPath = `/product/${catSlug}/${plant.id}`;
    } else if (view === 'blog-post' && selectedBlogPost) {
      targetPath = `/blog?id=${selectedBlogPost.id}`;
    } else {
      targetPath = `/${view}`;
    }

    if (window.location.pathname + window.location.search !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
    selectedSize: string = '8 inch standard',
    selectedPotColor: string = 'Terracotta',
    includePot: boolean = false,
    potPrice: number = 60
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.plant.id === plant.id &&
          (item.selectedSize || '8 inch standard') === selectedSize &&
          (item.selectedPotColor || 'Terracotta') === selectedPotColor &&
          !!item.includePot === includePot
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { plant, quantity, selectedSize, selectedPotColor, includePot, potPrice }];
    });
    showToast(`Added ${plant.name}${includePot ? ' (+Planter)' : ''} to your garden cart.`);
  };

  const handleBuyNowDirect = (plant: Plant) => {
    setDirectCheckoutPlant({
      plant,
      quantity: 1,
      size: plant.potSize || '8 inch standard',
      color: 'Terracotta',
    });
    navigateToView('checkout');
  };

  const handleUpdateQuantity = (
    plantId: string,
    newQuantity: number,
    selectedSize: string = '8 inch standard',
    selectedPotColor: string = 'Terracotta'
  ) => {
    if (newQuantity <= 0) {
      handleRemoveItem(plantId, selectedSize, selectedPotColor);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.plant.id === plantId &&
        (item.selectedSize || '8 inch standard') === selectedSize &&
        (item.selectedPotColor || 'Terracotta') === selectedPotColor
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (
    plantId: string,
    selectedSize: string = '8 inch standard',
    selectedPotColor: string = 'Terracotta'
  ) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.plant.id === plantId &&
            (item.selectedSize || '8 inch standard') === selectedSize &&
            (item.selectedPotColor || 'Terracotta') === selectedPotColor
          )
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const openProductPage = (plant: Plant) => {
    setActiveProductView(plant);
    const catSlug = getCategorySlug(plant.category);
    const targetPath = `/product/${catSlug}/${plant.id}`;
    if (window.location.pathname + window.location.search !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setCurrentView('product');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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

  const openBlogPostPage = (post: any) => {
    setSelectedBlogPost(post);
    navigateToView('blog-post');
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
      {/* Remotion Botanical Orbital Loader on Initial Load & View Navigation */}
      {(initialLoading || isNavigating) && (
        <RemotionBotanicalLoader
          size="fullscreen"
          label="Green Vatika"
          subtext={initialLoading ? "Nurturing Authentic Indian Flora" : "Loading Botanical Selection..."}
        />
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
            <HeroSection
              onShopClick={() => navigateToView('shop')}
              onVisitClick={() => navigateToView('contact')}
            />
            <TrustValueStrip />
            <ScrollSkeletonContainer height="h-96">
              <CategorySection
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  navigateToView('shop');
                }}
              />
            </ScrollSkeletonContainer>
            <HeroSlider />
            <ScrollSkeletonContainer height="h-[600px]">
              <ShopSection
                onSelectPlant={(plant) => openProductPage(plant)}
                onAddToCart={(plant) => handleAddToCart(plant)}
                onBuyNowDirect={(plant) => handleBuyNowDirect(plant)}
                selectedCategoryFilter={selectedCategory}
              />
            </ScrollSkeletonContainer>
            <InspirationGallery onSelectPlant={(plant) => openProductPage(plant)} />
            <ScrollSkeletonContainer height="h-80">
              <AboutSection />
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
            <BlogSection onSelectPost={openBlogPostPage} />
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
              onBuyNowDirect={(plant) => handleBuyNowDirect(plant)}
              selectedCategoryFilter={selectedCategory}
            />
          </Suspense>
        )}

        {currentView === 'quiz' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <QuizPage
              onBack={() => navigateToView('home')}
              onSelectPlant={(plant) => openProductPage(plant)}
              onAddToCart={(plant) => handleAddToCart(plant)}
            />
          </Suspense>
        )}

        {currentView === 'services' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <ServicesPage onBack={() => navigateToView('home')} />
          </Suspense>
        )}

        {currentView === 'blog' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <BlogPage onBack={() => navigateToView('home')} onSelectPost={openBlogPostPage} />
          </Suspense>
        )}

        {currentView === 'blog-post' && selectedBlogPost && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <BlogPostPage
              post={selectedBlogPost}
              onBack={() => navigateToView('blog')}
              onSelectPost={openBlogPostPage}
              onSelectPlant={(plant) => openProductPage(plant)}
            />
          </Suspense>
        )}

        {currentView === 'contact' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <ContactPage onBack={() => navigateToView('home')} />
          </Suspense>
        )}

        {currentView === 'privacy' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <PrivacyPage onBack={() => navigateToView('home')} />
          </Suspense>
        )}

        {currentView === 'terms' && (
          <Suspense fallback={<PageFallbackSkeleton />}>
            <TermsPage onBack={() => navigateToView('home')} />
          </Suspense>
        )}

        {currentView === 'product' && (
          <ProductPage
            plant={activeProductView || plantsData[0]}
            onBack={() => navigateToView('shop')}
            onAddToCart={handleAddToCart}
            onSelectPlant={(plant) => openProductPage(plant)}
            onOpenOrderPage={(plant, qty, size, color) => openOrderPageWithPlant(plant, qty, size, color)}
          />
        )}

        {currentView === 'checkout' && (
          <OrderPage
            cartItems={cartItems}
            directPlant={directCheckoutPlant}
            onBack={() => navigateToView('shop')}
            onClearCart={() => {
              handleClearCart();
              setDirectCheckoutPlant(null);
            }}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateView={navigateToView} />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigateCheckout={() => navigateToView('checkout')}
      />

      {/* Plant Details Quick View Modal */}
      <PlantDetailModal
        plant={selectedPlant}
        onClose={() => setSelectedPlant(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl bg-background/95 backdrop-blur-2xl rounded-3xl border border-primary/20 shadow-2xl overflow-hidden p-5 sm:p-6 space-y-4 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Search className="h-4 w-4" />
                </div>
                <h3 className="font-heading font-extrabold text-base text-foreground">
                  Search Plants & Supplies
                </h3>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-secondary text-foreground/80 transition-colors border border-border/40"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Input Box */}
            <div className="relative rounded-2xl bg-secondary/60 border border-border/80 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all p-1 flex items-center shadow-inner">
              <Search className="h-5 w-5 text-primary ml-3 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search by plant name, category, or care..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none px-3 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-foreground focus:outline-none placeholder:text-muted-foreground/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-2 rounded-full hover:bg-secondary text-muted-foreground mr-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Popular Search Tags */}
            {!searchQuery.trim() && (
              <div className="pt-1">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2">
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Indoor', 'Air Purifiers', 'Flowering', 'Fruit Trees', 'Succulents', 'Bonsai'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-primary/15 hover:text-primary text-xs font-bold text-foreground transition-colors border border-border/50"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results Section */}
            {searchQuery.trim() && (
              <div className="max-h-96 overflow-y-auto space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Found {searchResults.length} Matching Plants
                </div>
                {searchResults.length === 0 ? (
                  <div className="text-center py-10 bg-secondary/30 rounded-2xl border border-dashed border-border p-4">
                    <Search className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                    <div className="font-bold text-sm text-foreground">No plants found for "{searchQuery}"</div>
                    <div className="text-xs text-muted-foreground mt-1">Try searching for Indoor, Snake Plant, or Bonsai.</div>
                  </div>
                ) : (
                  searchResults.map((plant) => (
                    <div
                      key={plant.id}
                      onClick={() => {
                        openProductPage(plant);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center justify-between p-3 rounded-2xl border border-border/60 hover:border-primary/40 hover:bg-secondary/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="h-12 w-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <div className="font-extrabold text-sm text-foreground group-hover:text-primary transition-colors">
                            {plant.name}
                          </div>
                          <div className="text-xs text-primary font-bold">
                            {plant.category} • ₹{plant.price}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(plant);
                        }}
                        className="p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                        title="Add to Cart"
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

      {/* Floating Nursery Knowledge Chatbot (Right-Side, Working Heuristic & Catalog Q&A) */}
      <NurseryChatbot />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-foreground text-background shadow-2xl border border-primary/30 animate-in slide-in-from-bottom duration-300">
          <CheckCircle className="h-5 w-5 text-primary shrink-0" />
          <span className="text-sm font-extrabold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
