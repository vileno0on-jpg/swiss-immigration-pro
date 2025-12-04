import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";
import { InitialQuizGate } from "@/components/quiz/InitialQuizGate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "Become a Swiss Resident in 2026 | Swiss Immigration Pro - 96% Success Rate",
  description: "AI-Powered Swiss immigration platform with 96% success rate. Expert guidance for work permits, citizenship, visas. Join 18,500+ successful applicants. 30 free AI questions. Fast 6-8 week processing.",
  keywords: "Swiss immigration, Switzerland visa, Swiss citizenship, work permit Switzerland, L permit, B permit, Swiss work visa, Swiss employment, permanent residence Switzerland, naturalization Swiss, 2025 quota, Swiss immigration lawyer, EU work permit, Swiss visa application, citizenship Switzerland, Swiss residency permit",
  authors: [{ name: "Swiss Immigration Pro" }],
  creator: "Swiss Immigration Pro",
  publisher: "Swiss Immigration Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://swissimmigrationpro.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Become a Swiss Resident in 2026 | 96% Success Rate | Swiss Immigration Pro",
    description: "AI-Powered Swiss immigration platform. 18,500+ successful applications. 96% approval rate. Expert guidance, 30 free AI questions, fast processing.",
    url: 'https://swissimmigrationpro.com',
    siteName: 'Swiss Immigration Pro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Swiss Immigration Pro - Your Pathway to Switzerland',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Swiss Resident in 2026 | 96% Success Rate",
    description: "AI-Powered Swiss immigration platform. Join 18,500+ successful applicants. Expert guidance, fast processing.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Simple dark mode prevention - CSS only */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root { color-scheme: light; }
            html, body { background-color: #ffffff !important; color: #111827 !important; }
            html.dark { color-scheme: light; }
            .dark { display: block !important; }
          `
        }} />
      </head>
      <body className={`${inter.variable} antialiased bg-white`} suppressHydrationWarning>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Swiss Immigration Pro",
              "description": "AI-Powered Swiss immigration platform with expert guidance. Success rate: 96%. Join 18,500+ successful applicants.",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://swissimmigrationpro.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://swissimmigrationpro.com'}/images/logo.png`,
              "image": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://swissimmigrationpro.com'}/images/og-image.jpg`,
              "priceRange": "CHF 29 - CHF 199",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2340",
                "bestRating": "5",
                "worstRating": "1"
              },
              "serviceArea": {
                "@type": "Place",
                "name": "Switzerland"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Switzerland"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Swiss Immigration Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Swiss Work Permit Guidance",
                      "description": "Comprehensive guidance for Swiss work permit applications"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Swiss Citizenship Roadmap",
                      "description": "Step-by-step roadmap to Swiss citizenship"
                    }
                  }
                ]
              }
            }),
          }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Swiss Immigration Pro",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://swissimmigrationpro.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://swissimmigrationpro.com'}/images/logo.png`,
              "sameAs": [
                "https://www.linkedin.com/company/swissimmigrationpro",
                "https://twitter.com/swissimmigrationpro"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English", "German", "French", "Italian"]
              }
            }),
          }}
        />
        <ClientErrorBoundary>
          <InitialQuizGate />
          {children}
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
