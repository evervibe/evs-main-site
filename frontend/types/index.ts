export interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  buyUrl: string;
  prices: {
    single: number;
    agency: number;
  };
}

export interface SiteConfig {
  name: string;
  url: string;
  contactEmail: string;
  phone: string;
  location: string;
  social: {
    x: string;
    github: string;
  };
  legal: {
    company: string;
    address: string;
    email: string;
  };
}
