import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { SETTINGS_QUERY, WORK_QUERY } from '@/sanity/lib/queries';
import { portableTextComponents } from '@/sanity/lib/portable-text';
import type { Settings, WorkItem, SocialLink } from '@/sanity/lib/types';
import { UNDERLINE_LINK_CLASS, SOCIAL_LINK_CLASS } from '@/lib/constants';
import { SocialIcon } from './components/icons';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, work] = await Promise.all([
    client.fetch<Settings | null>(SETTINGS_QUERY),
    client.fetch<WorkItem[] | null>(WORK_QUERY)
  ]);

  const name = settings?.name ?? 'Your Name';

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12'>
      {/* Sidebar: profile image + social links */}
      <div className="md:col-span-4 hidden md:block">
        <Image
          src="/tom2.gif"
          alt="tom-aura"
          width={400}
          height={500}
          className="rounded-md object-cover w-full h-auto"
        />
      </div>

      {/* Content: name, bio, links only — Selected Work lives outside this column */}    
      <div className="md:col-span-8">
        <div className="flex flex-col items-start gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{name}</h1>
            {settings?.bio ? (
              <div className="mt-2 text-lg text-neutral-900 leading-relaxed">
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

      {/* FIX 3: Selected Work is its own top-level grid child spanning all
          12 columns, instead of being nested inside the 8-col content div.
          This is what fixes the squeeze — each work item's internal
          text/image split now divides the FULL page width in two, not
          two-thirds of it divided in two again. */}
      <div className="md:col-span-12">
        <h2 className="text-2xl font-semibold">Selected Work</h2>
        <p className="text-lg text-neutral-400 mt-1">
          A few products I have helped shape, build, launch, or improve in production
        </p>

        <div className="divide-y divide-white/10">
          {work?.length ? (
            work.map((item: WorkItem) => {
              const itemImageUrl = item.image ? urlFor(item.image)?.width(800).url() : null;
              const imageAlt =
                (item.image?.alt as string | undefined) || `${item.title} preview screenshot`;

              return (
                <div
                  key={item._id}
                  // FIX 4: gap-8 md:gap-16 gives noticeably more space
                  // between text and image now that the row has a full
                  // 12 columns to spend, instead of the old cramped gap.
                  className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
                >
                  <div>
                    <h3 className="text-4xl md:text-5xl font-semibold">{item.title}</h3>
                    <p className="font-medium text-white/90 mt-3">{item.tagline}</p>
                    {item.description ? (
                      <p className="text-lg text-neutral-400 mt-3 leading-relaxed">
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
                      className="group/img block overflow-hidden rounded-lg order-first md:order-last focus:outline-none"
                    >
                      <Image
                        src={itemImageUrl}
                        alt={imageAlt}
                        width={800}
                        height={600}
                        // FIX 5: sizes reflects the image now occupying
                        // half of the FULL container width at md+, not
                        // half of an 8/12-constrained column.
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="rounded-lg w-full h-auto transition-transform duration-300 group-hover/img:scale-[1.02]"
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


    </div>
  );
}