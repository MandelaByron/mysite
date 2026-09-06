import Link from "next/link";
import { highlight } from "sugar-high";
import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import { urlFor } from "@/sanity/lib/image";

// Same visual styling as the old mdx-components.tsx, just wired to
// Portable Text's component API instead of MDX's element overrides.
export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-semibold text-2xl pt-12 mb-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-semibold text-2xl mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-semibold text-2xl mt-8 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-primary-foreground leading-snug">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="ml-[0.075em] border-l-3  pl-4 text-muted-foreground border-accent-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-muted-foreground list-disc pl-5 space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="text-muted-foreground list-decimal pl-5 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium">{children}</strong>
    ),
    em: ({ children }) => <em className="font-medium">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const className =
        "text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:dark:text-slate-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800";
      if (href.startsWith("/")) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    // Rendered by the @sanity/code-input field type defined in post.ts
    code: ({ value }) => {
      const codeHTML = highlight(value?.code ?? "");
      return (
        <pre>
          <code dangerouslySetInnerHTML={{ __html: codeHTML }} />
        </pre>
      );
    },
    image: ({ value }) => {
      //if (!value?.asset?._ref) return null;
      if (!value?.asset?._ref) return null;

      const builder = urlFor(value)?.width(1200).fit("max").auto("format");
      if (!builder) return null;
      const imageUrl = builder.url();


      const { width, height } = getImageDimensions(value);

      return (
        <figure className="my-8">
          <Image
            //src={urlFor(value).width(1200).fit("max").auto("format").url()}
            src={imageUrl}
            alt={value.alt || " "}
            width={width}
            height={height}
            className="w-full h-auto focus:outline-none border border-accent-foreground rounded-none"
            placeholder={value.asset?.metadata?.lqip ? "blur" : undefined}
            blurDataURL={value.asset?.metadata?.lqip}
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
