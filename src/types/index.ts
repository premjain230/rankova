export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  logo: string;
  website: string;
  category: string[];
  pricing: {
    model: "free" | "freemium" | "paid" | "subscription" | "one-time";
    startingPrice?: string;
    details: string;
  };
  features: string[];
  pros: string[];
  cons: string[];
  score: number;
  rankingCriteria: Record<string, number>;
  lastUpdated: string;
  founded?: string;
  headquarters?: string;
  tags: string[];
  alternatives: string[];
  isFeatured?: boolean;
}

export interface RankingItem {
  rank: number;
  productId: string;
  score: number;
  explanation: string;
  keyMetrics?: string[];
}

export interface Ranking {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  methodology: string;
  lastUpdated: string;
  items: RankingItem[];
  isFeatured?: boolean;
  isTrending?: boolean;
  editorialNote?: string;
  seo: {
    title: string;
    description: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  rankingCount: number;
  productCount: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  coverImage?: string;
}

export interface Comparison {
  id: string;
  slug: string;
  title: string;
  productIds: string[];
  summary: string;
  lastUpdated: string;
}
