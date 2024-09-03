import Head from 'next/head';
import React from 'react';
import Greetings from '@/components/About/Greetings';
import Game from '@/components/About/Game';
import Sauce from '@/components/About/Sauce';
import Profit from '@/components/About/Profit';
import Lore from '@/components/About/Lore';

const Content = () => {
  return (
    <main
      style={{
        height: 'fit-content',
        backgroundColor: '#373A49',
        paddingBottom: '10vh',
      }}
      id='about-us-main'
    >
      <Greetings />
      <Game />
      <Sauce />
      <Profit />
      <Lore />
    </main>
  );
};

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Hashtank</title>
        <meta name='description' content='Greetings, Fellow Capitalists' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Content />
    </>
  );
};

export default AboutPage;
