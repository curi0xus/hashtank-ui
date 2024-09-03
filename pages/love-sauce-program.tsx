import Head from 'next/head';
import LoveSauceProgramContent from '@/components/LoveSauceProgram';

export default function AuctionPage() {
  return (
    <>
      <Head>
        <title>Love Sauce Program</title>
        <meta name='description' content='Hashtank Love Sauce Program' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <LoveSauceProgramContent />
    </>
  );
}
