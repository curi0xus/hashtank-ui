import Image from 'next/image';
import React from 'react';
import { Box, Tr, Td, Text } from '@chakra-ui/react';
import useFetchBidHistory from '@/new-hooks/auction/useFetchBidHistory';
import useFetchFishMetadataById from '@/new-hooks/fish/useFetchFishMetadataById';

const Trigger = ({
  onClick,
  fishTypeId,
  fishName,
  batchFishIndex,
  hiddenFishImage,
  currentBatchId,
  serialNumber,
  fishId,
  myBid,
  ...props
}: any) => {
  const { data } = useFetchFishMetadataById(fishId);
  const revealedFishName = data?.name;
  const revealedFishImage = data?.image;
  const { data: highestBid } = useFetchBidHistory(
    currentBatchId,
    fishId,
    (data: any) => data.highestBid
  );

  return (
    <Tr cursor={'pointer'} onClick={onClick} {...props}>
      <Td>#{serialNumber}</Td>
      <Td>
        <Box display='flex' h='20px'>
          <Box mr='5px' h='100%' borderRadius={'20px'} background='brand.700'>
            <Image
              style={{ margin: 'auto', height: '100%', width: 'auto' }}
              width={100}
              height={100}
              src={revealedFishImage || hiddenFishImage}
              alt='Green double couch with wooden legs'
            />
          </Box>
          <Text isTruncated>{revealedFishName || fishName}</Text>
        </Box>
      </Td>
      <Td>⌘ {myBid}</Td>
      {highestBid && <Td>⌘ {highestBid}</Td>}
    </Tr>
  );
};

export default Trigger;
