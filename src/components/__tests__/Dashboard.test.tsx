// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from '../Dashboard';

const mockSetView = jest.fn();

jest.mock('@/store/useStore', () => ({
  useStore: () => ({ actions: { setView: mockSetView } })
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() })
}));

describe('Dashboard', () => {
  const sampleOrder = {
    id: '1',
    status: 'assignable',
    pickup_address: 'A',
    delivery_address: 'B',
    route: { distance_meters: 1000, estimated_time_seconds: 600, polyline: '' },
    created_at: ''
  };

  beforeEach(() => {
    (global.fetch as jest.Mock) = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [sampleOrder]
    });
  });

  it('shows offline message and accepts order when online', async () => {
    const client = new QueryClient();
    const acceptMock = jest.fn();
    render(
      <QueryClientProvider client={client}>
        <Dashboard onAcceptOrder={acceptMock} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/estás desconectado/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /conectarse/i }));

    await waitFor(() => expect(screen.getByText(/aceptar pedido/i)).toBeInTheDocument());

    await userEvent.click(screen.getByRole('button', { name: /aceptar pedido/i }));
    expect(acceptMock).toHaveBeenCalledWith('1');
  });
});
