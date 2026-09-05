import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: unknown): ImageUrlBuilder | null {
  if (!source) return null;
  if (typeof source === "object" && source !== null) {
    const src = source as { asset?: unknown; _ref?: unknown };
    if (!src.asset && !src._ref) {
      return null;
    }
  }
  try {
    return builder.image(source as Parameters<typeof builder.image>[0]);
  } catch {
    return null;
  }
}
