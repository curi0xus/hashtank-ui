import Head from 'next/head';
import React from 'react';
import WithdrawShellContent from '@/components/Withdraw';

export default function ClaimPage() {
  return (
    <>
      <Head>
        <title>Withdraw Failed Bids</title>
        <meta name='description' content='Withdraw your bids' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <WithdrawShellContent />
    </>
  );
}
