import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noindex?: boolean;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_DOMAIN = 'https://www.rentanybus.com';
const DEFAULT_OG_IMAGE = 'https://www.rentanybus.com/og-image.png';

export function SEOHead({
  title,
  description,
  canonicalPath = '',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title.includes('RentAnyBus') ? title : `${title} | RentAnyBus Odisha`;
    document.title = formattedTitle;

    // Helper to set or create meta tag
    const setMetaTag = (attribute: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');

    // 3. Open Graph Tags
    const fullCanonicalUrl = `${DEFAULT_DOMAIN}${canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : window.location.pathname}`;
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', fullCanonicalUrl);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${DEFAULT_DOMAIN}${ogImage}`);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${DEFAULT_DOMAIN}${ogImage}`);

    // 5. Canonical Link
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', fullCanonicalUrl);

    // 6. JSON-LD Structured Data
    let scriptElement: HTMLScriptElement | null = null;
    if (jsonLd) {
      scriptElement = document.createElement('script');
      scriptElement.setAttribute('type', 'application/ld+json');
      scriptElement.setAttribute('id', 'seo-dynamic-jsonld');
      scriptElement.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(scriptElement);
    }

    return () => {
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [title, description, canonicalPath, ogImage, ogType, noindex, jsonLd]);

  return null;
}
