import { create } from 'zustand';

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
  actions: {
    login: (token: string) => void;
    logout: () => void;
    setView: (view: View) => void;
    selectOrder: (order: Order) => void;
    clearOrder: () => void;
  };
}

const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

export const useStore = create<AppState>((set) => ({
  isAuthenticated: !!token,
  authToken: token,
  currentView: token ? 'dashboard' : 'auth',
  selectedOrder: null,
  actions: {
    login: (token) => {
      localStorage.setItem('authToken', token);
      set({ isAuthenticated: true, authToken: token, currentView: 'dashboard' });
    },
    logout: () => {
      localStorage.removeItem('authToken');
      set({ isAuthenticated: false, authToken: null, currentView: 'auth' });
    },
    setView: (view) => set({ currentView: view }),
    selectOrder: (order) => set({ selectedOrder: order, currentView: 'delivery' }),
    clearOrder: () => set({ selectedOrder: null, currentView: 'dashboard' }),
  }
}));
