import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import FilterLayout from '@/components/General/Filter';
import FishCard from '@/components/General/Modal/Variants/FishCard';
import EmptySlot from './EmptySlot';
import useSelectedFishIdsToTank from '@/hooks/EditAquarium/useSelectedFishIdsToTank';

const SORT_FILTERS = [['name', 'name 2', 'name 3']];

const FILTER_OPTIONS = [
  ['mutation', 'mutation 2', 'mutation 3'],
  ['umami', 'umami 2', 'umami 3'],
  ['fertility', 'fertility 2', 'fertility 3'],
];

const TankRoster = () => {
  const { selectedFishIds } = useSelectedFishIdsToTank();
  const emptyLargeSlots = Array.from({ length: 4 - selectedFishIds.length });
  const emptySmallSlots = Array.from({
    length: 14 - emptyLargeSlots.length - selectedFishIds.length,
  });
  const isDisabled = selectedFishIds.length === 0;

  return (
    <Box mt={['0vh', '10vh', '', '', '0']} p={['0 7vw 0 7vw', '0 16vw 0 16vw']}>
      <FilterLayout
        title='tank roster'
        sortFilters={SORT_FILTERS}
        filters={FILTER_OPTIONS}
        items={() => (
          <>
            {selectedFishIds
              .filter((_, i) => i <= 3)
              .map((fishId, i) => (
                <FishCard
                  isSelected={true}
                  type='tank'
                  key={i}
                  nftId={fishId}
                />
              ))}
            {emptyLargeSlots.map((each, i) => (
              <EmptySlot
                isTiny={false}
                key={i}
                id={i + 1 + selectedFishIds.length}
              />
            ))}
          </>
        )}
      />
      <Flex
        mt='50px'
        w='100%'
        gap={['2%', '2%', '2%', '2%', '1%']}
        flexWrap={'wrap'}
      >
        {selectedFishIds
          .filter((_, i) => i > 3)
          .map((fishId, i) => (
            <FishCard isTiny isSelected type='tank' key={i} nftId={fishId} />
          ))}
        {emptySmallSlots.map((slots, i) => (
          <EmptySlot isTiny={true} key={i} id={i + 5} />
        ))}
      </Flex>
    </Box>
  );
};

export default TankRoster;
