import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  /**
   * Set the page title and meta tags for SEO
   * @param config The SEO configuration
   */
  updateMetadata(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    author?: string;
    keywords?: string[];
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  }): void {
    // Default values
    const defaultConfig = {
      title: 'Angular SSR Metadata',
      description: 'An Angular application with server-side rendering and SEO optimization',
      image: 'https://angular.dev/assets/images/logos/angular/angular.png',
      url: 'https://example.com',
      type: 'website',
      author: 'Angular Developer',
      keywords: ['angular', 'ssr', 'seo', 'metadata'],
      twitterCard: 'summary' as const
    };

    // Merge default config with provided config
    const seoConfig = { ...defaultConfig, ...config };

    // Set page title
    this.title.setTitle(seoConfig.title);

    // Set meta tags
    const tags = [
      { name: 'description', content: seoConfig.description },
      { name: 'author', content: seoConfig.author },
      { name: 'keywords', content: seoConfig.keywords.join(', ') },
      
      // Open Graph
      { property: 'og:title', content: seoConfig.title },
      { property: 'og:description', content: seoConfig.description },
      { property: 'og:image', content: seoConfig.image },
      { property: 'og:url', content: seoConfig.url },
      { property: 'og:type', content: seoConfig.type },
      
      // Twitter Card
      { name: 'twitter:card', content: seoConfig.twitterCard },
      { name: 'twitter:title', content: seoConfig.title },
      { name: 'twitter:description', content: seoConfig.description },
      { name: 'twitter:image', content: seoConfig.image }
    ];

    // Remove existing tags
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="author"');
    this.meta.removeTag('name="keywords"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('name="twitter:card"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('name="twitter:image"');

    // Add new tags
    tags.forEach(tag => {
      if ('property' in tag) {
        this.meta.updateTag({ property: tag.property as string, content: tag.content });
      } else {
        this.meta.updateTag({ name: tag.name as string, content: tag.content });
      }
    });
  }
}
