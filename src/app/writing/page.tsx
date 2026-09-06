import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_POSTS_QUERY } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";

export const revalidate = 60;

export default async function WritingPage() {
  const posts = await client.fetch<Post[] | null>(ALL_POSTS_QUERY);

  return (
    <section>
      <div className="shell py-12 md:py-16">
        <h1 className="text-3xl md:text-5xl font-bold">Writing</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Notes on engineering, models, and building things.
        </p>

        <div className="divide-y divide-primary-foreground/10 mt-8">
          {posts?.length ? (
            posts.map((post) => {
              const postImageUrl = post.mainImage
                ? urlFor(post.mainImage)?.width(800).url()
                : null;
              const imageAlt = post.mainImage?.alt || `${post.title} cover image`;
              const publishedDate = post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : null;

              return (
                <Link
                  key={post._id}
                  href={`/posts/${post.slug.current}`}
                  className="group py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                >
                  <div>
                    {post.category ? (
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        {post.category}
                      </span>
                    ) : null}
                    <h2 className="text-3xl md:text-5xl font-semibold mt-1 group-hover:text-muted-foreground transition-colors">
                      {post.title}
                    </h2>
                    {post.tagline ? (
                      <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
                        {post.tagline}
                      </p>
                    ) : null}
                    {publishedDate ? (
                      <span className="inline-block mt-4 text-sm text-muted-foreground">
                        {publishedDate}
                      </span>
                    ) : null}
                  </div>
                  {postImageUrl ? (
                    <div className="overflow-hidden order-first md:order-last border border-accent-foreground">
                      <Image
                        src={postImageUrl}
                        alt={imageAlt}
                        width={800}
                        height={300}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  ) : null}
                </Link>
              );
            })
          ) : (
            <p className="py-6 text-muted-foreground">
              No posts yet — add one at <code>/studio</code>.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}