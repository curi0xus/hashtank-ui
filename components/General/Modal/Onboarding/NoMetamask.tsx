import ModalTemplate from "@/components/General/Modal/CardModal/CustomContent";
import React from "react";
import { HStack, VStack, Divider, Text, Box, Button } from "@chakra-ui/react";
import Danger from "public/static/icons/Danger.png";
import Image from "next/image";
import NoWalletFoundImage from "public/static/images/Onboarding/NoWalletFound.webp";

// currently for OGs. Swap to general chat later on
// const TELEGRAM_URL = 'https://t.me/c/1822451204/1';
const TELEGRAM_URL = "https://t.me/c/1822451204/11";

const METAMASK_URL = "https://metamask.app.link/dapp/hashtank-ui.vercel.app";

const CustomContent = (props: any) => {
  return (
    <>
      {/* Title */}
      <VStack mt={["30px"]} w={"100%"} alignItems={"flex-start"}>
        <Text
          display={["none", "flex"]}
          color={"brand.900"}
          textTransform={"uppercase"}
          fontWeight={"medium"}
          fontSize="4xl"
        >
          NO METAMASK PLUGIN DETECTED
        </Text>
        <Divider
          display={["none", "flex"]}
          opacity={1}
          borderWidth={"1px"}
          borderColor={"brand.900"}
        />
        <Text
          display={["none", "flex"]}
          color={"black"}
          fontWeight={"medium"}
          fontSize={["md"]}
        >
          In order to interact with HASHTANK you’ll require a MetaMask plugin
          and some SHELL tokens, join us on Telegram to find out how!
        </Text>
        <Divider
          display={["none", "flex"]}
          m="20px 0"
          opacity={1}
          borderWidth={"1px"}
          borderColor={"brand.900"}
        />
        <Box w={["60%", "30%"]} m="auto">
          <Image
            style={{ margin: "auto", width: "100%", height: "auto" }}
            height={100}
            width={100}
            src={NoWalletFoundImage}
            alt="No Metamask Found"
          />
        </Box>
        <Box display="flex" flexDir={"column"} w={["100%", "60%"]} m="auto">
          <Divider
            mt="30px"
            opacity={1}
            borderWidth={"1px"}
            borderColor={"brand.900"}
          />
          <Text
            display={["none", "flex"]}
            m={"10px 0"}
            textTransform={"uppercase"}
            color={"brand.900"}
            fontWeight={"medium"}
            fontSize={["2xl"]}
          >
            Add us on Telegram
          </Text>
          <Text
            display={["flex", "none"]}
            m={"10px 0"}
            textTransform={"uppercase"}
            color={"brand.900"}
            fontWeight={"medium"}
            fontSize={["2xl"]}
          >
            No wallet detected
          </Text>
          <Divider opacity={1} borderWidth={"1px"} borderColor={"brand.900"} />
          <Text
            mt="30px"
            mb="30px"
            color={"black"}
            fontWeight={"normal"}
            fontSize={["md"]}
          >
            Join our Telegram community to learn how you to can get free SHELL
            tokens as well as receive onboarding assistance.
          </Text>
          <Divider
            mb="30px"
            display={["flex", "none"]}
            opacity={1}
            borderWidth={"1px"}
            borderColor={"brand.900"}
          />
          <Button
            onClick={() => {
              window.location.href = TELEGRAM_URL;
            }}
            m="10px auto"
            w={["70%"]}
            // maxW={'60vw'}
            p={["10px 10px", "30px 50px"]}
            _hover={{
              background: "white",
              color: "brand.900",
            }}
            background={"brand.900"}
            color="white"
          >
            <Text
              textTransform={"uppercase"}
              fontWeight={"medium"}
              fontSize={["sm", "lg", "xl"]}
            >
              Join telegram
            </Text>
          </Button>
          <Button
            display={["flex", "none"]}
            onClick={() => {
              window.location.href = METAMASK_URL;
            }}
            m="10px auto"
            w={["70%"]}
            // maxW={'60vw'}
            p={["10px 10px", "30px 50px"]}
            _hover={{
              background: "white",
              color: "brand.900",
            }}
            background={"brand.900"}
            color="white"
          >
            <Text
              textTransform={"uppercase"}
              fontWeight={"medium"}
              fontSize={["sm", "lg", "xl"]}
            >
              Open in Metamask
            </Text>
          </Button>
          <Button
            display={["none", "flex"]}
            m="10px auto"
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              props.closeModalsList?.map((each: any) => each?.(e));
            }}
            w={["70%"]}
            // maxW={'60vw'}
            p={["10px 10px", "30px 50px"]}
            color="white"
            _hover={{
              bg: "#3D4B65",
              color: "white",
            }}
            bg="#3D4B65"
          >
            <Text
              textTransform={"uppercase"}
              fontWeight={"medium"}
              fontSize={["sm", "lg", "xl"]}
            >
              exit
            </Text>
          </Button>
        </Box>
      </VStack>
    </>
  );
};

const NoMetamaskContent = (props: any) => {
  return <ModalTemplate CustomContent={() => <CustomContent {...props} />} />;
};

export default NoMetamaskContent;
