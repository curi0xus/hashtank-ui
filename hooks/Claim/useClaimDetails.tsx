import { useReadContracts, useReadContract } from 'wagmi';
import erc20ContractConfig from '@/contracts/config/erc20';
import { usePrivy } from '@privy-io/react-auth';

const useClaimDetails = () => {
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const contractConfigs = [
    {
      ...erc20ContractConfig,
      functionName: 'totalClaimaints',
    },
    {
      ...erc20ContractConfig,
      functionName: 'claimaints',
      args: [address],
    },
  ];
  const { data, refetch } = useReadContracts({
    contracts: contractConfigs,
    query: {
      enabled: !!address,
    },
  });

  const totalClaimed = Number(data?.[0]?.result || '0');
  const hasClaimed = data?.[1]?.result || false;

  return {
    totalClaimed,
    hasClaimed,
    refetch,
  };
};

export default useClaimDetails;
