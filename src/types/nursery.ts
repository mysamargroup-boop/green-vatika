export interface Plant {
  id: string;
  name: string;
  botanicalName: string;
  category: 'Indoor' | 'Outdoor' | 'Flowering' | 'Fruit' | 'Succulents' | 'Bonsai' | 'Pots' | 'Tools';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage?: string;
  badge?: 'Bestseller' | 'Trending' | 'Sale' | 'New' | 'Eco Choice';
  discount?: number;
  description: string;
  light: 'Direct Sunlight' | 'Partial Shade' | 'Low Light' | 'Bright Indirect';
  water: 'Low (Once/Week)' | 'Moderate (2-3 Times/Week)' | 'Regular (Daily)' | 'Low Maintenance';
  difficulty: 'Easy' | 'Intermediate' | 'Expert';
  airPurifying: boolean;
  petFriendly: boolean;
  height: string;
  potSize: string;
  careInstructions: string[];
}

export interface Category {
  id: string;
  name: string;
  emoji?: string;
  iconName?: string;
  description: string;
  image: string;
  count: number;
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  features: string[];
  priceTag: string;
  image: string;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
  selectedSize?: string;
  selectedPotColor?: string;
  includePot?: boolean;
  potPrice?: number;
}

export interface BlogTableData {
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface BlogSectionItem {
  id?: string;
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  table?: BlogTableData;
  callout?: string;
  bulletPoints?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string[];
  tableOfContents?: string[];
  tags?: string[];
  sections?: BlogSectionItem[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  purchasedPlant: string;
  verified: boolean;
}
