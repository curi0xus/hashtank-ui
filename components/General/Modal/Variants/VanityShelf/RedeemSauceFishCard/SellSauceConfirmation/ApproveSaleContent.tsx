import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import React from 'react';
import { HStack, VStack, Divider, Text, Box } from '@chakra-ui/react';
import Danger from 'public/static/icons/Danger.png';
import useErc20Token from '@/hooks/useErc20Token';
import { formatEther } from 'viem';
import Image from 'next/image';
import useGetTokenMetadata from '@/hooks/useGetTokenMetadata';
import { SpecialContent } from './Content';

export const CustomContent = ({
  totalSize,
  type,
  instruction,
  resaleValueInWholeTetras,
  totalGasFeeInEtherString,
  totalInEtherString,
  sauceId,
}: any) => {
  const { name } = useGetTokenMetadata(sauceId);

  return (
    <>
      <SpecialContent />
      <Divider opacity={1} borderWidth={'1px'} borderColor={'brand.900'} />
      {/* Action Name */}
      <HStack
        p={['10px 0 10px 0', '15px 0 15px 0']}
        w='100%'
        // display='flex'
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <VStack gap='0'>
          <Text
            color='brand.900'
            w='100%'
            textTransform={'uppercase'}
            textAlign={'left'}
            m='0 !important'
            fontWeight={'medium'}
            fontSize={['2xl', '2xl']}
          >
            {type} sale
          </Text>
        </VStack>
        <Box>
          <Image
            style={{ margin: 'auto', width: '100%', height: 'auto' }}
            height={100}
            width={100}
            src={Danger}
            alt='Danger'
          />
        </Box>
      </HStack>
      <Divider opacity={1} borderWidth={'1px'} borderColor={'brand.900'} />
      {/* Breakdown */}
      <HStack
        p={['10px 0 0', '15px 0 0 0']}
        w='100%'
        // display='flex'
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <VStack gap='0'>
          <Text
            w='100%'
            textAlign={'left'}
            m='0 !important'
            fontWeight={'medium'}
            fontSize={['md', 'md']}
            textTransform={'uppercase'}
          >
            resale value
          </Text>
        </VStack>
        <Text
          maxW='30%'
          color={'brand.900'}
          textAlign={'right'}
          fontWeight={'medium'}
          fontSize={['md', 'md']}
        >
          {resaleValueInWholeTetras}
        </Text>
      </HStack>
      <HStack
        p={['0 0 10px 0', '0 0 15px 0']}
        w='100%'
        // display='flex'
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <VStack gap='0'>
          <Text
            w='100%'
            textAlign={'left'}
            m='0 !important'
            fontWeight={'medium'}
            fontSize={['md', 'md']}
            textTransform={'uppercase'}
          >
            network FEE
          </Text>
        </VStack>
        <Text
          maxW='30%'
          color={'brand.900'}
          textAlign={'right'}
          fontWeight={'medium'}
          fontSize={['md', 'md']}
        >
          {totalGasFeeInEtherString
            ? totalGasFeeInEtherString
            : 'estimating...'}
        </Text>
      </HStack>
      <Divider opacity={1} borderWidth={'1px'} borderColor={'brand.900'} />
      {/* Summary */}
      <HStack
        p={['10px 0 10px 0', '15px 0 15px 0']}
        w='100%'
        // display='flex'
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <VStack gap='0'>
          <Text
            w='100%'
            textAlign={'left'}
            m='0 !important'
            fontWeight={'medium'}
            fontSize={['xl', 'xl']}
          >
            TOTAL
          </Text>
        </VStack>

        <Text
          maxW='30%'
          color={'brand.900'}
          textAlign={'right'}
          fontWeight={'medium'}
          fontSize={['xl', 'xl']}
        >
          {totalInEtherString ? totalInEtherString : 'calculating...'} <br />
          SHELL
        </Text>
      </HStack>
      <Divider opacity={1} borderWidth={'5px'} borderColor={'brand.900'} />
      <Text
        mt='20px'
        textAlign={'left'}
        maxW='100%'
        color='black'
        as='i'
        fontWeight={'normal'}
        fontSize={['md']}
      >
        {instruction}
      </Text>
      {/* Notice */}
    </>
  );
};

const ApproveSaleContent = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  resaleValueInGweiBigInt,
  sauceId,
  ...props
}: any) => {
  const { transactionOptsState } = useErc20Token(resaleValueInGweiBigInt);

  const gasPriceInGweiString = transactionOptsState?.maxFeePerGas?.toString();
  const gasLimitInGweiString = transactionOptsState?.gasLimit?.toString();
  const totalGasFeeBigInt =
    gasPriceInGweiString && gasPriceInGweiString
      ? BigInt(gasPriceInGweiString) * BigInt(gasLimitInGweiString)
      : undefined;

  const totalGasFeeInEtherString = totalGasFeeBigInt
    ? formatEther(totalGasFeeBigInt)
    : undefined;

  const totalInBigInt = totalGasFeeBigInt
    ? resaleValueInGweiBigInt + totalGasFeeBigInt
    : undefined;
  const totalInEtherString = totalInBigInt
    ? formatEther(totalInBigInt)
    : undefined;
  const resaleValueInWholeTetras = formatEther(resaleValueInGweiBigInt);
  return (
    <ModalTemplate
      // imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          sauceId={sauceId}
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          resaleValueInWholeTetras={resaleValueInWholeTetras}
          instruction={`*by clicking 'Approve', ${resaleValueInWholeTetras} SHELL will be unlocked to use as redemption fee. ${totalGasFeeInEtherString} SHELL will be deducted as network fee.`}
          type='approve'
          {...props}
        />
      )}
    />
  );
};

export default ApproveSaleContent;
