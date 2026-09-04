import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { Footer } from './components/footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://next-mdx-blog.vercel.app'),
  alternates: { canonical: '/' },
  title: { default: 'Byron Mandela', template: '%s | Byron Mandela' },
  description: 'Engineer and writer.'
};

export default  function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased text-white font-[family-name:var(--font-poppins)]">
        <div className="min-h-screen px-6 py-12 md:px-16 md:py-20">
          <main className="max-w-5xl mx-auto w-full">{children}</main>
          <Analytics />
        </div>
      </body>
    </html>
  );
}