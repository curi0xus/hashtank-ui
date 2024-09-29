import React from "react";
import { Box, Text } from "@chakra-ui/react";
import HashtankTooltip from "../General/Tooltip";
import ComingSoonImage from "public/static/images/General/Tooltip/ComingSoon.webp";
import FishAnimation from "./SwimmingFish";
import SwimmingFish from "./SwimmingFish";

const AquariumName = () => {
  return (
    <Box
      position="relative"
      height={["175vmin", "60vw", "80vw", "60vw", "60vw"]}
    >
      <HashtankTooltip
        storageKey="aquarium-coming-soon"
        defaultIsOpen
        Icon={ComingSoonImage}
        placement="auto"
        offset={[-300, 350]}
        title="COMING SOON"
        Instruction={() => (
          <>
            You will be able to nurture your fishes here in a customizable
            aquarium.
          </>
        )}
        Trigger={() => (
          <Text
            display={["none", "block"]}
            width="fit-content"
            position="absolute"
            top={["18vw", "16vw", "18vw", "18vw", "18vw", "15vw"]}
            left={["15vw", "15vw", "15vw", "15vw", "15vw", "23vw"]}
            textTransform={"uppercase"}
            color="brand.900"
            fontWeight={"bold"}
            fontSize={["xl", "2xl", "3xl", "4xl", "5xl"]}
          ></Text>
        )}
      />
      <SwimmingFish />
    </Box>
  );
};

export default AquariumName;
