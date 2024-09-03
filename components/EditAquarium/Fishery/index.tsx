import React from 'react';
import { Box } from '@chakra-ui/react';
import EelImage from 'public/static/images/Aquarium/Fishery/Eel.png';
import BreedingEelImage from 'public/static/images/Aquarium/Fishery/BreedingEel.png';
import MutatedEelImage from 'public/static/images/Aquarium/Fishery/MutatedEel.png';
import FilterLayout from '@/components/General/Filter';
import FishCard from '@/components/General/Modal/Variants/FishCard';
import InBreedingProgramFish from '@/components/General/Modal/Variants/ProgramEngagement/InBreedingProgram';
import useGetOwnersFish from '@/hooks/useGetOwnersFish';
import useSelectedFishIdsToTank from '@/hooks/EditAquarium/useSelectedFishIdsToTank';
import Link from 'next/link';
import useGetTokenMetas from '@/hooks/admin/loveSauceProgram/useGetTokenMetas';

const items = [
  { id: 1, img: MutatedEelImage, isBroodFish: true },
  { id: 1, img: MutatedEelImage, isBroodFish: true, isNew: true },
  { id: 2, img: EelImage, isOffSpring: true, isNew: true },
  { id: 3, img: BreedingEelImage, isBreeding: true },
  { id: 4, img: EelImage, isNew: true },
  { id: 4, img: EelImage },
];

const SORT_FILTERS = [['name', 'name 2', 'name 3']];

const FILTER_OPTIONS = [
  ['mutation', 'mutation 2', 'mutation 3'],
  ['umami', 'umami 2', 'umami 3'],
  ['fertility', 'fertility 2', 'fertility 3'],
];

const Fishery = () => {
  const { ownedFishIds } = useGetOwnersFish();
  const { selectedFishIds } = useSelectedFishIdsToTank();

  const unselectedFish = ownedFishIds.filter(
    // @ts-ignore
    (each) => selectedFishIds.indexOf(each) === -1
  );
  const { tokenMetasMap } = useGetTokenMetas(
    ownedFishIds.map((each: number) => each.toString())
  );
  return (
    <Box
      mt={['0vh', '10vh', '', '', '0']}
      // gap='0'
      // flexWrap={'wrap'}
      p={['0 7vw 0 7vw', '10vh 16vw 0vh 16vw']}
    >
      <FilterLayout
        title='fishery'
        sortFilters={SORT_FILTERS}
        filters={FILTER_OPTIONS}
        items={() => (
          <>
            {/* {items.map((item) =>
              item.isBreeding ? (
                <InBreedingProgramFish key={item.id} />
              ) : (
                <FishCard type='tank' key={item.id} {...item} />
              )
            )} */}
            {unselectedFish.map((each: string) => (
              <FishCard
                metadata={tokenMetasMap[each]}
                type='tank'
                key={each}
                nftId={each}
              />
            ))}

            {!unselectedFish.length && (
              <p>
                There are no fish in the fishery.{' '}
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

export default Fishery;
