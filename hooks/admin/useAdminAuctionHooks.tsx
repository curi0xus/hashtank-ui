import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useSimulateContract, useWriteContract } from 'wagmi';

const useAdminAuctionHooks = (
  currentBatchId: string,
  winners: string[],
  winnersBids: bigint[],
  fishTypeList: bigint[],
  fishIndexList: bigint[]
) => {
  // function completeAuction(
  //   uint256 batchId,
  //   address[] memory winners,
  //   uint256[] memory fishTypeList,
  //   uint256[] memory winningBids
  // )

  // console.log(winners);
  // console.log(fishTypeList);
  // console.log(winnersBids);

  const completeActionConfig = {
    ...auctionContractConfig,
    functionName: 'completeAuction',
    args: [
      BigInt(currentBatchId),
      winners,
      fishTypeList,
      winnersBids,
      fishIndexList,
    ],
  };

  console.log('COMPELTE AUCTION CONFIG', completeActionConfig);

  const {
    data: completeAuctionContractWriteConfig,
    error: completeAuctionContractWriteConfigError,
    isError: isCompleteAuctionContractWriteConfigError,
  } = useSimulateContract(completeActionConfig);

  console.log('ERROR', completeAuctionContractWriteConfigError);

  const {
    data: completeAuctionWriteData,
    writeContractAsync,
    error: completeAuctionWriteError,
  } = useWriteContract();

  async function completeAuctionWriteAsync() {
    return writeContractAsync?.(completeActionConfig);
  }

  return { completeAuctionWriteAsync };
};

export default useAdminAuctionHooks;
