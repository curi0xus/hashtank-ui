import React, { useState } from 'react';
import Slider from '../Shared/Slider';
import Feature from './Features';
import { FEATURES } from './Features/constants';
import { TextBlock } from '../Greetings';
import Aquarium from 'public/static/images/About/aquarium.webp';
import AquariumMobile from 'public/static/images/About/mobile/aquarium.webp';
import Image from 'next/image';
import {
  Text,
  Flex,
  Box,
  IconButton,
  Button,
  useMediaQuery,
} from '@chakra-ui/react';
import ArrowForwardIcon from '@/components/General/Icons/ArrowForwardIcon';
import { useRouter } from 'next/router';
import TripShell from 'public/static/images/About/TripShell.webp';

const Slides = [
  () => <Feature {...FEATURES[0]} />,
  () => <Feature {...FEATURES[1]} />,
];

const Lore = () => {
  const router = useRouter();
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  const [isOpen, setOpen] = useState(false);

  const resetHandler = () => {
    setOpen(false);
  };
  const scrollIntoView = () => {
    const element = document.querySelector('#feature');
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: 'smooth',
      });
    }
  };
  return (
    <>
      <div
        id='feature'
        style={{
          height: '100%',
          background: '#373A49',
          width: '100vw',
        }}
      >
        <Box
          h='100%'
          p={[
            '0vh 10vw',
            '0vh 15vw',
            '0vh 15vw',
            '0vh 15vw',
            '0vh 10vw 0vw 10vw',
          ]}
        >
          <TextBlock
            title='OTHER WAYS TO EARN SHELL'
            paragraphs={[
              'Innovation, growth, and expansion are integral and related tributaries of quality capitalism. Good games adhere to these same tenets.',
              'Accordingly, HASHTANK has a variety of features planned, and already in the works. Soon to come: more fun, more complexity, and more ways to earn more SHELL tokens!',
            ]}
          ></TextBlock>
        </Box>

        <Flex direction={['column']}>
          <Flex
            direction={['column']}
            p={['8vh 0 0 0', '0vh 15vw', '0vh 15vw', '0vh 15vw', '5vh 10vw']}
          >
            <Box>
              <Image
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                height={100}
                width={100}
                src={isNotMobile ? Aquarium : AquariumMobile}
                alt={'aquarium-lore'}
              />
            </Box>
          </Flex>
          <Flex
            direction={['column']}
            p={['0vh 10vw', '0vh 15vw', '0vh 15vw', '0vh 15vw', '0vh 10vw']}
          >
            <Text
              lineHeight={1.1}
              m={['2vh 0', '3vh 0']}
              fontStyle={'normal'}
              fontWeight={'bold'}
              fontSize={['4xl', '5xl']}
              color='#FFEE57'
            >
              THE AQUARIUM
            </Text>
            {[
              'Craft a picturesque habitat for your fish and nurture them to their full potential. Use various drops to enhance your personal aquariums, thereby improving the stats of the fish over time. Leverage this mechanic to boost and fatten your fish in preparation for saucing. Could this be the key to achieving umami heaven with your sauce?',
            ].map((text: string, index: number) => (
              <Text
                mb={3}
                key={text}
                w='100%'
                color='white'
                fontWeight={'normal'}
                fontSize={['sm', 'md']}
              >
                {text}
              </Text>
            ))}

            <Box display={'flex'} justifyContent={'flex-end'}>
              <Flex
                display={['none', 'none', 'none', 'flex']}
                alignItems={'center'}
              >
                <Text
                  transform={'translateX(2vw)'}
                  fontWeight={'normal'}
                  textTransform={'uppercase'}
                  fontSize={'xl'}
                  color='#FFEE57'
                >
                  more <br />
                  info
                </Text>
                <IconButton
                  display={'flex'}
                  _hover={{
                    background: 'none',
                  }}
                  variant='ghost'
                  color={'#FFEE57'}
                  onClick={() => {
                    scrollIntoView();
                    setOpen(true);
                  }}
                  background='none'
                  aria-label='Back Arrow'
                  icon={<ArrowForwardIcon fontSize={120} />}
                />
              </Flex>
              <Button
                color='white'
                display={['block', 'block', 'block', 'none']}
                onClick={() => {
                  scrollIntoView();
                  setOpen(true);
                }}
                mt={'2vh'}
                _hover={{
                  background: 'white',
                  color: 'brand.900',
                }}
                background={'brand.900'}
              >
                <Text
                  textTransform={'uppercase'}
                  fontWeight={'normal'}
                  fontSize={['md', 'xl']}
                >
                  more info
                </Text>
              </Button>
            </Box>
          </Flex>
        </Flex>
        <Button
          color='white'
          p='10px 80px'
          h='fit-content'
          display={['block', 'block', 'block']}
          onClick={() => {
            router.push('/claim');
          }}
          m='15vh auto 2vh auto'
          _hover={{
            background: 'white',
            color: 'brand.900',
          }}
          background={'brand.900'}
        >
          <Text textTransform={'uppercase'} fontWeight={'normal'} fontSize='xl'>
            CLAIM YOUR
            <br />
            SHELL TOKENS
          </Text>
        </Button>
        <Box w={['200px', '300px']} m='auto'>
          <Image
            alt='trip-shell'
            src={TripShell}
            height={100}
            width={100}
            style={{ height: 'auto', width: '100%' }}
          />
        </Box>

        {isOpen && <Slider slides={Slides} resetHandler={resetHandler} />}
      </div>
    </>
  );
};

export default Lore;
