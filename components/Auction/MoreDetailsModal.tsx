import React from "react";
import {
  Flex,
  Box,
  Divider,
  HStack,
  VStack,
  Text,
  List,
} from "@chakra-ui/react";
import Image from "next/image";
import PikeImage from "public/static/images/PlentyOfFish/PikeSpace.webp";

function truncateAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(
    address.length - 5,
    address.length
  )}`;
}

const Piece = ({ address, isWinner, time, winningBid }: any) => {
  return (
    <HStack
      m="10px 0"
      w="100%"
      justifyContent={"space-between"}
      alignItems={"flex-start"}
    >
      <VStack>
        <Text m="0" fontWeight={isWinner ? "medium" : "normal"} fontSize="sm">
          {truncateAddress(address)}({isWinner ? "WINNING" : ""} BID)
        </Text>
        <Text
          m="0 !important"
          textAlign={"left"}
          w="100%"
          fontWeight={"normal"}
          fontSize="sm"
        >
          12.JUL.2023 / 20:49
        </Text>
      </VStack>
      <Text fontWeight={isWinner ? "medium" : "normal"} fontSize="sm">
        ⌘ 0.8
      </Text>
    </HStack>
  );
};

const BiddingHistory = () => {
  return (
    <VStack mt="20px !important" w="100%" alignItems="flex-start">
      <Text textTransform={"uppercase"} fontWeight={"bold"} fontSize="md">
        history
      </Text>
      <List w="100%">
        <Piece
          address="0x97ce323a06cD0b7dE9E8b85c096fB69A2BCCd913"
          isWinner={true}
        />
        <Piece address="0x97ce323a06cD0b7dE9E8b85c096fB69A2BCCd913" />
        <Piece address="0x97ce323a06cD0b7dE9E8b85c096fB69A2BCCd913" />
        <Piece address="0x97ce323a06cD0b7dE9E8b85c096fB69A2BCCd913" />
        <Piece address="0x97ce323a06cD0b7dE9E8b85c096fB69A2BCCd913" />
        <Piece address="0x97ce323a06cD0b7dE9E8b85c096fB69A2BCCd913" />
      </List>
    </VStack>
  );
};

const FishAttribute = ({ attributeName, attributeScore }: any) => {
  return (
    <HStack
      p={["5px 0", 0]}
      justifyContent={"space-between"}
      w={["100%", "45%"]}
    >
      <Text fontWeight={"normal"} fontSize={["sm", "md"]}>
        {attributeName}
      </Text>
      <HStack>
        <Box
          h="14px"
          w="14px"
          borderRadius={"100%"}
          border={"1px solid black"}
        ></Box>
        <Box
          h="14px"
          w="14px"
          borderRadius={"100%"}
          border={"1px solid black"}
        ></Box>
        <Box
          h="14px"
          w="14px"
          borderRadius={"100%"}
          border={"1px solid black"}
        ></Box>
        <Box
          h="14px"
          w="14px"
          borderRadius={"100%"}
          border={"1px solid black"}
        ></Box>
        <Box
          h="14px"
          w="14px"
          borderRadius={"100%"}
          border={"none"}
          background="black"
        ></Box>
      </HStack>
    </HStack>
  );
};

const AuctionHistory = () => {
  return (
    <VStack width={["90%"]}>
      <HStack w="100%" justifyContent={"space-between"}>
        <Text
          color={"brand.900"}
          textTransform={"uppercase"}
          fontWeight={"medium"}
          fontSize="2xl"
        >
          crimson tentacled pelican eel
        </Text>

        <div style={{ height: 20, width: 20, background: "red" }}></div>
      </HStack>
      <Divider opacity={1} borderWidth={"1px"} borderColor={"brand.900"} />
      <HStack
        w="100%"
        // display='flex'
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <VStack>
          <Text
            textTransform={"uppercase"}
            fontWeight={"medium"}
            fontSize={["sm", "md"]}
          >
            WINNING BID 0.92 ⌘
          </Text>
          <Text w="100%" fontWeight={"normal"} fontSize="md">
            {"by "}
            <Text
              textDecoration={"underline"}
              as={"span"}
              textTransform={"uppercase"}
              fontWeight={"normal"}
              fontSize={["sm", "md"]}
            >
              0xbf...3118
            </Text>
          </Text>
        </VStack>
        <Text textAlign={"right"} fontWeight={"normal"} fontSize={["sm", "md"]}>
          1.5.2023 / 20:49
        </Text>
      </HStack>
      <Divider opacity={1} borderWidth={"1px"} borderColor={"brand.900"} />
      <Flex
        flexDir={["column", "row"]}
        w="100%"
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        <FishAttribute attributeName="Umami" />
        <FishAttribute attributeName="Radiation" />
        <FishAttribute attributeName="Radiation" />
      </Flex>
      <Divider opacity={1} borderWidth={"1px"} borderColor={"brand.900"} />
      <BiddingHistory />
    </VStack>
  );
};

const MoreDetailsModal = () => {
  return (
    <VStack color="brand.800" justifyContent={"center"}>
      <Box height={[250, 300]} width={[250, 300]}>
        <Image
          style={{ margin: "auto", width: "100%", height: "auto" }}
          src={PikeImage}
          alt="More details fish"
        />
      </Box>

      <AuctionHistory />
    </VStack>
  );
};

export default MoreDetailsModal;
