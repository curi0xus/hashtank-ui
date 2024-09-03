import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchAuctionItems = (id: string) => {
  const { status, data, error, isFetching, isLoading } = useQuery({
    queryKey: ['auction-details-items', id],
    enabled: !!id,
    queryFn: async (): Promise<any> => {
      if (!id) return;

      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(`/api/auctions/${id}/items`);
      return response.data.fish;
    },
  });

  return {
    status,
    data,
    error,
    isFetching,
    isLoading,
  };
};

export default useFetchAuctionItems;
