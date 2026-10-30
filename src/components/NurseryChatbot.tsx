import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleMore, X, Send, RotateCcw, ShoppingBag, PhoneCall, ChevronRight, HelpCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickAction?: {
    type: 'whatsapp' | 'catalog' | 'care';
    label: string;
    actionUrl?: string;
  };
}

// Helper to strictly ensure NO emojis are displayed anywhere in the chatbot
const removeEmojis = (text: string): string => {
  return text
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '')
    .trim();
};

// Pure Web Audio API Synthesizer for Bot Response Chime (Zero External Asset Dependency)
const playBotChime = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Harmonic Note 1: E5 (659.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.22);

    // Harmonic Note 2: B5 (987.77 Hz) slightly offset for a bright notification chime
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.07);
    gain2.gain.setValueAtTime(0.1, now + 0.07);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.35);
  } catch (e) {
    console.debug('Audio chime playback ignored:', e);
  }
};

const SUGGESTED_QUERIES = [
  'Plant Prices & Catalog',
  'Is Pot Included?',
  'How to Order via WhatsApp',
  'Care for Desi Rose & Adenium',
  'Nursery Address & Timings',
];

export const NurseryChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Welcome to <strong>Green Vatika Nursery</strong>. I am your direct knowledge assistant. Ask me about <strong>plant varieties, live prices, terracotta gamla add-ons, balcony plant care, or how to place an order via WhatsApp</strong>.',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome_reset_' + Date.now(),
        sender: 'bot',
        text: 'Conversation reset. How can <strong>Green Vatika</strong> help your garden today? Ask about <strong>flowering plants, prices, terracotta pots, or WhatsApp orders</strong>.',
        timestamp: 'Just now',
      },
    ]);
  };

  const generateAnswer = (userQuery: string): { text: string; quickAction?: ChatMessage['quickAction'] } => {
    const q = userQuery.toLowerCase().trim();

    // 1. Pot inclusion & Packaging warning
    if (q.includes('pot') || q.includes('gamla') || q.includes('included') || q.includes('packaging') || q.includes('bag')) {
      return {
        text: 'Important note: <strong>Pot is NOT included</strong> with standard plant orders. All saplings are shipped in protective, root-balled <strong>Grower Nursery Polybags</strong> with enriched soil to prevent root shock during transit.<br/><br/>You can opt for our <strong>8-Inch Handcrafted Terracotta Clay Gamla</strong> as an add-on for just <strong>Rs 60 per plant</strong>. Clay pots offer superior root aeration and prevent root rot in hot Indian weather.',
        quickAction: {
          type: 'whatsapp',
          label: 'Order Plant with Terracotta Pot (+Rs 60)',
          actionUrl: 'https://wa.me/919179812429?text=Hello%20Green%20Vatika,%20I%20want%20to%20inquire%20about%20ordering%20plants%20with%20Terracotta%20Pots.',
        },
      };
    }

    // 2. Pricing & Plant Catalog
    if (q.includes('price') || q.includes('rate') || q.includes('cost') || q.includes('catalog') || q.includes('list') || q.includes('plants available')) {
      return {
        text: 'Here is our verified nursery catalog with current direct rates:<br/><br/>' +
          '• <strong>Adenium Bonsai (Desert Rose)</strong>: <strong>Rs 100</strong> (MRP Rs 180)<br/>' +
          '• <strong>Bougainvillea (Kagaz Ke Phool)</strong>: <strong>Rs 160</strong> (MRP Rs 250)<br/>' +
          '• <strong>Desi Red Rose (Fragrant Gulab)</strong>: <strong>Rs 70</strong> (MRP Rs 120)<br/>' +
          '• <strong>Yellow Marigold (Genda)</strong>: <strong>Rs 45</strong> (MRP Rs 70)<br/>' +
          '• <strong>Dahlia (Dinnerplate Hybrid)</strong>: <strong>Rs 50</strong> (MRP Rs 85)<br/>' +
          '• <strong>Aparajita (Blue Butterfly Pea)</strong>: <strong>Rs 50</strong> (MRP Rs 80)<br/>' +
          '• <strong>Mogra (Arabian Jasmine)</strong>: <strong>Rs 70</strong> (MRP Rs 110)<br/>' +
          '• <strong>Chandni (Crepe Jasmine)</strong>: <strong>Rs 60</strong> (MRP Rs 95)<br/>' +
          '• <strong>Krishna Kamal (Passionflower)</strong>: <strong>Rs 50</strong> (MRP Rs 90)<br/>' +
          '• <strong>Handcrafted Terracotta Pot</strong>: <strong>Rs 60</strong>',
        quickAction: {
          type: 'whatsapp',
          label: 'Book Order via WhatsApp',
          actionUrl: 'https://wa.me/919179812429?text=Hello%20Green%20Vatika,%20I%20want%20to%20order%20plants%20from%20your%20nursery%20catalog.',
        },
      };
    }

    // 3. Ordering, Buy Now & Shipping Policy
    if (q.includes('order') || q.includes('buy') || q.includes('shipping') || q.includes('delivery') || q.includes('online') || q.includes('courier')) {
      return {
        text: 'Direct online automated courier shipping is <strong>Coming Soon</strong> to guarantee 100 percent live plant safety.<br/><br/>Right now, we accept direct orders via <strong>WhatsApp at +91 91798 12429</strong>. We arrange nursery pickup as well as localized delivery across <strong>Narsinghpur, Jabalpur, Bhopal, Indore, and Madhya Pradesh</strong>.',
        quickAction: {
          type: 'whatsapp',
          label: 'Message Helpline on WhatsApp',
          actionUrl: 'https://wa.me/919179812429?text=Hello%20Green%20Vatika,%20I%20would%20like%20to%20place%20an%20order.',
        },
      };
    }

    // 4. Plant Care, Sunlight & Watering
    if (q.includes('care') || q.includes('water') || q.includes('sun') || q.includes('soil') || q.includes('fertilizer') || q.includes('khad')) {
      return {
        text: 'Essential Indian gardening guidelines for healthy blooms:<br/><br/>' +
          '• <strong>Sunlight</strong>: Desi Gulab, Bougainvillea, Marigold, and Adenium require <strong>5 to 6 hours of direct outdoor sunlight</strong> daily.<br/>' +
          '• <strong>Watering</strong>: For Adenium Bonsai, water strictly <strong>once a week</strong> when the soil is completely bone dry. For Roses and Bougainvillea, water when the top 2 inches of soil feel dry.<br/>' +
          '• <strong>Soil Mix</strong>: Use <strong>40 percent garden loam, 30 percent coarse river sand, and 30 percent aged cow dung manure (gobar khad)</strong> for supreme drainage.<br/>' +
          '• <strong>Feeding</strong>: Feed with bone meal, neem cake powder, or organic vermicompost every <strong>20 to 30 days</strong>.',
      };
    }

    // 5. Specific plant queries
    if (q.includes('rose') || q.includes('gulab')) {
      return {
        text: 'Our <strong>Desi Red Rose (Fragrant Gulab)</strong> is priced at <strong>Rs 70</strong>. Unlike scentless English roses, this heritage native variety features rich damask fragrance and continuous blooming flushes. Place in full sun and enrich with bone meal and mustard cake liquid once a month.',
      };
    }

    if (q.includes('adenium') || q.includes('desert rose')) {
      return {
        text: 'The <strong>Adenium Bonsai (Desert Rose)</strong> is priced at <strong>Rs 100</strong>. It features a swollen, water-storing caudex trunk and vibrant bell-shaped blossoms. It is drought resilient, loves scorching Indian heat, and should never sit in standing water.',
      };
    }

    if (q.includes('bougainvillea')) {
      return {
        text: 'Our <strong>Bougainvillea (Kagaz Ke Phool)</strong> is priced at <strong>Rs 160</strong>. It produces dense magenta bracts and thrives on sunny balconies and fences. Tip: Mild dry stress in full sun triggers prolific blooming.',
      };
    }

    // 6. Nursery Address, Location & Timings
    if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('timing') || q.includes('time') || q.includes('phone') || q.includes('contact')) {
      return {
        text: 'Nursery Details:<br/><br/>' +
          '• <strong>Location</strong>: Green Vatika Nursery, Station Road, Narsinghpur, Madhya Pradesh 487001<br/>' +
          '• <strong>Timings</strong>: Open Monday to Sunday from <strong>8:00 AM to 7:00 PM</strong><br/>' +
          '• <strong>Customer Care & Orders</strong>: <strong>+91 91798 12429</strong><br/>' +
          '• <strong>Email</strong>: info@greenvatika.in',
        quickAction: {
          type: 'whatsapp',
          label: 'Get Google Maps Directions on WhatsApp',
          actionUrl: 'https://wa.me/919179812429?text=Hello%20Green%20Vatika,%20please%20share%20nursery%20location%20and%20directions.',
        },
      };
    }

    // 7. Services (Landscape, Garden setup)
    if (q.includes('service') || q.includes('balcony') || q.includes('landscape') || q.includes('lawn') || q.includes('setup')) {
      return {
        text: 'Green Vatika provides specialized on-site horticultural services:<br/><br/>' +
          '• <strong>Balcony Garden Makeovers</strong>: Custom planter boxes, drip systems, and sunlight-aligned flowering setup.<br/>' +
          '• <strong>Landscape Design & Lawn Turfing</strong>: Commercial villas, residential lawns, and institutional estates.<br/>' +
          '• <strong>Plant Doctor & Maintenance</strong>: Organic pest management, seasonal pruning, and pot repotting.',
      };
    }

    // Default intelligent fallback
    return {
      text: 'Thank you for your question. At <strong>Green Vatika Nursery</strong>, we provide healthy flowering outdoor saplings starting at <strong>Rs 45</strong>, aged Adenium bonsai for <strong>Rs 100</strong>, and handcrafted terracotta gamlas for <strong>Rs 60</strong>.<br/><br/>Live plants are dispatched in <strong>Grower Polybags</strong> (pots optional). For custom orders or immediate nursery assistance, connect directly with our head horticulturist on WhatsApp.',
      quickAction: {
        type: 'whatsapp',
        label: 'Connect with Horticulturist on WhatsApp',
        actionUrl: `https://wa.me/919179812429?text=${encodeURIComponent('Hello Green Vatika, I have a question: ' + userQuery)}`,
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const rawText = textToSend || inputValue;
    const cleanText = removeEmojis(rawText);
    if (!cleanText) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: cleanText,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const { text, quickAction } = generateAnswer(cleanText);
      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'bot',
        text: removeEmojis(text),
        timestamp: 'Just now',
        quickAction,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      playBotChime();
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button on Bottom-Right - Sleek Chat Bubble, Positioned Higher on Mobile */}
      <div className="fixed bottom-24 sm:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Green Vatika Plant Assistant"
            className="group flex items-center justify-center h-13 w-13 sm:h-14 sm:w-14 rounded-full bg-primary hover:bg-primary/95 text-primary-foreground shadow-2xl hover:shadow-primary/40 border border-emerald-400/30 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <MessageCircleMore className="h-6 w-6 text-white" />
          </button>
        )}
      </div>

      {/* Floating Chat Modal Box - Positioned Above Mobile Floating Bar */}
      {isOpen && (
        <div className="fixed bottom-24 inset-x-3 sm:inset-x-auto sm:right-6 sm:bottom-6 z-50 w-auto sm:w-[420px] max-w-[420px] mx-auto sm:mx-0 h-[520px] max-h-[calc(100vh-7rem)] bg-card border border-border/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header - Clean, Professional, Strictly NO Green Dot & NO Emojis */}
          <div className="bg-primary text-primary-foreground px-4 py-3.5 flex items-center justify-between border-b border-emerald-600/40 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center text-white border border-white/20 shadow-inner">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="font-heading font-extrabold text-sm sm:text-base leading-tight text-white tracking-wide">
                  Green Vatika Assistant
                </div>
                <div className="text-[11px] text-emerald-100 font-medium">
                  Nursery Catalog, Pricing and Care Information
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="h-8 w-8 rounded-lg hover:bg-white/15 flex items-center justify-center transition-colors text-white/90 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="h-8 w-8 rounded-lg hover:bg-white/15 flex items-center justify-center transition-colors text-white/90 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Query Pills - Refined Thin Horizontal Scrollbar */}
          <div className="bg-muted/40 border-b border-border/50 px-3 py-2.5 overflow-x-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-muted/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/80 hover:[&::-webkit-scrollbar-thumb]:bg-primary/50 flex items-center gap-1.5 shrink-0">
            {SUGGESTED_QUERIES.map((query, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(query)}
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-card hover:bg-primary hover:text-white border border-border/80 text-muted-foreground whitespace-nowrap transition-colors shadow-2xs"
              >
                {query}
              </button>
            ))}
          </div>

          {/* Message Thread Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-background/50 text-foreground">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card text-card-foreground border border-border/70 rounded-bl-none'
                  }`}
                >
                  <p
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />

                  {/* Optional Quick Action Button */}
                  {msg.quickAction && msg.quickAction.actionUrl && (
                    <div className="mt-2.5 pt-2 border-t border-border/40">
                      <a
                        href={msg.quickAction.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:text-primary/80 transition-colors bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg border border-primary/20"
                      >
                        <PhoneCall className="h-3.5 w-3.5" />
                        <span>{msg.quickAction.label}</span>
                        <ChevronRight className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground/70 font-medium px-1 mt-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-card border border-border/70 rounded-2xl rounded-bl-none px-4 py-3 w-20 shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-card border-t border-border/80 shrink-0">
            <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-2xl px-3 py-1.5 focus-within:border-primary/60 transition-colors">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(removeEmojis(e.target.value))}
                onKeyDown={handleKeyDown}
                placeholder="Ask plant name, price, pot add-on or care..."
                className="flex-1 bg-transparent border-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden py-1.5"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="h-8 w-8 rounded-xl bg-primary disabled:opacity-40 text-white flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="text-[10px] text-muted-foreground text-center font-medium mt-1.5">
              Instant answers on all Green Vatika nursery stock and services
            </div>
          </div>
        </div>
      )}
    </>
  );
};
