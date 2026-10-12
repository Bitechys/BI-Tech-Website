import type { Lang } from './index';
/**
 * English copy. Taken from the previous home page (src/app/pages/home + faq + footer on the
 * archive/angular-ssr-wip branch). Where the old site had nothing (work summaries were lorem
 * ipsum), the new line is marked in NOTES.md for the team to confirm.
 */
const en = {
  lang: 'en' as Lang,
  dir: 'ltr' as 'ltr' | 'rtl',
  meta: {
    title: 'Bi Tech Solutions (BiTechys) – Custom Software & Web Development Company',
    description:
      'Bi Tech Solutions builds custom software: web applications, Android apps, APIs, ETL tools and QA. Headquartered in Kuala Lumpur, with teams in Chennai and Dubai.',
    ogAlt: 'Bi Tech Solutions — Where Business Meets Software Precision',
  },
  a11y: {
    skip: 'Skip to content',
    menu: 'Menu',
    closeMenu: 'Close menu',
    primaryNav: 'Primary',
    prev: 'Previous',
    next: 'Next',
    pause: 'Pause animation',
    play: 'Play animation',
  },
  nav: {
    about: 'About',
    services: 'Services',
    work: 'Work',
    clients: 'Clients',
    faq: 'FAQ',
    contact: 'Contact',
    cta: "Let's build together",
  },
  langSwitch: { label: 'العربية', aria: 'اقرأ هذه الصفحة بالعربية', hreflang: 'ar' },
  tagline: { lead: 'Where', business: 'Business', meets: 'Meets', precision: 'Software Precision' },
  hero: {
    eyebrow: 'Custom software · Web · Mobile · APIs · QA',
    slides: [
      {
        title: 'Custom Software, Built to Perform',
        text: "From web to mobile, APIs to ETL tools — we craft scalable, secure software that drives real impact. Let's build your digital success story.",
      },
      {
        title: 'Web to Mobile. Seamless Solutions.',
        text: 'We create seamless, high-performance web applications and Android apps that enhance usability, simplify workflows, and boost engagement.',
      },
      {
        title: 'Smart Connections. Smarter Systems.',
        text: 'With our custom API and ETL solutions, your systems talk better, work smarter, and move faster — so you can scale without limits.',
      },
      {
        title: 'Tested. Trusted. Delivered.',
        text: 'Our QA and software testing services ensure that what you launch works flawlessly — with zero compromises on performance or security.',
      },
    ],
    cta: "Let's build together",
    ctaSecondary: 'See our work',
  },
  intro: {
    kicker: 'What we do',
    title: 'Bi Tech Solutions powers digital transformation for modern businesses.',
    body: 'We design and build high-performance web apps, Android solutions, custom APIs, and intelligent data tools that streamline workflows, improve customer experience, and drive scalable growth.',
  },
  mission: {
    kicker: 'About us',
    title: 'Our Mission & Vision',
    body: [
      'At Bi Tech Solutions, we believe that technology should empower businesses — not complicate them. We are a team of passionate developers, testers, and problem-solvers who specialize in building high-performance, scalable, and secure software solutions. With a deep understanding of both technology and business, we bridge the gap between your vision and real-world implementation.',
      'Our goal is to help companies grow, innovate, and stay ahead in a fast-changing digital landscape. We don’t just write code — we craft smart, tailored systems that simplify processes, engage users, and deliver lasting value.',
    ],
  },
  why: {
    kicker: 'Why us',
    title: 'Why Choose Bi Tech as Your Software Partner?',
    body: [
      'We’re more than just a development company — we’re your digital transformation partner. With a strong focus on innovation, quality, and collaboration, we deliver tailor-made solutions that align with your business goals and scale with your growth.',
      "Whether you're a startup or an established enterprise, our team is equipped to build, launch, and support the technology that moves your business forward.",
    ],
    items: [
      {
        title: 'Tailored Solutions',
        body: 'We craft software that’s built specifically for your unique business needs — no templates, no shortcuts. Just thoughtful, goal-aligned solutions.',
      },
      {
        title: 'Skilled Team',
        body: 'Our experienced developers, testers, and strategists bring deep technical expertise and a passion for solving real-world problems through technology.',
      },
      {
        title: 'End-to-End Support',
        body: 'From idea to execution — and beyond — we provide continuous support at every stage of your digital journey, including upgrades and maintenance.',
      },
      {
        title: 'Quality-Focused Delivery',
        body: 'We emphasize clean architecture, robust performance, and user-friendly design — ensuring every product we deliver is scalable, secure, and impactful.',
      },
    ],
  },
  services: {
    kicker: 'Services',
    title: 'Our Services',
    intro:
      'At Bi Tech Solutions, we don’t just build software — we solve problems. Our full-stack services are designed to support your business goals, streamline operations, and enhance user experiences across platforms.',
    items: [
      {
        id: 'ux',
        title: 'UI/UX Design',
        body: 'Create experiences your users will love. We craft intuitive user interfaces and smooth user journeys that align with business goals and delight end-users — from wireframes to polished designs.',
      },
      {
        id: 'web',
        title: 'Web Application Development',
        body: 'Custom-built, responsive, and scalable web applications tailored for growth. Whether internal tools or customer platforms, we build solutions that are fast, secure, and future-proof.',
      },
      {
        id: 'android',
        title: 'Android App Development',
        body: 'Develop powerful mobile apps for Android that are sleek, feature-rich, and optimized for performance. Our mobile team ensures cross-device compatibility and intuitive UX.',
      },
      {
        id: 'api',
        title: 'API Development & Integration',
        body: 'Connect your systems with custom APIs that enable automation, data sharing, and third-party integrations. We focus on security, scalability, and clean documentation.',
      },
      {
        id: 'data',
        title: 'ETL & Data Tools',
        body: 'Move, clean, and combine data between your systems with custom ETL tools — so your systems talk better, work smarter, and move faster.',
      },
      {
        id: 'qa',
        title: 'Software Testing & QA',
        body: 'Functional, performance, and security testing before every release — so what you launch works flawlessly, with zero compromises.',
      },
    ],
  },
  clients: {
    kicker: 'Clients',
    title: 'Meet Our Clients',
    body: 'Forward-thinking businesses and growing startups trust Bi Tech Solutions to bring their ideas to life with reliable, scalable software.',
  },
  ctaBand: { title: 'Want to digitalize your business?', button: 'Connect with us' },
  work: {
    kicker: 'Work',
    title: 'Our Work',
    body: 'Explore our portfolio, from e-commerce platforms to corporate sites. Our designs prioritize user experience and tailor-made solutions, ensuring your online presence makes a lasting impact.',
    visit: 'Visit site',
    items: {
      cassandra: { tag: 'E-commerce · Malaysia', summary: 'Online store for a Bollywood fashion boutique — outfits for women, men and kids, for sale and rental.' },
      crispy: { tag: 'Brand & franchise site', summary: 'Brand, menu and franchise-enquiry website for a fried-chicken restaurant chain.' },
      sif: { tag: 'Corporate site', summary: 'Corporate website for Syed International Food, a food brand established in 2014.' },
      bigblue: { tag: 'SaaS marketing site', summary: 'Marketing website for Big Blue, a fulfilment platform for customer-centric brands.' },
    },
  },
  faq: {
    kicker: 'FAQ',
    title: 'Frequently Asked Questions',
    items: [
      {
        q: 'What services does Bi Tech Solutions offer?',
        a: 'We offer end-to-end custom software development, including web app development, Android app development, API development & integration, ETL tool development, and software testing & QA.',
      },
      {
        q: 'Do you work with startups, or only with established companies?',
        a: "We work with startups, SMBs, and large enterprises alike. Whether you're launching your first product or scaling an existing one, we tailor our services to your specific stage and needs.",
      },
      {
        q: 'How do you ensure the quality of the software you build?',
        a: 'We follow industry best practices in architecture, clean coding, and version control. All projects go through rigorous functional, performance, and security testing before deployment.',
      },
      {
        q: 'Can you maintain and upgrade our existing software?',
        a: 'Yes! We provide support and maintenance services for existing software, including codebase audits, performance improvements, UI upgrades, and new feature integrations.',
      },
      {
        q: 'How long does a typical project take?',
        a: 'Project timelines vary depending on scope and complexity. A small app may take 2–4 weeks, while enterprise solutions may take 2–6 months. We always provide a clear timeline before starting.',
      },
      {
        q: 'Do you sign NDAs or offer confidentiality?',
        a: 'Absolutely. We take confidentiality seriously and are happy to sign NDAs to protect your ideas and business data.',
      },
      {
        q: 'Do you offer post-launch support and maintenance?',
        a: 'Yes, we provide ongoing support even after the project is delivered. This includes bug fixes, performance monitoring, regular updates, and adding new features as your business grows.',
      },
      {
        q: 'Can you guide us before we start the development process?',
        a: 'Yes, we can. If you have an idea but need help shaping it, we provide expert consultation to validate your concept, recommend the right tech stack, and plan a roadmap for development success.',
      },
    ],
  },
  contact: {
    kicker: 'Join our hands to',
    title: 'Digitize Your Business Growth',
    pillars: [
      { a: 'Expert', b: 'Team Members' },
      { a: 'Results-Driven', b: 'Approach' },
      { a: 'Streamlined', b: 'Execution' },
    ],
    direct: 'Or reach us directly',
    form: {
      kicker: 'Connect with us',
      title: "Let's Grow Together",
      name: 'Your name',
      email: 'Your email',
      phone: 'Phone number',
      phoneHint: 'Include your country code, e.g. +971',
      service: 'What do you need?',
      servicePlaceholder: 'Select a service',
      services: [
        'UI/UX Design',
        'Web Application Development',
        'Android / iOS App',
        'API Development & Integration',
        'ETL & Data Tools',
        'Software Testing & QA',
        'Digital Marketing',
        'POS Solutions',
        'Something else',
      ],
      message: 'Tell us about your project',
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Thank you — your message is on its way. We’ll get back to you within one business day.',
      error: 'Sorry, something went wrong. Please try again or email us directly at',
      required: 'Required',
      subject: 'New enquiry from bitechys.com',
      fromName: 'Bi Tech website',
    },
  },
  footer: {
    offices: {
      kl: { title: 'Malaysia HQ', lines: ['Bi Tech Solutions Sdn Bhd', '23-2, Jalan 3A/2B, Taman Desa Bakti,', '68100 Selayang, Kuala Lumpur, Malaysia'] },
      chennai: { title: 'Chennai', lines: ['Business correspondence', 'Chennai, Tamil Nadu, India'] },
      dubai: { title: 'Dubai', lines: ['Business correspondence', 'Dubai, United Arab Emirates'] },
    },
    email: 'Email',
    phone: 'Phone',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
  notFound: { title: 'Page not found', body: 'The page you’re looking for has moved or no longer exists.', home: 'Go to the home page' },
};

export default en;
export type Dict = typeof en;
