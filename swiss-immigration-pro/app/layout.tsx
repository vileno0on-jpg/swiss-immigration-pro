import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientErrorBoundary from "@/components/ClientErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "Become a Swiss Citizen in 2025 | Swiss Immigration Pro - 96% Success Rate",
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
    title: "Become a Swiss Citizen in 2025 | 96% Success Rate | Swiss Immigration Pro",
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
    title: "Become a Swiss Citizen in 2025 | 96% Success Rate",
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
        {/* Force light mode - remove dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof document !== 'undefined') {
                  // Force remove dark class
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                  document.body.classList.remove('dark-mode', 'dark');
                  // Prevent dark mode from being set
                  const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        document.documentElement.classList.remove('dark');
                        document.body.classList.remove('dark-mode', 'dark');
                      }
                    });
                  });
                  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
                  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
                  if (typeof window !== 'undefined' && window.localStorage) {
                    window.localStorage.removeItem('darkMode');
                    window.localStorage.setItem('theme', 'light');
                  }
                }
              })();
            `,
          }}
        />
        {/* Hide Google Translate banner */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .goog-te-banner-frame { display: none !important; }
              .goog-te-balloon-frame { display: none !important; }
              body { top: 0 !important; }
              .goog-te-menu-value { color: inherit !important; }
              .goog-te-menu-value span { color: inherit !important; }
              .goog-te-gadget { font-family: inherit !important; }
              .goog-te-gadget-simple { background-color: transparent !important; border: none !important; }
              html { color-scheme: light !important; }
              html.dark { color-scheme: light !important; }
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-white`} suppressHydrationWarning>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        {/* Google Translate will be initialized by CountryLanguageDetectionModal */}
        {/* Script to prevent translation of technical terms */}
        <Script
          id="prevent-bad-translations"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Function to mark technical terms as non-translatable
                function markTermsNonTranslatable() {
                  // Common technical terms that should not be translated
                  const terms = [
                    'EU/EFTA', 'EU', 'EFTA', 'FMPA',
                    'L Permit', 'B Permit', 'G Permit', 'C Permit', 'N Permit', 'CI Permit',
                    'CHF', 'AuG', 'VZAE', 'SEM', 'StAG', 'KVG', 'OLN', 'DBG',
                    'Switzerland', 'Swiss', 'Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne',
                    'SR 142.20', 'SR 142.201', 'SR 141.0', 'Art.', 'Art'
                  ];
                  
                  // Collect all text nodes first, then process them
                  function collectTextNodes(node, textNodes) {
                    if (node.nodeType === 3) { // Text node
                      textNodes.push(node);
                    } else if (node.nodeType === 1) { // Element node
                      // Skip if already marked as notranslate
                      if (node.classList && node.classList.contains('notranslate')) {
                        return;
                      }
                      // Process children
                      const children = Array.from(node.childNodes);
                      children.forEach(child => collectTextNodes(child, textNodes));
                    }
                  }
                  
                  // Process a single text node
                  function processTextNode(textNode) {
                    const text = textNode.textContent;
                    const parent = textNode.parentNode;
                    
                    if (!parent || !text || text.length === 0) return false;
                    
                    // Skip if parent is already notranslate
                    if (parent.classList && parent.classList.contains('notranslate')) {
                      return false;
                    }
                    
                    // Check if any term exists in the text
                    let foundTerm = null;
                    for (const term of terms) {
                      if (text.indexOf(term) !== -1) {
                        foundTerm = term;
                        break;
                      }
                    }
                    
                    if (!foundTerm) return false;
                    
                    // Create replacement fragment
                    const parts = text.split(foundTerm);
                    if (parts.length <= 1) return false;
                    
                    const fragment = document.createDocumentFragment();
                    parts.forEach((part, index) => {
                      if (part) {
                        fragment.appendChild(document.createTextNode(part));
                      }
                      if (index < parts.length - 1) {
                        const span = document.createElement('span');
                        span.className = 'notranslate';
                        span.setAttribute('translate', 'no');
                        span.textContent = foundTerm;
                        fragment.appendChild(span);
                      }
                    });
                    
                    // Replace the text node with the fragment
                    try {
                      parent.replaceChild(fragment, textNode);
                      return true;
                    } catch (e) {
                      console.warn('Could not replace text node:', e);
                      return false;
                    }
                  }
                  
                  // Main processing function
                  function process() {
                    const textNodes = [];
                    collectTextNodes(document.body, textNodes);
                    
                    // Process text nodes (in reverse to avoid index issues)
                    let processed = 0;
                    for (let i = textNodes.length - 1; i >= 0; i--) {
                      if (processTextNode(textNodes[i])) {
                        processed++;
                      }
                    }
                    
                    return processed > 0;
                  }
                  
                  // Run processing
                  try {
                    process();
                  } catch (e) {
                    console.warn('Error processing text nodes:', e);
                  }
                }
                
                // Debounce function to avoid too many calls
                let timeoutId = null;
                function debouncedMarkTerms() {
                  if (timeoutId) {
                    clearTimeout(timeoutId);
                  }
                  timeoutId = setTimeout(() => {
                    markTermsNonTranslatable();
                  }, 500);
                }
                
                // Run on page load
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', () => {
                    setTimeout(markTermsNonTranslatable, 2000);
                  });
                } else {
                  setTimeout(markTermsNonTranslatable, 2000);
                }
                
                // Also run after Google Translate translates (with debounce)
                const observer = new MutationObserver(() => {
                  debouncedMarkTerms();
                });
                
                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                  characterData: true
                });
              })();
            `,
          }}
        />
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
          {children}
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
