import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { RedirectService } from './services/redirect.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  template: `
    <app-nav></app-nav>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .content {
      padding-top: 1rem;
    }
  `]
})
export class App implements OnInit {
  protected title = 'angular-ssr-metadata';
  private redirectService = inject(RedirectService);
  
  ngOnInit() {
    // Initialize the redirect service to handle redirection after SSR content is rendered
    this.redirectService.initRedirect();
  }
}
