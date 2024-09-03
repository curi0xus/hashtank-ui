// event FishAwarded(uint256 batchId, uint256 indexed tokenId, address indexed bidder, uint256 bid)

import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { formatEther } from 'viem';
import { getClient } from '@wagmi/core';
import { getLogs, getBlock, getBlockNumber } from 'viem/actions';

const client = getClient(config);

const useGetTotalBidByTokenIDs: any = (tokenIds: any) => {
  const [logs, setLogs] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);
  const [totalBidEthString, setTotalBidEthString] = useState('0');
  const [totalBidBigIntNum, setTotalBidBigIntNum] = useState(0);

  async function init() {
    try {
      setLoading(true);
      // @ts-ignore
      const currentBlockNumber = await getBlockNumber(client);

      let totalBid = 0;

      for (let i = 0; i < tokenIds.length; i++) {
        // @ts-ignore
        const rawLogs = await getLogs(client, {
          address: auctionContractConfig.address,
          event: parseAbiItem(
            'event FishAwarded(uint256 batchId, uint256 indexed tokenId, address indexed bidder, uint256 bid, uint256 batchFishIndex)'
          ),
          args: {
            tokenId: BigInt(tokenIds[i]),
          },
          fromBlock: BigInt(0),
          toBlock: currentBlockNumber,
          strict: true,
        });

        const logs = await Promise.all(
          rawLogs.map(async (each: any) => {
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

        totalBid += Number(logs?.[0]?.args?.bid);
        setTotalBidBigIntNum(totalBid);
      }
      setTotalBidEthString(formatEther(BigInt(totalBid)));
      // setLogs(logs as []);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!logs.length) init();
  }, []);

  return {
    totalBidEthString,
  };
};

export default useGetTotalBidByTokenIDs;
