// Meta (Facebook & Instagram) Pixel Tracking Utility
// Enables Click-to-WhatsApp Ads, Custom Retargeting Audiences, and Conversion Tracking

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __META_PIXEL_ID__?: string;
  }
}

/**
 * Safe wrapper for window.fbq
 */
export const trackMetaEvent = (eventName: string, params?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    }
  } catch (err) {
    console.debug('Meta Pixel event dispatch note:', err);
  }
};

/**
 * Track Custom Event for Meta Ad Audiences
 */
export const trackMetaCustomEvent = (eventName: string, params?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, params);
    }
  } catch (err) {
    console.debug('Meta Pixel custom event note:', err);
  }
};

/**
 * Track Page Views (Triggered on view navigation)
 */
export const trackMetaPageView = () => {
  trackMetaEvent('PageView');
};

/**
 * Track Product Detail View
 */
export const trackMetaViewContent = (plantName: string, category: string, price: number) => {
  trackMetaEvent('ViewContent', {
    content_name: plantName,
    content_category: category,
    content_type: 'product',
    value: price,
    currency: 'INR',
  });
};

/**
 * Track Add to Cart
 */
export const trackMetaAddToCart = (plantName: string, price: number, quantity: number = 1) => {
  trackMetaEvent('AddToCart', {
    content_name: plantName,
    content_type: 'product',
    value: price * quantity,
    currency: 'INR',
  });
};

/**
 * Track Initiate Checkout
 */
export const trackMetaInitiateCheckout = (totalAmount: number, itemCount: number) => {
  trackMetaEvent('InitiateCheckout', {
    value: totalAmount,
    currency: 'INR',
    num_items: itemCount,
  });
};

/**
 * Track WhatsApp Chat Inquiries (Crucial for Meta Click-To-WhatsApp Ads & Lead Retargeting)
 */
export const trackMetaWhatsAppClick = (source: string, plantName?: string) => {
  // Fire Standard 'Contact' and 'Lead' Events for Meta Ad Optimization
  trackMetaEvent('Contact', {
    method: 'WhatsApp',
    source: source,
    plant_interest: plantName || 'General Inquiry',
  });
  
  trackMetaEvent('Lead', {
    content_name: plantName || 'WhatsApp Nursery Concierge',
    content_category: 'WhatsApp',
    value: 50,
    currency: 'INR',
  });

  // Also dispatch high-intent custom event
  trackMetaCustomEvent('WhatsAppChatClick', {
    source,
    plantName: plantName || 'None',
    phone: '+919479480068',
    timestamp: new Date().toISOString(),
  });
};
