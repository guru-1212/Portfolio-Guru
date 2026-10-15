// Single source of truth for all portfolio content.
// Edit text here — the components only render what is defined below.

export const profile = {
  name: "Gurunath Tangawar",
  initials: "GT",
  role: "Frontend Angular Developer",
  location: "Hyderabad, India",
  email: "apexgurut@gmail.com",
  phone: "+91 7522935014",
  phoneHref: "tel:+917522935014",
  headline:
    "I build enterprise airline booking platforms used by 10,000+ people every day — and I run a live SaaS product of my own.",
  summary:
    "Frontend Angular Developer with 3.5+ years of experience building enterprise booking platforms for airline clients in the aviation industry. I work across Angular, TypeScript, RxJS, NgRx and Angular Signals, integrate REST and GraphQL APIs, and care about performance, accessibility and a reusable component library that teams can build on.",
  // Path in /public; set to null to fall back to the initials avatar.
  photo: "/profile.jpg" as string | null,
  resumeUrl: "/resume.pdf",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  links: {
    github: "https://github.com/guru-1212",
    linkedin: "https://linkedin.com/in/guru-tangawar-350b6625b",
    product: "https://ourpgtracker.in",
  },
  languages: ["English", "Hindi", "Marathi", "Kannada", "Telugu"],
} as const;

// Rotating "I build …" phrases in the hero.
export const heroPhrases = [
  "airline booking platforms",
  "reusable component libraries",
  "fast, accessible interfaces",
  "microfrontend architectures",
  "my own SaaS product",
] as const;

// Two rows of the scrolling tech strip.
export const techMarquee = [
  [
    "Angular",
    "TypeScript",
    "RxJS",
    "NgRx",
    "Angular Signals",
    "Standalone Components",
    "Module Federation",
    "Angular Material",
    "Ionic",
    "Tailwind CSS",
    "SCSS",
    "Next.js",
  ],
  [
    "REST APIs",
    "GraphQL",
    "Firebase",
    "Jest",
    "Jasmine & Karma",
    "WCAG 2.1",
    "Azure DevOps",
    "CI/CD",
    "Figma",
    "Vercel",
    "React.js",
    "Strapi",
  ],
] as const;

export const stats = [
  { value: "3.5+", label: "Years of experience" },
  { value: "10,000+", label: "Daily active users" },
  { value: "40+", label: "Reusable UI components" },
  { value: "100+", label: "Pull requests reviewed" },
] as const;

export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SCSS"],
  },
  {
    title: "Frameworks & UI",
    items: [
      "Angular",
      "Ionic Framework",
      "Angular Material",
      "Tailwind CSS",
      "Bootstrap",
      "Kendo UI",
      "React.js",
      "Next.js",
    ],
  },
  {
    title: "Angular Core",
    items: [
      "Standalone Components",
      "Reactive Forms",
      "Routing",
      "Route Guards",
      "Dependency Injection",
      "HttpClient",
      "Interceptors",
      "Pipes",
      "Directives",
      "Lifecycle Hooks",
    ],
  },
  {
    title: "State Management",
    items: ["RxJS", "Observables", "NgRx", "Angular Signals"],
  },
  {
    title: "Architecture & Performance",
    items: [
      "Microfrontends",
      "Module Federation",
      "Lazy Loading",
      "Code Splitting",
      "OnPush Change Detection",
      "TrackBy",
    ],
  },
  {
    title: "APIs & Data",
    items: ["REST APIs", "GraphQL", "JSON", "Firebase", "Strapi (Headless CMS)"],
  },
  {
    title: "Web Standards",
    items: [
      "Responsive Design",
      "Cross-Browser Compatibility",
      "WCAG 2.1",
      "ARIA",
      "Flexbox",
      "CSS Grid",
    ],
  },
  {
    title: "Testing",
    items: ["Jasmine", "Karma", "Jest", "Unit Testing", "Chrome DevTools"],
  },
  {
    title: "Tools & DevOps",
    items: [
      "Git",
      "GitHub",
      "GitLab",
      "Azure DevOps",
      "CI/CD",
      "Vercel",
      "Webpack",
      "NPM",
      "Postman",
      "Figma",
      "JIRA",
    ],
  },
  {
    title: "AI Tools & Methods",
    items: [
      "Cursor",
      "Claude",
      "ChatGPT",
      "Gemini",
      "Google AI Studio",
      "Prompt Engineering",
      "Agile Scrum",
      "Code Reviews",
    ],
  },
] as const;

export const experience = [
  {
    role: "Software Engineer (Frontend Angular Developer)",
    company: "Inspire Infosol Pvt. Ltd.",
    location: "Hyderabad",
    period: "Jan 2023 – Present",
    highlights: [
      { value: "10,000+", label: "Daily active users" },
      { value: "40+", label: "Shared UI components" },
      { value: "20+", label: "REST & GraphQL APIs" },
      { value: "~80%", label: "Test coverage, owned modules" },
    ],
    tech: ["Angular", "TypeScript", "RxJS", "NgRx", "Signals", "Jest", "Azure DevOps"],
    bullets: [
      "Develop and maintain enterprise airline booking applications for aviation clients using Angular, TypeScript, RxJS, NgRx and Angular Signals, supporting 10,000+ daily active users.",
      "Built 40+ reusable components for a shared UI library and converted 30+ Figma screens into pixel-accurate, responsive Angular interfaces.",
      "Integrated 20+ REST and GraphQL APIs through Angular services, HttpClient and interceptors, managing application state with NgRx.",
      "Improved application performance with lazy loading, code splitting, OnPush change detection and Angular Signals, and contributed to a Module Federation microfrontend architecture.",
      "Wrote unit tests with Jasmine, Karma and Jest, maintaining ~80% code coverage on owned modules, and resolved WCAG 2.1 accessibility issues using ARIA best practices.",
      "Reviewed 100+ pull requests and mentored 3+ junior developers on Angular best practices, delivering features in Agile Scrum teams with CI/CD pipelines on Azure DevOps.",
      "Built UI for the PVFin and career platforms using JavaScript, jQuery, Kendo UI, ASP.NET MVC and Umbraco CMS.",
    ],
  },
] as const;

export type Project = {
  name: string;
  kind: string;
  description: string;
  highlights: readonly string[];
  tech: readonly string[];
  featured?: boolean;
  badge?: string;
  icon?: "plane" | "sun";
  /** Headline metric shown large on the card. */
  metric?: { value: string; label: string };
  href?: string;
  hrefLabel?: string;
  // Add screenshots to /public/projects and list them here (e.g. "/projects/pg-dashboard.png").
  image?: string;
};

export const projects: readonly Project[] = [
  {
    name: "OurPGTracker",
    kind: "PG Management SaaS · Personal Product",
    badge: "Live",
    featured: true,
    description:
      "Designed, built and launched end to end — used by a paying customer on a monthly subscription to manage 119 beds.",
    highlights: [
      "Owner dashboards, bed and occupancy tracking, member management and payment-tracking workflows.",
      "Deployed on Vercel with a custom GoDaddy domain; I handle hosting, releases and customer support independently.",
    ],
    tech: ["Angular", "TypeScript", "Firebase", "Vercel"],
    href: profile.links.product,
    hrefLabel: "Visit ourpgtracker.in",
  },
  {
    name: "Airline Booking Platform",
    kind: "Aviation · Enterprise",
    icon: "plane",
    metric: { value: "25+", label: "screens · Guest, Member & Agent flows" },
    description:
      "A large-scale booking platform with 25+ screens covering Guest, Member and Agent flows.",
    highlights: [
      "Flight search, seat selection, ancillaries and self-service booking modification.",
      "Built with reusable components, NgRx state and REST APIs.",
    ],
    tech: [
      "Angular",
      "TypeScript",
      "RxJS",
      "NgRx",
      "Angular Signals",
      "Angular Material",
      "SCSS",
      "REST APIs",
      "Git",
    ],
  },
  {
    name: "Airline Booking & Flight-Change Flows",
    kind: "Aviation · Enterprise",
    icon: "plane",
    metric: { value: "5,000+", label: "customers using these modules" },
    description:
      "Enhanced the booking flow, flight listings, seat selection, fare summary and flight-change modules used by 5,000+ customers.",
    highlights: [
      "Responsive, performance-focused components for a consistent experience across devices.",
    ],
    tech: ["Angular", "TypeScript", "RxJS", "HTML5", "SCSS", "REST APIs"],
  },
  {
    name: "PVFin",
    kind: "Solar PV System Calculation Platform",
    icon: "sun",
    description:
      "Responsive UI features and reusable widgets for a solar profitability calculation platform.",
    highlights: ["Debugging and cross-browser fixes across the platform."],
    tech: [
      "ASP.NET MVC",
      "HTML5",
      "CSS3",
      "SCSS",
      "JavaScript",
      "jQuery",
      "Bootstrap",
      "Kendo UI",
    ],
  },
];

export const education = {
  degree: "Bachelor of Science (B.Sc.) in Chemistry",
  school: "Degloor College, Degloor",
  university: "Swami Ramanand Teerth Marathwada University, Nanded",
  period: "2020 – 2023",
} as const;

export const certifications = [
  {
    title: "Security Awareness Training 2026",
    issuer: "Inspire Infosol India LLP — Information Security Programme",
    date: "Sep 2026",
    detail: "Score: 100%",
  },
] as const;

// `id` is the home-page section used for active-link highlighting; `href` works from any page.
export const navItems = [
  { id: "about", label: "About", href: "/#about" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "writing", label: "Blog", href: "/blog" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;
