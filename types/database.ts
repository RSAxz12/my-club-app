export type GenderType = 'men' | 'women' | 'both';
export type DayType = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';
export type DurationType = 'monthly' | 'quarterly' | 'half_year' | 'yearly';

export interface Sport {
  id: string;
  name: string;
  created_at?: string;
}

export interface ClubImage {
  id: string;
  club_id?: string;
  url: string;
  is_cover?: boolean;
  created_at?: string;
}

export interface Subscription {
  id: string;
  club_id?: string;
  package_name: string;
  price: number;
  duration?: DurationType;
}

export interface Club {
  id: string;
  name: string;
  description?: string;
  address?: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  whatsapp?: string;
  gender?: GenderType;
  rating?: number;
  created_at?: string;
  club_images?: ClubImage[];
  subscriptions?: Subscription[];
  sports?: Sport[];
}

export interface Coach {
  id: string;
  name: string;
  specialty?: string;
  gender?: 'men' | 'women';
  photo?: string;
  bio?: string;
  club_id?: string;
  rating?: number;
  created_at?: string;
  clubs?: Club;
}