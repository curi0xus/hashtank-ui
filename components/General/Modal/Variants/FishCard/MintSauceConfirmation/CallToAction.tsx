import React, { useState } from 'react';
import { Box, Flex, Button, Text, VStack } from '@chakra-ui/react';
import useSelectedFishIds from '@/hooks/SauceFactory/useSelectedFishIds';
import { useToast } from '@chakra-ui/react';
import useHashTankAccount from '@/hooks/useHashtankAccount';
import useFetchOwnersRevealedFish from '@/new-hooks/fish/useFetchOwnersRevealedFish';
import useFetchUsersClaims from '@/new-hooks/claims/useFetchUserClaims';
import usePostSauce from '@/new-hooks/sauce/usePostSauce';

const MINT_COST = 1;

const CallToAction = (props: any) => {
  const [isSaucingLoading, setIsSaucingLoading] = useState(false);
  const { selectedFishIds, resetSelectedFishIds } = useSelectedFishIds();
  const { address } = useHashTankAccount();
  const toast = useToast();
  const { refetch: refetchOwnersFish } = useFetchOwnersRevealedFish(address);
  const { refetch: refetchBalance } = useFetchUsersClaims(address);
  const { mutateAsync: createSauce } = usePostSauce();

  async function initSaucingProcess(e: any) {
    try {
      toast({
        title: `Saucing fish. This could take up to 30s`,
        status: 'loading',
        duration: 10000,
        isClosable: false,
      });
      setIsSaucingLoading(true);
      await createSauce({
        fishIds: selectedFishIds,
      });
      await refetchBalance();
      toast({
        title: `Sauce Success`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refetchOwnersFish();
      resetSelectedFishIds();
      props?.closeModalsList?.map((each: any) => each?.(e));
    } catch (e: any) {
      setIsSaucingLoading(false);
      toast({
        title: 'Saucing Failed.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const closeModals = (e: any) => {
    props?.closeModalsList?.map((each: any) => each?.(e));
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
          mint fish into sauce?
        </Text>
        <Text
          textAlign={'center'}
          maxW='80%'
          color='brand.900'
          as='i'
          fontWeight={'medium'}
          fontSize={['xl']}
        >
          this process is not reversible
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
          onClick={closeModals}
          color='white'
          _active={{
            color: 'white',
            bg: 'brand.600',
          }}
          // _hover={{
          //   bg: 'white',
          //   color: 'brand.600',
          // }}
          mt={['10px', '0']}
          mb={['10px', '28px']}
          w={['60%', '35%']}
          bg='brand.600'
          p='3'
          // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
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
          current mint cost
          <br />
          {MINT_COST}
          <span style={{ textTransform: 'uppercase' }}>⌘</span>
        </Text>

        <Button
          p={'15px 0'}
          disabled={isSaucingLoading}
          onClick={initSaucingProcess}
          m='0 auto 30px auto'
          width={['70%', '35%']}
          _hover={{
            background: 'white',
            color: 'brand.900',
          }}
          color='white'
          opacity={isSaucingLoading ? 0.5 : 1}
          background={'brand.900'}
        >
          <Text textTransform={'uppercase'} fontWeight={'medium'} fontSize='sm'>
            {isSaucingLoading ? 'Creating Sauce...' : 'Confirm'}
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
        current mint cost
        <br />
        {MINT_COST}
        <span style={{ textTransform: 'uppercase' }}>⌘</span>
      </Text>
    </Box>
  );
};

export default CallToAction;
