import { Metadata } from "next";

const siteConfig = {
  name: "Rankova",
  tagline: "Discover. Compare. Rank.",
  description:
    "Rankova is a global AI-powered ranking, discovery, and comparison platform that helps people discover the best products, websites, AI tools, applications, companies, services, and technologies.",
  url: "https://rankova.com",
  ogImage: "https://rankova.com/og.png",
  twitter: "@rankova",
};

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
  path = "",
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  path?: string;
} = {}): Metadata {
  const finalTitle = title ? `${title} | Rankova` : `${siteConfig.name} — ${siteConfig.tagline}`;
  const finalDescription = description || siteConfig.description;
  const finalImage = image || siteConfig.ogImage;
  const url = `${siteConfig.url}${path}`;

  return {
    title: finalTitle,
    description: finalDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
      creator: siteConfig.twitter,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export { siteConfig };
