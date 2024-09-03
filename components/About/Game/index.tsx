import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect, useRef, RefObject } from 'react';
import Slider from '../Shared/Slider';
import Roadmap from './Roadmap';
import { Text, Divider, Flex, Box, IconButton, Button } from '@chakra-ui/react';
import Image from 'next/image';
import PageLayout from '../Shared/PageLayout';
import ArrowForwardIcon from '@/components/General/Icons/ArrowForwardIcon';
import HermitImage from 'public/static/images/About/game/Hermit.webp';
import SiameseImage from 'public/static/images/About/game/Siamese.webp';
import Link from 'next/link';

const Slides = [() => <Roadmap />];

function useIntersectionObserver(
  elementRef: any,
  { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false }
) {
  const [entry, setEntry] = useState<any>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: any) => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return entry;
}

const FishAnimation = ({ dataRef }: any) => {
  const headerStyle = useSpring({
    config: { duration: 1000 },
    from: { opacity: 0, left: '-40%' },
    to: {
      opacity: dataRef?.isIntersecting ? 1 : 0,
      left: dataRef?.isIntersecting ? '10%' : '-40%',
    },
    // delay: 500,
  });

  return (
    <animated.div
      style={{
        bottom: '40%',
        height: 'fit-content',
        width: '100%',
        position: 'absolute',
        ...headerStyle,
      }}
    >
      <Image
        style={{ height: 'auto', width: '100%' }}
        src={SiameseImage}
        alt='Swimming Siamese'
        height={100}
        width={100}
      />
    </animated.div>
  );
};

const NounAnimation = ({ dataRef }: any) => {
  const headerStyle = useSpring({
    config: { duration: 1000 },
    from: { opacity: 0, left: '100%' },
    to: {
      opacity: dataRef?.isIntersecting ? 1 : 0,
      left: dataRef?.isIntersecting ? '-30%' : '100%',
    },
    // delay: 500,
  });

  return (
    <animated.div
      style={{
        bottom: '0%',
        height: 'fit-content',
        width: '100%',
        position: 'absolute',
        ...headerStyle,
      }}
    >
      <Image
        style={{ height: 'auto', width: '100%' }}
        src={HermitImage}
        alt='Swimming Nouns'
        height={100}
        width={100}
      />
    </animated.div>
  );
};

const Game = () => {
  const [isOpen, setOpen] = useState(false);
  const triggerRef: RefObject<HTMLDivElement | null | undefined> =
    useRef() as RefObject<HTMLDivElement>;
  const dataRef = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: true,
  });

  const resetHandler = () => {
    setOpen(false);
  };
  const scrollIntoView = () => {
    const element = document.querySelector('#game');
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
        id='game'
        style={{
          height: 'fit-content',
          background: '#373A49',
          width: '100vw',
        }}
      >
        <PageLayout>
          <Text
            lineHeight={1.1}
            textTransform={'uppercase'}
            color='brand.900'
            fontWeight={'bold'}
            fontSize={['4.5xl', '5xl']}
            mb={['2vh']}
          >
            3 SIMPLE STEPS TO EARN SHELLS
          </Text>
          <Divider opacity={1} borderBottomWidth={3} mb={[10, 10]} />
          <Box
            transform={[
              '0',
              '0',
              '0',
              'translate(20%, -20%)',
              'translateX(20%)',
              'translate(20%, 25%)',
            ]}
            h={['40vh', '40vh', '40vh', '60vh', '60vh', '60vh']}
            position='relative'
            w={['100%', '75%', '55%', '50%', '40%', '35%']}
          >
            <FishAnimation dataRef={dataRef} />
            <NounAnimation dataRef={dataRef} />
          </Box>

          <Box
            h={['40vh', '45vh', '40vh', '15vh', '10vh']}
            w='100%'
            position='relative'
          >
            {/* @ts-ignore */}
            <div ref={triggerRef} />
            <Flex
              left={'-2%'}
              top={0}
              position={'absolute'}
              direction={['column', 'column', 'column', 'row']}
              h='100%'
              maxW={'100%'}
            >
              <Box
                h={['50vh', '40vh', '40vh', '60vh', '60vh', '60vh']}
                position='relative'
                w={['100%', '75%', '55%', '100%', '40%', '35%']}
              ></Box>
              {/* <Box
                transform={[
                  '0',
                  '0',
                  '0',
                  'translate(20%, -20%)',
                  'translateX(20%)',
                  'translateX(40%)',
                ]}
                h={['40vh', '40vh', '40vh', '60vh', '60vh', '60vh']}
                position='relative'
                w={['100%', '75%', '55%', '100%', '40%', '40%']}
              >
                <FishAnimation dataRef={dataRef} />
                <NounAnimation dataRef={dataRef} />
              </Box> */}
              <Box
                alignSelf={'flex-end'}
                h='fit-content'
                w={['100%', '100%', '100%', '100%', '63%']}
              >
                <Text
                  fontWeight={'bold'}
                  textTransform={'uppercase'}
                  fontSize={['4.5xl', '5xl']}
                  color='#FFEE57'
                >
                  1.Auction
                </Text>
                <Text
                  lineHeight={1.2}
                  width={['100%', '105%']}
                  mt='2vh'
                  mb='6vh'
                  fontWeight={'normal'}
                  fontSize={['sm', 'md']}
                >
                  <Link
                    href='/claim'
                    style={{ color: '#FFEE57', textDecoration: 'underline' }}
                  >
                    Claim 100 free SHELL tokens
                  </Link>
                  , HASHTANK’s native currency, and head over to the{' '}
                  <Link
                    href='/auction'
                    style={{ color: '#FFEE57', textDecoration: 'underline' }}
                  >
                    AUCTION FLOOR
                  </Link>{' '}
                  to bid for creatures. Each auction brings about a different
                  family/species of marine life with different attributes that
                  will affect the result of your breeding or saucing endeavours.
                </Text>
                <Flex
                  onClick={() => {
                    scrollIntoView();
                    setOpen(true);
                  }}
                  cursor={'pointer'}
                  justifyContent='flex-start'
                  display={['none', 'none', 'none', 'flex']}
                >
                  <Text
                    // transform={'translateX(4vw)'}
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    fontSize={'xl'}
                    color='#FFEE57'
                    mr={5}
                  >
                    SEE COMING BATCHES
                  </Text>
                  <IconButton
                    ml={0}
                    display={['none', 'none', 'none', 'flex']}
                    _hover={{
                      background: 'none',
                    }}
                    variant='ghost'
                    color={'#FFEE57'}
                    background='none'
                    aria-label='Back Arrow'
                    icon={<ArrowForwardIcon fontSize={60} />}
                  />
                </Flex>
              </Box>
              <Box display={'flex'} justifyContent={'flex-end'}>
                <Button
                  display={['block', 'block', 'block', 'none']}
                  onClick={() => {
                    scrollIntoView();
                    setOpen(true);
                  }}
                  mt={'2vh'}
                  color='white'
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
          </Box>
        </PageLayout>

        {/* {isOpen && <Slider resetHandler={resetHandler} />} */}
        {isOpen && <Slider slides={Slides} resetHandler={resetHandler} />}
      </div>
    </>
  );
};

export default Game;
