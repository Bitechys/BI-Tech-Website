import {
  AfterViewInit,
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './service/main.service';
import * as AOS from 'aos';
import { PreloadService } from './service/preload.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    '(window:scroll)': 'scroll($event)',
  },
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Bitechys';
  loading = false; // important: render content on server
  showScroll: any;

  constructor(
    public service: MainService,
    public router: Router,
    private preloadService: PreloadService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loading = true;
      this.preloadService
        .preloadAssets()
        .then(() => {
          console.log('All assets preloaded successfully');
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error preloading assets:', error);
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ once: true });

      if (document.body.scrollTop || document.documentElement.scrollTop) {
        AOS.refresh();
      }
    }
  }

  scroll($event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const scrollTop = Math.max(
      document.body.scrollTop || 0,
      document.documentElement.scrollTop || 0
    );

    if (document.body.scrollHeight > vh) {
      this.showScroll = true;
    } else {
      this.showScroll = false;
    }
    if (scrollTop + vh + 100 > document.body.scrollHeight) {
      this.showScroll = false;
    }
  }
}
