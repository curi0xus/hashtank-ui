import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { getClient } from '@wagmi/core';
import { getLogs, getBlockNumber } from 'viem/actions';

// TODO: Optimise with The Graph
const client: any = getClient(config);
const useGetRegisteredFish: any = (
  batchId: number,
  fishOwner: `0x${string}`
) => {
  const [registeredFishLogs, setRegisteredFishLogs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function init() {
    try {
      setLoading(true);
      // @ts-ignore
      const currentBlockNumber = await getBlockNumber(client);

      const rawLogsForRegiseredFishInLoveSauceProgramBatch = await getLogs(
        client,
        {
          address: auctionContractConfig.address,
          event: parseAbiItem(
            'event LoveSauceProgramFulfilled(uint256[] fishIds, address indexed fishOwner, uint256 indexed loveSauceProgramBatchId, uint256 distributeAt)'
          ),
          args: {
            loveSauceProgramBatchId: BigInt(batchId),
            fishOwner,
          },
          fromBlock: BigInt(0),
          toBlock: currentBlockNumber,
          strict: true,
        }
      );

      setRegisteredFishLogs(
        rawLogsForRegiseredFishInLoveSauceProgramBatch as []
      );
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoading) init();
  }, []);

  const registrationDetails = registeredFishLogs?.map((each: any) => ({
    fishOwner: each?.args?.fishOwner,
    fishIds: each?.args?.fishIds,
    batchId: each?.args?.loveSauceProgramBatchId?.toString(),
  }));

  return {
    registrationDetails,
    isLoading,
  };
};

export default useGetRegisteredFish;
