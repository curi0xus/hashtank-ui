import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import React from 'react';
import {
  HStack,
  VStack,
  Divider,
  Text,
  Box,
  Flex,
  Grid,
} from '@chakra-ui/react';
import Sauce from 'public/static/images/Home/sauce.webp';
import ToTheRight from 'public/static/icons/ToTheRight.png';
import Danger from 'public/static/icons/Danger.png';
import useErc20Token from '@/hooks/useErc20Token';
import { formatEther } from 'viem';
import useGetTokenMetas from '@/hooks/admin/loveSauceProgram/useGetTokenMetas';
import Image from 'next/image';

export const CustomContent = ({
  totalSize,
  type,
  instruction,
  saucingFeeInWholeTetras,
  totalGasFeeInEtherString,
  totalInEtherString,
  selectedFishIds,
}: any) => {
  const { tokenMetas } = useGetTokenMetas(selectedFishIds);

  return (
    <>
      <HStack
        pl='30px'
        w='100%'
        maxHeight={'10%'}
        pt='30px'
        pb='30px'
        display='flex'
      >
        {tokenMetas.length === 1 && (
          <Box height={[100, 186]} flex={2}>
            <Image
              style={{ margin: 'auto', width: 'auto', height: '100%' }}
              src={tokenMetas[0].image}
              alt='More details fish'
            />
          </Box>
        )}
        {tokenMetas.length === 2 && (
          <Grid flex={2}>
            {tokenMetas.map((meta: any, i: number) => (
              <Box key={i} height={[100, 186]} flex={2}>
                <Image
                  width={100}
                  height={100}
                  style={{ margin: 'auto', width: 'auto', height: '100%' }}
                  src={meta.image}
                  alt='More details fish'
                />
              </Box>
            ))}
          </Grid>
        )}
        {tokenMetas.length === 3 && (
          <Flex justify={'center'} flexWrap='wrap' flex={2}>
            {tokenMetas.map((meta: any, i: number) => (
              <Box key={i} w='50%'>
                <Image
                  width={100}
                  height={100}
                  style={{ margin: 'auto', width: 'auto', height: '100%' }}
                  src={meta.image}
                  alt='More details fish'
                />
              </Box>
            ))}
          </Flex>
        )}
        {tokenMetas.length === 4 && (
          <Flex justify={'center'} flexWrap='wrap' flex={2}>
            {tokenMetas.map((meta: any, i: number) => (
              <Box key={i} w='50%'>
                <Image
                  width={100}
                  height={100}
                  style={{ margin: 'auto', width: 'auto', height: '100%' }}
                  src={meta.image}
                  alt='More details fish'
                />
              </Box>
            ))}
          </Flex>
        )}
        {selectedFishIds.length === 5 && (
          <Flex justify={'center'} flexWrap='wrap' flex={2}>
            {tokenMetas.map((meta: any, i: number) => {
              if (i === 2) {
                return (
                  <Flex key={i} w='100%'>
                    <Box flex={1}></Box>
                    <Box transform={'translateX(-50%)'} flex={1}>
                      <Image
                        width={100}
                        height={100}
                        style={{
                          margin: 'auto',
                          width: 'auto',
                          height: '100%',
                        }}
                        src={meta.image}
                        alt='More details fish'
                      />
                    </Box>
                  </Flex>
                );
              }
              return (
                <Box key={i} w='50%'>
                  <Image
                    width={100}
                    height={100}
                    style={{ margin: 'auto', width: 'auto', height: '100%' }}
                    src={meta.image}
                    alt='More details fish'
                  />
                </Box>
              );
            })}
          </Flex>
        )}
        <VStack flex={1}>
          <Box>
            <Image
              width={100}
              height={100}
              style={{ margin: 'auto', width: '100%', height: 'auto' }}
              src={Danger}
              alt='Danger'
            />
          </Box>
          <Box>
            <Image
              width={100}
              height={100}
              style={{ margin: 'auto', width: '100%', height: 'auto' }}
              src={ToTheRight}
              alt='Right hand side'
            />
          </Box>
        </VStack>
        <Box flex={2} height={[150, 288]}>
          <Image
            width={100}
            height={100}
            style={{
              margin: 'auto',
              width: 'auto',
              height: '100%',
              // maxHeight: 150,
            }}
            src={Sauce}
            alt='Sauce'
          />
        </Box>
      </HStack>
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
            {type} Saucing
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
            Saucing Fee
          </Text>
        </VStack>
        <Text
          maxW='30%'
          color={'brand.900'}
          textAlign={'right'}
          fontWeight={'medium'}
          fontSize={['md', 'md']}
        >
          {saucingFeeInWholeTetras}
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

const ApproveSaucingContent = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  saucingFeeInGweiBigInt,
  totalSize,
  selectedFishIds,
  ...props
}: any) => {
  const { transactionOptsState } = useErc20Token(saucingFeeInGweiBigInt);

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
    ? saucingFeeInGweiBigInt + totalGasFeeBigInt
    : undefined;
  const totalInEtherString = totalInBigInt
    ? formatEther(totalInBigInt)
    : undefined;
  const saucingFeeInWholeTetras = formatEther(saucingFeeInGweiBigInt);
  return (
    <ModalTemplate
      // imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          totalSize={totalSize}
          selectedFishIds={selectedFishIds}
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          saucingFeeInWholeTetras={saucingFeeInWholeTetras}
          instruction={`*by clicking 'Approve', ${saucingFeeInWholeTetras} SHELL will be unlocked to use as saucing fee. ${totalGasFeeInEtherString} SHELL will be deducted as network fee.`}
          type='approve'
          {...props}
        />
      )}
    />
  );
};

export default ApproveSaucingContent;
