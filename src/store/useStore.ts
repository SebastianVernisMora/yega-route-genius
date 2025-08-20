import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define the Order type, ensuring it's consistent across the app
interface Order {
  id: string;
  status: 'assignable' | 'en route' | 'delivered';
  pickup_address: string;
  delivery_address: string;
  route: {
    distance_meters: number;
    estimated_time_seconds: number;
    polyline: string;
  };
  created_at: string;
}

type View = 'registration' | 'dashboard' | 'delivery' | 'documents' | 'profile' | 'earnings' | 'auth';

interface AppState {
  isAuthenticated: boolean;
  authToken: string | null;
  currentView: View;
  selectedOrder: Order | null;
  isOnline: boolean;
  actions: {
    login: (token: string) => void;
    logout: () => void;
    setView: (view: View) => void;
    selectOrder: (order: Order) => void;
    clearOrder: () => void;
    fetchOnlineStatus: () => Promise<void>;
    toggleOnlineStatus: () => Promise<boolean>;
  };
}

export const useStore = create<AppState>((set, get) => ({
  isAuthenticated: false, // Default to false
  authToken: null,
  currentView: 'auth',
  selectedOrder: null,
  isOnline: false,
  actions: {
    login: (token) => set({ isAuthenticated: true, authToken: token, currentView: 'dashboard' }),
    logout: () => set({ isAuthenticated: false, authToken: null, currentView: 'auth' }),
    setView: (view) => set({ currentView: view }),
    selectOrder: (order) => set({ selectedOrder: order, currentView: 'delivery' }),
    clearOrder: () => set({ selectedOrder: null, currentView: 'dashboard' }),
    fetchOnlineStatus: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/drivers/status`);
        if (res.ok) {
          const data = await res.json();
          set({ isOnline: data.online });
        }
      } catch (error) {
        console.error('Failed to fetch online status', error);
      }
    },
    toggleOnlineStatus: async () => {
      const next = !get().isOnline;
      try {
        await fetch(`${API_BASE_URL}/api/v1/drivers/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ online: next }),
        });
        set({ isOnline: next });
      } catch (error) {
        console.error('Failed to update online status', error);
      }
      return next;
    },
  }
}));
