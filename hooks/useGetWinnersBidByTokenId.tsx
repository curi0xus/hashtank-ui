// event FishAwarded(uint256 batchId, uint256 indexed tokenId, address indexed bidder, uint256 bid)

import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { formatEther } from 'viem';
import { fromUnixTime, format } from 'date-fns';
import { getClient } from '@wagmi/core';
import { getLogs, getBlock, getBlockNumber } from 'viem/actions';

const client = getClient(config);

const useGetWinnersBidByTokenId: any = (tokenId: string) => {
  const [logs, setLogs] = useState<any>([]);
  const [isLoading, setLoading] = useState(false);

  async function init() {
    try {
      setLoading(true);
      // @ts-ignore
      const currentBlockNumber = await getBlockNumber(client);
      // @ts-ignore
      const rawLogs = await getLogs(client, {
        address: auctionContractConfig.address,
        event: parseAbiItem(
          'event FishAwarded(uint256 batchId, uint256 indexed tokenId, address indexed bidder, uint256 bid, uint256 batchFishIndex)'
        ),
        args: {
          tokenId: BigInt(tokenId),
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
      setLogs(logs as []);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!logs.length) init();
  }, []);

  const bidBigIntString = logs?.[0]?.args?.bid?.toString() || '0';
  const bidInEtherString = formatEther(bidBigIntString);
  const bidder = logs?.[0]?.args?.bidder || '';
  const ts = logs?.[0]?.ts || 0;
  const humanReadableBidDate = format(
    fromUnixTime(Number(ts.toString())),
    'd.MM.yyyy'
  );
  const humanReadableBidTime = format(
    fromUnixTime(Number(ts.toString())),
    'HH:mm'
  );
  const batchFishIndex = Number(
    logs?.[0]?.args?.batchFishIndex?.toString() || 0
  );

  return {
    bidInEtherString,
    bidder,
    isLoading,
    humanReadableBidDate,
    humanReadableBidTime,
    batchFishIndex,
  };
};

export default useGetWinnersBidByTokenId;
