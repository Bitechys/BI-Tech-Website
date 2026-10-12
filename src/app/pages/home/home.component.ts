import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { isPlatformBrowser } from '@angular/common';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  slides = [
    {
      bg: 'assets/images/land/land_img_1.png',
      title: 'Custom Software, Built to Perform',
      text: `From web to mobile, APIs to ETL tools — we craft scalable, secure software that drives real impact. Let's build your digital success story.`,
    },
    {
      bg: 'assets/images/land/land_img_2.png',
      title: 'Web to Mobile. Seamless Solutions',
      text: `We create seamless, high-performance web applications and Android apps that enhance usability, simplify workflows, and boost engagement.`,
    },
    {
      bg: 'assets/images/land/land_img_3.png',
      title: 'Smart Connections. Smarter Systems.',
      text: `With our custom API and ETL solutions, your systems talk better, work smarter, and move faster — so you can scale without limits.`,
    },
    {
      bg: 'assets/images/land/land_img_5.png',
      title: 'Tested. Trusted. Delivered.',
      text: `Our QA and software testing services ensure that what you launch works flawlessly — with zero compromises on performance or security.`,
    },
  ];

  currentIndex = 0;
  autoSlideInterval: any;

  @ViewChildren('titleRef') titleRefs!: QueryList<ElementRef>;
  @ViewChildren('textRef') textRefs!: QueryList<ElementRef>;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.animateContent();
  }

  animateContent() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      const titles = this.titleRefs.toArray();
      const texts = this.textRefs.toArray();
      const title = titles[this.currentIndex];
      const text = texts[this.currentIndex];

      if (title) {
        gsap.fromTo(
          title.nativeElement,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
      }

      if (text) {
        gsap.fromTo(
          text.nativeElement,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: 'power2.out' }
        );
      }
    }, 0);
  }

  startAutoSlide() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  tl = gsap.timeline();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // don’t run gsap / jQuery / document on server
      return;
    }

    this.animateContent();
    this.startAutoSlide();

    gsap.registerPlugin(ScrollTrigger);

    gsap.set('.rotateELe', {
      rotate: 0,
      transition: 'transform 200ms linear',
    });

    const rotate = gsap
      .timeline({
        scrollTrigger: {
          trigger: '#homeMain',
          pin: false,
          scrub: 0.2,
          start: 'top top',
          markers: false,
          end: '+=1000',
        },
      })
      .to(
        '.rotateELe',
        {
          rotate: -20,
          transition: 'transform 200ms linear',
        },
        0
      )
      .fromTo(
        '.leaf1',
        {
          filter: 'blur(5px)',
          rotate: -10,
          scale: 1,
          translateY: 100,
          transition: 'filter 200ms linear, transform 200ms linear',
        },
        {
          filter: 'blur(0px)',
          rotate: -30,
          scale: 1.3,
          translateY: -150,
          transition: 'filter 200ms linear, transform 200ms linear',
        },
        0
      )
      .fromTo(
        '.leaf2',
        {
          opacity: 1,
          rotation: 0,
        },
        {
          opacity: 1,
          rotation: -10,
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      );

    gsap.set('.bowl_1', {
      rotate: 0,
      transition: 'transform 200ms linear',
    });

    gsap.set('.bowl_2', {
      rotate: 20,
      transition: 'transform 200ms linear',
    });

    const rotate1 = gsap
      .timeline({
        scrollTrigger: {
          trigger: '#orangeItem',
          pin: false,
          scrub: 0.2,
          start: '-200px',
          markers: false,
          end: '+=1000',
        },
      })
      .to(
        '.bowl_1',
        {
          rotate: -20,
          transition: 'transform 200ms linear',
        },
        0
      )
      .to(
        '.bowl_2',
        {
          rotate: 0,
          transition: 'transform 200ms linear',
        },
        0
      );

    $('.imgcaro_1 .img-owl-carousel .owl-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      margin: 24,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      navContainer: '.imgcaro_1 .img-owl-carousel .custom-nav',
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        992: { items: 1 },
      },
    });

    $('.imgcaro_2 .img-owl-carousel .owl-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      margin: 24,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      ],
      navContainer: '.imgcaro_2 .img-owl-carousel .custom-nav',
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        992: { items: 1 },
      },
    });

    $('.owl-carousel').owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      center: true,
      margin: 24,
      dots: true,
      loop: true,
      nav: false,
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        992: { items: 3 },
      },
    });
  }

  ScrollTo(section: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById(section.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Data arrays

  choose_grid = [
    {
      title: 'Tailored Solutions',
      content:
        'We craft software that’s built specifically for your unique business needs — no templates, no shortcuts. Just thoughtful, goal-aligned solutions.',
      icon: 'fa-puzzle-piece',
    },
    {
      title: 'Skilled Team',
      content:
        'Our experienced developers, testers, and strategists bring deep technical expertise and a passion for solving real-world problems through technology.',
      icon: 'fa-users',
    },
    {
      title: 'End-to-End Support',
      content:
        'From idea to execution — and beyond — we provide continuous support at every stage of your digital journey, including upgrades and maintenance.',
      icon: 'fa-project-diagram',
    },
    {
      title: 'Quality-Focused Delivery',
      content:
        'We emphasize clean architecture, robust performance, and user-friendly design — ensuring every product we deliver is scalable, secure, and impactful.',
      icon: 'fa-shield-alt',
    },
  ];

  client_grid = [
    { client: 'assets/images/clients/Cassandra_bw.png' },
    { client: 'assets/images/clients/cc_bw.png' },
    { client: 'assets/images/clients/sif_bw.png' },
    { client: 'assets/images/clients/maretek_bw.png' },
    { client: 'assets/images/clients/mas.png' },
    { client: 'assets/images/clients/sanko_bw.png' },
  ];

  work_grid = [
    {
      img: 'assets/images/port/port-1.jpg',
      icon: 'assets/images/clients/Cassandra.png',
      color: '#31b3ed',
      title: 'Cassandra Collection',
      con: 'lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      img: 'assets/images/port/port-2.jpg',
      icon: 'assets/images/clients/cc.png',
      color: '#31b3ed',
      title: 'The Crispy Chicken',
      con: 'lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      img: 'assets/images/port/port-3.jpg',
      icon: 'assets/images/clients/sif.png',
      color: '#31b3ed',
      title: 'SIF',
      con: 'lorem ipsum lorem ipsum lorem ipsum',
    },
    {
      img: 'assets/images/port/port-4.jpg',
      icon: 'assets/images/clients/bigblue.svg',
      color: '#31b3ed',
      title: 'Big Blue',
      con: 'lorem ipsum lorem ipsum lorem ipsum',
    },
  ];

  service_grid = [
    {
      img: 'assets/images/services/ser_1.png',
      icon: 'assets/images/clients/Cassandra.png',
      color: '#31b3ed',
      title: 'UI/UX Design',
      con: 'Create experiences your users will love. We craft intuitive user interfaces and smooth user journeys that align with business goals and delight end-users — from wireframes to polished designs.',
    },
    {
      img: 'assets/images/services/ser_2.png',
      icon: 'assets/images/clients/cc.png',
      color: '#31b3ed',
      title: 'Web Application Development',
      con: 'Custom-built, responsive, and scalable web applications tailored for growth. Whether internal tools or customer platforms, we build solutions that are fast, secure, and future-proof.',
    },
    {
      img: 'assets/images/services/ser_3.png',
      icon: 'assets/images/clients/sif.png',
      color: '#31b3ed',
      title: 'Android App Development',
      con: 'Develop powerful mobile apps for Android that are sleek, feature-rich, and optimized for performance. Our mobile team ensures cross-device compatibility and intuitive UX.',
    },
    {
      img: 'assets/images/services/ser_4.png',
      icon: 'assets/images/clients/bigblue.svg',
      color: '#31b3ed',
      title: 'API Development & Integration',
      con: 'Connect your systems with custom APIs that enable automation, data sharing, and third-party integrations. We focus on security, scalability, and clean documentation.',
    },
  ];
}
