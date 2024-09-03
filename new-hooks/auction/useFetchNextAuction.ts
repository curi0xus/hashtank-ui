import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchNextAuction = (currentAuctionId: string) => {
  const { status, data, error, isFetching } = useQuery({
    queryKey: ['next-auction-id', currentAuctionId],
    enabled: !!currentAuctionId,
    queryFn: async (): Promise<any> => {
      if (!currentAuctionId) return;

      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(
        `/api/auctions/paginate?id=${currentAuctionId}`
      );
      return response.data;
    },
  });

  return {
    status,
    data,
    error,
    isFetching,
  };
};

export default useFetchNextAuction;
