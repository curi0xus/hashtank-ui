import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchAuctionDetailById = (id: string, select?: any) => {
  const { status, data, error, isFetching, isLoading } = useQuery({
    select,
    enabled: !!id,
    refetchOnMount: false,
    queryKey: ['auction-details', id],
    queryFn: async (): Promise<any> => {
      if (!id) return;

      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(`/api/auctions/${id}`);

      const auction = response?.data?.auction;
      const batchSize = auction?.batch_size;
      const batchDescription = auction?.description;
      const batchPrefix = auction?.batch_prefix;
      const batchNumber = auction?.batch_number || 1;
      const batchName = auction?.name;
      const auctionId = auction?.id;
      const auctionEndTime = auction?.end_time;
      const auctionCreatedAt = auction?.created_at;
      const minBid = auction?.start_price;
      const auctionState = auction?.state;
      const auctionStartTime = auction?.start_time;

      return {
        auction,
        batchPrefix,
        batchNumber,
        batchName,
        auctionId,
        auctionEndTime,
        auctionCreatedAt,
        batchSize,
        batchDescription,
        minBid,
        auctionState,
        auctionStartTime,
      };
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

export default useFetchAuctionDetailById;