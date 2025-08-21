// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '../Dashboard';
import { useStore } from '@/store/useStore';

const mockSetView = vi.fn();

// Mock react-query module
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: () => ({
      data: [{
        id: '1',
        status: 'assignable',
        pickup_address: 'A',
        delivery_address: 'B',
        route: { distance_meters: 1000, estimated_time_seconds: 600, polyline: '' },
        created_at: ''
      }],
      isLoading: false,
      isError: false,
      error: null
    })
  };
});

vi.mock('@/store/useStore');

vi.mock('@/hooks/use-toast', () => ({ 
  useToast: () => ({ toast: vi.fn() })
}));

describe('Dashboard', () => {
  it('shows offline message and accepts order when online', async () => {
    const client = new QueryClient();
    const acceptMock = vi.fn();

    let isOnline = false;
    const toggleOnlineStatus = vi.fn().mockImplementation(async () => {
      isOnline = !isOnline;
      return Promise.resolve(isOnline);
    });

    const mockUseStore = () => ({
      isOnline,
      actions: {
        setView: mockSetView,
        fetchOnlineStatus: vi.fn(),
        toggleOnlineStatus,
      },
    });

    useStore.mockImplementation(mockUseStore);

    const { rerender } = render(
      <QueryClientProvider client={client}>
        <Dashboard onAcceptOrder={acceptMock} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/estás desconectado/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /Conectarse/i }));

    rerender(
      <QueryClientProvider client={client}>
        <Dashboard onAcceptOrder={acceptMock} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Aceptar pedido/i)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /Aceptar pedido/i }));
    expect(acceptMock).toHaveBeenCalledWith('1');
  }, 15000); // Increase test timeout to 15 seconds
});
