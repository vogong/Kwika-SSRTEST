# Angular SSR Metadata Implementation

This project demonstrates how to implement SEO metadata in an Angular Server-Side Rendering (SSR) application. The implementation provides dynamic metadata management for improved search engine visibility and social media sharing.

## Features

- Dynamic metadata management with a dedicated `SeoService`
- Route-specific metadata for different pages
- Support for standard SEO meta tags, Open Graph, and Twitter Card
- Server-side rendering to ensure metadata is available to search engines and social media crawlers
- Debug utilities to verify metadata implementation

## How to Use the SEO Service

### 1. Basic Usage

Inject the `SeoService` into your component and call the `updateMetadata` method:

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-example',
  template: `<h1>Example Component</h1>`
})
export class ExampleComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.updateMetadata({
      title: 'Page Title',
      description: 'Page description for SEO',
      keywords: ['keyword1', 'keyword2']
    });
  }
}
```

### 2. Available Metadata Options

The `updateMetadata` method accepts the following options:

```typescript
this.seoService.updateMetadata({
  title?: string;              // Page title
  description?: string;        // Meta description
  image?: string;              // Image URL for social sharing
  url?: string;                // Canonical URL
  type?: string;               // Content type (e.g., 'website', 'article')
  author?: string;             // Content author
  keywords?: string[];         // Keywords for SEO
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'; // Twitter card type
});
```

### 3. Debugging Metadata

Use the provided debug utility to verify your metadata implementation:

```typescript
import { logSeoMetadata } from './utils/seo-debug';

// Call this in your component after metadata is set
logSeoMetadata();
```

## Project Structure

- `src/app/services/seo.service.ts` - Core service for managing metadata
- `src/app/utils/seo-debug.ts` - Utility for debugging metadata
- `src/app/components/` - Example components with metadata implementation
- `src/app/app.routes.server.ts` - Server routes configuration for SSR

## Running the Application

To run the application with server-side rendering:

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start the SSR server
npm run serve:ssr:angular-ssr-metadata
```

To run the application in development mode:

```bash
npm start
```

## Best Practices

1. **Set metadata as early as possible** - Ideally in the `ngOnInit` lifecycle hook
2. **Provide fallback values** - The service includes default values for all metadata
3. **Use specific metadata for each route** - Customize metadata based on page content
4. **Test with social media debuggers** - Use tools like the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and [Twitter Card Validator](https://cards-dev.twitter.com/validator)
5. **Include structured data** - Consider adding JSON-LD for even better SEO

## Additional Resources

- [Angular SSR Documentation](https://angular.dev/guide/ssr)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
