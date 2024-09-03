import React from 'react';
import AuctionFishCard from '@/components/General/Modal/Variants/Auction/AuctionFishCard';
import RevealedFishCard from '@/components/General/Modal/Variants/Auction/RevealedFishCard';
import { Flex } from '@chakra-ui/react';
import useFetchLatestAuctionId from '@/new-hooks/auction/useFetchLatestAuctionId';
import useFetchAuctionDetailById from '@/new-hooks/auction/useFetchAuctionDetailsById';
import useFetchAuctionItems from '@/new-hooks/auction/useFetchAuctionItems';

const AuctionBody = ({ id }: any) => {
  const {
    data: auctionDetails,
    isLoading: loading,
    error,
  } = useFetchAuctionDetailById(id);
  const { data: fish } = useFetchAuctionItems(id);
  const auction = auctionDetails?.auction;
  const batchPrefix = auction?.batch_prefix;
  const batchNumber = auction?.batch_number || 1;
  const batchName = auction?.name;
  const auctionId = auction?.id;
  const auctionEndTime = auction?.end_time;
  const auctionCreatedAt = auction?.created_at;

  return auctionDetails ? (
    <>
      {fish?.length
        ? fish.map((item: any, batchFishIndex: number) => {
            return item.state === 'revealed' ? (
              <RevealedFishCard
                auctionId={auctionId}
                key={item.id}
                fishId={item.id}
                serialNumber={item.serial_number}
                batchPrefix={batchPrefix}
                {...item}
              />
            ) : auction.state === 'open' ? (
              <AuctionFishCard
                serialNumber={item.serial_number}
                auctionEndTime={auctionEndTime}
                auctionCreatedAt={auctionCreatedAt}
                auctionId={auctionId}
                batchName={batchName}
                key={item.id}
                batchPrefix={batchPrefix}
                currentBatchId={auction.id}
                batchNumber={batchNumber}
                batchFishIndex={batchFishIndex + 1}
                fishId={item.id}
                sizeRange={item.size_range}
                currentFishName={item.type_name}
                fishImage={item.silhouette_img_thumbnail}
              />
            ) : null;
          })
        : 'No Fish Found.'}
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

const AuctionItems = ({ id }: any) => {
  const { data: latestAuctionId } = useFetchLatestAuctionId();
  return (
    <Flex
      w='100%'
      mt={['0vh', '10vh', '', '', '0']}
      gap={['6', '4%']}
      flexWrap={'wrap'}
      p={['0 7vw 120vh 7vw', '0 15vw 0vh 15vw']}
    >
      {latestAuctionId && <AuctionBody id={id || latestAuctionId} />}
    </Flex>
  );
};

export default AuctionItems;
