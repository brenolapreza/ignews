import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';
import { SignInButton } from '.';

jest.mock('next-auth/client');

describe('SignInButton Component', () => {

  it('renders correctly when user is not authanticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(
      <SignInButton />
    );

    expect(screen.getByText('Sign In With GitHub')).toBeInTheDocument();
  });

  it('renders correctly when user is authanticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
      user: {
        name: 'John Doe',
        email: 'johndoe@email.com',
      },
      expires: 'fake-expires',
    }, false]);

    render(
      <SignInButton />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
})