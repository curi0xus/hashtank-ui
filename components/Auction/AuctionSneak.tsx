import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import useFetchLatestAuctionId from '@/new-hooks/auction/useFetchLatestAuctionId';
import useFetchAuctionDetailById from '@/new-hooks/auction/useFetchAuctionDetailsById';

const AuctionDetails = ({ id }: any) => {
  const {
    data: auctionDetails,
    isLoading: loading,
    error,
  } = useFetchAuctionDetailById(id);
  const auction = auctionDetails?.auction;

  return auction ? (
    <Text
      width='fit-content'
      position='absolute'
      top={['58vw', '26vw', '26vw', '26vw', '26.5vw', '19.5vw', '19.5vw']}
      left={['18vw', '15vw', '15vw', '15vw', '15vw', '22vw', '22vw']}
      fontWeight={'normal'}
      fontSize={['sm', 'sm', 'md', 'lg', 'xl']}
    >
      BATCH #0{auction.batch_number} - {auction.name}
    </Text>
  ) : (
    <h1>...</h1>
  );
};

const AuctionSneak = ({ id }: any) => {
  const { data: latestAuctionId } = useFetchLatestAuctionId();
  return (
    <Box position='relative' height={['150vw', '60vw', '80vw', '60vw', '60vw']}>
      <Text
        width='fit-content'
        position='absolute'
        top={['20vw', '16vw', '15vw', '15vw', '15vw', '12vw', '12vw']}
        left={['12vw', '15vw', '15vw', '15vw', '15vw', '22vw', '22vw']}
        textTransform={'uppercase'}
        color='brand.900'
        fontWeight={'bold'}
        fontSize={['4xl', '2xl', '3xl', '4xl', '5xl']}
      >
        auction floor
      </Text>
      {latestAuctionId && <AuctionDetails id={id || latestAuctionId} />}
    </Box>
  );
};

export default AuctionSneak;
