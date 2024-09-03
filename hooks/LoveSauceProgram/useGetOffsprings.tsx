import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useBlockNumber } from 'wagmi';
import { getClient } from '@wagmi/core';
import { getLogs } from 'viem/actions';
import { useQueries } from '@tanstack/react-query';
import useHashTankAccount from '../useHashtankAccount';

const client: any = getClient(config);

async function getMintOffSpringEventDetails(
  address: `0x${string}` | undefined,
  batchId: number,
  currentBlockNumber: bigint | undefined
) {
  if (address && batchId >= 0 && currentBlockNumber) {
    const rawLogsForFishRemovedFromLoveSauceProgram = await getLogs(client, {
      address: auctionContractConfig.address,
      event: parseAbiItem(
        'event MintOffSprings(uint256[] tokenIds, address indexed winner, uint256[] parentIds, uint256 indexed loveSauceProgramBatchId, uint256[] failedParentIds)'
      ),
      args: {
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

    const mintedOffspringIds = mintedOffspringsFromLogs[0];
    const parentFishIds: any = rawLogsForFishRemovedFromLoveSauceProgram?.map(
      (each: any) => each?.args?.parentIds
    );
    const failedParentFishIds: any =
      rawLogsForFishRemovedFromLoveSauceProgram?.map(
        (each: any) => each?.args?.failedParentIds
      );

    return {
      mintedOffspringIds,
      parentFishIds,
      failedParentFishIds,
    };
  }
}
async function getRawLogsForBurntTokens(
  address: `0x${string}` | undefined,
  currentBlockNumber: bigint | undefined
) {
  if (address && currentBlockNumber) {
    // @ts-ignore
    const rawLogsForBurntTokens = await getLogs(client, {
      address: auctionContractConfig.address,
      event: parseAbiItem(
        'event MintSauceRequest(uint256 indexed bottleId, address indexed owner, string[] fishContent, uint256[] fishIDs)'
      ),
      args: {
        owner: address,
      },
      fromBlock: BigInt(0),
      toBlock: currentBlockNumber,
      strict: true,
    });
    return rawLogsForBurntTokens;
  }
}

const useGetOffsprings: any = (batchId: string) => {
  const { address } = useHashTankAccount();
  const [isLoading, setLoading] = useState(false);
  const { data: currentBlockNumber } = useBlockNumber();
  const results = useQueries({
    // @ts-ignore
    queries:
      address && currentBlockNumber
        ? [
            {
              queryKey: ['getMintOffSpringEventDetails'],
              queryFn: () =>
                getMintOffSpringEventDetails(
                  address as `0x${string}`,
                  Number(batchId),
                  currentBlockNumber
                ),
            },
            {
              queryKey: ['getRawLogsForBurntTokens'],
              queryFn: () =>
                getRawLogsForBurntTokens(
                  address as `0x${string}`,
                  currentBlockNumber
                ),
            },
          ]
        : [],
  });
  // @ts-ignore
  const allMintedOffsprings = results[0]?.data?.mintedOffspringIds || [];
  // @ts-ignore
  const allParentFishIds = results[0]?.data?.parentFishIds || [];
  // @ts-ignore
  const allFailedParentFishIds = results[0]?.data?.failedParentFishIds[0] || [];

  console.log('ALL FAILED PARENT FISH IDs', allFailedParentFishIds);
  // @ts-ignore
  const rawLogsForBurntTokens = results[1]?.data;

  const mintedOffsprings = allMintedOffsprings?.filter(
    (each: any) =>
      !rawLogsForBurntTokens?.find(
        (log: any) => log?.args?.fishIDs.indexOf(each) >= 0
      )
  );
  const parentIds = allParentFishIds?.filter(
    (each: any) =>
      !rawLogsForBurntTokens?.find(
        (log: any) => log?.args?.fishIDs.indexOf(each) >= 0
      )
  );
  const failedParentIds = allFailedParentFishIds?.filter(
    (each: any) =>
      !rawLogsForBurntTokens?.find(
        (log: any) => log?.args?.fishIDs.indexOf(each) === -1
      )
  );

  return {
    mintedOffsprings,
    failedParentIds,
    parentIds,
    isLoading,
  };
};

export default useGetOffsprings;
