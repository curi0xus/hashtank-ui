import React from "react";
import { Box } from "@chakra-ui/react";
import EelImage from "public/static/images/Aquarium/Fishery/Eel.webp";
import BreedingEelImage from "public/static/images/Aquarium/Fishery/BreedingEel.webp";
import MutatedEelImage from "public/static/images/Aquarium/Fishery/MutatedEel.webp";
import FilterLayout from "@/components/General/Filter";
import FishCard from "@/components/General/Modal/Variants/FishCard";
import InBreedingProgramFish from "@/components/General/Modal/Variants/ProgramEngagement/InBreedingProgram";

const items = [
  { id: 1, img: MutatedEelImage, isBroodFish: true },
  { id: 1, img: MutatedEelImage, isBroodFish: true, isNew: true },
  { id: 2, img: EelImage, isOffSpring: true, isNew: true },
  { id: 3, img: BreedingEelImage, isBreeding: true },
  { id: 4, img: EelImage, isNew: true },
  { id: 4, img: EelImage },
];

const SORT_FILTERS = [["name", "name 2", "name 3"]];

const FILTER_OPTIONS = [
  ["mutation", "mutation 2", "mutation 3"],
  ["umami", "umami 2", "umami 3"],
  ["fertility", "fertility 2", "fertility 3"],
];

const Nursery = () => {
  return (
    <Box
      mt={["0vh", "10vh", "", "", "0"]}
      // gap='0'
      // flexWrap={'wrap'}
      p={["0 7vw 0 7vw", "10vh 16vw 0vh 16vw"]}
    >
      <FilterLayout
        title="nursery (do we really still need this?, ,the fish in this section does not allow the user to do anything with it. Program engagement will account for the fish in the love sauce program as well as new fish that are minted to the users wallet)"
        sortFilters={SORT_FILTERS}
        filters={FILTER_OPTIONS}
        items={() => (
          <>
            {items.map((item) =>
              item.isBreeding ? (
                <InBreedingProgramFish key={item.id} />
              ) : (
                <FishCard type="love-sauce-program" key={item.id} {...item} />
              )
            )}
          </>
        )}
      />
      {/* {items.map((item) => (
        <AuctionItem key={item.id} />
      ))} */}
    </Box>
  );
};

export default Nursery;
