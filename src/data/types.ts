export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  resume: ResumeContent;
  demoVideo: DemoVideoContent;
  gallery: GalleryContent;
  contact: ContactContent;
  navbar: NavbarContent;
  footer: FooterContent;
  assets: AssetsContent;
}

export interface HeroContent {
  greeting: string;
  nameFirst: string;
  nameLast: string;
  tagline: string;
  btnCV: string;
  btnExperience: string;
  btnDemo: string;
}

export interface AboutContent {
  label: string;
  headline: string;
  headlineHighlight: string;
  headlineEnd: string;
  quote: string;
  bio: string;
  stats: {
    height: string;
    heightLabel: string;
    hair: string;
    hairLabel: string;
    eyes: string;
    eyesLabel: string;
    weight: string;
    weightLabel: string;
  };
}

export interface ResumeContent {
  label: string;
  title: string;
  filterTous: string;
  filterFilm: string;
  filterTheater: string;
  filterFormation: string;
  skillsTitle: string;
  credits: CreditContent[];
  skills: SkillCategory[];
}

export interface CreditContent {
  id: string;
  title: string;
  role: string;
  director: string;
  year: string;
  company: string;
  type: 'Film' | 'Theater' | 'Formation';
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface DemoVideoContent {
  label: string;
  title: string;
  overlay: string;
  videoId: string;
}

export interface GalleryContent {
  label: string;
  title: string;
  viewLabel: string;
  images: string[];
}

export interface ContactContent {
  label: string;
  headline: string;
  joinPrompt: string;
  email: string;
  phone: string;
  phoneLabel: string;
  location: string;
  locationLabel: string;
  socialLabel: string;
  social: ContactSocial;
  form: ContactFormContent;
  formAction: string;
  formSubject: string;
}

export interface ContactSocial {
  instagram: string;
  youtube: string;
  facebook: string;
  tiktok: string;
}

export interface ContactFormContent {
  name: string;
  email: string;
  message: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submit: string;
}

export interface NavbarContent {
  links: NavLink[];
}

export interface NavLink {
  name: string;
  href: string;
}

export interface FooterContent {
  copyright: string;
  legalLinks: FooterLegalLink[];
}

export interface FooterLegalLink {
  name: string;
  content: string;
}

export interface AssetsContent {
  portrait: string;
  cv: string;
  gallery: string[];
}
