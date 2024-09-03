import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import LoadingImage from "public/static/images/Auction/Loading.webp";

const BidLoadingScreen = ({ msg }: any) => {
  return (
    <Box
      top={0}
      left={0}
      position={"fixed"}
      zIndex={99999}
      width={"100vw"}
      height={"100vh"}
      bgColor="rgba(0, 0, 0, 0.5)"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        height={["100%", "100%", "100%", "100%", "100%", "85%"]}
        width={["100%", "100%", "100%", "100%", "100%", "45%"]}
        borderRadius={[0, 0, 0, 0, "20px"]}
        bg="#B276FF"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Text
          mb={["30px", "50px"]}
          textTransform={"uppercase"}
          color="#FFEE57"
          fontWeight={"bold"}
          fontSize={["xl", "2xl", "3xl", "4xl", "4xl"]}
        >
          {msg}...
        </Text>
        <Image
          style={{ width: "50%", height: "auto" }}
          src={LoadingImage}
          alt="Loading Image"
        />
      </Box>
    </Box>
  );
};

export default BidLoadingScreen;
