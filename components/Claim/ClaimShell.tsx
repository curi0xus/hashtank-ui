import React, { useEffect } from 'react';
import { Text, Button, useMediaQuery } from '@chakra-ui/react';
import useHashTankAccount from '@/hooks/useHashtankAccount';
import { Box, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import ShellTokenImage from 'public/static/images/Claim/bg.webp';
import ShellTokenImageMobile from 'public/static/images/Claim/bg-mobile.webp';
import { useRouter } from 'next/router';
import JSConfetti from 'js-confetti';
import { useState } from 'react';
import usePostClaims from '@/new-hooks/claims/usePostClaims';
import useFetchUsersClaims from '@/new-hooks/claims/useFetchUserClaims';
import { useAccount } from 'wagmi';
import useFetchTotalClaims from '@/new-hooks/claims/useFetchTotalClaims';

const ClaimShell = () => {
  const { address } = useHashTankAccount();
  const { mutateAsync } = usePostClaims();
  const { data, refetch: refetchUserBalance } = useFetchUsersClaims(address);
  const { refetch } = useFetchTotalClaims();
  const hasClaimed = !!data?.claims;
  const toast = useToast();
  const router = useRouter();
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  const [isClaimed, setIsCalimed] = useState(false);

  useEffect(() => {
    setIsCalimed(hasClaimed);
  }, [hasClaimed]);

  const claimToken = async (e: any) => {
    const jsConfetti = new JSConfetti();
    try {
      await mutateAsync({ address });

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

      refetch();
      refetchUserBalance();

      setIsCalimed(true);
    } catch (error) {
      console.log(error);
      toast({
        title:
          // @ts-ignore
          error?.response?.data?.error ||
          'Oops! Claim failed. Try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  };

  const goToAuction = () => {
    router.push('/auction');
  };

  return (
    <div>
      {isNotMobile ? (
        <Box position='relative' w={['100vw', '60vw']} m='auto'>
          <Button
            margin={'auto'}
            top={0}
            left={0}
            right={0}
            bottom={0}
            position={'absolute'}
            onClick={isClaimed ? goToAuction : claimToken}
            maxW={'300px'}
            p={['15px 25px', '30px 50px']}
            _hover={{
              background: 'white',
              color: 'brand.900',
            }}
            background={isClaimed ? '#FFEE57' : 'brand.900'}
            color={isClaimed ? 'brand.900' : 'white'}
          >
            {isClaimed ? (
              <Text
                textTransform={'uppercase'}
                fontWeight={'medium'}
                fontSize={['md', 'lg', 'xl']}
              >
                Proceed to <br /> auction floor
              </Text>
            ) : (
              <Text
                textTransform={'uppercase'}
                fontWeight={'medium'}
                fontSize={['md', 'lg', 'xl']}
              >
                Claim 100 SHELL
              </Text>
            )}
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
        <Box position='relative' w={['100vw']} m='auto'>
          <Button
            transform={'translateY(20px)'}
            margin={'auto'}
            top={0}
            left={0}
            right={0}
            bottom={0}
            position={'absolute'}
            onClick={isClaimed ? goToAuction : claimToken}
            maxW={'60vw'}
            p={['30px 25px', '30px 50px']}
            _hover={{
              background: 'white',
              color: 'brand.900',
            }}
            background={isClaimed ? '#FFEE57' : 'brand.900'}
            color={isClaimed ? 'brand.900' : 'white'}
          >
            {isClaimed ? (
              <Text
                textTransform={'uppercase'}
                fontWeight={'medium'}
                fontSize={['md', 'lg', 'xl']}
              >
                Proceed to <br /> auction floor
              </Text>
            ) : (
              <Text
                textTransform={'uppercase'}
                fontWeight={'medium'}
                fontSize={['md', 'lg', 'xl']}
              >
                Claim 100 SHELL
              </Text>
            )}
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
