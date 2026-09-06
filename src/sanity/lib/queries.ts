import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    name,
    bio,
    image,
    upworkUrl,
    socialLinks
  }
`);

export const WORK_QUERY = defineQuery(`
  *[_type == "work"] | order(order asc){
    _id,
    title,
    tagline,
    description,
    externalUrl,
    image
  }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    body
  }
`);

export const RECENT_POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc)[0...4]{
    _id,
    title,
    slug,
    tagline,
    publishedAt,
    mainImage,
    "category": categories[0]->title
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt
  }
`);

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    slug,
    tagline,
    publishedAt,
    mainImage,
    "category": categories[0]->title
  }
`);
