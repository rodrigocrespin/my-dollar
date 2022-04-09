import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { Languages, LanguageService } from 'src/app/services/language.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public isCollapsed = true;
  private lastPoppedUrl?: string;
  private yScrollStack: number[] = [];

  language$: Observable<string>;

  constructor(public location: Location, private router: Router, private languageService: LanguageService) {
    this.language$ = this.languageService.language$;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          // @ts-ignore
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
  }

  isHome(): boolean {
    const title = this.location.prepareExternalUrl(this.location.path());

    if (title === '#/home' ) {
      return true;
    }
    else {
      return false;
    }
  }

  isDocumentation(): boolean {
    const title = this.location.prepareExternalUrl(this.location.path());
    if ( title === '#/documentation' ) {
      return true;
    }
    else {
      return false;
    }
  }

  setLanguage(lang: string): void {
    this.languageService.setLanguage(lang as Languages);
  }
}
