import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useReadContracts } from 'wagmi';
import { useQueries } from '@tanstack/react-query';

async function fetchMetadata(url: string, tokenId: string) {
  const res = await fetch(url);
  const jsonData = await res?.json();

  return { tokenId, metadata: jsonData };
}

// TODO: Optimise Cache
const useGetTokenMetas: any = (tokenIds: string[]) => {
  const contractConfigs = tokenIds.map((each: string) => {
    return {
      ...auctionContractConfig,
      functionName: 'hashTankTokenUri',
      args: [BigInt(each)],
    };
  });
  const { data: tokenURIs } = useReadContracts({
    contracts: contractConfigs,
  });

  let tokenUrls: string[] = [];

  const results = useQueries({
    queries: tokenURIs
      ? tokenURIs.map((uri: any, i: number) => {
          tokenUrls.push(uri.result);
          return {
            queryKey: ['tokenURI', tokenIds[i]],
            queryFn: () => fetchMetadata(uri.result, tokenIds[i]),
            staleTime: 60000,
          };
        })
      : [],
  });
  let tokenMetasMap = {};

  const tokenMetas = results.map((result: any) => {
    if (result.data && result.isSuccess) {
      // @ts-ignore
      tokenMetasMap[result.data.tokenId] = result.data.metadata;
      return {
        ...result.data,
        ...result.data.metadata,
      };
    }
  });

  console.log('RESULT', tokenIds);

  return {
    tokenMetasMap,
    tokenMetas,
    tokenUrls,
  };
};

export default useGetTokenMetas;
