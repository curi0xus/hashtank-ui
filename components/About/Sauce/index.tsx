import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect, useRef, RefObject } from 'react';
import Slider from '../Shared/Slider';
import SaucesSlider from './SauceSlider';
import SauceDescription from './Description';
import {
  Text,
  Flex,
  Box,
  IconButton,
  Button,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import PageLayout from '../Shared/PageLayout';
import ArrowForwardIcon from '@/components/General/Icons/ArrowForwardIcon';
import HermitImage from 'public/static/images/About/bottles/empty.webp';
import SiameseImage from 'public/static/images/About/bottles/full.webp';

const FishAnimation = ({ dataRef }: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  const headerStyle = useSpring({
    config: { duration: 1000 },
    from: { opacity: 0, rotate: 0, left: 0 },
    to: {
      opacity: dataRef?.isIntersecting ? 1 : 1,
      rotate: dataRef?.isIntersecting ? (isNotMobile ? 28 : 21) : 0,
      left: dataRef?.isIntersecting ? (isNotMobile ? 80 : 30) : 0,
    },
    delay: 300,
  });

  return (
    <animated.div
      style={{
        bottom: '0%',
        height: '100%',
        width: 'fit-content',
        position: 'absolute',
        ...headerStyle,
      }}
    >
      <Image
        style={{ height: '100%', width: 'auto' }}
        src={SiameseImage}
        alt='Swimming Siamese'
        height={100}
        width={100}
      />
    </animated.div>
  );
};

const NounAnimation = ({ dataRef }: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  const headerStyle = useSpring({
    config: { duration: 1000 },
    from: { opacity: 0, rotate: 0 },
    to: {
      opacity: dataRef?.isIntersecting ? 1 : 0,
      rotate: dataRef?.isIntersecting ? (isNotMobile ? 11 : 4) : 0,
    },
    delay: 300,
  });

  return (
    <animated.div
      style={{
        left: 0,
        bottom: '0%',
        height: '100%',
        width: 'fit-content',
        position: 'absolute',
        ...headerStyle,
      }}
    >
      <Image
        style={{ height: '90%', width: 'auto', opacity: 0.6 }}
        src={HermitImage}
        alt='Swimming Nouns'
        height={100}
        width={100}
      />
    </animated.div>
  );
};

const Noun2Animation = ({ dataRef }: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  const headerStyle = useSpring({
    config: { duration: 1000 },
    from: { opacity: 0, rotate: 0, left: 0 },
    to: {
      opacity: dataRef?.isIntersecting ? 1 : 0,
      rotate: dataRef?.isIntersecting ? (isNotMobile ? -4 : -11) : 0,
      left: dataRef?.isIntersecting ? (isNotMobile ? -80 : -40) : 0,
    },
    delay: 300,
  });

  return (
    <animated.div
      style={{
        bottom: '0%',
        height: '100%',
        width: 'fit-content',
        position: 'absolute',
        ...headerStyle,
      }}
    >
      <Image
        style={{ height: '90%', width: 'auto', opacity: 0.3 }}
        src={HermitImage}
        alt='Swimming Nouns'
        height={100}
        width={100}
      />
    </animated.div>
  );
};
const Slides = [() => <SauceDescription />, () => <SaucesSlider />];

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

const Sauce = () => {
  const [isOpen, setOpen] = useState(false);
  const triggerRef: RefObject<HTMLDivElement | null | undefined> =
    useRef() as RefObject<HTMLDivElement>;
  const dataRef = useIntersectionObserver(triggerRef, {
    freezeOnceVisible: false,
  });

  const resetHandler = () => {
    setOpen(false);
  };
  const scrollIntoView = () => {
    const element = document.querySelector('#sauce');
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
        id='sauce'
        style={{
          height: 'fit-content',
          background: '#373A49',
          width: '100vw',
        }}
      >
        <PageLayout
          padding={[
            '0vh 10vw',
            '0vh 15vw',
            '0vh 15vw',
            '0vh 15vw 20vw 15vw',
            '0vh 10vw 0vh 10vw',
          ]}
        >
          <Box
            pb={['50px', '10vh', '10vh', 0]}
            mt={['150px', '10vh', '10vh', 0]}
            h='100%'
            w='100%'
            position='relative'
          >
            <Flex direction={['column', 'column', 'column', 'row']} h='100%'>
              <Box
                order={[2, 2, 2, 1]}
                alignSelf={'center'}
                h='fit-content'
                w={['100%', '100%', '100%', '100%', '60%']}
              >
                <Text
                  fontWeight={'bold'}
                  textTransform={'uppercase'}
                  fontSize={['4.5xl', '5xl']}
                  color='#FFEE57'
                >
                  the sauce
                </Text>
                {[
                  "With ample inputs at your disposal, it's time to delve into the saucing process. Your compatriots from a parallel industry supply the essential factors of production, and Mrs. Ching reigns supreme in this domain. Optimize your selection of fish, and the rest becomes history.",
                  'Can you concoct the secret recipe for sauce nirvana?',
                ].map((desc: string) => (
                  <Text
                    lineHeight={1.2}
                    m='2vh 0'
                    fontWeight={'normal'}
                    fontSize={['sm', 'md']}
                    key={desc}
                  >
                    {desc}
                  </Text>
                ))}
                {/* @ts-ignore */}
                <div ref={triggerRef}></div>
                <Flex
                  onClick={() => {
                    scrollIntoView();
                    setOpen(true);
                  }}
                  cursor={'pointer'}
                  justify={'flex-start'}
                  display={['none', 'none', 'none', 'flex']}
                  alignItems={'flex-start'}
                  mt={10}
                >
                  <Text
                    transform={'translateX(0vw)'}
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    fontSize={'xl'}
                    color='#FFEE57'
                    mr={5}
                  >
                    SEE THE TYPES OF SAUCES
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

              <Box
                order={[1, 1, 1, 2]}
                h={['50vh', '50vh', '50vh', '50vh', '55vh', '65vh']}
                position='relative'
                w={['100%', '100%', '65%', '100%', '40%', '40%']}
              >
                <Noun2Animation dataRef={dataRef} />
                <NounAnimation dataRef={dataRef} />
                <FishAnimation dataRef={dataRef} />
              </Box>
              <Box order={3} display={'flex'} justifyContent={'flex-end'}>
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

export default Sauce;
