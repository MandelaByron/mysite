import "./globals.css";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground font-[family-name:var(--font-poppins)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen px-6 py-12 md:px-16 md:py-20">
            <main className="max-w-6xl mx-auto w-full">
              {children}
              <Footer />
            </main>
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
