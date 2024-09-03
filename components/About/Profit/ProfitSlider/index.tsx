import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Flavours from './Opportunities';
import { OPPORTUNITIES } from './Opportunities/constant';
import { Text, useMediaQuery, Box } from '@chakra-ui/react';
import DoubleArrowForward from '@/components/General/Icons/DoubleArrowForward';

type Axis = 'x' | 'y';

function debounce(func: any, wait: any, immediate = false) {
  let timeout: any;

  return function () {
    // @ts-ignore
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

const EmblaCarouselComponent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isNotMobileDevice] = useMediaQuery('(min-width: 800px)', {
    ssr: true,
    fallback: false,
  });
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: false, skipSnaps: true, axis: 'x' },
    [
      WheelGesturesPlugin({
        forceWheelAxis: 'x',
        target: undefined,
      }),
    ]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  useEffect(() => {
    if (embla) {
      const onSelect = () => {
        setSelectedIndex(embla.selectedScrollSnap());
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
      };

      setScrollSnaps(embla.scrollSnapList());
      embla.on('select', onSelect);
      onSelect();

      if (isNotMobileDevice) {
        document.addEventListener(
          'wheel',
          debounce((evt: any) => {
            evt.preventDefault();
            if (evt.deltaY > 1) {
              scrollNext();
            }

            if (evt.deltaY < -1) {
              scrollPrev();
            }
          }, 300),
          { passive: true }
        );
      }
    }
  }, [embla]);

  return (
    <div className='embla' data-axis={'x'}>
      <div ref={emblaRef} className='embla__viewport'>
        {embla?.canScrollPrev() && (
          <DoubleArrowForward
            zIndex={99999999}
            transform={'rotate(180deg)'}
            display={['block', 'none']}
            position='fixed'
            top='50%'
            left='20px'
            color='#FFEE57'
            fontSize={50}
          />
        )}
        {embla?.canScrollNext() && (
          <DoubleArrowForward
            display={['block', 'none']}
            position='fixed'
            top='50%'
            right='20px'
            color='#FFEE57'
            fontSize={50}
          />
        )}
        <div className='embla__container__profit'>
          {React.Children.map(children, (Child, index) => (
            <div className='embla__slide__profit' key={index}>
              <div className='embla__slide__inner'>{Child}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfitSlider = () => {
  function disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    // if any scroll is attempted,
    // set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    window.onscroll = function () {};
  }

  useEffect(() => {
    disableScroll();
    return () => {
      enableScroll();
    };
  }, []);
  return (
    <Box
      flexDir='column'
      display={'flex'}
      p={['30px 20px 0px 20px', '0vh 0 0 0vw']}
    >
      <Text
        mt='5vh'
        w={['95%', '80%']}
        pl={[0, '15vw']}
        fontWeight='normal'
        textAlign={'left'}
        color={'white'}
        fontSize={['sm', 'md']}
        display={['none', 'block']}
      >
        Profit or personal enjoyment—such is the decision for every bottle of
        fish sauce, be it produced or owned. Let&apos;s delve into what each
        option entails.
      </Text>

      <EmblaCarouselComponent>
        {OPPORTUNITIES.map((sauce: any) => (
          <Flavours key={sauce.gradeName} {...sauce} />
        ))}
      </EmblaCarouselComponent>
    </Box>
  );
};

export default ProfitSlider;
