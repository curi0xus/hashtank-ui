import React from 'react';
import Head from 'next/head';

const AquariumShowcasePage = () => {
  //dynamically get information about the aquarium and mark the head meta tags accordingly
  return (
    <div>
      <Head>
        <title>Wai&apos;s Aquarium</title>
        <meta name='description' content="Wai's Private Aquarium" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>This is an aquarium page</h1>
    </div>
  );
};

export default AquariumShowcasePage;
