import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useSimulateContract, useWriteContract } from 'wagmi';

const useCloseBatch = (batchId: number) => {
  const closeBatchConfig = {
    ...auctionContractConfig,
    functionName: 'closeLoveSauceProgram',
    args: [BigInt(batchId)],
  };
  const {
    data: closeBatchContractWriteConfig,
    error: closeBatchContractWriteConfigError,
    isError: isCloseBatchContractWriteConfigError,
  } = useSimulateContract(closeBatchConfig);

  const {
    data: closeBatchWriteData,
    writeContractAsync,
    error: closeBatchWriteError,
  } = useWriteContract();

  async function closeBatchWriteAsync() {
    return writeContractAsync?.(closeBatchConfig);
  }

  return {
    closeBatchWriteAsync,
  };
};

export default useCloseBatch;
