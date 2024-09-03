import React from 'react';
import { Box } from '@chakra-ui/react';
import FilterLayout from '@/components/General/Filter';
import FishCard from '@/components/General/Modal/Variants/FishCard';
import useSelectedFishIds from '@/hooks/SauceFactory/useSelectedFishIds';
import Link from 'next/link';
import useFetchOwnersRevealedFish from '@/new-hooks/fish/useFetchOwnersRevealedFish';
import useHashTankAccount from '@/hooks/useHashtankAccount';

// ToDos:
// Filter out fish that are in the breed program
// Filter out fish that is inside the aquarium
const SORT_FILTERS = [['name', 'name 2', 'name 3']];

const FILTER_OPTIONS = [
  ['mutation', 'mutation 2', 'mutation 3'],
  ['umami', 'umami 2', 'umami 3'],
  ['fertility', 'fertility 2', 'fertility 3'],
];

const SelectFishToSauce = () => {
  const { address } = useHashTankAccount();
  const { ownedFishIds } = useFetchOwnersRevealedFish(address);

  const { selectedFishIds } = useSelectedFishIds();

  const unselectedFish = ownedFishIds.filter(
    // @ts-ignore
    (each) => selectedFishIds.indexOf(each.id) === -1
  );

  const isDisable = selectedFishIds.length >= 5;

  return (
    <Box
      minH={'500px'}
      mt={['0vh', '10vh', '', '', '10vh']}
      mb={'300px'}
      p={['0 7vw 0 7vw', '0 16vw 0 16vw']}
    >
      <FilterLayout
        title={`choose up to ${5 - selectedFishIds.length} fish to sauce`}
        sortFilters={SORT_FILTERS}
        filters={FILTER_OPTIONS}
        items={() => (
          <>
            {unselectedFish.map((each: any) => (
              <FishCard
                metadataUrl={each.metadata_url}
                isDisable={isDisable}
                type='sauce-factory'
                key={each}
                serialNumber={each.serial_number}
                auctionId={each.auction_id}
                winningBid={each.winning_bid}
                nftId={each.id}
              />
            ))}

            {unselectedFish.length === 0 && (
              <p>
                No fish left to sauce.{' '}
                <Link
                  style={{ color: '#FF530D', textDecoration: 'underline' }}
                  href='/auction'
                >
                  Get your fish now!
                </Link>
              </p>
            )}
            {/* {isUserGetOwnerFishLoading && <p>Loading...</p>} */}
          </>
        )}
      />
    </Box>
  );
};

export default SelectFishToSauce;
