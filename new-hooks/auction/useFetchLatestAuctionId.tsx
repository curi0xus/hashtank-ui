import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchLatestAuctionId = () => {
  const { status, data, error, isFetching } = useQuery({
    refetchOnMount: false,
    queryKey: ['latest-auction-id'],
    queryFn: async (): Promise<any> => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get('/api/auctions/latest-auction');
      return response.data.auction_id;
    },
  });

  return {
    status,
    data,
    error,
    isFetching,
  };
};

export default useFetchLatestAuctionId;
