import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}