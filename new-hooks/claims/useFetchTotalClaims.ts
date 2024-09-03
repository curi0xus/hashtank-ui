import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchTotalClaims = () => {
  const { status, data, error, isFetching, refetch } = useQuery({
    // refetchOnMount: false,
    queryKey: ['total-claims'],
    queryFn: async (): Promise<any> => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(`/api/claims`);
      return response.data.totalClaims;
    },
  });

  return {
    status,
    data,
    error,
    refetch,
    isFetching,
  };
};

export default useFetchTotalClaims;
