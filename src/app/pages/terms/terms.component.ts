import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  terms=[
    {
      "topic":"Acceptance of Terms:",
      "desc": "By accessing and using the SIF website, you accept these terms and conditions in full. If you disagree with any part of these terms, please do not use our website or purchase our products."
    },
    {
      "topic":"Product Information:",
      "desc": "We strive to provide accurate and up-to-date product descriptions and images. However, actual products may vary slightly in appearance due to differences in monitor displays and the nature of spice products."
    },
    {
      "topic":"Shipping and Delivery:",
      "desc": "We offer international shipping. Delivery times and shipping fees vary based on location. SIF is not responsible for delays caused by customs, postal services, or other unforeseen circumstances. Tracking information will be provided once your order is shipped."
    },
    {
      "topic":"Returns and Refunds:",
      "desc": "If you are not satisfied with your purchase, you may return it within [number] days for a full refund or exchange. Items must be unopened and in their original packaging. Return shipping costs are the responsibility of the customer unless the return is due to our error."
    },
    {
      "topic":"Privacy Policy:",
      "desc": "We are committed to protecting your privacy. Please refer to our Privacy Policy or detailed information on how we collect, use, and safeguard your personal information."
    },
    {
      "topic":"Supplies and Inventory:",
      "desc": "The Franchisee shall purchase approved supplies, ingredients, and equipment from designated suppliers. Sourcing from non-approved suppliers requires prior written consent."
    },
    {
      "topic":"Intellectual Property:",
      "desc": "All content on the SIF website, including text, graphics, logos, images, and software, is the property of SIF or its content suppliers and is protected by international copyright laws. Unauthorized use of any content is prohibited."
    },
    {
      "topic":"Indemnification:",
      "desc": "You agree to indemnify, defend, and hold harmless SIF, its officers, directors, employees, agents, and suppliers from and against any claims, liabilities, damages, losses, costs, or expenses, including reasonable attorneys' fees, arising out of or related to your use of our website or any violation of these terms."
    },
    {
      "topic":"Governing Law:",
      "desc": "These terms and conditions are governed by and construed in accordance with the laws of country, and any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of country."
    },
  ]

}
