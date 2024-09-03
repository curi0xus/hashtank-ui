import React, { useState } from 'react';
import { Box, Flex, Button, Text, VStack } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import useHashTankAccount from '@/hooks/useHashtankAccount';
import useFetchUsersSauce from '@/new-hooks/sauce/useFetchUserSauce';
import useFetchUsersClaims from '@/new-hooks/claims/useFetchUserClaims';
import usePostRedemption from '@/new-hooks/sauce/usePostRedemption';
import useFetchUsersDrops from '@/new-hooks/drops/useFetchUsersDrops';

export const REDEMPTION_FEE = 1;

const CallToAction = ({ sauceId, closeModalsList }: any) => {
  const [isRedemptionLoading, setIsRedemptionLoading] = useState(false);
  const toast = useToast();
  const { address } = useHashTankAccount();
  const { refetch } = useFetchUsersSauce(address);
  const { refetch: refetchBalance } = useFetchUsersClaims(address);
  const { mutateAsync: redeemSauce } = usePostRedemption();
  const { refetch: refetchUsersDrops } = useFetchUsersDrops(address);

  const onExit = (e: any) => {
    closeModalsList?.map((each: any) => each?.(e));
  };

  async function initRedemptionProcess(e: any) {
    try {
      toast({
        title: `Confirm Saucing Transaction`,
        status: 'loading',
        duration: 3000,
        isClosable: true,
      });
      setIsRedemptionLoading(true);
      await redeemSauce({
        sauceId,
        address,
      });
      toast({
        title: `Redemption Successful.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      await refetchBalance();
      refetch();
      refetchUsersDrops();
      onExit(e);
    } catch (e: any) {
      setIsRedemptionLoading(false);

      toast({
        title: 'Redemption Failed.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box>
      <VStack mb={['10px', '36px']} mt={['10px', '62px']}>
        <Text
          color='brand.900'
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize={['xl']}
        >
          redeem physical sauce?
        </Text>
        <Text
          textAlign={'center'}
          maxW='80%'
          color='brand.900'
          as='i'
          fontWeight={'medium'}
          fontSize={['xl']}
        >
          this will turn your bottle empty and the process is not reversible
        </Text>
      </VStack>

      <Flex
        flexDir={['column-reverse', 'row']}
        pl={[0, '80px']}
        pr={[0, '80px']}
        alignItems={'center'}
        gap={[0, '30px']}
        justifyContent={'center'}
        w='100%'
      >
        <Button
          onClick={onExit}
          color='white'
          _hover={{
            bg: 'white',
            color: 'brand.600',
          }}
          mt={['10px', '0']}
          mb={['10px', '28px']}
          w={['60%', '35%']}
          bg='brand.600'
          p='3'
        >
          <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize='md'>
            exit
          </Text>
        </Button>
        <Text
          mt='10px'
          textAlign={'center'}
          display={['block', 'none']}
          color='black'
          textTransform={'lowercase'}
          fontWeight={'medium'}
          fontSize='sm'
        >
          current redemption fee
          <br />
          {REDEMPTION_FEE}
          <span style={{ textTransform: 'uppercase' }}>⌘</span>
        </Text>
        <Button
          p={'15px 0'}
          disabled={isRedemptionLoading}
          onClick={initRedemptionProcess}
          m='0 auto 30px auto'
          width={['70%', '35%']}
          _hover={{
            background: 'white',
            color: 'brand.900',
          }}
          color='white'
          background={isRedemptionLoading ? 'grey' : 'brand.900'}
        >
          <Text textTransform={'uppercase'} fontWeight={'medium'} fontSize='sm'>
            {isRedemptionLoading ? 'Loading...' : 'Confirm'}
          </Text>
        </Button>
      </Flex>
      <Text
        mb='42px'
        textAlign={'center'}
        w='100%'
        display={['none', 'block']}
        color='black'
        textTransform={'lowercase'}
        fontWeight={'medium'}
        fontSize='md'
      >
        current redemption fee
        <br />
        {REDEMPTION_FEE}
        <span style={{ textTransform: 'uppercase' }}>⌘</span>
      </Text>
    </Box>
  );
};

export default CallToAction;
