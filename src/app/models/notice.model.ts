export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city?: string;
  country?: string;
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  author: string;
  authorImg?: string;
  createdAt: Date;
  updatedAt?: Date;
  isActive: boolean;
  priority: number;
  expiryDate?: Date;
  category: string;
  imageUrl?: string;
  location?: Location;
  distanceFromUser?: number;
  isExpired: boolean;
}

export interface NoticeFilterData {
  text?: string;            
  categories?: { name: string; count: number }[];    
  author?: string;          
  isActive?: boolean | null;
  minPriority?: number | null;
  maxPriority?: number | null;
}

export interface NoticeCreateDto {
  title: string;
  content: string;
  author: string;
  priority: number; 
  expiryDate?: Date;
  category?: string;
  imageUrl?: string;
  location?: Location;
}

export interface NoticeUpdateDto {
  title?: string;
  content?: string;
  priority?: number;
  expiryDate?: Date;
  category?: string;
  imageUrl?: string;
  location?: Location;
  isActive?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}