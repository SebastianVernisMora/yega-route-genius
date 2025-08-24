// src/types/index.ts

export interface Order {
  id: string;
  status: 'assignable' | 'en_route' | 'at_store' | 'picked_up' | 'delivered';
  pickup_address: string;
  delivery_address: string;
  route: {
    distance_meters: number;
    estimated_time_seconds: number;
    polyline: string;
  };
  created_at: string;
}
