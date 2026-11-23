import type { Metadata } from 'next';
import { Bricolage_Grotesque, Literata, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ClarityAnalytics } from '@/components/analytics/ClarityAnalytics';
import { seo } from '@/data';
import { personalInfo } from '@/data/personal';

// Evidence world (DESIGN.md): a condensed grotesk for poster display and UI, a reading serif for prose, mono only for numbers.
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', axes: ['wdth', 'opsz'], display: 'swap' });
const serif = Literata({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

// Blocking inline script — runs before first paint (static export has no
// server to read cookies/headers, so this is the standard no-flash pattern
// for a client-persisted theme). Reads localStorage, falls back to the OS
// preference, and sets/removes `.dark` on <html> synchronously.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: personalInfo.name }],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://patelsahil2k03.github.io'),
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: 'https://patelsahil2k03.github.io',
    siteName: seo.og.siteName,
    locale: seo.og.locale,
    type: 'website',
    images: [seo.og.image],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.og.image.url],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body className="font-serif antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ClarityAnalytics />
        <a
          href="#main"
          className="sr-only z-[60] bg-ev-ink px-4 py-3 font-sans text-sm font-semibold text-ev-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
