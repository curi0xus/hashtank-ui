import auctionContractConfig from '@/contracts/config/hashTankNFT';
import {
  useSimulateContract,
  useWriteContract,
  useReadContract,
  useReadContracts,
} from 'wagmi';
import { useState } from 'react';

const useFishTypePoolSizeHook = () => {
  const [poolSize, setPoolSize] = useState(0);
  const [selectedFishTypeId, setSelectedFishTypeID] = useState('1000');

  const updateOffspringPoolConfig = {
    ...auctionContractConfig,
    functionName: 'updateOffSpringPoolSize',
    args: [BigInt(selectedFishTypeId), BigInt(poolSize)],
  };
  //  updateOffSpringPoolSize(uint256 fishType, uint256 poolSize)
  const {
    data: updateOffSpringPoolSizeContractWriteConfig,
    error: updateOffSpringPoolSizeContractWriteConfigError,
    isError: isupdateOffSpringPoolSizeContractWriteConfigError,
  } = useSimulateContract(updateOffspringPoolConfig);
  const {
    data: updateOffSpringPoolSizeWriteData,
    writeContractAsync,
    error: updateOffSpringPoolSizeWriteError,
  } = useWriteContract();

  const { data: interestList } = useReadContract({
    ...auctionContractConfig,
    functionName: 'getLoveSauceProgramInterestList',
    args: [BigInt('1')],
  });

  async function updateOffSpringPoolSizeWriteAsync() {
    return writeContractAsync?.(updateOffspringPoolConfig);
  }

  const {
    data: fishTypes,
    isError,
    isLoading,
  } = useReadContracts({
    contracts: ((interestList as []) || []).map((fishId: bigint) => {
      return {
        ...auctionContractConfig,
        functionName: 'fishTypeMap',
        args: [fishId],
      };
    }),
  });

  const uniqueFishTypes = ((fishTypes as []) || []).reduce(
    (total: any, currentValue: any, currentIndex: any, arr: any) => {
      if (!total.includes(currentValue.result)) {
        total.push(currentValue.result);
      }
      return total;
    },
    []
  );
  const contracts = uniqueFishTypes.map((fishTypeId: bigint) => {
    return {
      ...auctionContractConfig,
      functionName: 'fishTypePoolSize',
      args: [fishTypeId],
    };
  });

  // fishTypePoolSize
  const {
    data: fishTypePoolSizes,
    isError: isFishTypePoolSizesError,
    isLoading: isFishTypePoolSizesLoading,
  } = useReadContracts({
    contracts: contracts,
  });

  const updateOffSpringPoolSizeInputHandler =
    (fishTypeId: string) => async (e: any) => {
      if (fishTypeId != selectedFishTypeId) {
        setSelectedFishTypeID(fishTypeId);
      }
      setPoolSize(e.target.value);
    };

  return {
    interestList,
    uniqueFishTypes,
    fishTypePoolSizes,
    updateOffSpringPoolSizeInputHandler,
    updateOffSpringPoolSizeWriteAsync,
  };
};

export default useFishTypePoolSizeHook;
