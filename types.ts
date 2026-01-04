
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  location: string;
  serviceType: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'completed';
}

export interface SiteConfig {
  emergencyMode: boolean;
  contactPhone: string;
  whatsapp: string;
  heroHeadline: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text?: string;
  videoUrl?: string;
  date: string;
}

export enum Page {
  HOME = 'home',
  ADMIN = 'admin',
  SERVICES = 'services'
}