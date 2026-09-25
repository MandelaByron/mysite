import "./globals.css";
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import { DisableDraftMode } from './components/disable-draft-mode'
import { SanityLive } from '@/sanity/lib/live'
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./components/theme-provider";
import { Footer } from "./components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://next-mdx-blog.vercel.app"),
  alternates: { canonical: "/" },
  title: { default: "Byron Mandela", template: "%s | Byron Mandela" },
  description: "Engineer and writer.",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-[family-name:var(--font-poppins)]">
        
        {/* Keep your layout pristine and script-free */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <main className="translate-none rotate-none scale-none">
              {children}
              <Footer />
            </main>
            <Analytics />
          </div>
        </ThemeProvider>

        {/* 🚀 MOVE THESE HERE: Outside of layout wrappers & Theme Providers */}
        <SanityLive />

        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
        
      </body>
    </html>
  );
}

