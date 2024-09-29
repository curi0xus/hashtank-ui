import React from "react";
import { Box } from "@chakra-ui/react";
import EmptyBottleImg from "public/static/images/Aquarium/ColdStorage/EmptyBottle.webp";
import ReallyEmptyBottleImg from "public/static/images/Aquarium/ColdStorage/ReallyEmptyBottle.webp";
import BlueTee from "public/static/images/Aquarium/ColdStorage/BlueTee.webp";
import PlainWhiteTee from "public/static/images/Aquarium/ColdStorage/PlainWhiteTee.webp";
import FilterLayout from "@/components/General/Filter";
import EmptyBottleDetails from "@/components/General/Modal/Variants/ColdStorage/EmptyBottleDetails";
import RedeemGoods from "@/components/General/Modal/Variants/ColdStorage/RedeemGoods";
import useGetOwnersBottles from "@/hooks/RedemptionCenter/useGetOwnersBottles";
import useFetchUsersDrops from "@/new-hooks/drops/useFetchUsersDrops";
import useHashTankAccount from "@/hooks/useHashtankAccount";

const SORT_FILTERS = [["name", "name 2", "name 3"]];

const FILTER_OPTIONS = [["mutation", "mutation 2", "mutation 3"]];

const ColdStorage = () => {
  const { address } = useHashTankAccount();
  const { data: usersDrops } = useFetchUsersDrops(address);
  return (
    <Box
      mt={["0vh", "10vh", "", "", "0"]}
      // gap='0'
      // flexWrap={'wrap'}
      p={["0 7vw 0 7vw", "10vh 11vw 0vh 11.2vw"]}
    >
      <FilterLayout
        title="cold storage"
        sortFilters={SORT_FILTERS}
        filters={FILTER_OPTIONS}
        items={() => (
          <>
            {usersDrops?.map((drop: any) => (
              <EmptyBottleDetails
                metadataUrl={drop.metadata_url}
                key={drop.id}
              />
            ))}
            {/* TODO: Merch Drops */}
            {/*  <RedeemGoods key={item.id} {...item} /> */}
          </>
        )}
      />
    </Box>
  );
};

export default ColdStorage;
