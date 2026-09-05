import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY, SETTINGS_QUERY } from "@/sanity/lib/queries";
import { portableTextComponents } from "@/sanity/lib/portable-text";
import type { Post, Settings } from "@/sanity/lib/types";

export const revalidate = 60;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post, settings] = await Promise.all([
    client.fetch<Post | null>(POST_QUERY, { slug }),
    client.fetch<Settings | null>(SETTINGS_QUERY),
  ]);

  if (!post) notFound();

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const authorImageUrl = settings?.image
    ? urlFor(settings.image)?.width(64).height(64).url()
    : null;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl md:text-3xl font-semibold leading-tight">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 mt-4">
        {authorImageUrl ? (
          <Image
            src={authorImageUrl}
            alt={
              settings?.name
                ? `Profile picture of ${settings.name}`
                : "Author avatar"
            }
            width={32}
            height={32}
            sizes="32px"
            className="rounded-full object-cover w-8 h-8"
          />
        ) : null}
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          {publishedDate ? <span>{publishedDate}</span> : null}
          {publishedDate && settings?.name ? <span>·</span> : null}
          {settings?.name ? <span>{settings.name}</span> : null}
        </div>
      </div>

      {post.body ? (
        <div className="mt-10 space-y-5 text-primary-foreground leading-relaxed [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-primary [&_h2]:!mt-10">
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      ) : null}
    </div>
  );
}
