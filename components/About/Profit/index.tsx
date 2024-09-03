import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect, useRef, RefObject } from 'react';
import Slider from '../Shared/Slider';
import ProfitSlider from './ProfitSlider';
import { Text, Flex, Box, IconButton, Button } from '@chakra-ui/react';
import Image from 'next/image';
import PageLayout from '../Shared/PageLayout';
import ArrowForwardIcon from '@/components/General/Icons/ArrowForwardIcon';
import Tank from 'public/static/images/About/tank.webp';
import Link from 'next/link';

const Slides = [() => <ProfitSlider />];

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

const MobileAnimation = ({ dataRef }: any) => {
  const headerStyle = useSpring({
    config: { duration: 1000 },
    from: { opacity: 0, left: '-40%' },
    to: {
      opacity: dataRef?.isIntersecting ? 1 : 0,
      left: dataRef?.isIntersecting ? '10%' : '-40%',
    },
    delay: 800,
  });

  return (
    <animated.div
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        ...headerStyle,
      }}
    >
      <Image
        style={{ height: 'auto', width: '100%' }}
        src={Tank}
        alt='Profit Tank'
        height={100}
        width={100}
      />
    </animated.div>
  );
};

const Profit = () => {
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
    const element = document.querySelector('#profit');
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
        id='profit'
        style={{
          marginTop: '5vh',
          height: 'fit-content',
          background: '#373A49',
          width: '100vw',
        }}
      >
        <Box position='relative' w={['100%', '66%', '65%', '65%', '40%']}>
          <MobileAnimation dataRef={dataRef} />
        </Box>

        <PageLayout>
          <Box
            mt={[0, '10vh']}
            mb={['5vh']}
            h={['80vh', '75vh', '90vh', '75vh', '70vh']}
            w='100%'
            position='relative'
          >
            <Flex
              left={0}
              top={0}
              position={'absolute'}
              direction={['column', 'column', 'column', 'row']}
              h='100%'
            >
              <Box
                position='relative'
                h={['30%', '40%', '40%', '100%']}
                w='40%'
              ></Box>
              <Box
                alignSelf={'flex-end'}
                h='fit-content'
                w={['100%', '100%', '100%', '100%', '60%']}
              >
                <Text
                  fontWeight={'bold'}
                  textTransform={'uppercase'}
                  fontSize={['4.5xl', '5xl']}
                  color='#FFEE57'
                >
                  3.Profit
                </Text>
                <Text
                  lineHeight={1.2}
                  mt='2vh'
                  mb='6vh'
                  fontWeight={'normal'}
                  fontSize={['sm', 'md']}
                >
                  If you created a sauce, you will be able to
                  <Link
                    href='/'
                    style={{ color: '#FFEE57', textDecoration: 'underline' }}
                  >
                    {' '}
                    SELL IT AT THE SUPERMARKET
                  </Link>{' '}
                  for a profit. There are also upcoming ways to earn ⌘SHELL in
                  the roadmap like the Aquarium. Alternatively, you can redeem
                  the sauce for a physical bottle in the real world.
                </Text>
                <Flex
                  cursor={'pointer'}
                  onClick={() => {
                    scrollIntoView();
                    setOpen(true);
                  }}
                  display={['none', 'none', 'none', 'flex']}
                  alignItems={'start'}
                >
                  <Text
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    fontSize={'xl'}
                    color='#FFEE57'
                    mr={5}
                  >
                    SAUCE PROFITEERING
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
            {/* @ts-ignore */}
            <div ref={triggerRef} />
          </Box>
        </PageLayout>

        {/* {isOpen && <Slider resetHandler={resetHandler} />} */}
        {isOpen && <Slider slides={Slides} resetHandler={resetHandler} />}
      </div>
    </>
  );
};

export default Profit;
