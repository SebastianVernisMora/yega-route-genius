// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from '@/components/Dashboard';
import RutaEntregaScreen from '@/components/RutaEntregaScreen';
import { useStore } from '@/store/useStore';

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toasts: [],
    toast: vi.fn(),
    dismiss: vi.fn(),
  }),
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
);

const sampleOrder: any = {
  id: '1',
  status: 'en_route',
  pickup_address: 'Store',
  delivery_address: 'Home',
  route: { distance_meters: 1000, estimated_time_seconds: 600, polyline: '' },
  created_at: ''
};

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: [sampleOrder], isLoading: false }),
  useMutation: () => ({ mutate: vi.fn(), isLoading: false }),
  useQueryClient: () => ({ invalidateQueries: vi.fn() })
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
    render(<RutaEntregaScreen order={{ ...order, status: 'en_route' }} />);
    await userEvent.click(screen.getByRole('button', { name: /llegué a la tienda/i }));

    render(<RutaEntregaScreen order={{ ...order, status: 'at_store' }} />);
    await userEvent.click(screen.getByRole('button', { name: /en camino/i }));

    render(<RutaEntregaScreen order={{ ...order, status: 'picked_up' }} />);
    await userEvent.click(screen.getByRole('button', { name: /entregado/i }));

    actions.clearOrder();
    expect(useStore.getState().currentView).toBe('dashboard');
  });
});
