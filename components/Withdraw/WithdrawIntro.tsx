import React from 'react';
import { Box, Text, Flex, HStack } from '@chakra-ui/react';
import TextBlock from '../General/Shared/TextBlock';
import useGetWithdrawAmount from '@/hooks/Withdraw/useGetWithdrawAmount';

const PARAGRAPHS = [
  'Maybe better luck next time! There are no weak sauces in the realm of true elites. Your failed bids will only available for withdrawal after the auction has been revealed. ',
];

const WithdrawIntroduction = () => {
  const { totalWithdawableAmount } = useGetWithdrawAmount();
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
      <TextBlock title='Bid Withdrawals' paragraphs={PARAGRAPHS} />
      <Flex
        mt={['30px', '54px', '54px', '100px', '50px']}
        mb={['54px', '54px', '54px', '54px', '0px']}
        flexDirection={['column', 'row']}
      >
        <Flex
          display={['flex']}
          h='100%'
          direction={['row', 'column']}
          align={'center'}
          flex={['2', '1']}
        >
          <Text
            w='100%'
            textAlign={['center', 'left']}
            color='white'
            fontWeight={'bold'}
            fontSize={['lg', 'xl', '2xl', '3xl', '4xl']}
          >
            <Text as='span' color='brand.900'>
              TOTAL SHELL:
            </Text>{' '}
            ⌘{totalWithdawableAmount}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default WithdrawIntroduction;
