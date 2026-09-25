import { defineLive } from "next-sanity/live";
import { client } from "./client";
import { token } from "./tokens";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
});
