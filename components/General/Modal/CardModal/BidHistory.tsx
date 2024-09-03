import React from "react";
import { HStack, VStack, Text, List } from "@chakra-ui/react";
import truncateAddress from "@/util/truncateAddress";
import useGetBidEventLogs from "@/hooks/useGetBidEventLogs";
import useAuctionDetails from "@/hooks/useAuctionDetails";
import { formatEther } from "viem";
import { fromUnixTime, format } from "date-fns";
import useGetUserActions from "@/hooks/useGetUserActions";
import useGetHighestBidByFishInBatch from "@/hooks/useGetHighestBidByFishInBatch";
import useFetchBidHistory from "@/new-hooks/auction/useFetchBidHistory";

const Piece = ({ address, isWinner, time, winningBid }: any) => {
  const readableBid: string = winningBid;
  const humanReadableBidDate = format(
    fromUnixTime(Number(time.toString())),
    "d.MMM.yyyy"
  );
  const humanReadableBidTime = format(
    fromUnixTime(Number(time.toString())),
    "HH:mm"
  );
  return (
    <HStack
      m="10px 0"
      w="100%"
      justifyContent={"space-between"}
      alignItems={"flex-start"}
    >
      <VStack>
        <Text m="0" fontWeight={isWinner ? "medium" : "normal"} fontSize="sm">
          {truncateAddress(address)}({isWinner ? "WINNING " : ""}BID)
        </Text>
        <Text
          m="0 !important"
          textAlign={"left"}
          w="100%"
          fontWeight={"normal"}
          fontSize="sm"
        >
          {humanReadableBidDate} / {humanReadableBidTime}
        </Text>
      </VStack>
      <Text fontWeight={isWinner ? "medium" : "normal"} fontSize="sm">
        ⌘ {readableBid}
      </Text>
    </HStack>
  );
};

const Action = ({ action, ts, address, type }: any) => {
  const humanReadableBidDate = format(
    fromUnixTime(Number(ts.toString())),
    "d.MMM.yyyy"
  );
  const humanReadableBidTime = format(
    fromUnixTime(Number(ts.toString())),
    "HH:mm"
  );
  return (
    <HStack
      m="10px 0"
      w="100%"
      justifyContent={"space-between"}
      alignItems={"flex-start"}
    >
      <VStack>
        <Text m="0" fontWeight={"medium"} fontSize="sm">
          {truncateAddress(address)}({type})
        </Text>
        <Text
          m="0 !important"
          textAlign={"left"}
          w="100%"
          fontWeight={"normal"}
          fontSize="sm"
        >
          {humanReadableBidDate} / {humanReadableBidTime}
        </Text>
      </VStack>
      <Text fontWeight={"medium"} fontSize="sm">
        {action}
      </Text>
    </HStack>
  );
};

const UserActions = ({ nftId }: any) => {
  const { historyResults } = useGetUserActions(nftId);
  return (
    <>
      {historyResults
        .sort((each: any) => each.ts)
        .map((each: any) => (
          <Action key={each.type} {...each} />
        ))}
    </>
  );
};

const BiddingHistory = ({ auctionId, fishId, hasNoPadding, nftId }: any) => {
  const { data } = useFetchBidHistory(auctionId, fishId);
  const bidHistory = data?.history || [];

  return nftId ? (
    <UserActions nftId={nftId} />
  ) : (
    <VStack
      pb={hasNoPadding ? 0 : "100px"}
      mt="20px !important"
      w="100%"
      alignItems="flex-start"
    >
      <Text textTransform={"uppercase"} fontWeight={"bold"} fontSize="md">
        history
      </Text>

      {bidHistory && (
        <List w="100%">
          {bidHistory.map((bid: any, i: number) => (
            <Piece
              key={bid.id} // Use bid.id as the key for better uniqueness
              address={bid.user_id}
              time={new Date(bid.created_at).getTime() / 1000} // Convert to Unix timestamp
              winningBid={bid.bid_amount}
            />
          ))}
        </List>
      )}
    </VStack>
  );
};

export default BiddingHistory;
