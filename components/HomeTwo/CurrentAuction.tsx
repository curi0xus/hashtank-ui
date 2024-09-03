import React from 'react';
import SectionLayout from './Shared/SectionLayout';
import { Stack, Flex, Text, Button, Box, Divider } from '@chakra-ui/react';
import useAuctionDetails from '@/hooks/useAuctionDetails';
import HashTankCountdownTimer, { formatCountdownTime } from '../CountdownTimer';

const CurrentAuctionSection = ({ background, height }: any) => {
  const {
    batchStatus,
    batchName,
    batchNumber,
    batchDescription,
    endAtTsInMs,
    humanReadableStartTimeDMMMMYYYY,
    batchContentDefined,
  } = useAuctionDetails();

  return (
    <SectionLayout background={background} height={height}>
      <Flex
        pt={['10%', '0%', '6%', '15%', '5%']}
        height='100%'
        direction={['column', 'row']}
        justify={['flex-start', 'flex-end']}
        alignItems={['center', 'center', 'flex-start']}
      >
        {/* <Box h='100%' w={['0', '40%', '35%', '40%', '50%']} />
        <Box p={['15vmin 0 0 0']} display={['block', 'none']}>
          <Image src={MobileLogo} alt='Hashtank Mobile Logo' />
        </Box> */}
        <Stack
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          width={['85%', '60%', '60%', '50%']}
        >
          <Flex>
            <Text
              textTransform={'uppercase'}
              fontWeight={'bold'}
              // fontSize='xl'
              fontSize={['md', 'md', 'lg', 'xl']}
            >
              BATCH 0{batchNumber}
            </Text>
            <Text
              ml='5px'
              mr='5px'
              textTransform={'uppercase'}
              fontWeight={'normal'}
              fontSize={['md', 'md', 'lg', 'xl']}
            >
              -
            </Text>
            {humanReadableStartTimeDMMMMYYYY && (
              <Text
                textTransform={'uppercase'}
                fontWeight={'normal'}
                fontSize={['md', 'md', 'lg', 'xl']}
              >
                {/* 28 April 2023 */}
                {humanReadableStartTimeDMMMMYYYY}
              </Text>
            )}
          </Flex>
          <Text
            textTransform={'uppercase'}
            color='brand.900'
            fontWeight={'bold'}
            fontSize={['3xl', '3xl', '4xl', '5xl']}
          >
            {/* Sea of galilee */}
            {batchName || '-'}
          </Text>
          <Divider
            width='13%'
            opacity={1}
            borderColor='white'
            borderWidth={'1.5px'}
          />
          <Flex
            direction={['column', 'row', 'row']}
            alignItems={['flex-start', 'center', 'center']}
          >
            <Stack>
              <Text
                maxW={'fit-content'}
                fontWeight={'normal'}
                fontSize={['md', 'md', 'lg', 'xl']}
              >
                fish in collection
              </Text>
              <Text
                fontWeight={'normal'}
                fontSize={['4xl', '2xl', '3xl', '4xl']}
              >
                {batchContentDefined?.length ? batchContentDefined.length : '-'}
              </Text>
              {/* <Flex alignItems={'center'}>
                <Text fontWeight={'normal'} fontSize={['4xl', '3xl', '4xl']}>
                  24
                </Text>
                <Text
                  transform={'translateY(5px)'}
                  fontWeight={'normal'}
                  fontSize={['xl', 'lg', 'xl']}
                >
                  /38
                </Text>
              </Flex> */}
            </Stack>
            <Flex
              justifyContent={['flex-start', 'center']}
              alignItems={['flex-start', 'center']}
            >
              <Box
                display={['none', 'block']}
                w={['5px !important', 5, 19]}
                h={['5px !important', 5, 19]}
                m={['10px 10px', '0 72px']}
                background='white'
                borderRadius='100%'
              />
            </Flex>
            <Stack mt={['10px', 0]}>
              <Text fontWeight={'normal'} fontSize={['md', 'md', 'lg', 'xl']}>
                {batchStatus === 1
                  ? 'remaining auction time'
                  : 'auction status'}
              </Text>

              {endAtTsInMs && batchStatus === 1 ? (
                <HashTankCountdownTimer
                  renderer={({
                    days,
                    hours,
                    minutes,
                    seconds,
                    completed,
                  }: any) => {
                    return (
                      <Text
                        fontWeight={'normal'}
                        fontSize={['4xl', '2xl', '3xl', '4xl']}
                      >
                        {formatCountdownTime(days)}:{formatCountdownTime(hours)}
                        :{formatCountdownTime(minutes)}:
                        {formatCountdownTime(seconds)}
                      </Text>
                    );
                  }}
                  date={endAtTsInMs}
                />
              ) : (
                <Text
                  color={batchStatus === 3 ? '#A0FF56' : '#FF2020'}
                  textTransform={'uppercase'}
                  fontWeight={'normal'}
                  fontSize={['4xl', '3xl', '4xl']}
                >
                  {batchStatus === 2
                    ? 'CLOSED'
                    : batchStatus === 3
                    ? 'REVEALED'
                    : '-'}
                </Text>
              )}
            </Stack>
          </Flex>
          <Divider
            width='13%'
            opacity={1}
            borderColor='white'
            borderWidth={'1.5px'}
          />
          <Box
            m={[
              '10px 0 10px 0!important',
              '10px 0 10px 0!important',
              '1vh 0 2vh 0 !important',
              '2vw 0 3vw 0 !important',
            ]}
          >
            <Text
              maxW={['100%', '85%', '85%', '85z5', '65%']}
              fontWeight={'normal'}
              fontSize={['xs', 'xs', 'sm', 'sm']}
            >
              {batchDescription}
            </Text>
          </Box>
          <Box
            mr={['auto !important', '0 !important']}
            ml={['auto !important', '0 !important']}
            mt={['45vmin !important', '0 !important']}
            transform={['translateY(-50px)', 'none !important']}
          >
            <Button
              onClick={() => (window.location.href = '/auction')}
              maxW={'60vw'}
              p={['25px', '15px 25px', '30px 50px']}
              _hover={{
                background: 'white',
                color: 'brand.900',
              }}
              background={'brand.900'}
              color='white'
            >
              <Text
                textTransform={'uppercase'}
                fontWeight={'medium'}
                fontSize={['md', 'sm', 'lg', 'xl']}
              >
                {batchStatus === 3 ? 'view collection' : 'go to auction floor'}
              </Text>
            </Button>
          </Box>
        </Stack>
      </Flex>
    </SectionLayout>
  );
};

export default CurrentAuctionSection;
