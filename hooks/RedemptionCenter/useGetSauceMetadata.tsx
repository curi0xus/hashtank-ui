import { useReadContract } from 'wagmi';
import { useEffect, useState } from 'react';
import sauceContractConfig from '@/contracts/config/sauceNFT';

const useGetSauceMetadta: any = (tokenId: string) => {
  const [metadata, setMetadata] = useState({
    attributes: [{ trait_type: '', value: '' }],
    name: undefined,
  });
  const { data: tokenURI } = useReadContract({
    ...sauceContractConfig,
    functionName: 'tokenURI',
    args: [BigInt(tokenId)],
  });

  useEffect(() => {
    async function init() {
      if (tokenURI && !metadata?.name) {
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
  }, [tokenURI, metadata]);

  let normalisedAttributes = {};
  metadata?.attributes?.forEach((each) => {
    // @ts-ignore
    normalisedAttributes[each.trait_type] = each.value;
  });

  return {
    tokenURI,
    ...metadata,
    ...normalisedAttributes,
  };
};

export default useGetSauceMetadta;
