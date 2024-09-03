import { parseAbiItem } from 'viem';
import { config } from '@/wagmi';
import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useAccount, useBlockNumber } from 'wagmi';
import { effect, signal } from '@preact/signals-core';
import { getClient } from '@wagmi/core';
import { getLogs } from 'viem/actions';
import { useQueries } from '@tanstack/react-query';

const fishInLoveSauceProgramSignal = signal([]);
const client: any = getClient(config);

async function getFishOnceRegisteredInLoveSauceProgram(
  address: `0x${string}` | undefined,
  batchId: number,
  currentBlockNumber: bigint | undefined
) {
  if (address && batchId >= 0 && currentBlockNumber) {
    const rawLogsForFishEnteredIntoLoveSauceProgram = await getLogs(client, {
      address: auctionContractConfig.address,
      event: parseAbiItem(
        'event LoveSauceProgramFulfilled(uint256[] fishIds, address indexed fishOwner, uint256 indexed loveSauceProgramBatchId, uint256 distributeAt)'
      ),
      args: {
        fishOwner: address,
        loveSauceProgramBatchId: BigInt(batchId),
      },
      fromBlock: BigInt(0),
      toBlock: currentBlockNumber,
      strict: true,
    });

    const fishEnteredIntoLoveSauceProgram =
      rawLogsForFishEnteredIntoLoveSauceProgram?.[0].args?.fishIds;
    const distributeAtTs = Number(
      rawLogsForFishEnteredIntoLoveSauceProgram?.[0].args?.distributeAt || '0'
    );

    return { fishEnteredIntoLoveSauceProgram, distributeAtTs };
  }
  return false;
}

async function getFishOnceRemovedFromLoveSauceProgram(
  address: `0x${string}` | undefined,
  batchId: number,
  currentBlockNumber: bigint | undefined
) {
  if (address && batchId >= 0 && currentBlockNumber) {
    // @ts-ignore
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

    const parentIds =
      rawLogsForFishRemovedFromLoveSauceProgram?.[0]?.args?.parentIds || [];

    return parentIds;
  }
  return false;
}

const useGetFishInLoveSauceProgram: any = (batchId: number) => {
  const { address } = useAccount();
  const [fishInLoveSauceProgram, setFishInLoveSauceProgram] = useState<any>(
    fishInLoveSauceProgramSignal.value
  );
  const { data: currentBlockNumber } = useBlockNumber();
  const results = useQueries({
    // @ts-ignore
    queries:
      address && currentBlockNumber
        ? [
            {
              queryKey: ['getFishOnceRegisteredInLoveSauceProgram'],
              queryFn: () =>
                getFishOnceRegisteredInLoveSauceProgram(
                  address as `0x${string}`,
                  batchId,
                  currentBlockNumber
                ),
            },
            {
              queryKey: ['getFishOnceRemovedFromLoveSauceProgram'],
              queryFn: () =>
                getFishOnceRemovedFromLoveSauceProgram(
                  address as `0x${string}`,
                  batchId,
                  currentBlockNumber
                ),
            },
          ]
        : [],
  });
  const fishRegisteredInLoveSauceProgram =
    // @ts-ignore
    results?.[0]?.data?.fishEnteredIntoLoveSauceProgram || [];

  const distributeAtTs =
    // @ts-ignore
    results?.[0]?.data?.distributeAtTs || 0;
  // @ts-ignore
  const fishReleasedFromLoveSauceProgram = results?.[1]?.data || [];
  const fishStillInLoveSauceProgram = fishRegisteredInLoveSauceProgram.filter(
    (each: bigint) => fishReleasedFromLoveSauceProgram.indexOf(each) === -1
  );

  // @ts-ignore
  const isLoading = results?.[0]?.isLoading || results?.[1]?.isLoading;

  useEffect(() => {
    if (
      fishInLoveSauceProgram.length === 0 &&
      fishStillInLoveSauceProgram.length > 0
    ) {
      setFishInLoveSauceProgram(fishStillInLoveSauceProgram);
    }
  }, [fishStillInLoveSauceProgram, fishInLoveSauceProgram]);

  useEffect(() => {
    return effect(() =>
      setFishInLoveSauceProgram(fishInLoveSauceProgramSignal.value)
    );
  }, [fishInLoveSauceProgramSignal]);

  function addFishInLoveSauceProgram(nftIds: string[]) {
    // @ts-ignore
    fishInLoveSauceProgramSignal.value = nftIds.map((each: string) =>
      BigInt(each)
    );
  }

  return {
    distributeAtTs,
    fishInLoveSauceProgram,
    addFishInLoveSauceProgram,
    isLoading,
  };
};

export default useGetFishInLoveSauceProgram;
