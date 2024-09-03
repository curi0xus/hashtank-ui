import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchBidHistory = (
  auctionId: string,
  fishId: string,
  select?: any
) => {
  const { status, data, error, isFetching, isLoading, refetch } = useQuery({
    select,
    enabled: !!auctionId && !!fishId,
    refetchOnMount: false,
    queryKey: ['bid-history', auctionId, fishId],
    queryFn: async (): Promise<any> => {
      if (!auctionId || !fishId) return;

      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(
        `/api/bids/${fishId}?auctionId=${auctionId}`
      );

      return {
        highestBid: response.data?.[0]?.bid_amount || 0,
        history: response.data,
      };
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

export default useFetchBidHistory;
