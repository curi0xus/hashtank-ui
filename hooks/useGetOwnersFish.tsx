import { useEffect, useState } from 'react';
import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { effect, signal } from '@preact/signals-core';
import { useReadContract } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

const logsSignal = signal([]);

// TODO: Optimise with The Graph
const useGetOwnersFish: any = () => {
  const { user } = usePrivy();
  const address = user?.wallet?.address || '';
  const [isLoading, setLoading] = useState(false);
  const { data: sauceableFishIdsBigInt } = useReadContract({
    ...auctionContractConfig,
    functionName: 'getSauceableFishIds',
    args: [address],
  });
  const [ownedFishIds, setLogs] = useState(logsSignal.value);

  const sauceableFishIds =
    sauceableFishIdsBigInt
      // @ts-ignore
      ?.map((each: bigint) => Number(each))
      ?.filter((each: number) => each > 0) || [];

  useEffect(() => {
    if (ownedFishIds.length === 0 && sauceableFishIds.length > 0) {
      setLogs(sauceableFishIds);
    }
  }, [sauceableFishIds, ownedFishIds]);

  useEffect(() => {
    return effect(() => setLogs(logsSignal.value));
  }, [logsSignal.value]);

  function removeOwnerFish(nftIds: number[]) {
    logsSignal.value = ownedFishIds.filter(
      (each: any) => nftIds.indexOf(each) === -1
    );
  }

  return {
    removeOwnerFish,
    ownedFishIds,
    isLoading,
  };
};

export default useGetOwnersFish;
