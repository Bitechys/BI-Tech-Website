import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MainService } from './service/main.service';
import * as AOS from 'aos';
import { PreloadService } from './service/preload.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss',],
  host: {

    '(window:scroll)': 'scroll($event)',

  }
})
export class AppComponent implements AfterViewInit{
  title = 'TheCrispyChicken';
  loading: boolean = true;
  
  constructor(public service: MainService, public router: Router, private preloadService: PreloadService) { }

  ngOnInit(): void {
    this.preloadService.preloadAssets().then(() => {
      console.log('All assets preloaded successfully');
      this.loading = false
      // Proceed with the rest of your application logic.
    }).catch((error) => {
      console.error('Error preloading assets:', error);
      // Handle errors, e.g., display a message to the user.
    });
  }

  ngAfterViewInit(): void {
    AOS.init({once:true});

    if (document.body.scrollTop || document.documentElement.scrollTop) {
      AOS.refresh()
    }
  }

  showScroll: any;

  scroll($event: Event) {

    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    const scrollTop = Math.max(document.body.scrollTop || 0, document.documentElement.scrollTop || 0)
    //console.log(scrollTop + vh + 500, document.body.scrollHeight);
    if (document.body.scrollHeight > vh) {
      this.showScroll = true
    } else {
      this.showScroll = false;
    }
    if (scrollTop + vh + 100 > document.body.scrollHeight) {
      this.showScroll = false;
    }
  }
}
