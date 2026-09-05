import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { Settings, SocialLink } from "@/sanity/lib/types";
import Image from "next/image";

// Footer fetches its own data rather than receiving settings as a prop.
// This keeps layout.tsx simple (no need to fetch settings just to hand
// them down) and means Footer can be dropped into any page/layout on its
// own. Sanity's client + fetch results are cached per request in Next.js,
// so this doesn't cause a duplicate network round-trip if a parent page
// also calls SETTINGS_QUERY in the same render.
export async function Footer() {
  const settings = await client.fetch<Settings | null>(SETTINGS_QUERY);

  return (
    <footer className="w-full mt-16 pt-8 border-t border-primary-foreground/10">
      <div className="flex md:flex-row items-center justify-between flex-wrap gap-4">
        <a className="flex items-center gap-4" href="/">
          <Image
            src="/spilledcode-light.svg"
            alt="SpilledCode"
            width={140}
            height={32}
            priority
            className="block dark:hidden"
          />
          <Image
            src="/spilledcode.svg"
            alt="SpilledCode"
            width={140}
            height={32}
            priority
            className="hidden dark:block"
          />
        </a>

        <div className="flex items-center gap-4">
          <span className="text-xs text-primary-foreground">
            Byron Mandela . Software Developer
          </span>
        </div>

        <div className="flex items-center gap-4">
          {settings?.socialLinks?.length
            ? settings.socialLinks.map((link: SocialLink) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${link.platform} profile`}
                  className="text-primary-foreground hover:text-slate-600 hover:dark:text-slate-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800"
                >
                  <span>{link.platform}</span>
                </a>
              ))
            : null}
        </div>
      </div>
    </footer>
  );
}
