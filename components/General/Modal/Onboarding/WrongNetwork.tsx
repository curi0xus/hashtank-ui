import ModalTemplate from '@/components/General/Modal/CardModal/CustomContent';
import { VStack, Divider, Text, Box, Button } from '@chakra-ui/react';
import Image from 'next/image';
import WrongNetworkImage from 'public/static/images/Onboarding/WrongNetwork.png';
import React, { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  IconButton,
  useMediaQuery,
} from '@chakra-ui/react';
import ArrowBackIcon from '../../Icons/ArrowBackIcon';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';

const CustomContent = (props: any) => {
  return (
    <>
      {/* Title */}
      <VStack mt={['30px']} w={'100%'} alignItems={'flex-start'}>
        <Text
          color={'brand.900'}
          textTransform={'uppercase'}
          fontWeight={'medium'}
          fontSize='4xl'
        >
          wrong network detected
        </Text>
        <Divider opacity={1} borderWidth={'1px'} borderColor={'brand.900'} />
        <Text color={'black'} fontWeight={'medium'} fontSize={['md']}>
          You’re on the wrong network! Click below to switch to the right side.
        </Text>
        <Divider
          m='20px 0'
          opacity={1}
          borderWidth={'1px'}
          borderColor={'brand.900'}
        />
        <Box w={['60%', '30%']} m='50px auto 50px auto'>
          <Image
            style={{ margin: 'auto', width: '100%', height: 'auto' }}
            height={100}
            width={100}
            src={WrongNetworkImage}
            alt='No Metamask Found'
          />
        </Box>
        <Box display='flex' flexDir={'column'} w={['100%', '60%']} m='auto'>
          <Button
            onClick={props.onClick}
            m='10px auto'
            w={['70%']}
            // maxW={'60vw'}
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
              Switch to Zksync Era
            </Text>
          </Button>
          {/* <Button
            display={['none', 'flex']}
            m='10px auto'
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              props?.onClose(e);
            }}
            w={['70%']}
            // maxW={'60vw'}
            p={['10px 10px', '30px 50px']}
            color='white'
            _hover={{
              bg: '#3D4B65',
              color: 'white',
            }}
            bg='#3D4B65'
          >
            <Text
              textTransform={'uppercase'}
              fontWeight={'medium'}
              fontSize={['sm', 'lg', 'xl']}
            >
              exit
            </Text>
          </Button> */}
        </Box>
      </VStack>
    </>
  );
};

const NoMetamaskContent = (props: any) => {
  return <ModalTemplate CustomContent={() => <CustomContent {...props} />} />;
};

const MobileBackButton = ({ isDark, onClick, position }: any) => {
  return (
    <IconButton
      {...position}
      h='40px'
      w='40px'
      minHeight={'40px'}
      minWidth={'40px'}
      borderRadius={'100%'}
      borderWidth={'2px'}
      variant={'outline'}
      color={isDark ? 'white' : 'brand.800'}
      borderColor={isDark ? 'white' : 'brand.800'}
      onClick={onClick}
      _hover={{
        background: 'none',
        color: 'white',
      }}
      background='none'
      aria-label='Back Arrow'
      icon={<ArrowBackIcon fontSize={25} />}
    />
  );
};

const WrongNetworkModal = ({ onClick }: any) => {
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  const [isNotMobile] = useMediaQuery(
    isMobileLandscape ? '(min-width: 480px)' : '(min-width: 850px)',
    // '(min-width: 850px)',
    {
      ssr: true,
      fallback: false,
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName('body')[0].style.cssText =
        'margin-right:0px !important';
    }
  }, [isOpen]);

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        blockScrollOnMount={true}
        scrollBehavior='inside'
        size={'3xl'}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent
          // minW={[undefined, 'fit-content !import']}
          minHeight={
            isNotMobile ? 'fit-content !important' : '100vh !important'
          }
          maxW={isNotMobile ? undefined : '100vw !important'}
          css={{
            // minHeight: '100vh !important',
            padding: '0 !important',
            // borderRadius: '40px !important',
          }}
          position='relative'
          p='1'
          bg={'#FFEE57'}
        >
          <ModalBody
            css={{
              height: 'fit-content',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              paddingInlineStart: 0,
              paddingInlineEnd: 0,
            }}
          >
            {!isNotMobile && (
              <MobileBackButton
                zIndex={9999}
                onClick={onClose}
                isDark={false}
                position={{ top: 5, left: 5 }}
              />
            )}

            <NoMetamaskContent onClick={onClick} onClose={onClose} />
          </ModalBody>

          {!isNotMobile && (
            <MobileBackButton
              zIndex={9999}
              onClick={onClose}
              isDark={false}
              position={{ marginLeft: 5, marginTop: 0, marginBottom: 5 }}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WrongNetworkModal;
