import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchUsersSauce = (address?: `0x${string}`) => {
  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: !!address,
    refetchOnMount: false,
    queryKey: ['user-sauce', address],
    queryFn: async (): Promise<any> => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(`/api/sauce/${address}?state=AVAILABLE`);
      return response.data;
    },
  });

  return {
    refetch,
    status,
    data,
    error,
    isFetching,
  };
};

export default useFetchUsersSauce;
