import React from 'react';
import HermitImage from 'public/static/images/PlentyOfFish/Hermit.webp';
import PikeImage from 'public/static/images/PlentyOfFish/Pike.webp';
import SiameseImage from 'public/static/images/PlentyOfFish/Siamese.webp';
import Image from 'next/image';
import Swiper from 'react-id-swiper';
import { Flex, Box } from '@chakra-ui/react';
import ModalText from './General/Modal/ModalText';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';

const CenteredSlides = () => {
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  const params = {
    activeSlideKey: 1,
    slidesPerView: 'auto',
    loop: true,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  return (
    <Flex
      overflow='hidden'
      p={isMobileLandscape ? 0 : '50px'}
      __css={{
        position: 'relative',
        '.swiper-container': {
          marginTop: isMobileLandscape ? 0 : '60px',
          width: '80%',
          height: isMobileLandscape ? 'fit-content' : '20rem',
          transform: 'translateX(-200px)',
        },
        '.swiper-wrapper': {
          display: 'flex',
          width: 'fit-content',
        },
        '.swiper-pagination': {
          '&.swiper-pagination-fraction': {
            color: 'red',
            fontWeight: 5,
          },
        },
        '.swiper-pagination-bullet-active.swiper-pagination-bullet': {
          bg: 'red',
          opacity: 1,
        },
        '.swiper-pagination-bullet': {
          bg: 'red',
          opacity: 1,
        },
        '.swiper-pagination-progressbar .swiper-pagination-progressbar-fill': {
          bg: 'dark',
        },
      }}
    >
      {/* @ts-ignore */}
      <Swiper {...params}>
        <Box
          key={1}
          __css={{
            width: isMobileLandscape ? 200 : 280,
            padding: '25px',
          }}
        >
          <Image src={PikeImage} alt='Pike Fish' />
        </Box>
        <Box
          key={2}
          __css={{
            width: isMobileLandscape ? 200 : 280,
            padding: '30px',
          }}
        >
          <Image src={HermitImage} alt='Nouns Hermit' />
        </Box>
        <Box
          key={3}
          __css={{
            width: isMobileLandscape ? 200 : 280,
            padding: '0px 30px 0 0',
          }}
        >
          <Image src={SiameseImage} alt='Siamese Fish' />
        </Box>
        <Box
          key={4}
          __css={{
            width: isMobileLandscape ? 200 : 280,
            padding: '25px',
          }}
        >
          <Image src={PikeImage} alt='Pike Fish 2' />
        </Box>
        <Box
          key={5}
          __css={{
            width: isMobileLandscape ? 200 : 280,
            padding: '30px',
          }}
        >
          <Image src={HermitImage} alt='Nouns Hermit 2' />
        </Box>
        <Box
          key={5}
          __css={{
            width: isMobileLandscape ? 200 : 280,
            padding: '0px 30px 0 0',
          }}
        >
          <Image src={SiameseImage} alt='Siamese Fish 2' />
        </Box>
      </Swiper>
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

// const getItems = () => [
//   { id: '0', image: SiameseImage },
//   { id: '1', image: PikeImage },
//   { id: '2', image: HermitImage },
// ];

// function Plenty() {
//   const [items] = React.useState(getItems);
//   return <>{JSON.stringify(items)}</>;
// }

// export default Plenty;
