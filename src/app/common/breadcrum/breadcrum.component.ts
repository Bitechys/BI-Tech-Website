import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent implements OnInit {

  @Input() title:any
  @Input() data:any
  @Input() image:any
  @Input() value:any
  
  @Input() previous:any
  constructor(public service: MainService) {

  }

  ngOnInit() {
    if (this.value) {
      this.data = [
        this.service.menu[this.value[0]]
      ];
      this.data[0].text =  this.service.menu[this.value[0]].name;
      this.title = this.service.menu[this.value[0]].name;
      
    }
    if (this.value) {
      this.data = [
        this.service.menu[this.value[0]],
        this.service.menu[this.value[0]].child![this.value[1]],
      ];
      
      this.data[1].text =  this.service.menu[this.value[0]].child![this.value[1]].name;
      this.title = this.service.menu[this.value[0]].child![this.value[1]].name;
    }
    // if (this.value) {
    //   this.data = [
    //     this.service.menu[this.value[0]],
    //     this.service.menu[this.value[0]].children[this.value[1]],
    //     this.service.menu[this.value[0]].children[this.value[1]].children[this.value[2]],
    //   ];
    //   this.data[1].text =  this.service.menu[this.value[0]].children[this.value[1]].text;
    //   this.title = this.service.menu[this.value[0]].children[this.value[1]].children[this.value[2]].text;
      
    // }
  }

}

