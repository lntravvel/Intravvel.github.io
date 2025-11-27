export interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  featured: boolean;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'archived';
  createdAt: string;
}

export interface SiteContent {
  section: string;
  data: Record<string, any>;
}

export interface AuthResponse {
  token: string;
  user: {
    email: string;
    role: string;
  }
}