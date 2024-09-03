import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useReadContract } from 'wagmi';

const useRevealedFishes = (batchId: string) => {
  // batchMintedTokens
  const { data: revealedFishes, error: revealedFishesError } = useReadContract({
    ...auctionContractConfig,
    functionName: 'getBatchRevealedFishes',
    args: [BigInt(batchId)],
    query: {
      cacheTime: 15000,
      staleTime: 3000,
    },
  });

  return {
    revealedFishes,
  };
};

export default useRevealedFishes;
