import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useReadContract, useWriteContract } from 'wagmi';

const useCreateNewAuctionBatch = () => {
  const { data: currentAuctionBatch } = useReadContract({
    ...auctionContractConfig,
    functionName: 'batchCounter',
  });

  const {
    data: createAuctionBatchWriteData,
    writeContractAsync,
    error: createAuctionBatchWriteError,
  } = useWriteContract();

  async function createAuctionBatchWriteAsync({
    mindBidInEth,
    batchContent,
    startTime,
    endTime,
    batchPrefix,
    batchName,
    batchDescription,
    fishTypeQty,
  }: any) {
    const createAuctionBatchConfig = {
      ...auctionContractConfig,
      functionName: 'createAuctionBatch',
      args: [
        mindBidInEth,
        batchContent,
        startTime,
        endTime,
        batchName,
        batchPrefix,
        batchDescription,
        fishTypeQty,
      ],
    };
    return writeContractAsync?.(createAuctionBatchConfig);
  }

  return {
    createAuctionBatchWriteAsync,
    currentAuctionBatch,
  };
};

export default useCreateNewAuctionBatch;
