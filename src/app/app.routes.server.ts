import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
    // Home page will be prerendered by default with RenderMode.Prerender
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender
    // About page will be prerendered by default with RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
