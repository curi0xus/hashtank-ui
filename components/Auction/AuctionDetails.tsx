import React from 'react';
import { Box, Text, Divider, Flex } from '@chakra-ui/react';
import HashTankCountdownTimer, { formatCountdownTime } from '../CountdownTimer';
import { formatDate } from '@/util/DateFormatter';
import { dateToTimestamp } from '@/util/DateParser';
import useFetchLatestAuctionId from '@/new-hooks/auction/useFetchLatestAuctionId';
import useFetchAuctionDetailById from '@/new-hooks/auction/useFetchAuctionDetailsById';

const AuctionInformation = ({ id }: any) => {
  const {
    data: auctionDetails,
    isLoading: loading,
    error,
  } = useFetchAuctionDetailById(id);
  const auction = auctionDetails?.auction;
  return auction ? (
    <>
      <Text fontWeight={'normal'} fontSize={['lg', 'xl', '2xl', '3xl', '4xl']}>
        BATCH #0{auction.batch_number} / {auction.batch_size || '0'} fish /
        released {formatDate(auction.created_at)}
      </Text>
      <Flex
        flexDirection={['column', 'row']}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Text
          textTransform={'uppercase'}
          color='brand.900'
          fontWeight={'bold'}
          fontSize={['3xl', '2xl', '3xl', '4xl', '5xl']}
        >
          {auction.name}
        </Text>
        {auction.state === 'open' ? (
          <HashTankCountdownTimer
            renderer={({ days, hours, minutes, seconds, completed }: any) => {
              if (completed) {
                setTimeout(() => {
                  window?.location?.reload();
                }, 10000);
              }

              return (
                <Text
                  textTransform={'uppercase'}
                  color='brand.900'
                  fontWeight={'bold'}
                  fontSize={['3xl', '2xl', '3xl', '4xl', '5xl']}
                >
                  {formatCountdownTime(days)}:{formatCountdownTime(hours)}:
                  {formatCountdownTime(minutes)}:{formatCountdownTime(seconds)}
                </Text>
              );
            }}
            date={dateToTimestamp(auction.end_time)}
          />
        ) : (
          <Text
            textTransform={'uppercase'}
            color={auction.state === 'revealed' ? '#A0FF56' : '#FF2020'}
            fontWeight={'normal'}
            fontSize={['3xl', '2xl', '3xl', '4xl', '4xl']}
          >
            {auction.state === 'closed'
              ? '[CLOSED]'
              : auction.state === 'revealed'
              ? '[REVEALED]'
              : '-'}
          </Text>
        )}
      </Flex>
      <Divider opacity={1} borderBottomWidth={3} mb={[10, 10]} />
      <Text mt={['5vh', '0']} fontWeight={'normal'} fontSize={['xs', 'sm']}>
        {auction.description}
      </Text>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

const AuctionDetails = ({ id }: any) => {
  const { data: latestAuctionId } = useFetchLatestAuctionId();

  return (
    <Box
      p={[
        '0vh 8vw 10vw 8vw',
        '10vh 15vw 0vh 15vw',
        '0vh 15vw',
        '40vh 15vw 20vh 15vw',
        '5vw 16vw 10vh 16vw',
      ]}
    >
      {latestAuctionId && <AuctionInformation id={id || latestAuctionId} />}
    </Box>
  );
};

export default AuctionDetails;
