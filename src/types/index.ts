// src/types/index.ts

export interface Order {
  id: string;
  status: 'assignable' | 'en route' | 'delivered';
  pickup_address: string;
  delivery_address: string;
  route: {
    distance_meters: number;
    estimated_time_seconds: number;
    polyline: string;
  };
  earnings: number;
  distance_to_pickup_meters: number;
  created_at: string;
  updated_at?: string;
}

export type View =
  | 'splash'
  | 'auth'
  | 'registration'
  | 'dashboard'
  | 'delivery'
  | 'documents'
  | 'profile'
  | 'earnings';
