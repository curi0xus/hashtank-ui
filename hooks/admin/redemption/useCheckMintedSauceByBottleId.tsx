import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import sauceContractConfig from '@/contracts/config/sauceNFT';
import { getClient } from '@wagmi/core';
import { getLogs, getBlockNumber } from 'viem/actions';

// TODO: Optimise with The Graph
const client: any = getClient(config);
const useCheckMintedSauceByBottledId: any = (bottleId: number) => {
  const [isSauceMinted, setIsSauceMinted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  async function init() {
    try {
      setLoading(true);
      // @ts-ignore
      const currentBlockNumber = await getBlockNumber(client);
      // @ts-ignore
      const rawLogsForMintedSauce = await getLogs(client, {
        address: sauceContractConfig.address,
        event: parseAbiItem(
          'event SauceMinted(uint256 indexed sauceId, address indexed owner, uint256 indexed bottleId)'
        ),
        args: {
          bottleId: BigInt(bottleId),
        },
        fromBlock: BigInt(0),
        toBlock: currentBlockNumber,
        strict: true,
      });

      setIsSauceMinted(rawLogsForMintedSauce.length > 0);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoading) init();
  }, []);

  return {
    isSauceMinted,
    isLoading,
  };
};

export default useCheckMintedSauceByBottledId;
