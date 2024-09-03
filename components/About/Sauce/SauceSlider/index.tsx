import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
import Flavours from './Flavours';
import { SAUCES } from './Flavours/constant';
import { Text, useMediaQuery } from '@chakra-ui/react';
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
          debounce(
            (evt: any) => {
              evt.preventDefault();
              if (evt.deltaY >= 1) {
                scrollNext();
              }

              if (evt.deltaY <= -1) {
                scrollPrev();
              }
            },
            100,
            true
          ),
          { passive: true }
        );
      }
    }

    return () => {
      document.removeEventListener(
        'wheel',
        debounce(
          (evt: any) => {
            evt.preventDefault();
            if (evt.deltaY >= 1) {
              scrollNext();
            }

            if (evt.deltaY <= -1) {
              scrollPrev();
            }
          },
          300,
          true
        )
      );
    };
  }, [embla]);

  return (
    <div className='embla' data-axis={'x'}>
      <div ref={emblaRef} className='embla__viewport'>
        {embla?.canScrollPrev() && (
          <DoubleArrowForward
            transform={'rotate(180deg)'}
            zIndex={99999999}
            display={['flex', 'none']}
            position='fixed'
            top='50%'
            left='20px'
            color='#FFEE57'
            fontSize={50}
          />
        )}{' '}
        {embla?.canScrollNext() && (
          <DoubleArrowForward
            zIndex={99999999}
            display={['flex', 'none']}
            position='fixed'
            top='50%'
            right='20px'
            color='#FFEE57'
            fontSize={50}
          />
        )}
        <div className='embla__container'>
          {React.Children.map(children, (Child, index) => (
            <div className='embla__slide' key={index}>
              <div className='embla__slide__inner'>{Child}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SaucesSlider = () => {
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
    <div>
      <Text
        mt='5vh'
        w='100%'
        textAlign={'center'}
        textTransform={'uppercase'}
        color={'brand.700'}
        fontWeight={'bold'}
        fontSize={['5xl']}
        display={['none', 'block']}
      >
        4 different tiers of flavour
      </Text>

      <Text
        m='5vh auto 0 auto'
        w='85%'
        textAlign={'left'}
        textTransform={'uppercase'}
        color={'brand.900'}
        fontWeight={'bold'}
        fontSize={['4xl']}
        display={['block', 'none']}
      >
        the 4 sauces
      </Text>
      <EmblaCarouselComponent>
        {SAUCES.map((sauce: any) => (
          <Flavours key={sauce.gradeName} {...sauce} />
        ))}
      </EmblaCarouselComponent>
    </div>
  );
};

export default SaucesSlider;
