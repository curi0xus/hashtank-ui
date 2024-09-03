import React from "react";
import { Box, Flex, VStack, Text, Divider } from "@chakra-ui/react";
import MrsChingImage from "public/static/images/About/ching-profile.webp";
import Image from "next/image";
import DividerImage from "../../../public/static/images/About/controls/-DIVIDER-.webp";

export const TextBlock = ({ title, paragraphs, withoutDivider }: any) => {
  return (
    <>
      <Text
        lineHeight={1.1}
        textTransform={"uppercase"}
        color="brand.900"
        fontWeight={"medium"}
        fontSize={["4.5xl"]}
        mb={["5vh", "2vh"]}
      >
        {title}
      </Text>
      {!withoutDivider && (
        <Divider opacity={1} borderBottomWidth={3} mb={[10, 10]} />
      )}
      {paragraphs?.map((each: string, i: number) => {
        return (
          <Text
            key={i}
            mt={["5vh", "15px"]}
            fontWeight={"normal"}
            fontSize={["sm", "md"]}
          >
            {each}
          </Text>
        );
      })}
    </>
  );
};

const Greetings = () => {
  return (
    <Box
      p={[
        "25vh 10vw 10vh 10vw",
        "25vh 10vw 10vh 10vw",
        "25vh 10vw 10vh 10vw",
        "35vh 15vw 20vw 15vw",
        "55vh 10vw 10vh 10vw",
      ]}
    >
      <Flex
        flexDirection={["column", "column"]}
        alignItems={["flex-start", "flex-start"]}
      >
        <Box
          mb={["30px", "30px", "30px", "30px", "5vh"]}
          float="left"
          minW={["35%", "35%", "25%", "25%", "17%"]}
          minH={["35%", "35%", "25%", "25%", "17%"]}
          height={["35%", "35%", "25%", "25%", "17%"]}
          width={["35%", "35%", "25%", "25%", "17%"]}
        >
          <Image
            alt="mrs-ching"
            width={100}
            height={100}
            style={{ width: "100%", height: "auto" }}
            src={MrsChingImage.src}
          />
        </Box>
        <VStack flex="5" alignItems={"flex-start"}>
          <Box mb="50px">
            <TextBlock withoutDivider title="greetings, fellow capitalists." />
            <Text
              lineHeight={1.1}
              color="brand.900"
              fontWeight={"medium"}
              fontSize={["4.5xl"]}
            >
              The ocean is dead; marine life has been extinguished. We control
              the last remaining fishes on Earth.
            </Text>
            <Text
              color="#4AF8FF"
              mt="10"
              mb="10vh"
              fontWeight={"bold"}
              fontSize={["md", "4xl"]}
            >
              Let&apos;s make some MONEY.
            </Text>
            <Image style={{ width: "100%" }} src={DividerImage} alt="divider" />
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Greetings;
