import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Check, Settings2 } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacyPolicy?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacyPolicy }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(true);
  const [marketingEnabled, setMarketingEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Check if user has already accepted or configured cookies
    const storedConsent = localStorage.getItem('green_vatika_cookie_consent');
    if (!storedConsent) {
      // Delay showing by 1.2s for pleasant onboarding
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'green_vatika_cookie_consent',
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem(
      'green_vatika_cookie_consent',
      JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'green_vatika_cookie_consent',
      JSON.stringify({
        essential: true,
        analytics: analyticsEnabled,
        marketing: marketingEnabled,
        timestamp: new Date().toISOString(),
      })
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Preferences"
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-50 max-w-[calc(100vw-2rem)] sm:max-w-md bg-card/95 backdrop-blur-xl border border-border/90 rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 ring-1 ring-primary/20 text-foreground"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <Cookie className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-heading font-black text-sm sm:text-base text-foreground leading-tight">
              Botanical Privacy &amp; Cookies
            </h4>
            <span className="text-[11px] text-muted-foreground font-medium">
              Green Vatika Nursery
            </span>
          </div>
        </div>

        <button
          onClick={handleEssentialOnly}
          className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
          aria-label="Dismiss cookie notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-foreground/80 leading-relaxed font-normal mb-4">
        We use essential cookies and respectful privacy signals to preserve your cart, deliver fast plant recommendations, and optimize greenhouse loading times.{' '}
        {onOpenPrivacyPolicy && (
          <button
            onClick={onOpenPrivacyPolicy}
            className="text-primary hover:underline font-bold inline-block"
          >
            Read Privacy Policy
          </button>
        )}
      </p>

      {/* Preferences Drawer */}
      {showPreferences && (
        <div className="space-y-3 pt-3 pb-3 border-t border-border/60 text-xs mb-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-foreground">Strictly Essential</div>
              <div className="text-[10px] text-muted-foreground">Cart, security &amp; basic session navigation</div>
            </div>
            <span className="text-[10px] font-black text-primary uppercase tracking-wide bg-primary/10 px-2 py-0.5 rounded-full">
              Always Active
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="font-bold text-foreground">Analytics &amp; Performance</div>
              <div className="text-[10px] text-muted-foreground">Anonymous visitor insights (Google Analytics)</div>
            </div>
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              className="accent-primary h-4 w-4 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="font-bold text-foreground">Marketing &amp; WhatsApp</div>
              <div className="text-[10px] text-muted-foreground">Tailored seasonal plant recommendations</div>
            </div>
            <input
              type="checkbox"
              checked={marketingEnabled}
              onChange={(e) => setMarketingEnabled(e.target.checked)}
              className="accent-primary h-4 w-4 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {showPreferences ? (
          <button
            onClick={handleSavePreferences}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Save Preferences</span>
          </button>
        ) : (
          <>
            <button
              onClick={handleAcceptAll}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Accept All</span>
            </button>
            <button
              onClick={handleEssentialOnly}
              className="inline-flex items-center justify-center px-3.5 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold border border-border/80 transition-all cursor-pointer"
            >
              <span>Essential Only</span>
            </button>
          </>
        )}

        <button
          onClick={() => setShowPreferences((prev) => !prev)}
          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          title="Customize Cookies"
          aria-label="Customize cookie settings"
        >
          <Settings2 className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
};
