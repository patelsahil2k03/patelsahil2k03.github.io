import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { ClarityAnalytics } from '@/components/analytics/ClarityAnalytics';
import { seo, personalInfo } from '@/data';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
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
