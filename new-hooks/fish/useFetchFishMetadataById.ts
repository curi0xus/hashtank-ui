import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';
import useFetchMetadata from '../useFetchMetadata';

const useFetchFishMetadataById = (id: string) => {
  const {
    status,
    data: fishDetails,
    error,
    isFetching,
  } = useQuery({
    enabled: !!id,
    refetchOnMount: false,
    queryKey: ['fish-details', id],
    queryFn: async (): Promise<any> => {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(`/api/fish/${id}`);
      return response.data.fish;
    },
  });

  const { data } = useFetchMetadata(fishDetails?.metadata_url);

  return {
    status,
    data,
    error,
    isFetching,
  };
};

export default useFetchFishMetadataById;
