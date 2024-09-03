import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { getClient } from '@wagmi/core';
import { getLogs, getBlockNumber } from 'viem/actions';
import useHashTankAccount from '@/hooks/useHashtankAccount';

// TODO: Optimise with The Graph
const client: any = getClient(config);

const useGetMintedOffsprings: any = (batchId: string) => {
  const { address } = useHashTankAccount();
  const [isLoading, setLoading] = useState(false);
  const [mintedOffsprings, setMintedOffsprings] = useState<any>([]);

  async function init() {
    try {
      setLoading(true);
      // @ts-ignore
      const currentBlockNumber = await getBlockNumber(client);

      const rawLogsForFishRemovedFromLoveSauceProgram = await getLogs(client, {
        address: auctionContractConfig.address,
        event: parseAbiItem(
          'event MintOffSprings(uint256[] tokenIds, address indexed winner, uint256[] parentIds, uint256 indexed loveSauceProgramBatchId, uint256[] failedParentIds)'
        ),
        args: {
          // @ts-ignore
          winner: address,
          loveSauceProgramBatchId: BigInt(batchId),
        },
        fromBlock: BigInt(0),
        toBlock: currentBlockNumber,
        strict: true,
      });

      const mintedOffspringsFromLogs: any =
        rawLogsForFishRemovedFromLoveSauceProgram?.map(
          (each: any) => each?.args?.tokenIds
        );

      const mintedOffspringIdsString = mintedOffspringsFromLogs[0].map(
        (each: bigint) => each.toString()
      );

      setMintedOffsprings(mintedOffspringIdsString);

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoading) init();
  }, []);

  return {
    mintedOffsprings,
    isLoading,
  };
};

export default useGetMintedOffsprings;
