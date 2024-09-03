import sauceContractConfig from '@/contracts/config/sauceNFT';
import { useReadContract } from 'wagmi';

const useIsSauceIdInRegistry: any = (id: bigint) => {
  const {
    data: isInRegistry,
    isLoading,
    refetch,
  } = useReadContract({
    ...sauceContractConfig,
    functionName: 'bottleIdRegistry',
    args: [id],
  });

  return {
    isInRegistry,
  };
};

export default useIsSauceIdInRegistry;
