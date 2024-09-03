import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchUsersDrops = (address?: `0x${string}`) => {
  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: !!address,
    refetchOnMount: false,
    queryKey: ['user-drops', address],
    queryFn: async (): Promise<any> => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(`/api/drops/${address}`);
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

export default useFetchUsersDrops;
