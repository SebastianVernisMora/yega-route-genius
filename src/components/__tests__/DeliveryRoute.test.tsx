// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockMutate = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  useMutation: () => ({ mutate: mockMutate, isLoading: false }),
  useQueryClient: () => ({ invalidateQueries: jest.fn() })
}));

jest.mock('@/store/useStore', () => ({
  useStore: () => ({ actions: { clearOrder: jest.fn() } })
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() })
}));

const DeliveryRoute = require('../DeliveryRoute').default;

describe('DeliveryRoute', () => {
  const order = {
    id: '1',
    status: 'en_route',
    pickup_address: 'Store',
    delivery_address: 'Home',
    route: { distance_meters: 1000, estimated_time_seconds: 600, polyline: '' },
    created_at: ''
  };

  it('updates status when action button clicked', async () => {
    render(<DeliveryRoute order={order} />);
    await userEvent.click(screen.getByRole('button', { name: /he llegado a la tienda/i }));
    expect(mockMutate).toHaveBeenCalledWith({ orderId: '1', status: 'arrive' });
  });
});
