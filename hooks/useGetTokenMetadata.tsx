import auctionContractConfig from '@/contracts/config/hashTankNFT';
import { useReadContract } from 'wagmi';
import { useEffect, useState } from 'react';

const ONE_DAY_IN_MS = 86400000;

// TODO: Optimise Cache
const useGetTokenMetadata: any = (tokenId: string) => {
  const [metadata, setMetadata] = useState({
    createdAt: 0,
    attributes: [],
  });
  const { data: tokenURI, isFetched } = useReadContract({
    ...auctionContractConfig,
    functionName: 'hashTankTokenUri',
    args: [BigInt(tokenId)],
    query: {
      staleTime: 3000,
    },
  });

  useEffect(() => {
    async function init() {
      if (tokenURI && isFetched) {
        try {
          const res = await fetch(tokenURI as string);
          const jsonData = await res?.json();
          setMetadata(jsonData);
        } catch (e) {
          console.log('error', e);
        }
      }
    }
    init();
  }, [tokenURI, isFetched]);

  return {
    tokenURI,
    ...metadata,
    isNew: metadata.createdAt < new Date().getTime() + ONE_DAY_IN_MS,
  };
};

export default useGetTokenMetadata;
