import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private targetUrl = 'https://p1.saffa-sell.com';
  private isBrowser: boolean;
  private redirectDelay = 100; // milliseconds

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Initialize the redirect service
   * This will handle redirecting to the non-SSR site after the SSR content has been rendered
   */
  initRedirect(): void {
    // Only perform redirects in the browser, not during SSR
    if (this.isBrowser) {
      // Check if we should redirect by calling our API
      this.checkRedirectInfo().then(shouldRedirect => {
        if (shouldRedirect) {
          // Listen for when navigation is complete
          this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(() => {
            // Small delay to ensure SSR content is fully rendered and indexed
            setTimeout(() => {
              console.log(`Redirecting to: ${this.targetUrl}`);
              window.location.href = this.targetUrl;
            }, this.redirectDelay);
          });
        } else {
          console.log('No redirect needed (likely a search engine crawler)');
        }
      });
    }
  }
  
  /**
   * Check if we should redirect by calling our API
   * This allows us to control the redirect behavior from the server
   */
  private async checkRedirectInfo(): Promise<boolean> {
    try {
      // Only make this call in the browser
      if (!this.isBrowser) {
        return false;
      }
      
      // Call our API to get redirect information
      const response = await new Promise<{
        shouldRedirect: boolean;
        targetUrl: string;
        delay: number;
      }>((resolve) => {
        this.http.get<{
          shouldRedirect: boolean;
          targetUrl: string;
          delay: number;
        }>('/api/redirect-info').subscribe({
          next: (data) => resolve(data),
          error: () => resolve({
            shouldRedirect: true,
            targetUrl: this.targetUrl,
            delay: this.redirectDelay
          })
        });
      });
      
      // Update our settings based on the API response
      if (response) {
        if (response.targetUrl) {
          this.targetUrl = response.targetUrl;
        }
        
        if (response.delay) {
          this.redirectDelay = response.delay;
        }
        
        return response.shouldRedirect;
      }
      
      return true; // Default to redirecting if API call fails
    } catch (error) {
      console.error('Error checking redirect info:', error);
      return true; // Default to redirecting if API call fails
    }
  }

  /**
   * Manually trigger redirect to the non-SSR site
   */
  redirectToMainSite(): void {
    if (this.isBrowser) {
      console.log(`Manual redirect to: ${this.targetUrl}`);
      window.location.href = this.targetUrl;
    }
  }
}
