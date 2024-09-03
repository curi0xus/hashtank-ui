import React from 'react';
import { Box, Text, Flex, VStack, HStack, Progress } from '@chakra-ui/react';
import TextBlock from '../General/Shared/TextBlock';
import HashTankCountdownTimer, {
  formatCountdownTime,
} from '@/components/CountdownTimer';
import useFetchTotalClaims from '@/new-hooks/claims/useFetchTotalClaims';

const PARAGRAPHS = [
  "Welcome, esteemed one. You've been handpicked by us to be true elites of our world.",
  "Hashtank is a game of capital accumulation rooted in game theory. A game, you, of all know too well. After all, isn't that what propelled you to the upper echelons of society?",
  'Accumulating and hoarding ⌘SHELL is the penultimate goal of capitalists. For the fish saving plebeians of the world, they may yet draw a line in the sand. Raging conservation against a dying, corrupt world.',
  'Choose wisely. There is no right or wrong. Just unyielding self preservation. ',
  "Here is a 100 ⌘SHELL to get you started. You probably don't need it. Definitely don't deserve it. But hey! When was the last time true elites did an honest day's work?",
];

const ShellIntroduction = () => {
  const { data: totalClaimed } = useFetchTotalClaims();
  const endAtTsInMs = new Date().getTime() + 1000000000;
  const TOTAL_SLOTS = 100;
  const left = TOTAL_SLOTS - totalClaimed;
  const progress = (totalClaimed / TOTAL_SLOTS) * 100;
  return (
    <Box
      p={[
        '20vw 8vw 0vw 8vw',
        '20vw 15vw 0vh 15vw',
        '20vw 15vw 0 15vw',
        '20vw 15vw 0vh 15vw',
        '20vw 16vw 10vh 16vw',
        '10vw 16vw 0vh 16vw',
      ]}
    >
      <TextBlock
        title='Claim your bottle of sauce legacy'
        paragraphs={PARAGRAPHS}
      />
      <Flex
        mt={['54px', '54px', '54px', '100px', '200px']}
        mb={['0', '54px', '54px', '54px', '0px']}
        flexDirection={['column', 'row']}
      >
        <Flex
          display={['none', 'flex']}
          h='100%'
          m='auto 48px auto 0'
          direction={['row', 'column']}
          align={'flex-end'}
          flex={['2', '1']}
        >
          <HStack>
            <Text
              color='white'
              fontWeight={'normal'}
              fontSize={['l', 'xl', '2xl', '3xl', '4xl']}
            >
              {totalClaimed}
            </Text>
            <Text
              color='white'
              fontWeight={'normal'}
              fontSize={['xs', 's', 'md', 'l', 'xl']}
            >
              / {TOTAL_SLOTS}
            </Text>
          </HStack>
          {endAtTsInMs && (
            <HashTankCountdownTimer
              renderer={({ hours, minutes, seconds, completed }: any) => {
                return (
                  <Text
                    mt='0 !important'
                    color='brand.900'
                    fontWeight={'bold'}
                    fontSize={['xs', 's', 'md', 'l', 'xl']}
                  >
                    {formatCountdownTime(hours)}:{formatCountdownTime(minutes)}:
                    {formatCountdownTime(seconds)}
                  </Text>
                );
              }}
              date={endAtTsInMs}
            />
          )}
        </Flex>
        <VStack id='loveSauceProgramEnrolment' flex='7'>
          <VStack alignItems={'flex-start'} width={'100%'}>
            <Text
              maxW={['80%', '100%']}
              textTransform={'uppercase'}
              color='brand.900'
              fontWeight={'bold'}
              fontSize={['4xl', '2xl', '3xl', '4xl', '5xl']}
            >
              {left} SLOTS LEFT!
            </Text>
            <Text
              color='white'
              fontWeight={'normal'}
              fontSize={['md', 's', 'md', 'l', 'xl']}
            >
              launching 18.04.2024
            </Text>

            <Box
              m={['20px 0 0px 0 !important', '40px 0 40px 0 !important']}
              h={['15px', '31px']}
              w='100%'
              borderRadius={'50px'}
              borderWidth={1}
              p={['1px', '2px']}
              borderColor={'brand.700'}
            >
              <Progress
                borderRadius={'50px'}
                background='none'
                w='100%'
                colorScheme='brand.900'
                height={['11px', '25px']}
                value={progress}
              />
            </Box>

            <VStack
              w='100%'
              alignItems={'flex-end'}
              m='0'
              display={['flex', 'none']}
            >
              <HStack>
                <Text
                  color='white'
                  fontWeight={'normal'}
                  fontSize={['l', 'xl', '2xl', '3xl', '4xl']}
                >
                  {totalClaimed}
                </Text>
                <Text
                  color='white'
                  fontWeight={'normal'}
                  fontSize={['md', 's', 'md', 'l', 'xl']}
                >
                  / {TOTAL_SLOTS}
                </Text>
              </HStack>
              {endAtTsInMs && (
                <HashTankCountdownTimer
                  renderer={({ hours, minutes, seconds, completed }: any) => {
                    return (
                      <Text
                        mt='0 !important'
                        color='brand.900'
                        fontWeight={'bold'}
                        fontSize={['xs', 's', 'md', 'l', 'xl']}
                      >
                        {formatCountdownTime(hours)}:
                        {formatCountdownTime(minutes)}:
                        {formatCountdownTime(seconds)}
                      </Text>
                    );
                  }}
                  date={endAtTsInMs}
                />
              )}
            </VStack>
          </VStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default ShellIntroduction;
