export interface SocialLink {
  platform: "x" | "instagram" | "github" | "upwork" | string;
  url: string;
}

export interface SanityImage {
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  alt?: string;
  [key: string]: unknown;
}

export interface Settings {
  name?: string;
  bio?: unknown;
  image?: SanityImage | null;
  upworkUrl?: string | null;
  socialLinks?: SocialLink[] | null;
}

export interface WorkItem {
  _id: string;
  title: string;
  tagline: string;
  description?: string | null;
  externalUrl: string;
  image?: SanityImage | null;
}

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  tagline?: string;
  publishedAt?: string | null;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  category?: string;
  body?: unknown;
}

export interface PostPreview {
  _id: string;
  title: string;
  slug: { current: string };
  tagline?: string;
  publishedAt?: string;
  mainImage?: SanityImage & { alt?: string };
  category?: string;
}
