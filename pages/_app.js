import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import { AuthProvider, AuthConsumer } from 'react-check-auth';
import Login from '.';
import { BASE_URL } from '../http';
import ScreenLoading from '../components/ScreenLoading';
import DynamicProvider from '../provider';
import HeadApp from '../components/Head';

const MyApp = ({ Component, pageProps }) => {
  const [db, setDb] = useState(null);
  const [reqOptions, setReqOptions] = useState(null);

  useEffect(() => {
    // Initialize db and set it to state
    const initializeDB = async () => {
      const db = await openDB('__REFEREE__', 1, {
        upgrade(dbOpened) {
          dbOpened.createObjectStore('MATCH_WAS_ENTERED_CODE', {
            keyPath: 'id',
            autoIncrement: true,
          });
        },
      });
      setDb(db);
    };

    initializeDB();

    setReqOptions({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}` || '',
      },
    });
  }, []);

  const refreshAuthState = (refreshAuthFunction) => {
    setReqOptions({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${window.localStorage.getItem('TOKEN')}` || '',
      },
    });
    refreshAuthFunction();
  };

  return (
    <div>
      <HeadApp />
      {reqOptions ? (
        <AuthProvider
          authUrl={`${BASE_URL}/current-user/`}
          reqOptions={reqOptions}
        >
          <AuthConsumer>
            {({ isLoading, userInfo, refreshAuth }) => {
              if (isLoading || !db) {
                return <ScreenLoading />;
              } else if (!userInfo) {
                return (
                  <Login refreshAuth={() => refreshAuthState(refreshAuth)} />
                );
              } else {
                return (
                  <DynamicProvider db={db}>
                    <Component
                      {...{
                        ...pageProps,
                        userInfo,
                        refreshAuth: () => refreshAuthState(refreshAuth),
                      }}
                    />
                  </DynamicProvider>
                );
              }
            }}
          </AuthConsumer>
        </AuthProvider>
      ) : (
        <ScreenLoading />
      )}
    </div>
  );
};

export default MyApp;
