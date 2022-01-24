import React from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseAuthConsumer } from '@react-firebase/auth';

export const nonSignedInAuthorizedRoutes = [
  '/login',
  '/signup',
  '/reset-password',
];

export default function AuthWrapper({ children }: { children: JSX.Element[] }) {
  const history = useHistory();

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn }) => {
        if (
          !isSignedIn &&
          !nonSignedInAuthorizedRoutes.includes(history.location.pathname)
        ) {
          return history.push('/login');
        }
        if (
          isSignedIn &&
          nonSignedInAuthorizedRoutes.includes(history.location.pathname)
        ) {
          return history.push('/');
        }
        return children;
      }}
    </FirebaseAuthConsumer>
  );
}
