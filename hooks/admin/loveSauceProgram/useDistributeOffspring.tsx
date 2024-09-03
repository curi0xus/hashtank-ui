import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useSimulateContract, useWriteContract } from 'wagmi';

const useDistributeOffspring = (
  fishOwner: `0x${string}`,
  offspringDataUrls: any,
  buyBackPrices: any,
  batchId: string,
  parentFishIds: any,
  failedParentIds: any
) => {
  const distributeOffspringConfig = {
    ...auctionContractConfig,
    functionName: 'mintOffSprings',
    args: [
      fishOwner,
      offspringDataUrls,
      buyBackPrices.map((each: number) => BigInt(each)),
      BigInt(batchId),
      parentFishIds.map((each: string) => BigInt(each)),
      failedParentIds.map((each: string) => BigInt(each)),
    ],
  };
  const {
    data: distributeOffspringContractWriteConfig,
    error: distributeOffspringContractWriteConfigError,
    isError: isdistributeOffspringContractWriteConfigError,
  } = useSimulateContract(distributeOffspringConfig);

  const {
    data: distributeOffspringWriteData,
    writeContractAsync,
    error: distributeOffspringWriteError,
  } = useWriteContract();

  async function distributeOffspringWriteAsync() {
    return writeContractAsync?.(distributeOffspringConfig);
  }

  return {
    distributeOffspringWriteAsync,
  };
};

export default useDistributeOffspring;
