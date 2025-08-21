import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the useStore hook from Zustand
vi.mock('@/store/useStore', () => ({
  useStore: () => ({
    isAuthenticated: false,
    currentView: 'auth',
    selectedOrder: null,
    actions: {
      setView: vi.fn(),
      selectOrder: vi.fn(),
      clearOrder: vi.fn(),
      login: vi.fn(),
    },
  }),
}));

// Mock the useToast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toasts: [],
    toast: vi.fn(),
    dismiss: vi.fn(),
  }),
}));

// Mock react-query module
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useMutation: () => ({
      mutate: vi.fn(),
      isLoading: false,
    }),
  };
});

const queryClient = new QueryClient();

describe('App Routing and Rendering for Yega-Repartidor', () => {
  it('renders the AuthScreen when not authenticated', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    
    // The Index page should render the AuthScreen by default for unauthenticated users
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('shows the 404 page for a non-existent route', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/some/non-existent/route']}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    );
    
    // Check for text from the NotFound component
    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();
  });
});