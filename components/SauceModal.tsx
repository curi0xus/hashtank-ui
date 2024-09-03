import React from 'react';
import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';
import Sauce from 'public/static/images/Home/sauce.webp';
import ModalText from './General/Modal/ModalText';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';

const CenteredSlides = () => {
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  return (
    <Flex
      p='40px'
      alignItems={'center'}
      direction={isMobileLandscape ? 'row' : 'column'}
    >
      <Box p='40px'>
        <Image
          style={{ height: '40vh', width: 'auto', minWidth: 35 }}
          src={Sauce}
          alt='Fish sauce modal'
        />
      </Box>
      <ModalText
        title='things are getting saucy'
        content={[
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque lorem a ultricies elementum. Quisque faucibus ex et volutpat hendrerit. Suspendisse potenti. Donec tincidunt eros et dui porttitor rutrum. Quisque sollicitudin pulvinar magna quis ultricies. Sed nec ultricies magna. Nullam tempor eros porta mi sagittis, scelerisque tempus nulla porttitor.',
        ]}
      />
    </Flex>
  );
};

export default CenteredSlides;
