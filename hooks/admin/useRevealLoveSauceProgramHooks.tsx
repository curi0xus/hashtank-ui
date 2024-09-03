import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useSimulateContract, useWriteContract, useReadContract } from 'wagmi';

const useRevealLoveSauceProgramHooks = () => {
  const commitLoveSauceProgramConfig = {
    ...auctionContractConfig,
    functionName: 'commitLoveSauceProgramStrains',
    args: ['some random string'],
  };
  const {
    data: commitLoveSauceProgramStrainsWriteConfig,
    error: commitLoveSauceProgramStrainsWriteConfigError,
    isError: isCommitLoveSauceProgramStrainsWriteConfigError,
  } = useSimulateContract(commitLoveSauceProgramConfig);
  const {
    data: commitLoveSauceProgramStrainsWriteData,
    writeContractAsync: commitLoveSauceProgramStrainsWriteContractAsync,
    error: commitLoveSauceProgramStrainsWriteError,
  } = useWriteContract();

  async function commitLoveSauceProgramStrainsWriteAsync() {
    return commitLoveSauceProgramStrainsWriteContractAsync?.(
      commitLoveSauceProgramConfig
    );
  }

  const transfuseConfig = {
    ...auctionContractConfig,
    functionName: 'transfuse',
  };

  const {
    data: transfuseWriteConfig,
    error: transfuseWriteConfigError,
    isError: istransfuseWriteConfigError,
  } = useSimulateContract(transfuseConfig);
  const {
    data: transfuseWriteData,
    writeContractAsync: transfuseWriteContractAsync,
    error: transfuseWriteError,
  } = useWriteContract();

  async function transfuseWriteAsync() {
    return transfuseWriteContractAsync?.(transfuseConfig);
  }

  const { data: transfuctionTimeForLoveSauceBatch } = useReadContract({
    ...auctionContractConfig,
    functionName: 'loveSauceBatchTransfusionTimes',
    args: [BigInt(1)],
  });

  const { data: currentTokenCount } = useReadContract({
    ...auctionContractConfig,
    functionName: 'tokenCounter',
  });

  const { data: loveSauceProgramBatchId } = useReadContract({
    ...auctionContractConfig,
    functionName: 'loveSauceProgramBatchId',
  });

  console.log('love sauce batch program id', transfuctionTimeForLoveSauceBatch);

  return {
    commitLoveSauceProgramStrainsWriteAsync,
    transfuseWriteAsync,
    transfuctionTimeForLoveSauceBatch,
    currentTokenCount,
  };
};

export default useRevealLoveSauceProgramHooks;
