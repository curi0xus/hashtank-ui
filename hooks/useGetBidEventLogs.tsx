import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { getClient } from '@wagmi/core';
import { getLogs, getBlock, getBlockNumber } from 'viem/actions';

const client: any = getClient(config);
const useGetBidEventLogs: any = (batchFishIndex: number, batchId: string) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function init() {
    try {
      setLoading(true);
      const currentBlockNumber = await getBlockNumber(client);
      const rawLogs = await getLogs(client, {
        address: auctionContractConfig.address,
        event: parseAbiItem(
          'event BidCreated(uint256 indexed batchId, uint256 indexed fishBatchNumber, address indexed bidder, uint256 bid)'
        ),
        args: {
          // because smart contract returns number not index
          fishBatchNumber: BigInt(batchFishIndex) + BigInt(1),
          batchId: BigInt(batchId),
        },
        fromBlock: BigInt(0),
        toBlock: currentBlockNumber,
        strict: true,
      });

      const logs = await Promise.all(
        rawLogs.map(async (each: any) => {
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

  useEffect(() => {
    if (!logs.length) init();
  }, []);

  return {
    logs,
    isLoading,
  };
};

export default useGetBidEventLogs;
