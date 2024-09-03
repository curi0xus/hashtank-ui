import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { getClient } from '@wagmi/core';
import { getLogs, getBlockNumber } from 'viem/actions';

const client = getClient(config);

const useGetTxHashByTokenId: any = (tokenId: any) => {
  const [txHash, setTxHash] = useState<string>('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
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

        setTxHash(rawLogs[0].transactionHash);

        // setLogs(logs as []);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
    if (!txHash) init();
  }, [txHash, tokenId]);

  return {
    txHash,
  };
};

export default useGetTxHashByTokenId;
