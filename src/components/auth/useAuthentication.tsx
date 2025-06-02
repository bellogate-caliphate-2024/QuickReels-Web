'use client';

import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UnauthorizedModal from './unAuthModal'; // adjust path if needed

const useAuthentication = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        setShowModal(true); // Show the modal first
        setTimeout(() => {
          router.replace('/pages/landing');
        }, 2000); // delay redirect (e.g. 3 seconds)
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }, []);

    if (isAuthenticated === null) {
      // Still checking auth
      return null;
    }

    if (!isAuthenticated) {
      return (
        <UnauthorizedModal
          isVisible={showModal}
          onClose={() => setShowModal(false)}
          message="You are not authorized to access this page. Redirecting...."
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default useAuthentication;
