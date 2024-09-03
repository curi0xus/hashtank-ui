import Head from 'next/head';
import AuctionPageContent from '@/components/Auction';

export default function CurrentAuctionPage() {
  return (
    <>
      <Head>
        <title>Current Auction</title>
        <meta name='description' content='Hashtank Current Auction' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AuctionPageContent />
    </>
  );
}
