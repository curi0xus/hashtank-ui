import { useReadContract } from 'wagmi';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { usePrivy } from '@privy-io/react-auth';
import { formatEther } from 'viem';

const useGetWithdrawAmount = () => {
  const { user } = usePrivy();
  const address = user?.wallet?.address;

  const { data, refetch } = useReadContract({
    ...auctionContractConfig,
    functionName: 'getTotalWithdawableAmount',
    args: [address],
  });

  const totalWithdrawableInBigInt: bigint =
    (data as bigint | undefined) || BigInt(0);

  const totalWithdawableAmount = formatEther(totalWithdrawableInBigInt);

  return {
    totalWithdawableAmount,
    refetch,
  };
};

export default useGetWithdrawAmount;
