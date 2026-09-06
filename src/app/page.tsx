import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SETTINGS_QUERY, WORK_QUERY, RECENT_POSTS_QUERY } from "@/sanity/lib/queries";
import { portableTextComponents } from "@/sanity/lib/portable-text";
import type { Settings, WorkItem, Post } from "@/sanity/lib/types";
import { UNDERLINE_LINK_CLASS } from "@/lib/constants";

export const revalidate = 60;

export default async function HomePage() {
  const [settings, work, recentPosts] = await Promise.all([
    client.fetch<Settings | null>(SETTINGS_QUERY),
    client.fetch<WorkItem[] | null>(WORK_QUERY),
    client.fetch<Post[] | null>(RECENT_POSTS_QUERY),
  ]);

  const name = settings?.name ?? "Your Name";

  return (
    <>
      {/* ── Header ─────────────────────────── */}
      <section className="py-12 md:py-20">
        <div className="shell flex flex-col md:flex-row gap-10 items-start">
          {/* Banner: was a grid sidebar column, now a flex basis instead
              of col-span. Same md-only visibility. */}
          <div className="hidden md:block md:basis-1/3 shrink-0">
            <Image
              src="/tom2.gif"
              alt="tom-aura"
              width={400}
              height={500}
              className="rounded-md object-cover w-full h-auto"
            />
          </div>

          <div className="flex flex-col items-start gap-4 md:basis-2/3">
            <div>
              <h1 className="text-3xl font-semibold">{name}</h1>
              {settings?.bio ? (
                <div className="mt-2 text-lg leading-relaxed">
                  <PortableText value={settings.bio} components={portableTextComponents} />
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-6 mt-4 text-lg">
              <Link href="/writing" className={UNDERLINE_LINK_CLASS}>
                My Writing
              </Link>
              {settings?.upworkUrl ? (
                <a
                  href={settings.upworkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={UNDERLINE_LINK_CLASS}
                >
                  Hire me on Upwork
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ── Selected Work ──────────────────── */}
      <section>
        <div className="shell py-12 md:py-16">
          <h2 className="text-2xl font-semibold">Selected Work</h2>
          <p className="text-lg text-muted-foreground mt-1">
            A few products I have helped shape, build, launch, or improve in production
          </p>

          <div className="divide-y divide-primary-foreground/10 mt-4">
            {work?.length ? (
              work.map((item: WorkItem) => {
                const itemImageUrl = item.image ? urlFor(item.image)?.width(800).url() : null;
                const imageAlt =
                  (item.image?.alt as string | undefined) || `${item.title} preview screenshot`;

                return (
                  <div
                    key={item._id}
                    className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                  >
                    <div>
                      <h3 className="text-3xl md:text-5xl font-semibold">{item.title}</h3>
                      <p className="font-medium text-primary mt-3">{item.tagline}</p>
                      {item.description ? (
                        <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
                          {item.description}
                        </p>
                      ) : null}
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block mt-4 text-sm ${UNDERLINE_LINK_CLASS}`}
                      >
                        Visit {item.title}
                      </a>
                    </div>
                    {itemImageUrl ? (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="group/img block overflow-hidden order-first md:order-last focus:outline-none border border-accent-foreground"
                      >
                        <Image
                          src={itemImageUrl}
                          alt={imageAlt}
                          width={800}
                          height={600}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="w-full h-auto transition-transform duration-300 group-hover/img:scale-[1.02]"
                        />
                      </a>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <p className="py-6 text-neutral-400">
                No work added yet — add one at <code>/studio</code>.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Writing ────────────────────────── */}
      <section className="bg-accent">
        <div className="shell grid grid-cols-1 items-center gap-4 py-12 md:py-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-accent-foreground">Writing</h2>
            <Link href="/writing" className={UNDERLINE_LINK_CLASS}>
              More writing
            </Link>
          </div>

          <p className="text-base md:text-lg text-muted-foreground mt-1">
            Some recent thoughts on engineering, models, and building things.
          </p>

          <div className="divide-y divide-primary-foreground/10 mt-4">
            {recentPosts?.length ? (
              recentPosts.map((post: Post) => {
                if (!post.slug?.current) return null;
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
                    className="group flex items-center justify-between gap-4 py-6"
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-accent-foreground group-hover:text-muted-foreground transition-colors">
                      {post.title}
                    </h3>
                    {publishedDate ? (
                      <span className="text-sm text-muted-foreground shrink-0">
                        {publishedDate}
                      </span>
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
    </>
  );
}