import Head from 'next/head';
import HomePageContent from '@/components/HomeTwo';

export default function Home() {
  return (
    <>
      {/* {codeStatus === null && <p>Checking invitation code...</p>}
    {codeStatus != null && 
    <div>
      <Head>
        <title>HashTank</title>
        <meta name="description" content="Save the last fish in the world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePageContent />
    </div>
    } */}
      <Head>
        <title>HashTank</title>
        <meta name='description' content='Save the last fish in the world' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomePageContent />
    </>
  );
}
