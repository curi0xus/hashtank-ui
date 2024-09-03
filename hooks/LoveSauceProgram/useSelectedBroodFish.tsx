import { effect, signal } from '@preact/signals-core';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

export function calculateFertility(selectedFishIds: any) {
  return 100;
}

const MAX_COHORT_SIZE = 20;

const selectedFishIdsSignal = signal([]);

const useSelectedBroodFish = () => {
  const [state, setState] = useState(selectedFishIdsSignal.value);
  const toast = useToast();

  const addSelectedBroodFish = (fishId: string) => {
    if (state.length + 1 <= MAX_COHORT_SIZE) {
      let clone = [...state];
      // @ts-ignore
      clone.push(fishId);
      selectedFishIdsSignal.value = clone;
    } else {
      toast({
        title: `You have reached the maximum cohort size of 20`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeSelectedBroodFish = (fishId: string) => {
    // @ts-ignore
    selectedFishIdsSignal.value = state.filter((each) => fishId != each);
  };

  const resetSelectedBroodFishIds = () => {
    // @ts-ignore
    selectedFishIdsSignal.value = [];
  };

  useEffect(() => {
    return effect(() => setState(selectedFishIdsSignal.value));
  }, [selectedFishIdsSignal]);

  const totalFertility = calculateFertility(state);

  return {
    selectedBroodFishIds: state,
    addSelectedBroodFish,
    removeSelectedBroodFish,
    resetSelectedBroodFishIds,
    totalFertility,
  };
};

export default useSelectedBroodFish;
