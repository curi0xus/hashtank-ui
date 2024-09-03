import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useReadContract } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

const useGetBroodFish: any = () => {
  const { user } = usePrivy();
  const address = user?.wallet?.address || '';
  const {
    data: broodFish,
    isLoading,
    refetch: refetchBroodFish,
  } = useReadContract({
    ...auctionContractConfig,
    functionName: 'getBroodFish',
    args: [address],
  });

  const broodfishIds =
    broodFish
      // @ts-ignore
      ?.map((each: bigint) => Number(each))
      ?.filter((each: number) => each > 0) || [];

  return {
    refetchBroodFish,
    broodfishIds,
    isLoading,
  };
};

export default useGetBroodFish;
