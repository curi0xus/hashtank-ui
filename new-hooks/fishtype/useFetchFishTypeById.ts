import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchFishTypeById = (id: string) => {
  const { status, data, error, isFetching } = useQuery({
    enabled: !!id,
    refetchOnMount: false,
    queryKey: ['fish-type', id],
    queryFn: async (): Promise<any> => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(`/api/fishtype/${id}`);
      return response.data.fishTypeData;
    },
  });

  return {
    status,
    data,
    error,
    isFetching,
  };
};

export default useFetchFishTypeById;
