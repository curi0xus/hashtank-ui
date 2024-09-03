import React from 'react';
import { Text, Button, useMediaQuery } from '@chakra-ui/react';
import { Box, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import ShellTokenImage from 'public/static/images/Withdraw/bg.webp';
import ShellTokenImageMobile from 'public/static/images/Withdraw/bg-mobile.webp';
import { useRouter } from 'next/router';
import JSConfetti from 'js-confetti';
import { useState } from 'react';
import useWithdrawBids from '@/hooks/Withdraw/useWithdrawBids';
import useGetWithdrawAmount from '@/hooks/Withdraw/useGetWithdrawAmount';
import useErc20Token from '@/hooks/useErc20Token';

const ClaimShell = () => {
  const toast = useToast();
  const router = useRouter();
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  const { totalWithdawableAmount, refetch } = useGetWithdrawAmount();
  const [isClaimed, setIsCalimed] = useState(!totalWithdawableAmount);
  const { withdraw } = useWithdrawBids();
  const { refetchBalance } = useErc20Token();

  const withdrawShell = async (e: any) => {
    const jsConfetti = new JSConfetti();
    try {
      if (!totalWithdawableAmount) {
        toast({
          title: 'No ⌘SHELL available for withdraw',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      await withdraw();
      await jsConfetti.addConfetti({
        emojis: [
          '🐳',
          '🐬',
          '🦭',
          '🐟',
          '🐠',
          '🐡',
          ' 🦈',
          '🐙',
          '🐚',
          '🐋',
          '🦑',
        ],
        confettiNumber: 50,
      });
      await refetch();
      await refetchBalance();

      setIsCalimed(true);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Oops! Claim failed. Try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  };

  return (
    <div>
      {isNotMobile ? (
        <Box
          transform={'translateY(-150px)'}
          position='relative'
          w={['100vw', '60vw']}
          m='auto'
        >
          <Button
            margin={'auto'}
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={isClaimed ? 0.7 : 1}
            position={'absolute'}
            onClick={withdrawShell}
            maxW={'300px'}
            p={['15px 25px', '30px 50px']}
            _hover={{
              background: 'white',
              color: 'brand.900',
            }}
            background={'brand.900'}
            color={'white'}
          >
            <Text
              textTransform={'uppercase'}
              fontWeight={'medium'}
              fontSize={['md', 'lg', 'xl']}
            >
              Reclaim {totalWithdawableAmount} SHELL
            </Text>
          </Button>
          <Image
            alt='shell-desktop'
            src={ShellTokenImage}
            height={100}
            width={100}
            style={{ height: 'auto', width: '100%' }}
          />
        </Box>
      ) : (
        <Box
          transform={'translateY(-150px)'}
          position='relative'
          w={['100vw']}
          m='auto'
        >
          <Button
            margin={'auto'}
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={isClaimed ? 0.7 : 1}
            position={'absolute'}
            disabled={isClaimed}
            maxW={'60vw'}
            p={['30px 25px', '30px 50px']}
            _hover={{
              background: 'white',
              color: 'brand.900',
            }}
            background={'brand.900'}
            color={'white'}
          >
            <Text
              textTransform={'uppercase'}
              fontWeight={'medium'}
              fontSize={['md', 'lg', 'xl']}
            >
              Reclaim {totalWithdawableAmount} SHELL
            </Text>
          </Button>
          <Image
            alt='shell-mobile'
            src={ShellTokenImageMobile}
            height={100}
            width={100}
            style={{ height: 'auto', width: '100%' }}
          />
        </Box>
      )}
    </div>
  );
};

export default ClaimShell;
