import { useState, useEffect } from 'react';

const useGetHighestBidByFishInBatch = (
  batchId: string,
  fishId: string,
  auctionId: string
) => {
  const [highestBidBigInt, setHighestBidBigInt] = useState<bigint | null>(null);
  const [currentHighestBidBigInt, setCurrentHighestBidBigInt] = useState<
    bigint | null
  >(null);
  const [winnerAddress, setWinnerAddress] = useState<string | null>(null);
  const [allBids, setAllBids] = useState<any[]>([]);

  useEffect(() => {
    const fetchHighestBid = async () => {
      try {
        const response = await fetch(
          `/api/bids/${batchId}?auctionId=${auctionId}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        const sortedBids = data.sort(
          (a: { bid_amount: number }, b: { bid_amount: number }) =>
            b.bid_amount - a.bid_amount
        );
        setAllBids(sortedBids);

        // Find the highest bid for the given fishId
        const fishBids = data.filter((bid: any) => bid.fish_id === batchId);
        const highestBid = fishBids.reduce(
          (maxBid: { bid_amount: number }, bid: { bid_amount: number }) =>
            bid.bid_amount > maxBid.bid_amount ? bid : maxBid,
          fishBids[0]
        );

        console.log('Fetched highest bid:', highestBid);

        if (highestBid) {
          setHighestBidBigInt(BigInt(highestBid.bid_amount));
          setWinnerAddress(highestBid.user_id);
          setCurrentHighestBidBigInt(BigInt(highestBid.bid_amount)); // Example update
        } else {
          setHighestBidBigInt(null);
          setWinnerAddress(null);
          setCurrentHighestBidBigInt(null);
        }
      } catch (error) {
        console.error('Failed to fetch highest bid:', error);
      }
    };

    // fetchHighestBid();
  }, [batchId, fishId]);

  return {
    highestBidBigInt,
    currentHighestBidBigInt,
    winnerAddress,
    allBids, // Return all bids
  };
};

export default useGetHighestBidByFishInBatch;
