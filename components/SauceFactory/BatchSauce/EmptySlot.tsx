import { Box, Text, Card, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import PikeImage from 'public/static/images/PlentyOfFish/PikeSpace.webp';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';

const EmptySlot = ({ isTiny, id }: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  return (
    <Card
      cursor={'pointer'}
      h='fit-content'
      m={isTiny ? '5px 0' : '25px 0'}
      w={
        isTiny
          ? ['23%', '23%', '15%', '15%', '9%']
          : ['47%', '47%', '30%', '30%', '16.8%']
      }
      color='white'
      background='none'
      shadow={'none'}
      maxW='sm'
    >
      <Box
        position='relative'
        p={isTiny ? '10px' : '10px'}
        border={'1px solid white'}
        borderRadius={'13px'}
      >
        <Image
          style={{
            visibility: 'hidden',
            margin: 'auto',
            width: '100%',
            height: 'auto',
          }}
          src={PikeImage}
          alt='Green double couch with wooden legs'
        />
        <Text
          width='50%'
          position='absolute'
          top={1}
          h='fit-content'
          textAlign={'left'}
          fontWeight={'normal'}
          fontSize={isTiny ? ['sm'] : ['sm', 'md', 'l', 'xl', '3xl']}
          m='auto'
        >
          {isMobileLandscape ? '' : isNotMobile ? 'empty' : ''} slot
        </Text>
        <Text
          width='50%'
          position='absolute'
          bottom={1}
          h='fit-content'
          textAlign={'left'}
          fontWeight={'normal'}
          fontSize={isTiny ? ['sm'] : ['sm', 'md', 'l', 'xl', '4xl']}
          m='auto'
        >
          # {id}
        </Text>
      </Box>
    </Card>
  );
};

export default EmptySlot;
