import { formatEther, parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { getClient } from '@wagmi/core';
import { getLogs, getBlock } from 'viem/actions';
import { useQueries } from '@tanstack/react-query';
import { useBlockNumber } from 'wagmi';

async function getBid(nftId: string, currentBlockNumber: bigint | undefined) {
  try {
    const rawLogs = await getLogs(client, {
      address: auctionContractConfig.address,
      event: parseAbiItem(
        'event FishAwarded(uint256 batchId, uint256 indexed tokenId, address indexed bidder, uint256 bid, uint256 batchFishIndex)'
      ),
      args: {
        tokenId: BigInt(nftId),
      },
      fromBlock: BigInt(0),
      toBlock: currentBlockNumber,
      strict: true,
    });

    const log = rawLogs?.[0];
    if (log) {
      // @ts-ignore
      const address = log.args.bidder;
      // @ts-ignore
      const bid = log.args.bid;
      const block = await getBlock(client, {
        blockNumber: log.blockNumber,
      });
      const ts = block.timestamp;
      return {
        address,
        action: `⌘ ${formatEther(bid)}`,
        ts: Number(ts),
        type: 'WINNING BID',
      };
    }
  } catch (e: any) {
    console.log('ERROR', e);
  }
}

async function getBreed(nftId: string, currentBlockNumber: bigint | undefined) {
  try {
    const rawLogs = await getLogs(client, {
      address: auctionContractConfig.address,
      event: parseAbiItem(
        'event RegisterFishInLoveSauceProgram(uint256 indexed fishId, address indexed fishOwner, uint256 indexed loveSauceProgramBatchId)'
      ),
      args: {
        fishId: BigInt(nftId),
      },
      fromBlock: BigInt(0),
      toBlock: currentBlockNumber,
      strict: true,
    });

    const removedFromLoveSauceProgramLogs = await getLogs(client, {
      address: auctionContractConfig.address,
      event: parseAbiItem(
        'event RemovedFromLoveSauceProgram(uint256 indexed parentFishID, address indexed winner, uint256 indexed loveSauceProgramBatchId)'
      ),
      args: {
        parentFishID: BigInt(nftId),
      },
      fromBlock: BigInt(0),
      toBlock: currentBlockNumber,
      strict: true,
    });

    const log = rawLogs?.[0];
    const removedLog = removedFromLoveSauceProgramLogs?.[0];
    if (log || removedLog) {
      // @ts-ignore
      const address = log.args.fishOwner;

      const block = await getBlock(client, {
        blockNumber: log.blockNumber,
      });
      const ts = block.timestamp;

      return {
        breeding: {
          address,
          ts: Number(ts),
          action: removedFromLoveSauceProgramLogs[0] ? 'closed' : 'active',
          type: 'SENT TO BREEDING',
        },
        removedFromBreeding: removedLog
          ? {
              // @ts-ignore
              address: removedLog.args.winner,
              ts: Number(
                await getBlock(client, {
                  blockNumber: removedLog.blockNumber,
                })
              ),
              action: 'closed',
              type: 'BREEDING COMPLETED',
            }
          : undefined,
      };
    }
  } catch (e: any) {
    console.log('ERROR', e);
  }
}

const client: any = getClient(config);
const useGetUserActions: any = (nftId: string) => {
  const { data: currentBlockNumber } = useBlockNumber();

  const results = useQueries({
    // @ts-ignore
    queries: currentBlockNumber
      ? [
          {
            queryKey: ['getBid'],
            queryFn: () => getBid(nftId, currentBlockNumber),
          },
          {
            queryKey: ['getBreed'],
            queryFn: () => getBreed(nftId, currentBlockNumber),
          },
        ]
      : [],
  });

  let historyResults: any[] = [];
  // @ts-ignore
  const bidData = results?.[0]?.data;
  // @ts-ignore
  const breedingData = results?.[1]?.data?.breeding;
  // @ts-ignore
  const bredData = results?.[1]?.data?.removedFromBreeding;

  if (bidData) {
    historyResults.push(bidData);
  }

  if (breedingData) {
    historyResults.push(breedingData);
  }

  if (bredData) {
    historyResults.push(bredData);
  }
  return {
    historyResults,
  };
};

export default useGetUserActions;
