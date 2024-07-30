import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService, fetchUserData } from '../services'; // Import your login service
import Router from 'next/router';

// Create a context
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('TOKEN');
    if (token) {
      // Validate the token or fetch user info
      setIsLoading(true);
      fetchUserData(token)
        .then((data) => {
          setUserInfo(data); // Set user info with fetched data
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          // Handle error, like clearing the token if it's invalid
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Function to refresh authentication state
  const refreshAuth = () => {
    const token = window.localStorage.getItem('TOKEN');
    if (token) {
      setIsLoading(true);
      fetchUserData(token)
        .then((data) => {
          setUserInfo(data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          // Optionally clear the token if it's invalid
          window.localStorage.removeItem('TOKEN');
          setUserInfo(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setUserInfo(null);
      setIsLoading(false);
    }
  };

  // Initialize authentication state
  useEffect(() => {
    refreshAuth(); // Call the refreshAuth function here
  }, []);

  // Login logic
  const login = (credentials) => {
    setIsLoading(true);
    loginService(
      credentials,
      (data) => {
        if ('key' in data) {
          window.localStorage.setItem('TOKEN', data.key);
          const token = window.localStorage.getItem('TOKEN');
          fetchUserData(token)
            .then((userData) => {
              setUserInfo(userData);
              setIsLoading(false);
              Router.push('/real_profile');
            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
              // Handle error, like clearing the token if it's invalid
              window.localStorage.removeItem('TOKEN');
              setUserInfo(null);
              setIsLoading(false);
            });
        } else {
          // Handle login failure
          console.error('Login failed');
          setError(
            'Login failed. Please check your credentials and try again.'
          );
          setIsLoading(false);
        }
      },
      (err) => {
        console.error('Login error:', err);
        setError('An error occurred. Please try again later.');
        setIsLoading(false);
      }
    );
  };

  // Logout logic
  const logout = () => {
    window.localStorage.removeItem('TOKEN');
    setUserInfo(null);
    Router.push('/login');
  };

  const contextValue = {
    userInfo,
    isLoading,
    login,
    logout,
    refreshAuth,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
