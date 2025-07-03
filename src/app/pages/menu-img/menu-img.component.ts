import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-menu-img',
  templateUrl: './menu-img.component.html',
  styleUrls: ['./menu-img.component.scss']
})
export class MenuImgComponent implements OnInit {

  pageLanguage: any;

  constructor(public cookies: CookieService, public service: MainService) { 
    // this.pageLanguage = this.cookies.get('googtrans');
  }

  ngOnInit(): void {
  
  }

}
