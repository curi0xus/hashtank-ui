import React, { useEffect, useState } from "react";
import {
  Flex,
  Spacer,
  Box,
  Button,
  Text,
  Image,
  LinkOverlay,
} from "@chakra-ui/react";
import { WorldIDWidget, VerificationResponse } from "@worldcoin/id";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import NavDrawer from "./NavDrawer";
import HashtankTooltip from "../Tooltip";
import BellImage from "public/static/images/General/Tooltip/Bell.webp";
import usePostUser from "@/new-hooks/users/usePostUsers";

const disableScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = () => window.scrollTo(scrollLeft, scrollTop);
};

const enableScroll = () => {
  window.onscroll = null;
};

const NavHeader = () => {
  const { login, ready, authenticated, user, logout, linkWallet } = usePrivy();
  const address = user?.wallet?.address;
  const { pathname } = useRouter();
  const [isHideLogo, setIsHideLogo] = useState(false);
  const { mutateAsync } = usePostUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isConnected = ready && authenticated && user;

  useEffect(() => {
    if (address) {
      mutateAsync({ address }).catch((error) => console.log("Error:", error));
    }
  }, [address, mutateAsync]);

  const handleWorldIDVerification = async (
    verificationResponse: VerificationResponse
  ) => {
    const token = (verificationResponse as any).credential; // Temporarily use `any` type to access `credential`.

    if (!token) {
      console.error("Token not found in verification response");
      return;
    }

    try {
      const response = await fetch("/api/auth/world-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worldIDToken: token }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        console.error("Verification failed");
      }
    } catch (error) {
      console.error("Error during verification:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsHideLogo(window.scrollY > 0);
    };

    if (isConnected && pathname !== "/aquarium/edit") {
      enableScroll();
      window.addEventListener("scroll", handleScroll);
    } else {
      disableScroll();
    }

    return () => {
      enableScroll();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isConnected, pathname]);

  return (
    <Flex
      zIndex={9}
      position="fixed"
      width="100vw"
      minWidth="max-content"
      alignItems="flex-start"
      gap="2"
    >
      <LinkOverlay display={["none", isHideLogo ? "none" : "block"]} href="/">
        <Box p={["5", "5", "10", "20"]}>
          <Image
            maxW="256px"
            width={["40vw", "30vw", "35vw"]}
            src="/static/images/Home/logo.webp"
            alt="Hashtank Logo"
          />
        </Box>
      </LinkOverlay>
      <Spacer />
      <Box p={["5", "5", "20", "20"]}>
        {isConnected ? (
          <NavDrawer />
        ) : (
          <HashtankTooltip
            storageKey="login"
            defaultIsOpen
            Icon={BellImage}
            title="LOG IN TO START PLAYING"
            Instruction={() => (
              <>
                Log in with your wallet or email to start engaging with the
                world of HASHTANK.
              </>
            )}
            Trigger={() => (
              <Button
                isDisabled={!ready}
                onClick={isConnected ? linkWallet : login}
                maxW="60vw"
                p={["10px 10px", "30px 50px"]}
                _hover={{ background: "white", color: "brand.900" }}
                background="brand.900"
                color="white"
              >
                <Text
                  textTransform="uppercase"
                  fontWeight="medium"
                  fontSize={["sm", "lg", "xl"]}
                >
                  {ready ? "PLAY NOW!" : "loading..."}
                </Text>
                <WorldIDWidget
                  actionId="your_action_id"
                  signal="sign_in"
                  onSuccess={handleWorldIDVerification}
                  onError={(error) =>
                    console.error("World ID verification failed:", error)
                  }
                />
              </Button>
            )}
          />
        )}
      </Box>
    </Flex>
  );
};

export default NavHeader;
