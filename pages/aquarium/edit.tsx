import Head from 'next/head';
import EditAquarium from '@/components/EditAquarium';

export default function EditAquariumPage() {
  return (
    <>
      <Head>
        <title>Edit Aquarium</title>
        <meta name='description' content='Edit Your Aquarium' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <EditAquarium />
    </>
  );
}
