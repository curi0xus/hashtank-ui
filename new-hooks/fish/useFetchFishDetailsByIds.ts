import { useQueries } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

const useFetchFishDetailsByIds = (ids: string[]) => {
  const quries = useQueries({
    queries: ids.map((id: string) => ({
      enabled: !!id,
      refetchOnMount: false,
      queryKey: ['fish-detail-list', id],
      queryFn: async (): Promise<any> => {
        const accessToken = await getAccessToken();
        const instance = axiosInstance(accessToken!);
        const response = await instance.get(`/api/fish/${id}`);
        return response.data.fish;
      },
    })),
  });

  return quries.length ? quries.map((each: any) => ({ ...each.data })) : [];
};

export default useFetchFishDetailsByIds;
