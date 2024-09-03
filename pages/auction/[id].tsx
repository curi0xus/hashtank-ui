'use client';

import Head from 'next/head';
import AuctionPageContent from '@/components/Auction';
import { useRouter } from 'next/router';

export default function AuctionPage() {
  const router = useRouter();
  const id = router?.query?.id;
  return (
    <>
      <Head>
        <title>Auction #{id}</title>
        <meta name='description' content={`Hashtank Auction #${id}`} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {id && <AuctionPageContent id={id} />}
    </>
  );
}
