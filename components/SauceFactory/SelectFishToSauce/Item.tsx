import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Box,
  Text,
  Divider,
  Flex,
  Button,
} from '@chakra-ui/react';
import Image from 'next/image';
import PikeImage from 'public/static/images/Auction/UnidentifiedFish.webp';
import HTModal from '@/components/General/Modal';
import MoreDetailsModal from '@/components/Auction/MoreDetailsModal';
import SubmitBidModal from '@/components/Auction/SubmitBidModal';
import { NotAllowedIcon } from '@chakra-ui/icons';

const AuctionItem = () => {
  return (
    <Card
      h='fit-content'
      m='25px 0'
      w={['45%', '45%', '30%', '30%', '22%']}
      color='white'
      background='none'
      shadow={'none'}
      maxW='sm'
    >
      <CardBody p={0} flex='none'>
        <Box borderRadius={'20px'} background='brand.700'>
          <Image
            style={{ margin: 'auto', width: '100%', height: 'auto' }}
            src={PikeImage}
            alt='Green double couch with wooden legs'
          />
        </Box>

        <Stack mt='6' spacing='3'>
          <Text fontWeight={'normal'} fontSize={['xs', 'sm']}>
            #SG-01
          </Text>
          <Text
            mt={['0px !important', '0px !important']}
            textTransform={'uppercase'}
            fontWeight={'normal'}
            fontSize={['sm', 'xl']}
          >
            Unidentified sunfish
          </Text>
          <Divider
            opacity={1}
            borderBottomWidth={2}
            borderColor={'brand.900'}
          />
          <Flex
            mt={['0px !important', '10px !important']}
            flexDirection={['column', 'row']}
            justifyContent='space-between'
          >
            <HTModal
              // bgColor={'#3D4B65'}
              // bgColor={'#87B4FF'}
              // isDark
              CallToAction={() => (
                <Box>
                  <Box
                    css={{
                      left: 0,
                      bottom: 0,
                      borderRadius: '6px',
                      background: 'brand.700',
                      position: 'absolute',
                      mask: 'linear-gradient(transparent, black, black)',
                      backdropFilter: 'blur(20px)',
                      height: '200px',
                      width: '100%',
                    }}
                  ></Box>
                  {/* <Flex justifyContent={'center'} w='100%'>
                <Button
                  _hover={{
                    bg: 'brand.800',
                  }}
                  mb='28px'
                  w='50%'
                  bg='brand.800'
                  p='3'
                  height='fit-content'
                  leftIcon={
                    <NotAllowedIcon color={'brand.900'} fontSize={'xl'} />
                  }
                >
                  <Text
                    textTransform={'uppercase'}
                    fontWeight={'normal'}
                    fontSize='sm'
                  >
                    VIEW IN AQUARIUM
                    <br />
                    <Text
                      as='i'
                      textTransform={'none'}
                      fontWeight={'normal'}
                      fontSize='sm'
                    >
                      (private)
                    </Text>
                  </Text>
                </Button>
              </Flex> */}
                </Box>
              )}
              closeButtonType='hollow'
              Content={() => (
                <div style={{ height: 1000 }}>
                  <SubmitBidModal />
                </div>
              )}
              Trigger={(props: any) => (
                <Text
                  {...props}
                  cursor={'pointer'}
                  decoration={'underline'}
                  fontWeight={'medium'}
                  fontSize={['s', 'm']}
                >
                  details {'>'}
                </Text>
              )}
            />
            <Text
              textAlign={['right', 'left']}
              fontWeight={'normal'}
              fontSize={['s', 'm']}
            >
              0.45 ETH
            </Text>
          </Flex>
          <Divider
            opacity={1}
            borderBottomWidth={2}
            borderColor={'brand.900'}
          />
        </Stack>
      </CardBody>
      <CardFooter mt='25px' w='100%' p='0' justifyContent={'center'}>
        <Button
          w={['100%']}
          p={['0', '30px 50px']}
          _hover={{
            background: 'white',
            color: 'brand.900',
          }}
          background={'brand.900'}
        >
          <Text
            textTransform={'uppercase'}
            fontWeight={'medium'}
            fontSize={['md', 'lg', 'xl']}
          >
            mint into sauce
          </Text>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuctionItem;
