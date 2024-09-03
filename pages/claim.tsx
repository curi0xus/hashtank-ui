import Head from 'next/head';
import React from 'react';
import ClaimShellContent from '@/components/Claim';

export default function ClaimPage() {
  return (
    <>
      <Head>
        <title>Hashtank Alpha</title>
        <meta name='description' content='Hashtank Alpha - Claim 100 SHELL' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ClaimShellContent />
    </>
  );
}
