import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import FilterLayout from '@/components/General/Filter';
import FishCard from '@/components/General/Modal/Variants/FishCard';
import EmptySlot from './EmptySlot';
import mobileCheck from '@/helpers/mobileCheck';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import useSelectedFishIds from '@/hooks/SauceFactory/useSelectedFishIds';
import MintSauceConfirmation from '@/components/General/Modal/Variants/FishCard/MintSauceConfirmation';
import useFetchFishDetailsByIds from '@/new-hooks/fish/useFetchFishDetailsByIds';
import useFetchTokenMetas from '@/new-hooks/useFetchTokenMetas';

const SORT_FILTERS = [['name', 'name 2', 'name 3']];

const FILTER_OPTIONS = [
  ['mutation', 'mutation 2', 'mutation 3'],
  ['umami', 'umami 2', 'umami 3'],
  ['fertility', 'fertility 2', 'fertility 3'],
];

function CustomLayout({ children }: any) {
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  return (
    <Flex
      w='100%'
      gap={isMobileLandscape ? 0 : ['0%', '0%', '5%', '5%', '4%']}
      columnGap={['5%', '5%', '5%', '4%']}
      flexWrap={'wrap'}
    >
      {children}
    </Flex>
  );
}

const InfoBar = ({ score }: any) => {
  return <div>SIZE: {score}</div>;
};

const BatchSauce = () => {
  const { selectedFishIds } = useSelectedFishIds();
  const fishDetailList = useFetchFishDetailsByIds(selectedFishIds);
  const listOfMetadataUrls =
    fishDetailList?.map((each: any) => each.metadata_url) || [];
  const tokenMetas = useFetchTokenMetas(listOfMetadataUrls);
  const totalSize = tokenMetas.reduce(
    (acc: any, curr: any) =>
      acc +
        curr?.attributes?.find((each: any) => each.trait_type === 'size')
          ?.value || 0,
    0
  );
  const emptySlots = Array.from({ length: 5 - selectedFishIds.length });
  const isDisabled = totalSize < 100 || selectedFishIds.length === 0;

  return (
    <Box mt={['0vh', '10vh', '', '', '0']} p={['0 7vw 0 7vw', '0 16vw 0 16vw']}>
      <FilterLayout
        InfoBar={() => <InfoBar score={totalSize} />}
        CustomLayout={CustomLayout}
        title='selected sauce content'
        sortFilters={SORT_FILTERS}
        filters={FILTER_OPTIONS}
        items={() => (
          <>
            {fishDetailList?.length
              ? fishDetailList.map((fish: any, i: number) => {
                  return (
                    <FishCard
                      metadataUrl={fish.metadata_url}
                      isSelected={true}
                      type='sauce-factory'
                      key={fish.id}
                      serialNumber={fish.serial_number}
                      auctionId={fish.auction_id}
                      winningBid={fish.winning_bid}
                      nftId={fish.id}
                    />
                  );
                })
              : null}
            {emptySlots.map((each, i) => (
              <EmptySlot
                isTiny={false}
                key={i}
                id={i + 1 + selectedFishIds.length}
              />
            ))}
          </>
        )}
      />
      <MintSauceConfirmation
        Trigger={(props: any) => (
          <Button
            {...props}
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              !isDisabled && props.onClick(e);
            }}
            disabled={isDisabled}
            color='white'
            display={'block'}
            m='100px auto'
            w={['fit-content']}
            height='auto'
            p={['0px 20px', '30px 50px']}
            _hover={{
              background: isDisabled ? 'brand.600' : 'white',
              color: isDisabled ? 'white' : 'brand.900',
            }}
            background={isDisabled ? 'brand.600' : 'brand.900'}
          >
            <Text
              textTransform={'uppercase'}
              fontWeight={'medium'}
              fontSize={['sm', 'l', 'xl']}
            >
              Sauce {selectedFishIds.length} fish
            </Text>
          </Button>
        )}
      />
    </Box>
  );
};

export default BatchSauce;
