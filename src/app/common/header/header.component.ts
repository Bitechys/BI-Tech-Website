import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/service/main.service';
import { gsap } from 'gsap/all';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  constructor(
    public cookies: CookieService,
    public service: MainService,
    public router: Router,
    public cdref: ChangeDetectorRef,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  tl = gsap.timeline();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // do not touch DOM on server
      return;
    }

    const googleTranslateElement =
      this.el.nativeElement.querySelector('#google_translate_element');

    if (googleTranslateElement) {
      this.renderer.listen(
        googleTranslateElement,
        'click',
        (event: Event) => {
          event.preventDefault();
        }
      );
    }

    const translateElement =
      this.el.nativeElement.querySelector('#google_translate_element');
    if (translateElement) {
      this.renderer.listen(
        translateElement,
        'DOMSubtreeModified',
        (event: any) => {
          const val = event.target.innerText.trim();
          this.service.currentLang = val;
          console.log(this.service.currentLang, 'this.service.currentLang');
        }
      );
    }

    this.service.arabicStylesTrigger();
  }

  selected = -1;
  c_selected: any[] = [];

  hover(n: any) {
    this.selected = n;
  }

  show(n: any) {
    this.c_selected[n] = !this.c_selected[n];
  }

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isSticky = window.pageYOffset >= 100;
  }

  ScrollTo(section: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = document.getElementById(section.replace('#', ''));
    const offcanvasEl = document.getElementById('offcanvasResponsive');

    if (offcanvasEl) {
      const isOffcanvasVisible = offcanvasEl.classList.contains('show');
      if (isOffcanvasVisible && typeof bootstrap !== 'undefined') {
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (bsOffcanvas) {
          bsOffcanvas.hide();

          offcanvasEl.addEventListener(
            'hidden.bs.offcanvas',
            () => {
              if (el) {
                setTimeout(() => {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 10);
              }
            },
            { once: true }
          );
          return;
        }
      }
    }

    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  menu = [
    {
      name: 'Home',
      open: false,
      url: '#home',
    },
    {
      name: 'About us',
      open: false,
      url: '#about',
    },
    {
      name: 'Clients',
      open: false,
      url: '#client',
    },
    {
      name: 'Works',
      open: false,
      url: '#work',
    },
    {
      name: 'Faq',
      open: false,
      url: '#faq',
    },
    {
      name: 'Contact',
      open: false,
      url: '#contact',
    },
  ];
}
