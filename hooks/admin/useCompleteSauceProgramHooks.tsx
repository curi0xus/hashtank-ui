import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useSimulateContract, useWriteContract, useReadContract } from 'wagmi';

const useCompleteLoveSauceProgramHooks = () => {
  const completeLoveSauceProgramConfig = {
    ...auctionContractConfig,
    functionName: 'distributeOffsprings',
  };
  const {
    data: completeLoveSauceProgramBatchContractWriteConfig,
    error: completeLoveSauceProgramBatchContractWriteConfigError,
    isError: iscompleteLoveSauceProgramBatchContractWriteConfigError,
  } = useSimulateContract(completeLoveSauceProgramConfig);

  const {
    data: completeLoveSauceProgramBatchWriteData,
    writeContractAsync,
    error: completeLoveSauceProgramBatchWriteError,
  } = useWriteContract();

  const { data: loveSauceProgramBatch } = useReadContract({
    ...auctionContractConfig,
    functionName: 'loveSauceProgramBatches',
    args: [BigInt('1')],
  });

  const { data: programParticipants } = useReadContract({
    ...auctionContractConfig,
    functionName: 'getLoveSauceProgramParticipants',
    args: [BigInt('1')],
  });

  async function completeLoveSauceProgramBatchWriteAsync() {
    return writeContractAsync?.(completeLoveSauceProgramConfig);
  }

  return {
    completeLoveSauceProgramBatchWriteAsync,
    loveSauceProgramBatch,
    programParticipants,
  };
};

export default useCompleteLoveSauceProgramHooks;
