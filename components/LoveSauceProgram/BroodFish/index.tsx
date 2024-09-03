import React from 'react';
import { Box } from '@chakra-ui/react';
import FilterLayout from '@/components/General/Filter';
import FishCard from '@/components/General/Modal/Variants/FishCard';
import useSelectedBroodFish from '@/hooks/LoveSauceProgram/useSelectedBroodFish';
import useLoveSauceProgram from '@/hooks/LoveSauceProgram/useLoveSauceProgram';
import Link from 'next/link';
import useGetBroodFish from '@/hooks/LoveSauceProgram/useGetBroodFish';
import useGetTokenMetas from '@/hooks/admin/loveSauceProgram/useGetTokenMetas';

const SORT_FILTERS = [['name', 'name 2', 'name 3']];

const FILTER_OPTIONS = [
  ['mutation', 'mutation 2', 'mutation 3'],
  ['umami', 'umami 2', 'umami 3'],
  ['fertility', 'fertility 2', 'fertility 3'],
];

const BroodFish = () => {
  const { selectedBroodFishIds } = useSelectedBroodFish();
  const {
    startAtTsInMs,
    endAtTsInMs,
    maxCohortSizeNumber,
    isParticipantInLoveSauceBatch,
    status,
  } = useLoveSauceProgram();
  const isProgramStarted =
    startAtTsInMs > 0 && startAtTsInMs <= new Date().getTime();
  const isProgramExpired =
    endAtTsInMs > 0 && endAtTsInMs <= new Date().getTime();
  const isActive = status ? Number(status) === 1 : false;
  const isDisable =
    !isActive ||
    isParticipantInLoveSauceBatch ||
    selectedBroodFishIds.length >= maxCohortSizeNumber ||
    !isProgramStarted ||
    isProgramExpired;

  const { broodfishIds } = useGetBroodFish();
  const unselectedBroodFish = broodfishIds.filter(
    // @ts-ignore
    (each: number) => selectedBroodFishIds.indexOf(each) === -1
  );
  const { tokenMetasMap } = useGetTokenMetas(
    broodfishIds.map((each: number) => each.toString())
  );
  return (
    <Box
      id='selectBroodFish'
      h='fit-content'
      mt={['0vh', '10vh', '', '', '0']}
      p={['0 7vw 0 7vw', '0 16vw 10vh 16vw']}
    >
      <FilterLayout
        title={`choose up to ${
          maxCohortSizeNumber - selectedBroodFishIds.length
        } fish to breed`}
        sortFilters={SORT_FILTERS}
        filters={FILTER_OPTIONS}
        items={() => (
          <>
            {unselectedBroodFish.map((nftId: number) => (
              <FishCard
                metadata={tokenMetasMap[nftId.toString()]}
                isDisable={isDisable}
                type='love-sauce-program'
                nftId={nftId}
                key={nftId}
              />
            ))}
            {unselectedBroodFish.length === 0 && (
              <p>
                No more broodfish.{' '}
                <Link
                  style={{ color: '#FF530D', textDecoration: 'underline' }}
                  href='/auction'
                >
                  Get your fish now!
                </Link>
              </p>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default BroodFish;
