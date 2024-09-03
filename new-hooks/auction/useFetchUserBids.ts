import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchUserBids = (
  auctionId: string,
  address?: `0x${string}`,
  select?: any
) => {
  const { status, data, error, isFetching, isLoading, refetch } = useQuery({
    select,
    enabled: !!auctionId && !!address,
    refetchOnMount: false,
    queryKey: ['users-bids', auctionId, address],
    queryFn: async (): Promise<any> => {
      if (!auctionId || !address) return;

      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(
        `/api/bids/user/${address}?auctionId=${auctionId}`
      );

      return response.data;
    },
  });

  return {
    status,
    data,
    error,
    isFetching,
    isLoading,
    refetch,
  };
};

export default useFetchUserBids;
