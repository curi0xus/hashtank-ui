import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { NotAllowedIcon } from '@chakra-ui/icons';
import useSelectedBroodFish from '@/hooks/LoveSauceProgram/useSelectedBroodFish';
import useSelectedFishIds from '@/hooks/SauceFactory/useSelectedFishIds';
import scrollToId from '@/util/scrollToId';

const CallToAction = ({
  isSelected,
  isBreeding,
  isSauceFactory,
  isLoveSauceProgram,
  isBroodFish,
  isOffSpring,
  nftId,
  ...props
}: any) => {
  const isExitBtn =
    (isLoveSauceProgram && isBroodFish) || (isLoveSauceProgram && isOffSpring);
  const { addSelectedBroodFish } = useSelectedBroodFish();
  const { addSelectedFish } = useSelectedFishIds();
  return (
    <Box>
      <Box
        css={{
          left: 0,
          bottom: 30,
          borderRadius: '6px',
          background: 'brand.700',
          position: 'absolute',
          mask: 'linear-gradient(transparent, black, black)',
          backdropFilter: 'blur(20px)',
          height: '110px',
          width: '100%',
        }}
      ></Box>
      <Flex
        flexDir={['column', 'row']}
        pl={[0, '80px']}
        pr={[0, '80px']}
        alignItems={'center'}
        gap={[0, '30px']}
        justifyContent={'center'}
        w='100%'
      >
        {!isBreeding && !isSauceFactory && !isLoveSauceProgram && (
          <Button
            color='white'
            _hover={{
              bg: 'white',
              color: 'brand.900',
            }}
            mt={['10px', '0']}
            mb={['0px', 0, 0, '28px']}
            w={['60%', '35%']}
            bg='brand.900'
            p='3'
            height='fit-content'
            // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
          >
            <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize='md'>
              {isSelected ? 'remove from tank' : 'send to tank'}
            </Text>
          </Button>
        )}
        {isExitBtn ? (
          <Button
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              props.closeModalsList?.map((each: any) => each?.(e));
            }}
            color='white'
            _hover={{
              bg: '#3D4B65',
              color: 'white',
            }}
            mb={['0px', 0, 0, '28px']}
            w={['60%', '35%']}
            bg='#3D4B65'
            p='3'
            height='fit-content'
          >
            <Text
              textTransform={'uppercase'}
              fontWeight={'medium'}
              fontSize='md'
            >
              exit
            </Text>
          </Button>
        ) : isBreeding ? (
          <Button
            color='white'
            _hover={{
              bg: '#212431',
              color: 'white',
            }}
            mb={['0px', 0, 0, '28px']}
            w={['60%', '35%']}
            bg='#212431'
            p='3'
            height='fit-content'
            leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'30px'} />}
          >
            <Text
              textTransform={'uppercase'}
              fontWeight={'medium'}
              fontSize='md'
            >
              locked
            </Text>
          </Button>
        ) : isLoveSauceProgram ? (
          <Button
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              addSelectedBroodFish(nftId);
              scrollToId('loveSauceProgramEnrolment');
            }}
            color='white'
            _hover={{
              bg: 'white',
              color: 'brand.900',
            }}
            mb={['0px', 0, 0, '28px']}
            w={['60%', '35%']}
            bg='brand.900'
            p='3'
            height='fit-content'
            // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
          >
            <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize='md'>
              add to program
            </Text>
          </Button>
        ) : (
          <Button
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              addSelectedFish(nftId);
            }}
            color='white'
            _hover={{
              bg: 'white',
              color: 'brand.900',
            }}
            mb={['0px', 0, 0, '28px']}
            w={['60%', '35%']}
            bg='brand.900'
            p='3'
            height='fit-content'
            // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
          >
            <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize='md'>
              select fish
            </Text>
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default CallToAction;
