// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthScreen from '../AuthScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockLogin = vi.fn();
const mockMutate = vi.fn();

vi.mock('@/store/useStore', () => ({
  useStore: () => ({ actions: { login: mockLogin } })
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() })
}));

// Mock react-query module
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useMutation: () => ({
      mutate: mockMutate,
      isLoading: false,
    }),
  };
});

const queryClient = new QueryClient();

describe('AuthScreen', () => {
  it('calls login mutation with credentials', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthScreen />
      </QueryClientProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    expect(mockMutate).toHaveBeenCalledWith({ email: 'test@yega.dev', password: 'password' });
  });
});