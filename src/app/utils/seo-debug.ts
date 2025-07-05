/**
 * Utility function to log SEO metadata for debugging purposes
 * This can be imported and used in components to verify metadata is set correctly
 */
export function logSeoMetadata(): void {
  console.log('--- SEO Metadata Debug ---');
  
  // Get page title
  const title = document.title;
  console.log('Title:', title);
  
  // Get meta tags
  const metaTags = {
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
    author: document.querySelector('meta[name="author"]')?.getAttribute('content'),
    
    // Open Graph
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
    ogType: document.querySelector('meta[property="og:type"]')?.getAttribute('content'),
    
    // Twitter
    twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
    twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content'),
    twitterDescription: document.querySelector('meta[name="twitter:description"]')?.getAttribute('content'),
    twitterImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute('content')
  };
  
  console.log('Meta Tags:', metaTags);
  console.log('------------------------');
}
