import { Text, Flex, Box, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import SchoolOfFishes from 'public/static/images/About/school.webp';
import ClassOfFish from 'public/static/images/About/class.webp';
import FishEggs from 'public/static/images/About/fish_eggs.webp';
import SlideLayout from '../Shared/SlideLayout';

const SauceDescription = () => {
  return (
    <SlideLayout>
      <Box p={['30px 20px 0px 20px', '8vh 15vw']} h='fit-content'>
        <Text fontSize={['sm', 'md']} color='white'>
          A savvy capitalist grasps the importance of margins, where refined
          products consistently outshine raw materials. While the saucing
          factories assist in processing, the discovery of the secret recipe for
          an exceptional sauce rests solely with you. As you venture into the
          realm of trial and error to unveil the perfect sauce, here are some
          key points to consider:
        </Text>
        <Flex
          gap={['4%']}
          direction={['column', 'column', 'column', 'row']}
          mb='10vh'
        >
          <Box
            justifyContent={'space-between'}
            flexDir='column'
            display='flex'
            w={['100%', '100%', '100%', '48%']}
          >
            <Box
              m='auto'
              p={['10vh 8vw', '10vh 8vw', '10vh 8vw', '10vh 8vw']}
              w={['60%', '60%', '60%', '100%']}
            >
              <Image
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                height={100}
                width={100}
                src={SchoolOfFishes}
                alt='Sauce Description - How'
              />
            </Box>
            <Text
              w={['100%', '100%', '100%', '90%']}
              fontSize={['md', 'xl']}
              fontWeight={'medium'}
              color='brand.900'
            >
              You can enter up to 5 fish in each saucing attempt, and their
              combined size must be at least 100.
            </Text>
          </Box>
          <Box
            justifyContent={'space-between'}
            flexDir='column'
            display='flex'
            w={['100%', '100%', '100%', '48%']}
          >
            <Flex
              alignItems={'center'}
              justifyContent={['space-around', 'space-between']}
              display={'flex'}
              gap={['0', '2%']}
              p={['10vh 15vw', '10vh 15vw', '10vh 15vw', '18vh 9vw 2vh 3vw']}
            >
              <Box height='fit-content' w='35%'>
                <Image
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  height={100}
                  width={100}
                  src={FishEggs}
                  alt='Sauce Description - Umami'
                />
              </Box>
              <Box w='35%'>
                <Image
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  height={100}
                  width={100}
                  src={ClassOfFish}
                  alt='Sauce Description - Complexity'
                />
              </Box>
            </Flex>
            <Text
              w={['100%', '100%', '100%', '90%']}
              fontSize={['md', 'xl']}
              fontWeight={'medium'}
              color='brand.900'
            >
              Output bottles have 2 traits determining quality: <br />
              <span style={{ textDecoration: 'underline' }}>
                Umami & Complexity.
              </span>
            </Text>
          </Box>
        </Flex>
        <Text fontSize={['sm', 'md']} color='white'>
          The quality of the fish sauce created is influenced by the traits of
          each sauced fish and its base type. A nominal fee of SHELL is charged
          for each saucing attempt.  <br /> *Factories require a certain amount
          of time to process, ferment, and bottle your fish sauce.
        </Text>
      </Box>
    </SlideLayout>
  );
};

export default SauceDescription;
