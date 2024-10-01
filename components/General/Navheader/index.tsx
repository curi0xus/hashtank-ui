import React, { useEffect, useState } from 'react';
import { Flex, Spacer, Box, Button, Text } from '@chakra-ui/react';
import NavDrawer from './NavDrawer';
import { Image } from '@chakra-ui/react';
import { LinkOverlay } from '@chakra-ui/react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/router';
// import { useReconnect } from 'wagmi';
import HashtankTooltip from '../Tooltip';
import BellImage from 'public/static/images/General/Tooltip/Bell.webp';
import usePostUser from '@/new-hooks/users/usePostUsers';
import WrongNetworkModal from '../Modal/Onboarding/WrongNetwork';

const NavHeader = () => {
  const { login, ready, authenticated, user, logout, linkWallet } = usePrivy();
  const address = user?.wallet?.address;
  const { pathname } = useRouter();
  const [isHideLogo, setIsHideLogo] = useState(false);
  // const { reconnect } = useReconnect();
  const { mutateAsync } = usePostUser();

  const isConnected = ready && authenticated && user;
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        await mutateAsync({ address });
      } catch (error: any) {
        console.log('ERROR', error);
      }
    }
    if (address) init();
  }, [address]);

  // useEffect(() => {
  //   if (ready && authenticated && user) {
  //     reconnect();
  //   }
  // }, [ready, authenticated, user, reconnect]);

  function disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      console.log('scroll', isShowModal);
      setIsShowModal(true);
      console.log('scroll 2', isShowModal);
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    setIsShowModal(false);
    window.onscroll = function () {
      if (!isHideLogo && window.scrollY > 0) {
        setIsHideLogo(true);
      }

      if (window.scrollY === 0) {
        setIsHideLogo(false);
      }
    };
  }

  useEffect(() => {
    if (isConnected && pathname !== '/aquarium/edit') {
      enableScroll();
    } else {
      disableScroll();
    }

    return () => {
      enableScroll();
    };
  }, [isConnected, pathname]);

  console.log(isShowModal);

  return (
    <Flex
      zIndex={9}
      height='0px'
      position={'fixed'}
      width='100vw'
      minWidth='max-content'
      alignItems='flex-start'
      gap='2'
    >
      <LinkOverlay display={['none', isHideLogo ? 'none' : 'block']} href='/'>
        <Box p={['5', '5', '10', '20']}>
          <Image
            maxW='256px'
            width={['40vw', '30vw', '35vw']}
            src={'/static/images/Home/logo.webp'}
            alt='Hashtank Logo'
          />
        </Box>
      </LinkOverlay>
      <Spacer />
      {isShowModal && <WrongNetworkModal isShowModal={isShowModal} />}
      <Box p={['5', '5', '20', '20']}>
        {isConnected ? (
          <NavDrawer />
        ) : (
          <HashtankTooltip
            storageKey='login'
            defaultIsOpen
            Icon={BellImage}
            // placement='auto'
            // offset={[-300, 350]}
            title='LOG IN TO START PLAYING'
            Instruction={() => (
              <>
                Log in with your email to start engaging with the world of
                HASHTANK.
              </>
            )}
            Trigger={() => (
              <Button
                isDisabled={!ready}
                // @ts-ignore
                onClick={login}
                maxW={'60vw'}
                p={['10px 10px', '30px 50px']}
                _hover={{
                  background: 'white',
                  color: 'brand.900',
                }}
                background={'brand.900'}
                color='white'
              >
                <Text
                  textTransform={'uppercase'}
                  fontWeight={'medium'}
                  fontSize={['sm', 'lg', 'xl']}
                >
                  {ready ? 'PLAY NOW!' : 'loading...'}
                </Text>
              </Button>
            )}
          />
        )}
      </Box>
    </Flex>
  );
};

export default NavHeader;
