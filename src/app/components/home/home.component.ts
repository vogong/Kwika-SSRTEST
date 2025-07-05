import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { CommonModule } from '@angular/common';
import { logSeoMetadata } from '../../utils/seo-debug';
import { RedirectService } from '../../services/redirect.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="container">
      <h1>Welcome to {{ title }}</h1>
      <p>This page has proper SEO metadata for better search engine visibility.</p>
      
      <div class="info-box">
        <h2>SEO Benefits with Angular SSR</h2>
        <ul>
          <li>Improved page load time</li>
          <li>Better search engine indexing</li>
          <li>Enhanced social media sharing</li>
          <li>Increased accessibility</li>
        </ul>
      </div>
      
      <div class="redirect-notice">
        <h3>Redirecting to Main Site</h3>
        <p>You will be automatically redirected to our main site in a moment...</p>
        <button (click)="redirectNow()" class="redirect-button">Go to Main Site Now</button>
      </div>
      
      <div class="meta-info">
        <h3>Current Page Metadata:</h3>
        <pre>{{ metadataExample }}</pre>
      </div>
    </main>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      font-family: 'Arial', sans-serif;
    }
    
    h1 {
      color: #1976d2;
    }
    
    .info-box {
      background-color: #f5f5f5;
      border-left: 4px solid #1976d2;
      padding: 1rem;
      margin: 2rem 0;
    }
    
    .redirect-notice {
      background-color: #fff8e1;
      border-left: 4px solid #ffc107;
      padding: 1rem;
      margin: 2rem 0;
      text-align: center;
    }
    
    .redirect-button {
      background-color: #1976d2;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      margin-top: 1rem;
    }
    
    .redirect-button:hover {
      background-color: #1565c0;
    }
    
    .meta-info {
      margin-top: 2rem;
      background-color: #f0f0f0;
      padding: 1rem;
      border-radius: 4px;
    }
    
    pre {
      background-color: #e0e0e0;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class HomeComponent implements OnInit {
  title = 'Angular SSR Metadata';
  metadataExample = JSON.stringify({
    title: 'Angular SSR Metadata - Home',
    description: 'An Angular application with server-side rendering and SEO optimization',
    image: 'https://angular.dev/assets/images/logos/angular/angular.png',
    url: 'https://example.com',
    type: 'website',
    author: 'Angular Developer',
    keywords: ['angular', 'ssr', 'seo', 'metadata'],
    twitterCard: 'summary'
  }, null, 2);

  private redirectService = inject(RedirectService);
  
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Set metadata for this page - this will be what search engines see
    this.seoService.updateMetadata({
      title: 'Saffasel - Your Complete Solution',
      description: 'Discover Saffasel - the complete solution for all your needs. Optimized for performance and user experience.',
      keywords: ['saffasel', 'solution', 'platform', 'service', 'application']
    });
    
    // Only log metadata in browser environment, not during SSR
    if (typeof window !== 'undefined') {
      setTimeout(() => logSeoMetadata(), 100); // Small delay to ensure metadata is updated
    }
  }
  
  // Method to manually trigger redirect
  redirectNow(): void {
    this.redirectService.redirectToMainSite();
  }
}
