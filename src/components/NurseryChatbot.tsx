import React, { useState, useRef, useEffect } from 'react';
import { MessageCircleMore, X, Send, RotateCcw, ShoppingBag, PhoneCall, ChevronRight, HelpCircle } from 'lucide-react';
import { plantsData, categoriesData, blogPostsData } from '../data/mockData';
import { Plant } from '../types/nursery';

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
// Note: We do NOT call .trim() here so users can type spaces between words naturally
const removeEmojis = (text: string): string => {
  return text.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '');
};

const getFormattedTime = (): string => {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
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

// Dynamic plant finder function: searches live plantsData without any hardcoded values
const findMatchingPlant = (query: string): Plant | undefined => {
  const q = query.toLowerCase().trim();
  if (!q) return undefined;

  // 1. Exact match on ID or name
  let matched = plantsData.find(
    (p) =>
      p.id.toLowerCase() === q ||
      p.name.toLowerCase() === q ||
      p.botanicalName.toLowerCase() === q
  );
  if (matched) return matched;

  // 2. Substring match on name or botanical name
  matched = plantsData.find(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.botanicalName.toLowerCase().includes(q) ||
      q.includes(p.name.toLowerCase()) ||
      q.includes(p.botanicalName.toLowerCase())
  );
  if (matched) return matched;

  // 3. Keyword aliases mapping to live IDs
  const aliases: Record<string, string[]> = {
    'adenium-bonsai-desert-rose': ['adenium', 'desert rose', 'fat trunk', 'caudex', 'bonsai'],
    'desi-red-rose-gulab': ['rose', 'gulab', 'desi gulab', 'red rose', 'desi rose'],
    'bougainvillea-magenta': ['bougainvillea', 'kagaz ke phool', 'booganbel', 'paper flower'],
    'yellow-marigold-genda': ['marigold', 'genda', 'tagetes', 'yellow genda', 'pooja flower'],
    'aparajita-blue-pea': ['aparajita', 'blue pea', 'shankhpushpi', 'clitoria'],
    'chandani-crepe-jasmine': ['chandani', 'chandni', 'crepe jasmine', 'tabernaemontana'],
    'dahlia-pompom': ['dahlia', 'dinnerplate', 'winter flower'],
    'mogara-arabian-jasmine': ['mogara', 'mogra', 'arabian jasmine', 'jasminum sambac', 'fragrant jasmine'],
    'krishna-kamal-passionflower': ['krishna kamal', 'passion flower', 'passionflower', 'passiflora', 'kaurav pandav'],
    'terracotta-pot-traditional': ['pot', 'pots', 'gamla', 'gamle', 'terracotta', 'mitti ka gamla', 'clay pot'],
  };

  for (const [plantId, keywords] of Object.entries(aliases)) {
    if (keywords.some((kw) => q.includes(kw))) {
      const found = plantsData.find((p) => p.id === plantId);
      if (found) return found;
    }
  }

  // 4. Match category or care instructions
  matched = plantsData.find(
    (p) =>
      !p.hidden &&
      (p.category.toLowerCase().includes(q) ||
        p.careInstructions.some((c) => c.toLowerCase().includes(q)))
  );
  return matched;
};

export const NurseryChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [lastReferencedPlantId, setLastReferencedPlantId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Welcome to <strong>Green Vatika Nursery</strong>. I am your direct live data assistant. Ask me about <strong>live plant prices, varieties, care guidelines, terracotta pots, nursery founder, or direct WhatsApp ordering</strong>.',
      timestamp: getFormattedTime(),
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
    setCurrentTopic(null);
    setLastReferencedPlantId(null);
    setMessages([
      {
        id: 'welcome_reset_' + Date.now(),
        sender: 'bot',
        text: 'Conversation reset. How can <strong>Green Vatika</strong> help your garden today? Ask about <strong>any live plant, current prices, terracotta pots, or nursery pickup</strong>.',
        timestamp: getFormattedTime(),
      },
    ]);
  };

  const generateAnswer = (userQuery: string): { text: string; quickAction?: ChatMessage['quickAction'] } => {
    const q = userQuery.toLowerCase().trim();

    // 0. Owner, Founder, Proprietor & Samar Patel queries
    if (
      q.includes('owner') ||
      q.includes('founder') ||
      q.includes('malik') ||
      q.includes('kiska') ||
      q.includes('kiski') ||
      q.includes('who owns') ||
      q.includes('proprietor') ||
      q.includes('samar') ||
      q.includes('rajkumar') ||
      q.includes('who created') ||
      q.includes('who started')
    ) {
      setCurrentTopic('owner');
      return {
        text: '<strong>Green Vatika Nursery</strong> was founded by <strong>Rajkumar Patel</strong> (Founder & Master Horticulturist with 15+ years experience in tropical flora) and is steered together with <strong>Samar Patel</strong>.<br/><br/>Based in <strong>Teen Puliya, Khairi Naka, Niranjan Ward, Narsinghpur (Madhya Pradesh) - 487001</strong>, our 15-acre polyhouses nurture sun-hardy flowering varieties, specimen Adenium bonsai, and artisanal terracotta planters directly for plant lovers.',
        quickAction: {
          type: 'whatsapp',
          label: 'Chat with Nursery Team on WhatsApp',
          actionUrl: 'https://wa.me/919479480068?text=Hello%20Green%20Vatika%20team,%20I%20am%20reaching%20out%20via%20the%20website.',
        },
      };
    }

    // 1. Contextual Follow-up Memory: If user asks "price?", "how much?", "kitne ka hai?"
    const isPriceFollowUp =
      (q === 'price' ||
        q === 'price?' ||
        q === 'kitne ka hai' ||
        q === 'kitne ka hai?' ||
        q === 'how much' ||
        q === 'how much?' ||
        q === 'cost' ||
        q === 'rate' ||
        q === 'rate?' ||
        q.includes('iska price') ||
        q.includes('rate kya hai')) &&
      lastReferencedPlantId;

    if (isPriceFollowUp) {
      const p = plantsData.find((item) => item.id === lastReferencedPlantId);
      if (p) {
        return {
          text: `Our <strong>${p.name}</strong> (${p.botanicalName}) is currently priced at <strong>Rs ${p.price}</strong> (MRP Rs ${p.originalPrice}, ${p.discount}% OFF). Supplied root-balled in a nursery grower bag with enriched organic loam.`,
          quickAction: {
            type: 'whatsapp',
            label: `Order ${p.name} on WhatsApp (Rs ${p.price})`,
            actionUrl: `https://wa.me/919479480068?text=${encodeURIComponent(`Hello Green Vatika, I want to order ${p.name} (Rs ${p.price}).`)}`,
          },
        };
      }
    }

    // 2. Contextual Follow-up Memory: If user asks "care?", "water?", "pani kab de?", "dhoop?"
    const isCareFollowUp =
      (q.includes('care') || q.includes('water') || q.includes('pani') || q.includes('dhoop') || q.includes('sun')) &&
      lastReferencedPlantId;

    if (isCareFollowUp) {
      const p = plantsData.find((item) => item.id === lastReferencedPlantId);
      if (p) {
        return {
          text: `Care Guide for <strong>${p.name}</strong>:<br/><br/>` +
            `• <strong>Sunlight</strong>: ${p.light}<br/>` +
            `• <strong>Watering</strong>: ${p.water}<br/>` +
            `• <strong>Care Difficulty</strong>: ${p.difficulty}<br/>` +
            `• <strong>Horticulturist Note</strong>: ${p.description}`,
          quickAction: {
            type: 'whatsapp',
            label: `Ask Plant Doctor about ${p.name}`,
            actionUrl: `https://wa.me/919479480068?text=${encodeURIComponent(`Hello Plant Doctor, I need care advice for ${p.name}.`)}`,
          },
        };
      }
    }

    // 3. Dynamic Search for Specific Plant mentioned in user query
    const matchedPlant = findMatchingPlant(q);
    if (matchedPlant) {
      setLastReferencedPlantId(matchedPlant.id);
      setCurrentTopic('plant');
      return {
        text: `<strong>${matchedPlant.name}</strong> (<em>${matchedPlant.botanicalName}</em>):<br/><br/>` +
          `• <strong>Live Rate</strong>: <strong>Rs ${matchedPlant.price}</strong> (MRP Rs ${matchedPlant.originalPrice} • <strong>${matchedPlant.discount}% OFF</strong>)<br/>` +
          `• <strong>Sunlight Needs</strong>: ${matchedPlant.light}<br/>` +
          `• <strong>Watering</strong>: ${matchedPlant.water}<br/>` +
          `• <strong>Care Level</strong>: ${matchedPlant.difficulty}<br/>` +
          `• <strong>About</strong>: ${matchedPlant.description}<br/><br/>` +
          `<em>Supplied fresh in grower nursery bag. Porous Terracotta Gamla add-on available for +Rs 60.</em>`,
        quickAction: {
          type: 'whatsapp',
          label: `Order ${matchedPlant.name} on WhatsApp (Rs ${matchedPlant.price})`,
          actionUrl: `https://wa.me/919479480068?text=${encodeURIComponent(`Hello Green Vatika, I want to reserve ${matchedPlant.name} (Rs ${matchedPlant.price}).`)}`,
        },
      };
    }

    // 4. Pot inclusion & Packaging warning
    if (q.includes('pot') || q.includes('gamla') || q.includes('included') || q.includes('packaging') || q.includes('bag')) {
      setCurrentTopic('gamla');
      return {
        text: 'Important note on Packaging: <strong>Pot is NOT included</strong> with standard plant orders. All saplings are shipped in protective, root-balled <strong>Grower Nursery Polybags</strong> with enriched soil to prevent root shock during transit.<br/><br/>You can opt for our <strong>8-Inch Handcrafted Terracotta Clay Gamla</strong> as an add-on for just <strong>Rs 60 per plant</strong>. Clay pots offer superior root aeration and prevent root rot in hot Indian weather.',
        quickAction: {
          type: 'whatsapp',
          label: 'Order Plant with Terracotta Pot (+Rs 60)',
          actionUrl: 'https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20want%20to%20inquire%20about%20ordering%20plants%20with%20Terracotta%20Pots.',
        },
      };
    }

    // 5. Dynamic Pricing & Plant Catalog (Generated 100% dynamically from live plantsData)
    if (
      q.includes('price') ||
      q.includes('rate') ||
      q.includes('cost') ||
      q.includes('catalog') ||
      q.includes('list') ||
      q.includes('plants available') ||
      q.includes('kya kya') ||
      q.includes('menu') ||
      q.includes('stock')
    ) {
      setCurrentTopic('pricing');
      const liveCatalogItems = plantsData
        .filter((p) => !p.hidden)
        .map(
          (p) =>
            `• <strong>${p.name}</strong>: <strong>Rs ${p.price}</strong> <span style="text-decoration: line-through; opacity: 0.65; font-size: 11px;">Rs ${p.originalPrice}</span>`
        )
        .join('<br/>');

      return {
        text: `Here is our <strong>live nursery catalog</strong> directly synced from our database:<br/><br/>${liveCatalogItems}<br/><br/><em>All plants are grown in organic compost beds at Teen Puliya, Narsinghpur.</em>`,
        quickAction: {
          type: 'whatsapp',
          label: 'Book Order via WhatsApp (+91 94794 80068)',
          actionUrl: 'https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20want%20to%20order%20plants%20from%20your%20nursery%20catalog.',
        },
      };
    }

    // 6. Ordering, Buy Now & Shipping Policy (Live status: online courier paused, direct pickup active)
    if (q.includes('order') || q.includes('buy') || q.includes('shipping') || q.includes('delivery') || q.includes('online') || q.includes('courier') || q.includes('pickup')) {
      setCurrentTopic('order');
      return {
        text: 'Important Update on Ordering & Delivery:<br/><br/>' +
          '• <strong>Online Courier Delivery</strong>: Currently <strong>Paused</strong> to ensure live root balls are never subjected to transit dehydration or box damage.<br/>' +
          '• <strong>Direct Nursery Pickup</strong>: <strong>Active Daily (8:00 AM to 7:30 PM)</strong> at Teen Puliya, Khairi Naka, Narsinghpur.<br/>' +
          '• <strong>WhatsApp Direct Booking</strong>: You can reserve varieties in advance or arrange local pickup via WhatsApp at <strong>+91 94794 80068</strong>.',
        quickAction: {
          type: 'whatsapp',
          label: 'Reserve Plants on WhatsApp (+91 94794 80068)',
          actionUrl: 'https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20I%20would%20like%20to%20reserve%20plants%20for%20direct%20pickup.',
        },
      };
    }

    // 7. Categories Query (Generated dynamically from categoriesData)
    if (q.includes('category') || q.includes('categories') || q.includes('types of plant') || q.includes('varieties')) {
      const cats = categoriesData
        .map((c) => `• <strong>${c.name}</strong> (${c.count} varieties): ${c.description}`)
        .join('<br/>');
      return {
        text: `Green Vatika specializes in the following core botanical categories:<br/><br/>${cats}`,
      };
    }

    // 8. Gardening Guides & Blog Knowledge (Generated dynamically from blogPostsData)
    if (q.includes('blog') || q.includes('guide') || q.includes('article') || q.includes('read') || q.includes('knowledge')) {
      const guides = blogPostsData
        .map((b) => `• <strong>${b.title}</strong> (${b.readTime}) - ${b.category}`)
        .join('<br/>');
      return {
        text: `Here are our evidence-based horticultural guides written by our nursery experts:<br/><br/>${guides}`,
      };
    }

    // 9. Plant Care, Sunlight & Watering
    if (q.includes('care') || q.includes('water') || q.includes('sun') || q.includes('soil') || q.includes('fertilizer') || q.includes('khad')) {
      setCurrentTopic('care');
      return {
        text: 'Essential Indian gardening guidelines for healthy blooms:<br/><br/>' +
          '• <strong>Sunlight</strong>: Desi Gulab, Bougainvillea, and Adenium require <strong>5 to 6 hours of direct outdoor sunlight</strong> daily.<br/>' +
          '• <strong>Watering</strong>: For Adenium Bonsai, water strictly <strong>once a week</strong> when the soil is completely bone dry. For Roses and Bougainvillea, water when the top 2 inches of soil feel dry.<br/>' +
          '• <strong>Soil Mix</strong>: Use <strong>40 percent garden loam, 30 percent coarse river sand, and 30 percent aged cow dung manure (gobar khad)</strong> for supreme drainage.<br/>' +
          '• <strong>Feeding</strong>: Feed with bone meal, neem cake powder, or organic vermicompost every <strong>20 to 30 days</strong>.',
      };
    }

    // 10. Nursery Address, Location & Timings
    if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('timing') || q.includes('time') || q.includes('phone') || q.includes('contact')) {
      return {
        text: 'Nursery Details:<br/><br/>' +
          '• <strong>Location</strong>: Green Vatika Nursery, Teen Puliya, Khairi Naka, Niranjan Ward, Narsinghpur, Madhya Pradesh 487001<br/>' +
          '• <strong>Timings</strong>: Open Monday to Sunday from <strong>8:00 AM to 7:30 PM</strong><br/>' +
          '• <strong>Customer Care & WhatsApp</strong>: <strong>+91 94794 80068</strong><br/>' +
          '• <strong>Founders</strong>: Rajkumar Patel (Founder & Master Horticulturist) & Samar Patel<br/>' +
          '• <strong>Website</strong>: greenvatika.co',
        quickAction: {
          type: 'whatsapp',
          label: 'Get Google Maps Directions on WhatsApp',
          actionUrl: 'https://wa.me/919479480068?text=Hello%20Green%20Vatika,%20please%20share%20nursery%20location%20and%20directions.',
        },
      };
    }

    // 11. Services (Landscape, Garden setup)
    if (q.includes('service') || q.includes('balcony') || q.includes('landscape') || q.includes('lawn') || q.includes('setup')) {
      return {
        text: 'Green Vatika provides specialized on-site horticultural services:<br/><br/>' +
          '• <strong>Balcony Garden Makeovers</strong>: Custom planter boxes, drip systems, and sunlight-aligned flowering setup.<br/>' +
          '• <strong>Landscape Design & Lawn Turfing</strong>: Commercial villas, residential lawns, and institutional estates.<br/>' +
          '• <strong>Plant Doctor & Maintenance</strong>: Organic pest management, seasonal pruning, and pot repotting.',
      };
    }

    // Default intelligent fallback referencing dynamic database count
    return {
      text: `Thank you for your question. At <strong>Green Vatika Nursery</strong> (Teen Puliya, Narsinghpur), we cultivate over <strong>${plantsData.length}+ live plant varieties</strong> including Adenium bonsai, fragrant Desi roses, and handcrafted clay terracotta gamlas.<br/><br/>Live plants are supplied in <strong>Grower Polybags</strong> (pots optional). Online courier delivery is currently paused, but <strong>Direct Nursery Pickup</strong> is open daily (8:00 AM – 7:30 PM). Connect with our team on WhatsApp for any custom requirements!`,
      quickAction: {
        type: 'whatsapp',
        label: 'Connect with Nursery Team on WhatsApp',
        actionUrl: `https://wa.me/919479480068?text=${encodeURIComponent('Hello Green Vatika, I have a question: ' + userQuery)}`,
      },
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const rawText = textToSend || inputValue;
    const cleanText = removeEmojis(rawText);
    if (!cleanText.trim()) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: cleanText,
      timestamp: getFormattedTime(),
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
        timestamp: getFormattedTime(),
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
      {/* Floating Trigger Button on Bottom-Right */}
      <div className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open Green Vatika Plant Assistant"
            className="group flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary hover:bg-primary/95 text-primary-foreground shadow-2xl hover:shadow-primary/40 border border-emerald-400/30 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          >
            <MessageCircleMore className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>
        )}
      </div>

      {/* Floating Chat Modal Box - Anchored to Right with Perfect Mobile Viewport Positioning */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 left-auto z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] max-w-[380px] sm:max-w-[410px] h-[520px] max-h-[calc(100vh-3.5rem)] bg-card border border-border/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
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

          {/* Input Footer with Neon Glowing Botanical Styling */}
          <div className="p-3 bg-card border-t border-border/80 shrink-0">
            <div className="flex items-center gap-2 bg-card border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.22)] focus-within:border-emerald-400 focus-within:shadow-[0_0_18px_rgba(16,185,129,0.45)] focus-within:ring-1 focus-within:ring-emerald-400/40 rounded-2xl px-3 py-1.5 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(removeEmojis(e.target.value))}
                onKeyDown={handleKeyDown}
                placeholder="Ask plant name, price, owner or care..."
                className="flex-1 bg-transparent border-0 outline-none ring-0 focus:outline-none focus:ring-0 focus:border-0 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 py-1.5 shadow-none"
                style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="h-8 w-8 rounded-xl bg-primary disabled:opacity-40 text-white flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors cursor-pointer shadow-xs"
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
