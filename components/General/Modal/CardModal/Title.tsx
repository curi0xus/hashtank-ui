import React from 'react';
import { HStack, Text, Divider, VStack, Flex } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import InspectTx from '../../Icons/InspectIcon';
import Hidden from '../../Icons/Hidden';
import Visible from '../../Icons/Visible';
import { hashTankChain } from '@/wagmi';

function breakWord(textString: string) {
  const words = textString.split(' ');
  return words.map((each: any, i: number) => (
    <span style={{ marginRight: '0.3em' }} key={i}>
      {words[i]}
    </span>
  ));
  // .reverse()
  // .join('');
}

const ModalTitle = ({
  txHash,
  isDark,
  hasBidSubmissionForm,
  secondaryTitle,
  isReverseWrap,
  width,
  title,
  textColor,
  borderColor,
}: any) => {
  return (
    <>
      <Flex
        display={[hasBidSubmissionForm ? 'none' : 'flex', 'none']}
        gap={'10px'}
        w='100%'
        justify={'flex-start'}
      >
        <IconButton
          display={['flex']}
          _hover={{
            background: 'none',
          }}
          variant='ghost'
          color={isDark ? 'white' : '#FF530D'}
          onClick={() => {
            window.open(
              `${hashTankChain.blockExplorers.default.url}/tx/${txHash}`,
              '_blank' // <- This is what makes it open in a new window.
            );
          }}
          background='none'
          aria-label='Inspect'
          icon={<InspectTx fontSize={40} />}
        />
        <IconButton
          color={isDark ? 'white' : 'black'}
          display={['flex']}
          _hover={{
            background: 'none',
          }}
          variant='ghost'
          onClick={() => {}}
          background='none'
          aria-label='Hidden'
          icon={<Hidden fontSize={40} />}
        />
      </Flex>
      <HStack w={'100%'} justifyContent={'space-between'}>
        <VStack gap={0} alignItems={'flex-start'} justifyContent={'flex-start'}>
          {isReverseWrap ? (
            <Text
              width={width}
              display='flex'
              flexWrap={'wrap-reverse'}
              flexDirection={'row-reverse'}
              justifyContent={'flex-end'}
              color={textColor || 'brand.900'}
              textTransform={'uppercase'}
              fontWeight={'medium'}
              fontSize='2xl'
            >
              {breakWord(title)}
            </Text>
          ) : (
            <Text
              color={textColor || 'brand.900'}
              textTransform={'uppercase'}
              fontWeight={'medium'}
              fontSize='2xl'
            >
              {title}
            </Text>
          )}
          {secondaryTitle && (
            <Text
              fontStyle={'italic'}
              fontSize='md'
              color={textColor || 'brand.900'}
            >
              {secondaryTitle}
            </Text>
          )}
        </VStack>
        <IconButton
          display={['none', hasBidSubmissionForm ? 'none' : 'flex']}
          _hover={{
            background: 'none',
          }}
          variant='ghost'
          color={isDark ? 'white' : '#FF530D'}
          onClick={() => {
            window.open(
              `${hashTankChain.blockExplorers.default.url}/tx/${txHash}`,
              '_blank' // <- This is what makes it open in a new window.
            );
          }}
          background='none'
          aria-label='Inspect'
          icon={<InspectTx fontSize={30} />}
        />
      </HStack>
      <Divider
        opacity={0.9}
        borderWidth={'1px'}
        borderColor={borderColor || 'brand.900'}
      />
    </>
  );
};
export default ModalTitle;
