import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import React from 'react';
import { HStack, VStack, Divider, Text, Box } from '@chakra-ui/react';
import Danger from 'public/static/icons/Danger.png';
import useErc20Token from '@/hooks/useErc20Token';
import { formatEther } from 'viem';
import Image from 'next/image';
import useGetSauceMetadta from '@/hooks/RedemptionCenter/useGetSauceMetadata';
import { SpecialContent } from './Content';

export const CustomContent = ({
  totalSize,
  type,
  instruction,
  redemptionFeeInWholeTetras,
  totalGasFeeInEtherString,
  totalInEtherString,
  sauceId,
}: any) => {
  const { name } = useGetSauceMetadta(sauceId);

  return (
    <>
      {/* Title */}
      <VStack w={'100%'} alignItems={'flex-start'}>
        <SpecialContent sauceName={name} />
        {/* <HStack>
          {tokenMetas.map((each: any, i: number) => (
            <Box key={i} w={`${100 / tokenMetas.length}%`}>
              <Image
                style={{ height: '100%', width: 'auto' }}
                height={100}
                width={100}
                src={each.image}
                alt={each.name}
              />
            </Box>
          ))}
        </HStack> */}
        {/* <Text
          color={'black'}
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize='2xl'
        >
          sauce content
        </Text> */}
        <Text
          color={'black'}
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize={['md']}
        >
          total size: {totalSize}
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
            {type} redemption
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
            redemption Fee
          </Text>
        </VStack>
        <Text
          maxW='30%'
          color={'brand.900'}
          textAlign={'right'}
          fontWeight={'medium'}
          fontSize={['md', 'md']}
        >
          {redemptionFeeInWholeTetras}
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

const ApproveRedemptionContent = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  redemptionFeeAmountInGweiBigInt,
  sauceId,
  ...props
}: any) => {
  const { transactionOptsState } = useErc20Token(
    redemptionFeeAmountInGweiBigInt
  );

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
    ? redemptionFeeAmountInGweiBigInt + totalGasFeeBigInt
    : undefined;
  const totalInEtherString = totalInBigInt
    ? formatEther(totalInBigInt)
    : undefined;
  const redemptionFeeInWholeTetras = formatEther(
    redemptionFeeAmountInGweiBigInt
  );
  return (
    <ModalTemplate
      // imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          sauceId={sauceId}
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          redemptionFeeInWholeTetras={redemptionFeeInWholeTetras}
          instruction={`*by clicking 'Approve', ${redemptionFeeInWholeTetras} SHELL will be unlocked to use as redemption fee. ${totalGasFeeInEtherString} SHELL will be deducted as network fee.`}
          type='approve'
          {...props}
        />
      )}
    />
  );
};

export default ApproveRedemptionContent;
