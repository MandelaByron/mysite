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
    <footer className="shell border-t border-primary-foreground/10 py-10">
      <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-12 md:gap-x-6 md:min-h-[116px]">
        <a className="font-bold text-lg md:col-span-4" href="/">
          SpilledCode
        </a>

        <span className="text-xs text-primary-foreground md:col-span-4 md:text-center">
          Byron Mandela . Software Developer
        </span>

        <div className="flex items-center gap-4 md:col-span-4 md:justify-end">
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

//grid grid-cols-12 items-center gap-x-6 min-h-[116px]