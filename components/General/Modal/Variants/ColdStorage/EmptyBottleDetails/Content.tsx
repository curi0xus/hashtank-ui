import React from "react";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import Image from "next/image";
import ModalTitle from "@/components/General/Modal/CardModal/Title";
import BidSummary from "@/components/General/Modal/CardModal/BidSummary";
import FishTraits from "@/components/General/Modal/CardModal/FishTraits";
import BiddingHistory from "@/components/General/Modal/CardModal/BidHistory";
import ReallyEmptyBottle from "public/static/images/RedemptionCenter/ColdStorage/ReallyEmptyBottleLarge.webp";
import EmptyBottle from "public/static/images/RedemptionCenter/ColdStorage/EmptyBottleLarge.webp";
import useScreenOritentation from "@/hooks/useScreenOritentation";
import mobileCheck from "@/helpers/mobileCheck";
import Description from "../../../CardModal/Description";

const bottleImageMapper = {
  empty: ReallyEmptyBottle,
  concerto: EmptyBottle,
};

const Content = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  name,
  image,
  description,
  dropType,
  redemptionLink,
  bottleType,
  ...props
}: any) => {
  const ACTIONS = [
    {
      actionText: "CLAIM YOUR SAUCE HERE:",
      ts: {
        isUrl: true,
        content: "claim here",
        url: redemptionLink,
        color: "black",
      },
    },
    {
      actionText: "VALID TILL",
      ts: {
        isCountdown: true,
        content: new Date(),
        color: "black",
      },
    },
  ];
  const { isLandscape } = useScreenOritentation();
  const isMobile = mobileCheck();

  const isMobileLandscape = isLandscape && isMobile;

  const imageSize = isMobileLandscape ? "10%" : "25%";
  const gapSize = isMobileLandscape ? "50px" : "0px";
  return (
    <Flex
      pl={[0, "25px"]}
      pr={[0, "25px"]}
      pt={["0px", "50px"]}
      gap={[gapSize, gapSize, gapSize, gapSize, "80px"]}
      flexDirection={["column", "row"]}
      color={textColor}
      justifyContent={"center"}
      alignItems={["center", "flex-start"]}
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
        alignSelf={"flex-start"}
        position="relative"
        w={[imageSize, imageSize, imageSize, "30%"]}
        m="0 auto"
      >
        <Image
          style={{ margin: "auto", width: "100%", height: "auto" }}
          // @ts-ignore
          src={bottleImageMapper[bottleType]}
          alt={bottleType}
        />
      </Box>
      <VStack mt={isMobileLandscape ? 0 : "45px"} width={["90%", "70%"]}>
        <ModalTitle
          width={["100%", "100%"]}
          textColor={"#FFEE57"}
          borderColor={"white"}
          title={name}
        />
        {ACTIONS.map((each: any, i: number) => (
          <BidSummary borderColor={"white"} key={i} {...each} />
        ))}
        {/* <FishTraits
          specialColor={specialColor}
          borderColor={'white'}
          specialText={{ content: 'special sauce achieved', color: '#FFEE57' }}
        /> */}
        <Description description={description} />
      </VStack>
    </Flex>
  );
};

export default Content;
