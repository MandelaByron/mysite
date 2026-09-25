import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-02-01",
  useCdn: true,

  stega: {
    enabled:
      process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
      process.env.NODE_ENV === "development",
    studioUrl: process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:3333",
  },
});
