import React from 'react';
import Head from 'next/head';

const HeadApp = () => {
  const p = '/static/';
  const appleIcon = {
    rel: 'apple-touch-icon',
  };
  const faviconIcon = {
    rel: 'icon',
    type: 'image/png',
  };

  const appleIconSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180];

  const faviconIconSizes = [192, 32, 96, 16];

  return (
    <Head>
      <title>Baller - Referee App</title>
      <meta name="keywords" content="Referee Application of BallerProfile" />
      <meta name="description" content="Football sport London fantasy" />
      {appleIconSizes.map((size) => (
        <link
          key={size}
          {...appleIcon}
          sizes={`${size}x${size}`}
          href={`${p}apple-icon-${size}x${size}.png`}
        />
      ))}
      {faviconIconSizes.map((size) => (
        <link
          key={size}
          {...faviconIcon}
          sizes={`${size}x${size}`}
          href={`${p}favicon-${size}x${size}.png`}
        />
      ))}
      <link rel="manifest" href={`${p}manifest.json`} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content={`${p}ms-icon-144x144.png`}
      />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        className="next-head"
      />
    </Head>
  );
};

export default HeadApp;
