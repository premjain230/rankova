import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "ai-tools",
    name: "AI Tools",
    slug: "ai-tools",
    description:
      "The best artificial intelligence tools for productivity, creativity, coding, research, and specialized domains.",
    icon: "Sparkles",
    rankingCount: 4,
    productCount: 12,
  },
  {
    id: "education",
    name: "Education",
    slug: "education",
    description:
      "Learning platforms, AI tutors, study tools, and educational resources ranked by effectiveness and outcomes.",
    icon: "GraduationCap",
    rankingCount: 5,
    productCount: 18,
  },
  {
    id: "productivity",
    name: "Productivity",
    slug: "productivity",
    description:
      "Apps and systems that help individuals and teams focus, organize, and accomplish more meaningful work.",
    icon: "Zap",
    rankingCount: 3,
    productCount: 15,
  },
  {
    id: "technology",
    name: "Technology",
    slug: "technology",
    description:
      "Platforms, infrastructure, and developer tools shaping the modern technology landscape.",
    icon: "Cpu",
    rankingCount: 2,
    productCount: 20,
  },
  {
    id: "websites",
    name: "Websites",
    slug: "websites",
    description:
      "The most useful and well-designed websites across categories for learning, work, and discovery.",
    icon: "Globe",
    rankingCount: 2,
    productCount: 25,
  },
  {
    id: "apps",
    name: "Apps",
    slug: "apps",
    description: "Mobile and desktop applications ranked by quality, utility, and user experience.",
    icon: "Smartphone",
    rankingCount: 2,
    productCount: 30,
  },
  {
    id: "software",
    name: "Software",
    slug: "software",
    description:
      "Professional and consumer software across design, development, business, and creative work.",
    icon: "Box",
    rankingCount: 2,
    productCount: 22,
  },
  {
    id: "business",
    name: "Business",
    slug: "business",
    description: "Tools and platforms that help companies operate, grow, and serve customers better.",
    icon: "Briefcase",
    rankingCount: 1,
    productCount: 14,
  },
  {
    id: "startups",
    name: "Startups",
    slug: "startups",
    description: "Emerging companies and products worth watching in the technology and AI landscape.",
    icon: "Rocket",
    rankingCount: 1,
    productCount: 10,
  },
  {
    id: "gaming",
    name: "Gaming",
    slug: "gaming",
    description: "Games, platforms, and tools for players and creators in interactive entertainment.",
    icon: "Gamepad2",
    rankingCount: 1,
    productCount: 12,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    slug: "entertainment",
    description: "Streaming, media, and creative platforms for content and leisure.",
    icon: "Clapperboard",
    rankingCount: 1,
    productCount: 15,
  },
  {
    id: "services",
    name: "Services",
    slug: "services",
    description: "Professional and consumer services ranked by quality, reliability, and value.",
    icon: "Handshake",
    rankingCount: 1,
    productCount: 10,
  },
  {
    id: "consumer-products",
    name: "Consumer Products",
    slug: "consumer-products",
    description: "Physical and digital consumer products evaluated for design, utility, and quality.",
    icon: "ShoppingBag",
    rankingCount: 1,
    productCount: 8,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
