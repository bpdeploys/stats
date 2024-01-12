import React from "react";
import Head from "next/head";

const HeadApp = () => {
  const apple = {
    rel: "apple-touch-icon"
  };

  const favicon = {
    rel: "icon",
    type: "image/png"
  };

  const ai = "apple-icon";
  const p = "/static/";

  return (
    <Head>
      <title>Baller - Refeere App</title>
      <meta name="keywords" content="Refeere Application of BallerProfile" />
      <meta name="description" content="futbool sport london fantasy" />
      <link {...apple} sizes="57x57" href={`${p}${ai}-57x57.png`} />
      <link {...apple} sizes="60x60" href={`${p}${ai}-60x60.png`} />
      <link {...apple} sizes="72x72" href={`${p}${ai}-72x72.png`} />
      <link {...apple} sizes="76x76" href={`${p}${ai}-76x76.png`} />
      <link {...apple} sizes="114x114" href={`${p}${ai}-114x114.png`} />
      <link {...apple} sizes="120x120" href={`${p}${ai}-120x120.png`} />
      <link {...apple} sizes="144x144" href={`${p}${ai}-144x144.png`} />
      <link {...apple} sizes="152x152" href={`${p}${ai}-152x152.png`} />
      <link {...apple} sizes="180x180" href={`${p}${ai}-180x180.png`} />
      <link
        {...favicon}
        sizes="192x192"
        href={`${p}android-icon-192x192.png`}
      />
      <link {...favicon} sizes="32x32" href={`${p}favicon-32x32.png`} />
      <link {...favicon} sizes="96x96" href={`${p}favicon-96x96.png`} />
      <link {...favicon} sizes="16x16" href={`${p}favicon-16x16.png`} />
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
