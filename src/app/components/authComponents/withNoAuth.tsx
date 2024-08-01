import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '../loadingComponents/Loading'; // Import the loading component

const withNoAuth = (WrappedComponent: React.ComponentType) => {
  const NoAuthComponent = (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        router.push('/Dashboard'); // Redirect to dashboard if authenticated
      } else {
        setIsLoading(false); // Set loading to false if not authenticated
      }
    }, [router]);

    if (isLoading) {
      return <Loading />; // Show loading component while checking authentication
    }

    return <WrappedComponent {...props} />;
  };

  return NoAuthComponent;
};

export default withNoAuth;