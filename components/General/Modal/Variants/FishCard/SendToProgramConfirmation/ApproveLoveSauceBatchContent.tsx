import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import React from 'react';
import { HStack, VStack, Divider, Text, Box } from '@chakra-ui/react';
import Danger from 'public/static/icons/Danger.png';
import useErc20Token from '@/hooks/useErc20Token';
import { formatEther } from 'viem';
import Image from 'next/image';
import LoveImage from 'public/static/images/LoveSauceProgram/love.webp';

export const SpecialContent = () => {
  return (
    <HStack w='100%' maxHeight={'10%'} pt='30px' pb='30px' display='flex'>
      <Box
        m='auto'
        backgroundSize={'cover'}
        backgroundImage={LoveImage.src}
        w='100%'
        height={['auto']}
      >
        <HStack minHeight={[170, 370]} m='auto' w='100%'></HStack>
      </Box>
    </HStack>
  );
};

export const CustomContent = ({
  totalFertility,
  type,
  instruction,
  programFeeInWholeTetras,
  totalGasFeeInEtherString,
  totalInEtherString,
}: any) => {
  return (
    <>
      {/* Title */}
      <VStack w={'100%'} alignItems={'flex-start'}>
        <SpecialContent />
        <Text
          color={'black'}
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize={['md']}
        >
          total fertility: {totalFertility}
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
            {type} Love sauce program
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
            Program Fee
          </Text>
        </VStack>
        <Text
          maxW='30%'
          color={'brand.900'}
          textAlign={'right'}
          fontWeight={'medium'}
          fontSize={['md', 'md']}
        >
          {programFeeInWholeTetras}
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

const ApproveLoveSauceBatchContent = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  loveSauceProgramFeeAmountInGweiBigInt,
  totalFertility,
  selectedBroodFishIds,
  ...props
}: any) => {
  const { totalGasFeeInEtherString, totalInEtherString } = useErc20Token(
    loveSauceProgramFeeAmountInGweiBigInt
  );

  const programFeeInWholeTetras = formatEther(
    loveSauceProgramFeeAmountInGweiBigInt
  );
  return (
    <ModalTemplate
      // imgSrc={img}
      CustomContent={(props: any) => (
        <CustomContent
          totalFertility={totalFertility}
          selectedBroodFishIds={selectedBroodFishIds}
          totalGasFeeInEtherString={totalGasFeeInEtherString}
          totalInEtherString={totalInEtherString}
          programFeeInWholeTetras={programFeeInWholeTetras}
          instruction={`*by clicking 'Approve', ${programFeeInWholeTetras} SHELL will be unlocked to use as program fee. ${totalGasFeeInEtherString} SHELL will be deducted as network fee.`}
          type='approve'
          {...props}
        />
      )}
    />
  );
};

export default ApproveLoveSauceBatchContent;
