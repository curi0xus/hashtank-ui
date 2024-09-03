import { useReadContract } from 'wagmi';
import sauceContractConfig from '@/contracts/config/sauceNFT';

const useGetSauceResaleValue: any = (tokenId: string) => {
  const { data: buyBackPriceBigInt } = useReadContract({
    ...sauceContractConfig,
    functionName: 'sauceBuyBackPrice',
    args: [BigInt(tokenId)],
    query: {
      cacheTime: 100000,
    },
  });

  return buyBackPriceBigInt || BigInt(0);
};

export default useGetSauceResaleValue;
