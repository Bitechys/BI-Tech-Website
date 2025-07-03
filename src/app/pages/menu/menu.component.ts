import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  card = [
    {
      title: 'Classic Crispy Chicken Sandwich',
      content: `Freshly fried chicken served in 
      a soft bun with lettuce, tomato, 
      and our secret sauce.`,
      img: 'assets/image/menu1.png',
      rate: "6.99"
    },
    {
      title: 'Spicy Crispy Chicken Sandwich',
      content: `Our classic sandwich kicked up
      with a spicy twist, perfect for
       those who crave heat`,
      img: 'assets/image/signature_sandwich.png',
      rate: "6.99"
    },
    {
      title: 'Crispy Chicken Tenders (4 pieces)',
      content: `Juicy chicken tenders, battered
      and fried to perfection.`,
      img: 'assets/image/fcpic.png',
      rate: "6.99"
    },
  ];

    
  beverages = [
    {
      title: 'French Fries',
      img: 'assets/image/menu/french-fries.png',
      rate: "6.99"
    },
    {
      title: 'Coleslaw',
      img: 'assets/image/menu/coleslaw.png',
      rate: "6.99"
    },
    {
      title: 'Soft Drinks (various flavors)',
      img: 'assets/image/menu/cool-drinks.png',
      rate: "6.99"
    },
    {
      title: 'Iced Tea',
      img: 'assets/image/menu/iced-tea.png',
      rate: "6.99"
    },
    {
      title: 'Chocalate Cake',
      img: 'assets/image/menu/choco-cake.png',
      rate: "6.99"
    },
  ];
}
