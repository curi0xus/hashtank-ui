import { effect, signal } from '@preact/signals-core';
import { useEffect, useState } from 'react';

const selectedFishIdsSignal = signal([]);

const useSelectedFishIds = () => {
  const [state, setState] = useState(selectedFishIdsSignal.value);
  const [totalSize, setTotalSize] = useState(0);

  const addSelectedFish = (fishId: string) => {
    if (state.length < 5) {
      let clone = [...state];
      // @ts-ignore
      clone.push(fishId);
      selectedFishIdsSignal.value = clone;
    }
  };

  const removeSelectedFish = (fishId: string) => {
    // @ts-ignore
    selectedFishIdsSignal.value = state.filter((each) => fishId != each);
  };

  const resetSelectedFishIds = () => {
    // @ts-ignore
    selectedFishIdsSignal.value = [];
  };

  useEffect(() => {
    return effect(() => setState(selectedFishIdsSignal.value));
  }, [selectedFishIdsSignal]);

  return {
    selectedFishIds: state,
    addSelectedFish,
    removeSelectedFish,
    resetSelectedFishIds,
  };
};

export default useSelectedFishIds;
