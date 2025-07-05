# SSR Facade for Saffasel

This project implements a Server-Side Rendering (SSR) facade for the Saffasel application. The primary purpose is to ensure proper SEO optimization while ultimately redirecting users to the non-SSR Angular site at `https://p1.saffa-sell.com`.

## How It Works

1. **Server-Side Rendering**: The application uses Angular's SSR capabilities to pre-render content on the server, making it fully indexable by search engines.

2. **Redirection Strategy**: 
   - Search engine crawlers see the full SSR content with proper metadata
   - Regular users are automatically redirected to the non-SSR site after the SSR content loads
   - The redirection is controlled via an API endpoint that can be configured

3. **SEO Optimization**:
   - All necessary metadata tags are included for search engines
   - Open Graph and Twitter Card metadata for social sharing
   - Custom titles and descriptions optimized for Saffasel

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start the development server (non-SSR)
npm start

# Start the development server with SSR
npm run start:ssr
```

### Production Build

```bash
# Build for production with SSR
npm run build:ssr

# Serve the SSR application
npm run serve:ssr
```

## Configuration

### Redirect Settings

The redirection behavior is controlled by the `RedirectService` which checks the `/api/redirect-info` endpoint for configuration. This allows you to:

- Enable/disable redirection
- Change the target URL
- Adjust the redirect delay

### Search Engine Detection

The server automatically detects search engine crawlers based on user agent strings and will not redirect them, ensuring they can properly index the SSR content.

## Project Structure

- `src/app/services/redirect.service.ts` - Handles the redirection logic
- `src/server.ts` - Contains the Express server setup with search engine detection
- `src/app/components/home/home.component.ts` - Main landing page with SEO metadata

## Notes

- This setup allows search engines to fully index the SSR content while regular users are seamlessly redirected to the main application
- The redirection happens after the SSR content is fully loaded, ensuring a smooth user experience
- Manual redirection button is provided for users who have JavaScript disabled
