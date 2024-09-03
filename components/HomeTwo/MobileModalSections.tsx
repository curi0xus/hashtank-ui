import React from 'react';
import SectionLayout from './Shared/SectionLayout';
import { Stack, Flex, Box } from '@chakra-ui/react';
import SectionContent from './Shared/SectionContent';
import Image from 'next/image';
import PlentyOfFishesMobile from 'public/static/images/Home/mobile/fishes-mobile.webp';
import SauceMobile from 'public/static/images/Home/mobile/sauce-mobile.webp';

const MobileModalSections = ({ height, background }: any) => {
  return (
    <SectionLayout height={height} background={background}>
      <Flex height={['fit-content', '100vh', '100vh']}>
        <Box h='100%' w={['0', '40%', '35%', '40%', '50%']} />
        <Stack
          margin={'0 auto'}
          p={[0, 0, '50vmin 0 0 0', '25vh 0 0 0', '35vh 0 0 0', '90vh 0 0 0']}
          width={['88%', '60%', '50%']}
        >
          <Box
            display={['flex', 'none']}
            flexDirection='column'
            alignItems='center'
            width='100%'
            padding={['215vmin 0 60vmin 0', 0]}
            height={['fit-content', 0]}
          >
            <Box p={4}>
              <Image src={PlentyOfFishesMobile} alt='Plenty Fishes Mobile' />
            </Box>
            <SectionContent
              title='plenty of fish in the sea'
              content={[
                'Or is there? Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque lorem a ultricies elementum. Quisque faucibus ex et volutpat hendrerit. Suspendisse potenti. Donec tincidunt eros et dui porttitor rutrum. Quisque sollicitudin pulvinar magna quis ultricies. Sed nec ultricies magna.',
              ]}
            />
            <Box p={10}>
              <Image src={SauceMobile} alt='Sauce Mobile' />
            </Box>
            <SectionContent
              title='things are getting saucy'
              content={[
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pellentesque lorem a ultricies elementum. Quisque faucibus ex et volutpat hendrerit. Suspendisse potenti. Donec tincidunt eros et dui porttitor rutrum. Quisque sollicitudin pulvinar magna quis ultricies. Sed nec ultricies magna. Nullam tempor eros porta mi sagittis, scelerisque tempus nulla porttitor.',
              ]}
            />
          </Box>
        </Stack>
      </Flex>
    </SectionLayout>
  );
};

export default MobileModalSections;
