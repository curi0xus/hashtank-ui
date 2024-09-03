import React from 'react';
import {
  Button,
  Drawer,
  useDisclosure,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  VStack,
  DrawerHeader,
  IconButton,
  Avatar,
  Divider,
  Box,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import CustomHTLink from '../Link';
import truncateAddress from '@/util/truncateAddress';
import { usePrivy } from '@privy-io/react-auth';
import { minidenticon } from 'minidenticons';
import { useMemo } from 'react';
import HashtankTooltip from '../Tooltip';
import BellImage from 'public/static/images/General/Tooltip/Bell.webp';
import useFetchUsersClaims from '@/new-hooks/claims/useFetchUserClaims';

const navlinks = [
  { title: 'Home', href: '/' },
  { title: 'Auction floor', href: '/auction' },
  { title: 'Aquarium', href: '/aquarium/edit' },
  { title: 'Sauce factory', href: '/sauce-factory' },
  { title: 'Love sauce program', href: '/love-sauce-program' },
  { title: 'Supermarket', href: '/supermarket' },
  { title: 'Claim ⌘SHELL', href: '/claim' },
  // { title: 'Withdraw Bids', href: '/withdraw' },
  { title: 'About', href: '/about' },
];

function NavDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { logout, user } = usePrivy();
  const address = user?.wallet?.address || '';
  // @ts-ignore
  const { data } = useFetchUsersClaims(address);
  const userBalance = data?.userBalance;
  // const { userShellBalanceBigInt } = useErc20Token();
  const svgURI = useMemo(
    () =>
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(minidenticon(address || '', 60, 50)),
    [address]
  );

  // const {
  //   data: ensName,
  //   isError: isEnsNameError,
  //   isLoading: isEnsNameLoading,
  // } = useEnsName({
  //   address: address,
  // });
  // const {
  //   data: ensAvatar,
  //   isError: isEnsAvatarError,
  //   isLoading: isEnsAvatarLoading,
  // } = useEnsAvatar({
  //   name: ensName,
  // });

  const displayName = address ? truncateAddress(address as `0x${string}`) : '';

  return (
    <>
      <HashtankTooltip
        storageKey='control-panel'
        Icon={BellImage}
        // placement='auto'
        // offset={[-300, 350]}
        title='YOUR CONTROL PANEL'
        Instruction={() => (
          <>
            Access the menu to view your<strong>⌘SHELL</strong> balance as well
            as visit other parts of <strong>HASHTANK</strong>.
          </>
        )}
        Trigger={() => (
          <IconButton
            _hover={{
              background: 'none',
              color: 'white',
            }}
            color='brand.900'
            backgroundColor='transparent'
            border={'none'}
            onClick={onOpen}
            // @ts-ignore
            ref={btnRef}
            aria-label='Open Navigation Menu'
            icon={<HamburgerIcon fontSize={'5xl'} />}
          />
        )}
      />

      <Drawer
        size='sm'
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        // @ts-ignore
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundImage={'linear-gradient(#3D4B65, #212431)'}>
          <DrawerHeader
            display={'flex'}
            alignItems='center'
            color='white'
            mt='10'
          >
            <Avatar
              bg='white'
              mr='5'
              size='lg'
              name='Dan Abrahmov'
              src={svgURI}
            />
            <Text fontWeight={'normal'} fontSize='xl'>
              {/* 0x12....4526 */}
              {displayName}
            </Text>
          </DrawerHeader>

          <Box pl='6' mb='5'>
            <Divider
              borderBottomWidth={3}
              width='25%'
              opacity={1}
              borderColor={'brand.900'}
            />
          </Box>

          <DrawerBody>
            <VStack align='left'>
              {navlinks.map((dest, i) => (
                <CustomHTLink
                  onClick={onClose}
                  title={dest.title}
                  key={i}
                  path={dest.href}
                />
              ))}
              <Text color='brand.900' fontWeight={'normal'} fontSize='2xl'>
                ⌘SHELL: {userBalance}
              </Text>
            </VStack>
            <Button
              onClick={async () => {
                logout();
              }}
              _hover={{
                background: 'none',
                color: 'brand.900',
              }}
              p='0'
              border={'none'}
              mt='20'
              rightIcon={<ExternalLinkIcon fontSize={24} />}
              color='white'
              variant='outline'
            >
              <Text fontWeight={'normal'} fontSize='2xl'>
                Logout
              </Text>
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NavDrawer;
