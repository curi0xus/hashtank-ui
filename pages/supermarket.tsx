import Head from "next/head";
import RedemptionCenterContent from "@/components/RedemptionCenter";

export default function AuctionPage() {
  return (
    <>
      <Head>
        <title>Supermarket</title>
        <meta name="description" content="Hashtank Redemption Center" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RedemptionCenterContent />
    </>
  );
}
