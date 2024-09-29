import React from 'react';
import { Box } from '@chakra-ui/react';
import FilterLayout from '@/components/General/Filter';
import RedeemSauceFishCard from '@/components/General/Modal/Variants/VanityShelf/RedeemSauceFishCard';
import Link from 'next/link';
import useFetchUsersSauce from '@/new-hooks/sauce/useFetchUserSauce';
import useHashTankAccount from '@/hooks/useHashtankAccount';

const SORT_FILTERS = [['name', 'name 2', 'name 3']];

const FILTER_OPTIONS = [
  ['mutation', 'mutation 2', 'mutation 3'],
  ['umami', 'umami 2', 'umami 3'],
];

const VanityShelf = () => {
  const { address } = useHashTankAccount();
  const { data: ownedFishSAuce } = useFetchUsersSauce(address);

  const gunkSauceList =
    ownedFishSAuce?.filter((sauce: any) => sauce.grade == 'GUNK') || [];
  return (
    <Box
      mt={['0vh', '0vh', '', '', '0']}
      // gap='0'
      // flexWrap={'wrap'}
      p={['0 7vw 0 7vw', '10vh 11vw 0vh 11.2vw']}
    >
      <FilterLayout
        title='vanity shelf'
        sortFilters={SORT_FILTERS}
        filters={FILTER_OPTIONS}
        items={() => (
          <>
            {ownedFishSAuce ? (
              ownedFishSAuce
                .filter((sauce: any) => sauce.grade != 'GUNK')
                .map((sauce: any, index: number) => (
                  <RedeemSauceFishCard
                    tiggerId={index}
                    serialNumber={sauce.serial_number}
                    key={sauce.id}
                    sauceId={sauce.id}
                    metdataUrl={sauce.metadata_url}
                  />
                ))
            ) : (
              <></>
            )}
            {gunkSauceList.length ? (
              <RedeemSauceFishCard
                isGunk
                gunkSauceCount={gunkSauceList.length}
                tiggerId={gunkSauceList[0].id}
                serialNumber={gunkSauceList[0].serial_number}
                key={gunkSauceList[0].id}
                sauceId={gunkSauceList[0].id}
                metdataUrl={gunkSauceList[0].metadata_url}
              />
            ) : (
              <></>
            )}
            {ownedFishSAuce?.length === 0 && (
              <p>
                No fish left to sauce.{' '}
                <Link
                  style={{ color: '#FF530D', textDecoration: 'underline' }}
                  href='/sauce-factory'
                >
                  Sauce your fish here!
                </Link>
              </p>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default VanityShelf;
