"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../loadingComponents/Loading'; // Import the loading component

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/Login'); // Redirect to login page if not authenticated
      } else {
        setIsLoading(false); // Set loading to false if authenticated
      }
    }, [router]);

    if (isLoading) {
      return <Loading />; // Show loading component while checking authentication
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;