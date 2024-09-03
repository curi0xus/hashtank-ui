import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import React from 'react';
import { HStack, VStack, Divider, Text, Box } from '@chakra-ui/react';
import Danger from 'public/static/icons/Danger.png';
import Image from 'next/image';
import useErc20Token from '@/hooks/useErc20Token';
import { formatEther, parseEther } from 'viem';

export const CustomContent = ({
  type,
  fishName,
  batchPrefix,
  batchName,
  batchFishIndex,
  batchNumber,
  instruction,
  bidAmount,
  totalGasFeeInEtherString,
  totalInEtherString,
}: any) => {
  return (
    <>
      {/* Title */}
      <VStack w={'100%'} alignItems={'flex-start'}>
        <Text
          color={'black'}
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize='2xl'
        >
          {fishName}
        </Text>
        <Text
          color={'black'}
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize={['md']}
        >
          #{batchPrefix}-0{batchNumber}/ {batchName}
        </Text>
      </VStack>
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
            {type} bid
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
          >
            BID AMOUNT
          </Text>
        </VStack>
        <Text
          maxW='30%'
          color={'brand.900'}
          textAlign={'right'}
          fontWeight={'medium'}
          fontSize={['md', 'md']}
        >
          {bidAmount}
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
          >
            FEE
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

const ApproveBidContent = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  img,
  fishName,
  batchPrefix,
  batchNumber,
  batchName,
  batchFishIndex,
  bidAmount,
  ...props
}: any) => {
  const { transactionOptsState } = useErc20Token(parseEther(bidAmount));

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
    ? parseEther(bidAmount) + totalGasFeeBigInt
    : undefined;
  const totalInEtherString = totalInBigInt
    ? formatEther(totalInBigInt)
    : undefined;

  return (
    <ModalTemplate
      imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          bidAmount={bidAmount}
          instruction={`*by clicking 'Approve', ${bidAmount} SHELL will be unlocked to use for your bid. ${totalGasFeeInEtherString} SHELL will be deducted as fee.`}
          type='approve'
          batchPrefix={batchPrefix}
          batchFishIndex={batchFishIndex}
          batchName={batchName}
          batchNumber={batchNumber}
          {...props}
          fishName={fishName}
        />
      )}
    />
  );
};

export default ApproveBidContent;
