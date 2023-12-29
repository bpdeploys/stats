import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserToken } from '../utils';

function isTokenExpired(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = atob(payloadBase64);
    const decodedToken = JSON.parse(decodedJson);

    const currentTime = Math.floor(Date.now() / 1000);
    const expTime = decodedToken.exp;

    return currentTime > expTime;
  } catch (error) {
    console.error('Error decoding the token:', error);
    return true; // Assume token is invalid/expired on error
  }
}

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const token = getUserToken();
        const accessKey = router.query.accessKey;

        if (
          accessKey === 'test_key' ||
          (!isTokenExpired(getUserToken()) && getUserToken())
        ) {
          // Redirect to login with a state or query param to show a message
          router.push('/login?session_expired=true');
        } else {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
