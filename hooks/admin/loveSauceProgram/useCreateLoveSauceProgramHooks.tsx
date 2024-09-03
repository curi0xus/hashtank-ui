import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useSimulateContract, useReadContract, useWriteContract } from 'wagmi';

const useCreateLoveSauceProgramHook = (
  startAt: number,
  endAt: number,
  distributedAt: number,
  maxCohortSize: number,
  minCohortSize: number
) => {
  const createLoveSauceProgramBatchConfig = {
    ...auctionContractConfig,
    functionName: 'createLoveSauceProgramBatch',
    args: [
      BigInt(startAt),
      BigInt(endAt),
      BigInt(distributedAt),
      BigInt(minCohortSize),
      BigInt(maxCohortSize),
    ],
  };
  const {
    data: createLoveSauceProgramBatchContractWriteConfig,
    error: createLoveSauceProgramBatchContractWriteConfigError,
    isError: isCreateLoveSauceProgramBatchContractWriteConfigError,
  } = useSimulateContract(createLoveSauceProgramBatchConfig);

  const { data: loveSauceProgramBatch } = useReadContract({
    ...auctionContractConfig,
    functionName: 'loveSauceProgramBatches',
    args: [BigInt('1')],
  });

  const {
    data: createLoveSauceProgramBatchWriteData,
    writeContractAsync,
    error: createLoveSauceProgramBatchWriteError,
  } = useWriteContract();

  async function createLoveSauceProgramBatchWriteAsync() {
    return writeContractAsync?.(createLoveSauceProgramBatchConfig);
  }

  return {
    createLoveSauceProgramBatchWriteAsync,
    loveSauceProgramBatch,
  };
};

export default useCreateLoveSauceProgramHook;
