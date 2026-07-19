export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  cover: string;
  bio: string;
  location: string;
  role: 'user' | 'admin' | 'craftsman';
  verified: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  negotiable: boolean;
  images: string[];
  video?: string;
  category: string;
  subcategory?: string;
  condition: 'new' | 'used' | 'like_new';
  city: string;
  location: string;
  latitude?: number;
  longitude?: number;
  userId: string;
  user: User;
  views: number;
  likes: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  icon: string;
  subcategories: Subcategory[];
  color: string;
}

export interface Subcategory {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  icon?: string;
}

export interface AnimalListing extends Listing {
  animalType: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  healthStatus: string;
  vaccinated: boolean;
}

export interface CraftsmanProfile {
  id: string;
  userId: string;
  user: User;
  profession: string;
  professionAr: string;
  yearsOfExperience: number;
  gallery: GalleryItem[];
  services: Service[];
  ratings: Rating[];
  priceRange: string;
  available: boolean;
  phone: string;
  whatsapp: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  order: number;
}

export interface Service {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  description: string;
}

export interface Rating {
  id: string;
  userId: string;
  user: User;
  craftsmanId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'video' | 'file' | 'audio';
  fileUrl?: string;
  isRead: boolean;
  isDeleted: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

export interface City {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  imageUrl: string;
  listingsCount: number;
}

export interface SearchFilters {
  query?: string;
  city?: string;
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  sortBy?: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
}
