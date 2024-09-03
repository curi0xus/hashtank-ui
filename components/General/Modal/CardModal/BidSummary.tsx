import React from 'react';
import { Divider, HStack, VStack, Text } from '@chakra-ui/react';
import truncateAddress from '@/util/truncateAddress';
import HashTankCountdownTimer, {
  formatCountdownTime,
} from '@/components/CountdownTimer';

const BidSummary = ({
  textColor,
  borderColor,
  fontSize,
  actionText,
  amount,
  ts,
  walletAddress,
  actionDetails,
}: any) => {
  return (
    <>
      <HStack
        w='100%'
        // display='flex'
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <VStack w='100%' gap='0'>
          <Text
            color={textColor || 'black'}
            width={'100%'}
            textTransform={'uppercase'}
            fontWeight={'medium'}
            fontSize={fontSize || ['sm', 'md']}
          >
            {actionText} {amount ? ` ⌘ ${amount}` : ''}
          </Text>
          {actionDetails && (
            <Text
              w='100%'
              textAlign={'left'}
              m='0 !important'
              fontWeight={'medium'}
              fontSize={['sm', 'md']}
            >
              {actionDetails}
            </Text>
          )}
          {walletAddress && (
            <Text m='0 !important' w='100%' fontWeight={'normal'} fontSize='md'>
              {'by '}
              <Text
                textDecoration={'underline'}
                as={'span'}
                textTransform={'uppercase'}
                fontWeight={'normal'}
                fontSize={['sm', 'md']}
              >
                {truncateAddress(walletAddress)}
              </Text>
            </Text>
          )}
        </VStack>
        {ts?.isCountdown ? (
          <HashTankCountdownTimer
            renderer={({days, hours, minutes, seconds, completed }: any) => {
              return (
                <Text
                  maxW='30%'
                  color={ts?.color || 'brand.800'}
                  textAlign={'right'}
                  fontWeight={'normal'}
                  fontSize={['sm', 'md']}
                >
                  {formatCountdownTime(days)}:{formatCountdownTime(hours)}:{formatCountdownTime(minutes)}:
                  {formatCountdownTime(seconds)}
                </Text>
              );
            }}
            date={ts.content}
          />
        ) : ts?.isUrl ? (
          <a
            style={{ whiteSpace: 'nowrap' }}
            target='_blank'
            href={ts.url}
            rel='noopener noreferrer'
          >
            <Text
              whiteSpace={'nowrap'}
              textTransform={'uppercase'}
              textDecoration={'underline'}
              color={ts?.color || 'brand.800'}
              textAlign={'right'}
              fontWeight={'normal'}
              fontSize={['sm', 'sm']}
            >
              {ts.content}
            </Text>
          </a>
        ) : (
          <Text
            minW='45%'
            color={ts?.color || 'brand.800'}
            textAlign={'right'}
            fontWeight={'normal'}
            fontSize={['sm', 'md']}
          >
            {ts?.content || ts}
          </Text>
        )}
      </HStack>
      <Divider
        mt={4}
        opacity={0.9}
        borderWidth={'1px'}
        borderColor={borderColor || 'brand.900'}
      />
    </>
  );
};
export default BidSummary;
