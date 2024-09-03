import Head from 'next/head';
import SauceFactoryContent from '@/components/SauceFactory';

export default function AuctionPage() {
  return (
    <>
      <Head>
        <title>Sauce Factory</title>
        <meta name='description' content='Hashtank Sauce Factory' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SauceFactoryContent />
    </>
  );
}
