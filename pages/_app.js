import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import { AuthProvider, useAuth } from '../context/useAuth'; // Import your custom AuthProvider
import Login from '.';
import { BASE_URL } from '../http';
import ScreenLoading from '../components/ScreenLoading';
import DynamicProvider from '../provider';
import HeadApp from '../components/Head';
import Script from 'next/script';

const AuthContent = ({ db, Component, pageProps }) => {
  const { userInfo, isLoading, refreshAuth } = useAuth();

  if (!db || isLoading) {
    return <ScreenLoading />;
  }

  if (!userInfo) {
    return <Login refreshAuth={refreshAuth} />;
  }

  return (
    <DynamicProvider db={db}>
      <Component userInfo={userInfo} refreshAuth={refreshAuth} {...pageProps} />
    </DynamicProvider>
  );
};

const MyApp = ({ Component, pageProps }) => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    initializeDB();
  }, []);

  const initializeDB = async () => {
    try {
      const db = await openDB('__REFEREE__', 1, {
        upgrade(dbOpened) {
          dbOpened.createObjectStore('MATCH_WAS_ENTERED_CODE', {
            keyPath: 'id',
            autoIncrement: true,
          });
        },
      });
      setDb(db);
    } catch (error) {
      console.error('Error initializing DB:', error);
    }
  };

  return (
    <div>
      <HeadApp />
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="85eaba2e-7560-4bda-bd6e-ecded2f744ef"
        strategy="afterInteractive"
      />
      <AuthProvider>
        <AuthContent db={db} Component={Component} pageProps={pageProps} />
      </AuthProvider>
    </div>
  );
};

export default MyApp;
