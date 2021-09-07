import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  test: Date = new Date();

  constructor(private router: Router ) {}

  getPath(): string {
    return this.router.url;
  }
}
