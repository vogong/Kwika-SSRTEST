import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { logSeoMetadata } from '../../utils/seo-debug';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="container">
      <h1>About Our Project</h1>
      <p>This is the about page with its own unique metadata for SEO.</p>
      
      <div class="info-box">
        <h2>Why SEO Matters</h2>
        <p>Search Engine Optimization is crucial for web applications to be discoverable. 
        With Angular SSR, we can ensure that search engines properly index our content.</p>
      </div>
      
      <div class="actions">
        <a routerLink="/" class="btn">Back to Home</a>
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
    
    .actions {
      margin-top: 2rem;
    }
    
    .btn {
      display: inline-block;
      background-color: #1976d2;
      color: white;
      padding: 0.5rem 1rem;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    
    .btn:hover {
      background-color: #1565c0;
    }
  `]
})
export class AboutComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Set metadata for this page
    this.seoService.updateMetadata({
      title: 'About - Angular SSR Metadata',
      description: 'Learn about our Angular SSR project and its SEO capabilities',
      keywords: ['angular', 'ssr', 'seo', 'about', 'metadata'],
      type: 'article'
    });
    
    // Only log metadata in browser environment, not during SSR
    if (typeof window !== 'undefined') {
      setTimeout(() => logSeoMetadata(), 100); // Small delay to ensure metadata is updated
    }
  }
}
