import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchUser = (address?: `0x${string}`) => {
  const { status, data, error, isFetching } = useQuery({
    enabled: !!address,
    refetchOnMount: false,
    queryKey: ['user-detail', address],
    queryFn: async (): Promise<any> => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(`/api/users/${address}`);
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

export default useFetchUser;
