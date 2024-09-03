import React, { useState } from 'react';
import { Box, Flex, Button, Text, VStack } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import useHashTankAccount from '@/hooks/useHashtankAccount';
import useFetchUsersClaims from '@/new-hooks/claims/useFetchUserClaims';
import useFetchUsersSauce from '@/new-hooks/sauce/useFetchUserSauce';
import usePostSellSauce from '@/new-hooks/sauce/usePostSellSauce';

const CallToAction = ({ sauceId, sauceMetadata, closeModalsList }: any) => {
  const [isSaleLoading, setIsSaleLoading] = useState(false);
  const { address } = useHashTankAccount();
  const { refetch } = useFetchUsersSauce(address);
  const { refetch: refetchBalance } = useFetchUsersClaims(address);
  const toast = useToast();
  const { mutateAsync: sellSauce } = usePostSellSauce();
  const { image, attributes, name, description, createdAt } = sauceMetadata;
  const resaleValue = attributes?.find(
    (each: any) => each.trait_type === 'resale_value'
  )?.value;

  async function initSaleProcess(e: any) {
    try {
      toast({
        title: `Confirm Saucing Transaction`,
        status: 'loading',
        duration: 3000,
        isClosable: true,
      });
      setIsSaleLoading(true);
      // POST SELL SAUCE
      await sellSauce({
        sauceId,
        address,
      });
      toast({
        title: `Sauce sold for ⌘ ${resaleValue}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      await refetchBalance();
      refetch();
      onExit(e);
    } catch (e: any) {
      setIsSaleLoading(false);

      toast({
        title: 'Unable to sell sauce',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const onExit = (e: any) => {
    closeModalsList?.map((each: any) => each?.(e));
  };

  return (
    <Box>
      <VStack mb={['10px', '36px']} mt={['10px', '62px']}>
        <Text
          color='brand.900'
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize={['xl']}
        >
          sell sauce?
        </Text>
        <Text
          textAlign={'center'}
          maxW='80%'
          color='brand.900'
          as='i'
          fontWeight={'medium'}
          fontSize={['xl']}
        >
          this will sell your sauce for {resaleValue} SHELL tokens and the
          process is not reversible
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
          current sale price
          <br />
          {resaleValue}
          <span style={{ textTransform: 'uppercase' }}>⌘</span>
        </Text>
        <Button
          p={'15px 0'}
          disabled={isSaleLoading}
          onClick={initSaleProcess}
          m='0 auto 30px auto'
          width={['70%', '35%']}
          _hover={{
            background: 'white',
            color: 'brand.900',
          }}
          color='white'
          background={isSaleLoading ? 'grey' : 'brand.900'}
        >
          <Text textTransform={'uppercase'} fontWeight={'medium'} fontSize='sm'>
            {isSaleLoading ? '...loading' : 'Confirm'}
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
        current sale price
        <br />
        {resaleValue} <span style={{ textTransform: 'uppercase' }}>⌘</span>
      </Text>
    </Box>
  );
};

export default CallToAction;
