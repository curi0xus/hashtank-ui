import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import sauceContractConfig from '@/contracts/config/sauceNFT';
import { getClient } from '@wagmi/core';
import { getLogs, getBlock, getBlockNumber } from 'viem/actions';
import useHashTankAccount from '../useHashtankAccount';
import { usePrivy } from '@privy-io/react-auth';

const client: any = getClient(config);
// TODO: Optimise with The Graph

const useGetOwnersBottles: any = () => {
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const [logs, setLogs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function init() {
    if (address) {
      try {
        setLoading(true);
        // @ts-ignore
        const currentBlockNumber = await getBlockNumber(client);
        // @ts-ignore
        const rawLogsForBottlesDropped = await getLogs(client, {
          address: sauceContractConfig.address,
          event: parseAbiItem(
            'event BottleDropped(uint256 tokenId, address indexed winner, string bottleUri, uint256 indexed originalTokenId)'
          ),
          args: {
            // @ts-ignore
            winner: address,
          },
          fromBlock: BigInt(0),
          toBlock: currentBlockNumber,
          strict: true,
        });

        const logs = await Promise.all(
          rawLogsForBottlesDropped.map(async (each: any) => {
            // @ts-ignore
            const block = await getBlock(client, {
              blockNumber: each.blockNumber,
            });
            return {
              ...each,
              ts: block.timestamp,
            };
          })
        );

        setLogs(logs as []);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (!isLoading && address) init();
  }, [address]);

  const ownedBottleIds = logs?.map((log: any) => {
    const nftIdBigInt: bigint = log?.args?.tokenId;
    return Number(nftIdBigInt);
  });

  return {
    ownedBottleIds,
    logs,
    isLoading,
  };
};

export default useGetOwnersBottles;
