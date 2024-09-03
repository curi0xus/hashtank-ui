import React from "react";
import {
  Card,
  CardBody,
  Stack,
  Box,
  Text,
  Divider,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import HashtankTooltip from "@/components/General/Tooltip";
import BellImage from "public/static/images/General/Tooltip/Bell.webp";
import truncateAddress from "@/util/truncateAddress";
import useFetchBidHistory from "@/new-hooks/auction/useFetchBidHistory";
import useFetchLatestAuctionDetails from "@/new-hooks/auction/useFetchLatestAuctionDetails";

const Trigger = ({
  onClick,
  serialNumber,
  fishId,
  fishName,
  batchFishIndex,
  hiddenFishImage,
  currentBatchId,
  ...props
}: any) => {
  const [isNotMobile] = useMediaQuery("(min-width: 480px)", {
    ssr: true,
    fallback: false,
  });
  const { auctionId } = useFetchLatestAuctionDetails((data: any) => {
    return {
      auctionId: data.auctionId,
    };
  });

  const { data: highestBid } = useFetchBidHistory(
    auctionId,
    fishId,
    (data: any) => data.highestBid
  );

  return (
    <Card
      cursor={"pointer"}
      onClick={onClick}
      {...props}
      h="fit-content"
      m="25px 0"
      w={["45%", "45%", "30%", "30%", "22%"]}
      color="white"
      background="none"
      shadow={"none"}
      maxW="sm"
    >
      <HashtankTooltip
        auctionTrigger={false}
        storageKey="place-your-bids"
        placement="bottom-end"
        key={batchFishIndex}
        Icon={BellImage}
        title="PLACE YOUR BIDS"
        Instruction={() => (
          <>
            Click on the fishes to place your bids, their identity will only be
            revealed once the timer for the batch counted down to zero.
          </>
        )}
        Trigger={() => (
          <CardBody p={0} flex="none">
            <Box borderRadius={"20px"} background="brand.700">
              <Image
                style={{ margin: "auto", width: "100%", height: "auto" }}
                width={100}
                height={100}
                src={hiddenFishImage}
                alt="Green double couch with wooden legs"
              />
            </Box>

            <Stack mt="6" spacing="0">
              <Text fontWeight={"normal"} fontSize={["xs", "sm"]}>
                #{serialNumber}
              </Text>
              <Text
                maxW={["100%", "70%"]}
                mb="25px"
                mt={["0px !important", "0px !important"]}
                textTransform={"uppercase"}
                fontWeight={"normal"}
                fontSize={["md", "xl"]}
              >
                {fishName}
              </Text>
              <Divider
                opacity={1}
                borderBottomWidth={2}
                borderColor={"brand.900"}
              />

              <Flex
                p={["3px 0", "10px 0 0 0"]}
                flexDirection={["column", "row"]}
                justifyContent="space-between"
              >
                <Text
                  mb="10px"
                  textAlign={["left", "left"]}
                  fontWeight={"normal"}
                  textTransform={"lowercase"}
                  fontSize={["sm", "md"]}
                >
                  current
                  <br />
                  <Text
                    visibility={"hidden"}
                    textDecoration={"underline"}
                    as={"span"}
                    textTransform={"uppercase"}
                    fontWeight={"normal"}
                    fontSize={["sm", "sm"]}
                  >
                    {/* {winnerAddress && truncateAddress(winnerAddress)} */}
                  </Text>
                </Text>
                {highestBid && (
                  <Text
                    textAlign={["right", "left"]}
                    fontWeight={"normal"}
                    fontSize={["md", "md"]}
                  >
                    ⌘ {highestBid || 0}
                  </Text>
                )}
              </Flex>
              <Divider
                opacity={1}
                borderBottomWidth={2}
                borderColor={"brand.900"}
              />
              {isNotMobile && (
                <Text
                  textTransform={"uppercase"}
                  mt="10px"
                  w="100%"
                  textAlign={"right"}
                  {...props}
                  cursor={"pointer"}
                  textUnderlineOffset={3}
                  decoration={"underline"}
                  fontWeight={"normal"}
                  fontSize={["s", "m"]}
                >
                  bid now! {">"}
                </Text>
              )}
            </Stack>
          </CardBody>
        )}
      />
    </Card>
  );
};
export default Trigger;
