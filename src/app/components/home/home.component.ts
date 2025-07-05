import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { CommonModule } from '@angular/common';
import { logSeoMetadata } from '../../utils/seo-debug';

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

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Set metadata for this page
    this.seoService.updateMetadata({
      title: 'Angular SSR Metadata - Home',
      description: 'An Angular application with server-side rendering and SEO optimization',
      keywords: ['angular', 'ssr', 'seo', 'metadata', 'home']
    });
    
    // Only log metadata in browser environment, not during SSR
    if (typeof window !== 'undefined') {
      setTimeout(() => logSeoMetadata(), 100); // Small delay to ensure metadata is updated
    }
  }
}
