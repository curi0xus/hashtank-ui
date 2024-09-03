import { useQuery } from '@tanstack/react-query';
import { effect, signal } from '@preact/signals-core';
import { useState, useEffect } from 'react';
import axiosInstance from '@/util/axios';
import { getAccessToken } from '@privy-io/react-auth';

const logsSignal = signal([]);

const useFetchOwnersRevealedFish = (address?: `0x${string}`) => {
  const [ownedFishIds, setLogs] = useState(logsSignal.value);

  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: !!address,
    refetchOnMount: false,
    queryKey: ['user-revealed-fish', address],
    queryFn: async (): Promise<any> => {
      const accessToken = await getAccessToken();
      const response = await axiosInstance(accessToken!).get(
        `/api/fish?state=revealed`
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      const fishList = data.fish;
      setLogs(fishList);
    }
  }, [data]);

  useEffect(() => {
    return effect(() => setLogs(logsSignal.value));
  }, [logsSignal.value]);

  function removeOwnerFish(fishIds: string[]) {
    logsSignal.value = ownedFishIds.filter(
      (each: any) => fishIds.indexOf(each.id) === -1
    );
  }

  return {
    removeOwnerFish,
    ownedFishIds,
    refetch,
    status,
    data,
    error,
    isFetching,
  };
};

export default useFetchOwnersRevealedFish;
