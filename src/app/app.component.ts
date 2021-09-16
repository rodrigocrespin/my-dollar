import { Component, OnInit, Inject, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

let lastScrollTop = 0;
const delta = 5;
const navbarHeight = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _router?: Subscription;

  constructor(private renderer: Renderer2,
              private router: Router,
              @Inject(DOCUMENT) private document: any,
              private element: ElementRef,
              public location: Location) {}
  @HostListener('window:scroll', ['$event'])
  hasScrolled(): void {

    const st = window.pageYOffset;
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    const navbar = document.getElementsByTagName('nav')[0];

    // If they scrolled down and are past the navbar, add class .headroom--unpinned.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      if (navbar.classList.contains('headroom--pinned')) {
        navbar.classList.remove('headroom--pinned');
        navbar.classList.add('headroom--unpinned');
      }
      // $('.navbar.headroom--pinned').removeClass('headroom--pinned').addClass('headroom--unpinned');
    } else {
      // Scroll Up
      //  $(window).height()
      if (st + window.innerHeight < document.body.scrollHeight) {
        // $('.navbar.headroom--unpinned').removeClass('headroom--unpinned').addClass('headroom--pinned');
        if (navbar.classList.contains('headroom--unpinned')) {
          navbar.classList.remove('headroom--unpinned');
          navbar.classList.add('headroom--pinned');
        }
      }
    }

    lastScrollTop = st;
  }
  ngOnInit(): void {
    this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navbar: HTMLElement = this.element.nativeElement.children[1].children[0];
        if (window.outerWidth > 991) {
          window.document.children[0].scrollTop = 0;
        }else{
          // @ts-ignore
          window.document.activeElement.scrollTop = 0;
        }
        // tslint:disable-next-line:no-shadowed-variable
        this.renderer.listen('window', 'scroll', event => {
          // tslint:disable-next-line:variable-name
          const number = window.scrollY;
          if (number > 150 || window.pageYOffset > 150) {
            // add logic
            navbar.classList.add('headroom--not-top');
          } else {
            // remove logic
            navbar.classList.remove('headroom--not-top');
          }
        });
    });
    this.hasScrolled();
  }
}