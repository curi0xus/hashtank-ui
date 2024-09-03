import { useEffect, useState } from 'react';
import sauceContractConfig from '@/contracts/config/sauceNFT';
import { useReadContract } from 'wagmi';
import { effect, signal } from '@preact/signals-core';
import useHashTankAccount from '../useHashtankAccount';

const redeemedSauceIdsSignal = signal({});

const useGetOwnersSauce: any = () => {
  const { address } = useHashTankAccount();
  const [redeemedSauceIds, setRedeemedSauceIds] = useState(
    redeemedSauceIdsSignal.value
  );

  const {
    data: ownersSauce,
    isLoading,
    refetch,
  } = useReadContract({
    ...sauceContractConfig,
    functionName: 'getOwnersSauce',
    args: [address],
  });
  // @ts-ignore
  const ownedFishSauceIds =
    ownersSauce
      // @ts-ignore
      ?.map((id: bigint) => {
        return Number(id);
      })
      ?.filter((each: number) => each > 0) || [];

  useEffect(() => {
    return effect(() => setRedeemedSauceIds(redeemedSauceIdsSignal.value));
  }, [redeemedSauceIdsSignal]);

  const createRedeemedSauceIdRecord = (sauceId: number) => {
    redeemedSauceIdsSignal.value = {
      ...redeemedSauceIds,
      [sauceId]: true,
    };
  };

  return {
    refetch,
    createRedeemedSauceIdRecord,
    ownedFishSauceIds,
    isLoading,
  };
};

export default useGetOwnersSauce;
