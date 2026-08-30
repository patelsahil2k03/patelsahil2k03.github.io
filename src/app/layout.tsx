import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ClarityAnalytics } from '@/components/analytics/ClarityAnalytics';
import { seo, personalInfo } from '@/data';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['500', '600', '700'],
});

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
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: 'https://patelsahil2k03.github.io',
    siteName: seo.og.siteName,
    locale: seo.og.locale,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ClarityAnalytics />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid #334155',
            },
            success: {
              iconTheme: {
                primary: '#2563EB',
                secondary: '#f1f5f9',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#f1f5f9',
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
