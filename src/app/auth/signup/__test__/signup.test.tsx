import { render, screen } from '@testing-library/react';
import SignUpPage from '../page';
import '@testing-library/jest-dom';

describe('SignUpPage', () => {
  it('renders form inputs and handles submission', () => {
    render(<SignUpPage />);

    expect(screen.getByLabelText(/Full Name/i));
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /sign up/i })
    ).toBeInTheDocument();
  });
});
