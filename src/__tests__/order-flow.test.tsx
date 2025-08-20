// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from '@/components/Dashboard';
import DeliveryRoute from '@/components/DeliveryRoute';
import { useStore } from '@/store/useStore';

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() })
}));

const sampleOrder: any = {
  id: '1',
  status: 'en_route',
  pickup_address: 'Store',
  delivery_address: 'Home',
  route: { distance_meters: 1000, estimated_time_seconds: 600, polyline: '' },
  created_at: ''
};

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: [sampleOrder], isLoading: false }),
  useMutation: () => ({ mutate: jest.fn(), isLoading: false }),
  useQueryClient: () => ({ invalidateQueries: jest.fn() })
}));

describe('order flow', () => {
  it('accepts and delivers an order', async () => {
    const { actions } = useStore.getState();
    useStore.setState({ isAuthenticated: true, currentView: 'dashboard', selectedOrder: null });

    const acceptOrder = (id: string) => actions.selectOrder(sampleOrder);

    render(<Dashboard onAcceptOrder={acceptOrder} />);
    await userEvent.click(screen.getByRole('button', { name: /conectarse/i }));
    await screen.findByText(/aceptar pedido/i);
    await userEvent.click(screen.getByRole('button', { name: /aceptar pedido/i }));

    const order = useStore.getState().selectedOrder;
    render(<DeliveryRoute order={{ ...order, status: 'en_route' }} />);
    await userEvent.click(screen.getByRole('button', { name: /he llegado a la tienda/i }));
    render(<DeliveryRoute order={{ ...order, status: 'picked_up' }} />);
    await userEvent.click(screen.getByRole('button', { name: /pedido entregado/i }));

    actions.clearOrder();
    expect(useStore.getState().currentView).toBe('dashboard');
  });
});
