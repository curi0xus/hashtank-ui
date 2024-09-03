import React from "react";
import { Box, Flex, VStack, Avatar } from "@chakra-ui/react";
import TextBlock from "../General/Shared/TextBlock";
import MrsChingImage from "public/static/images/SauceFactory/mrs-ching.webp";

const TEXTBLOCK_1_PARAGRAPHS = [
  "Welcome to the sauce factory, where your fish can be turned into the culinary liquid gold that is fish sauce. Sauce comes in 3 grades - Standard, Premium, and Artisanal, with each escalating in difficulty to procure and sell price. Your fish's attributes will affect the sauce's quality and grade, so mix and match to your heart's content to try and vie for that primo Artisanal label.",
  // "Mint your fish into a sauce NFT and redeem it into a physical bottle if you so chooses. Join the dark side, who needs fish when you can have money?",
  "There is always a potential for your sauce to spoil during fermentation, so choose your fish wisely!",
];
const TEXTBLOCK_2_PARAGRAPHS = [
  "1. Deposit your fish into the Saucing Pen",
  "2. The collective size of the Pen must be 100 or above, with a maximum of 5 fish allowed",
  "3. Sauce the fish and approve the transactions",
  "4. Check in on your fermenting sauce in the Supermarket to see if it's done (can take up to 12 hrs)",
  "5. Once done, you can keep the sauce for physical redemption or sell it back to the Supermarket for a potential profit",
];

const LoveSauceProgramIntroduction = () => {
  return (
    <Box
      p={[
        "0vh 7vw",
        "0vh 15vw",
        "0vh 15vw",
        "0vh 15vw 20vw 15vw",
        "0vh 16vw 20vw 16vw",
      ]}
    >
      <Flex
        flexDirection={["column", "row"]}
        alignItems={["center", "flex-start"]}
      >
        <Flex
          mt={["0", "10px", "10px", "10px", "10px"]}
          mr={["0", "48px", "48px", "48px", "48px"]}
          mb={["30px", 0]}
          flex={["1", "1"]}
        >
          <Avatar
            transformOrigin={"top right"}
            transform={["scale(1)", "scale(1.3)"]}
            src={MrsChingImage.src}
            m={["0px auto", "30px auto"]}
            minW={["100%", "100%"]}
            minH={["100%", "100%"]}
            height={["100%", "100%"]}
            width={["100%", "100%"]}
          />
        </Flex>
        <VStack flex="5" alignItems={"flex-start"}>
          <Box mb="50px">
            <TextBlock
              title="welcome, fellow capitalists."
              paragraphs={TEXTBLOCK_1_PARAGRAPHS}
            />
          </Box>
          <Box>
            <TextBlock
              title="how it works"
              paragraphs={TEXTBLOCK_2_PARAGRAPHS}
            />
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default LoveSauceProgramIntroduction;
