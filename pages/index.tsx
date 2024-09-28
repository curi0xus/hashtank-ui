import Head from "next/head";
import HomePageContent from "@/components/HomeTwo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useInvitationCode from "@/hooks/useInvitationCode";

export default function Home() {
  const router = useRouter();
  const inviteCode = router?.query?.inviteCode;
  const codeStatus = useInvitationCode();

  useEffect(() => {
    if (inviteCode && typeof inviteCode === "string") {
      window.localStorage.setItem("invite_code", inviteCode);
    }
  }, [inviteCode]);

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
        <meta name="description" content="Save the last fish in the world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePageContent />
    </>
  );
}
