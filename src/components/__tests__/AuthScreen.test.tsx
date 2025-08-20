// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthScreen from '../AuthScreen';

const mockLogin = jest.fn();
const mockMutate = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  useMutation: () => ({ mutate: mockMutate, isLoading: false })
}));

jest.mock('@/store/useStore', () => ({
  useStore: () => ({ actions: { login: mockLogin } })
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: jest.fn() })
}));

describe('AuthScreen', () => {
  it('calls login mutation with credentials', async () => {
    render(<AuthScreen />);
    await userEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    expect(mockMutate).toHaveBeenCalledWith({ email: 'test@yega.dev', password: 'password' });
  });
});
