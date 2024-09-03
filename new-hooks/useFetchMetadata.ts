import { useQuery } from '@tanstack/react-query';
import { getAccessToken } from '@privy-io/react-auth';
import axiosInstance from '@/util/axios';

export function fetchMetadata(metadata_url?: string) {
  return async () => {
    if (metadata_url) {
      const accessToken = await getAccessToken();
      const instance = axiosInstance(accessToken!);
      const response = await instance.get(metadata_url);
      return response.data;
    }
  };
}

const useFetchMetadata = (metadata_url?: string) => {
  const { status, data, error, isFetching, isLoading } = useQuery({
    enabled: !!metadata_url,
    refetchOnMount: false,
    queryKey: ['fish-metadata-url', metadata_url],
    queryFn: fetchMetadata(metadata_url),
  });

  return {
    status,
    data,
    error,
    isFetching,
    isLoading,
  };
};

export default useFetchMetadata;