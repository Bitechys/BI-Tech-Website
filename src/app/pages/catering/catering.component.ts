import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catering',
  templateUrl: './catering.component.html',
  styleUrls: ['./catering.component.scss']
})
export class CateringComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  content = [
    {
      "title": "Unforgettable Flavors",
      "content": "Treat your guests to a feast of flavors they won't soon forget. Our signature spices and fresh ingredients make every bite an explosion of taste.",
      "img": "assets/image/cater/img1.jpg"
    },
    {
      "title": "Variety that Delights",
      "content": "Our catering menu offers a wide range of options, from our iconic Crispy Chicken Sandwiches to savory beef steak, ensuring there's something for every palate.",
      "img": "assets/image/cater/img2.jpg"
    },
    {
      "title": "Hygiene and Quality",
      "content": "Just like in our restaurants, we uphold the highest standards of hygiene and quality in every dish we serve, giving you peace of mind.",
      "img": "assets/image/cater/img3.jpg"
    },
    {
      "title": "Customized Menus",
      "content": "Tailor your menu to match your event's theme and your guests' preferences. Our team works closely with you to create the perfect culinary experience.",
      "img": "assets/image/cater/img4.jpg"  
      
    },
    // {
    //   "title": "Seamless Service",
    //   "content": "From setup to cleanup, our team handles every detail, allowing you to focus on enjoying your event and creating memories.",
    //   "img": "assets/image/c4.png"
    // },
  ]

  works = [
    {
      "title": "Unforgettable Flavors",
      "content": "Treat your guests to a feast of flavors they won't soon forget. Our signature spices and fresh ingredients make every bite an explosion of taste.",
      "img": "assets/image/c4.png"
    },
    {
      "title": "Variety that Delights",
      "content": "Our catering menu offers a wide range of options, from our iconic Crispy Chicken Sandwiches to savory beef steak, ensuring there's something for every palate.",
      "img": "assets/image/c4.png"
    },
    {
      "title": "Hygiene and Quality",
      "content": "Just like in our restaurants, we uphold the highest standards of hygiene and quality in every dish we serve, giving you peace of mind.",
      "img": "assets/image/c4.png"
    },
    {
      "title": "Customized Menus",
      "content": "Tailor your menu to match your event's theme and your guests' preferences. Our team works closely with you to create the perfect culinary experience.",
      "img": "assets/image/c4.png"
    },
    // {
    //   "title": "Seamless Service",
    //   "content": "From setup to cleanup, our team handles every detail, allowing you to focus on enjoying your event and creating memories.",
    //   "img": "assets/image/c4.png"
    // },
  ]

}
