import Link from "next/link";
import { highlight } from "sugar-high";
import type { PortableTextComponents } from "@portabletext/react";

// Same visual styling as the old mdx-components.tsx, just wired to
// Portable Text's component API instead of MDX's element overrides.
export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="font-semibold text-2xl pt-12 mb-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-semibold text-2xl mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-semibold text-2xl mt-8 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-primary-foreground leading-snug">
        {children}
      </p>
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
        "text-blue-500 hover:text-blue-700 dark:text-emerald-400 hover:dark:text-emerald-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800";
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
  },
};
