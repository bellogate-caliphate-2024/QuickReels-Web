import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginPage from '../../login/page';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

describe('LoginPage', () => {
  it('should allow user to type email and password and click sign in', async () => {
    const mockRouter = {
      pathname: '/login',
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };

    render(
      <AppRouterContext.Provider value={mockRouter}>
        <LoginPage />
      </AppRouterContext.Provider>
    );

    const emailInput = screen.getByLabelText(/your email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const signInButton = screen.getByRole('button', { name: /sign in/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(signInButton);

    await waitFor(() => {
      expect(signInButton).toBeInTheDocument();
    });
  });
});
