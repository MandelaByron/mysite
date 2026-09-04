
import { client } from '@/sanity/lib/client';
import { SETTINGS_QUERY } from '@/sanity/lib/queries';
import { SocialIcon } from './icons';
import type { Settings, SocialLink } from '@/sanity/lib/types';

// Footer fetches its own data rather than receiving settings as a prop.
// This keeps layout.tsx simple (no need to fetch settings just to hand
// them down) and means Footer can be dropped into any page/layout on its
// own. Sanity's client + fetch results are cached per request in Next.js,
// so this doesn't cause a duplicate network round-trip if a parent page
// also calls SETTINGS_QUERY in the same render.
export async function Footer() {
  const settings = await client.fetch<Settings | null>(SETTINGS_QUERY);

  return (
    <footer className="max-w-3xl mx-auto w-full mt-16 pt-8 border-t border-white/10">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {settings?.socialLinks?.length
            ? settings.socialLinks.map((link: SocialLink) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${link.platform} profile`}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))
            : null}
        </div>

        {settings?.upworkUrl ? (
          <a
            href={settings.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/70 hover:text-white underline underline-offset-2 transition-colors"
          >
            Hire me on Upwork
          </a>
        ) : null}
      </div>
    </footer>
  );
}