import React, { useState, useEffect } from 'react';
import { Box, IconButton, HStack } from '@chakra-ui/react';
import ArrowBackIcon from '@/components/General/Icons/ArrowBackIcon';
import ArrowForwardIcon from '@/components/General/Icons/ArrowForwardIcon';

const Slider = ({ resetHandler, slides }: any) => {
  function disableScroll() {
    console.log('scrolld disabled');
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
    console.log('enable scroll');
    window.onscroll = function () {};
  }

  useEffect(() => {
    disableScroll();
    return () => {
      enableScroll();
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Box
      overflowY={['scroll', 'scroll', 'scroll', 'hidden']}
      height={['100%', '100vh']}
      style={{
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        background: '#373A49',
        width: 'fit-content',
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}
    >
      <HStack
        display={['flex', 'none', 'none', 'none']}
        w='100%'
        justifyContent='space-between'
        p='30px 20px 0px 20px'
      >
        <IconButton
          display={['block', 'none', 'none', 'none']}
          zIndex={9999}
          h='40px'
          w='40px'
          minHeight={'40px'}
          minWidth={'40px'}
          borderRadius={'100%'}
          borderWidth={'2px'}
          variant={'outline'}
          color={'white'}
          borderColor={'white'}
          onClick={currentPage === 1 ? resetHandler : prevPage}
          _hover={{
            background: 'none',
            color: 'white',
          }}
          background='none'
          aria-label='Back Arrow'
          icon={<ArrowBackIcon fontSize={25} />}
        />
        <IconButton
          display={[
            currentPage === slides.length ? 'none' : 'flex',
            'none',
            'none',
            'none',
          ]}
          zIndex={9999}
          h='40px'
          w='40px'
          minHeight={'40px'}
          minWidth={'40px'}
          borderRadius={'100%'}
          borderWidth={'2px'}
          variant={'outline'}
          color={'#FFEE57'}
          borderColor={'#FFEE57'}
          onClick={currentPage === slides.length ? resetHandler : nextPage}
          _hover={{
            background: 'none',
            color: '#FFEE57',
          }}
          background='none'
          aria-label='Back Arrow'
          icon={<ArrowForwardIcon fontSize={25} />}
        />
      </HStack>

      <Box
        display={['none', 'flex', 'flex', 'flex']}
        alignItems={'center'}
        position={'absolute'}
        justifyContent={'flex-end'}
        h='100%'
        left={0}
        w='15vw'
        zIndex={9999}
      >
        <IconButton
          _hover={{
            background: 'none',
          }}
          variant='ghost'
          color={'#FFEE57'}
          onClick={currentPage === 1 ? resetHandler : prevPage}
          background='none'
          aria-label='Back Arrow'
          icon={<ArrowBackIcon fontSize={120} />}
        />
      </Box>
      <Box
        display={['none', 'flex', 'flex', 'flex']}
        alignItems={'center'}
        justifyContent={'flex-start'}
        position={'absolute'}
        right='0'
        h='100%'
        w='15vw'
        zIndex={9999}
      >
        <Box
          css={{
            mask: 'linear-gradient(to right, transparent 1%, #363947 99%)',
            backdropFilter: 'blur(100px)',
          }}
          position='absolute'
          height='100%'
          width='100%'
        ></Box>
        <IconButton
          display={currentPage === slides.length ? 'none' : 'flex'}
          _hover={{
            background: 'none',
          }}
          variant='ghost'
          color={'#FFEE57'}
          onClick={currentPage === slides.length ? resetHandler : nextPage}
          background='none'
          aria-label='Back Arrow'
          icon={<ArrowForwardIcon fontSize={120} />}
        />
      </Box>
      <div>
        {slides.map(
          (Slide: any, i: number) => currentPage == i + 1 && <Slide key={i} />
        )}
      </div>
      <HStack w='100%' justifyContent='space-between' p='10px 10px 30px 10px'>
        <IconButton
          display={['block', 'none', 'none', 'none']}
          zIndex={9999}
          h='40px'
          w='40px'
          minHeight={'40px'}
          minWidth={'40px'}
          borderRadius={'100%'}
          borderWidth={'2px'}
          variant={'outline'}
          color={'white'}
          borderColor={'white'}
          onClick={currentPage === 1 ? resetHandler : prevPage}
          _hover={{
            background: 'none',
            color: 'white',
          }}
          background='none'
          aria-label='Back Arrow'
          icon={<ArrowBackIcon fontSize={25} />}
        />
        <IconButton
          display={[
            currentPage === slides.length ? 'none' : 'flex',
            'none',
            'none',
            'none',
          ]}
          zIndex={9999}
          h='40px'
          w='40px'
          minHeight={'40px'}
          minWidth={'40px'}
          borderRadius={'100%'}
          borderWidth={'2px'}
          variant={'outline'}
          color={'#FFEE57'}
          borderColor={'#FFEE57'}
          onClick={currentPage === slides.length ? resetHandler : nextPage}
          _hover={{
            background: 'none',
            color: '#FFEE57',
          }}
          background='none'
          aria-label='Back Arrow'
          icon={<ArrowForwardIcon fontSize={25} />}
        />
      </HStack>
    </Box>
  );
};

export default Slider;
