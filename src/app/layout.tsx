import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sahil Patel | Data Scientist & Full Stack Developer",
  description: "Portfolio of Sahil Patel - Associate Software Engineer at Digiflux Technologies. Specializing in AI/ML, Full Stack Development, and Cloud Computing.",
  keywords: ["Sahil Patel", "Data Scientist", "Full Stack Developer", "AI", "ML", "React", "Next.js", "Footballer"],
  authors: [{ name: "Sahil Patel" }],
  openGraph: {
    title: "Sahil Patel | Data Scientist & Developer",
    description: "AI/ML Engineer | Full Stack Developer | Footballer",
    url: "https://patelsahil2k03.github.io",
    siteName: "Sahil Patel Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
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
                primary: '#3b82f6',
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