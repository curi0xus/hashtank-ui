import React from "react";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import ModalTitle from "@/components/General/Modal/CardModal/Title";
import BidSummary from "@/components/General/Modal/CardModal/BidSummary";
import BlueTee from "public/static/images/ColdStorage/BlueTee.png";
import useScreenOritentation from "@/hooks/useScreenOritentation";
import mobileCheck from "@/helpers/mobileCheck";

const ACTIONS = [
  {
    actionText: "AWARDED TO CONSERVATIONISTS",
    ts: {
      content: "1.5.2023 / 20:49",
      color: "black",
    },
  },
];

const Content = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  ...props
}: any) => {
  const { isLandscape } = useScreenOritentation();
  const isMobile = mobileCheck();

  const isMobileLandscape = isLandscape && isMobile;

  const imageSize = isMobileLandscape ? "20%" : "100%";
  const gapSize = isMobileLandscape ? "50px" : "80px";
  const paddingTop = isMobileLandscape ? "20px" : "80px";
  return (
    <Flex
      // pl={[0, '50px']}
      // pr={[0, '50px']}
      pt={[paddingTop, paddingTop, paddingTop, paddingTop, "80px"]}
      gap={[gapSize, gapSize, gapSize, gapSize, gapSize, "80px"]}
      flexDirection={["column"]}
      color={textColor}
      justifyContent={"center"}
      alignItems={["center"]}
    >
      {/* {specialText && (
        <Box mt='50px' width='90%'>
          <Text
            textAlign={specialText.alignment}
            color={specialText.textColor}
            textTransform={'uppercase'}
            fontWeight={'medium'}
            fontSize='3xl'
          >
            {specialText.content1}
            <br />
            {specialText.content2}
          </Text>
        </Box>
      )} */}
      <Box
        // pt={['20px', '100px']}
        alignSelf={"flex-start"}
        position="relative"
        w={[imageSize, imageSize, imageSize, imageSize, "90%"]}
        m="0 auto"
      >
        <Image
          style={{ margin: "auto", width: "100%", height: "auto" }}
          src={BlueTee}
          alt="Fish Sauce Modal"
        />
      </Box>
      <VStack mb="100px" width={["100%", "90%"]}>
        <ModalTitle
          width={["100%", "70%"]}
          isReverseWrap
          textColor={"#FFEE57"}
          borderColor={"white"}
          title={"VIVID RED SIAMESE FIGHTING FISH"}
        />
        {ACTIONS.map((each: any, i: number) => (
          <BidSummary borderColor={"white"} key={i} {...each} />
        ))}
      </VStack>
    </Flex>
  );
};

export default Content;
