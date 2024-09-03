import { useQueries } from '@tanstack/react-query';
import { fetchMetadata } from './useFetchMetadata';

const useFetchTokenMetas = (metadataList: string[]) => {
  const quries = useQueries({
    queries: metadataList.map((metadataUrl: string) => ({
      enabled: !!metadataUrl,
      refetchOnMount: false,
      queryKey: ['token-meta-list', metadataUrl],
      queryFn: async (): Promise<any> => {
        const metdataRes = await fetchMetadata(metadataUrl)();
        return metdataRes;
      },
    })),
  });

  return quries.length ? quries.map((each: any) => ({ ...each.data })) : [];
};

export default useFetchTokenMetas;
