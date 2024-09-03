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
  IconButton,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import PikeImage from 'public/static/images/PlentyOfFish/PikeSpace.webp';
import HTModal from '@/components/General/Modal';
import CallToAction from './CallToAction';
import Content from './Content';
import { CloseIcon } from '@chakra-ui/icons';

const Trigger = ({
  specialColor,
  borderColor,
  isDark,
  textColor,
  bgColor,
  onClick,
  isDisabled,
  isSelected,
  isBreeding,
  isOffSpring,
  isBroodFish,
  buttonText,
  hasOffspring,
  hasNoHistory,
  ...props
}: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  return (
    <Card
      onClick={isNotMobile ? () => {} : onClick}
      {...props}
      h='fit-content'
      m='25px 0'
      w={['45%', '45%', '30%', '30%', '22%']}
      color='white'
      background='none'
      shadow={'none'}
      maxW='sm'
    >
      <CardBody p={0} flex='none'>
        <Box
          position='relative'
          height='100%'
          borderRadius={'20px'}
          background={
            isBroodFish
              ? hasOffspring
                ? '#A0FF56'
                : '#FF530D'
              : isBreeding
              ? 'brand.600'
              : isOffSpring
              ? '87B4FF'
              : 'brand.700'
          }
        >
          {isSelected && (
            <IconButton
              _hover={{
                background: 'none',
                color: 'brand.800',
              }}
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('deselect');
              }}
              top={[1, 3]}
              right={[1, 3]}
              position='absolute'
              color='brand.800'
              background='none'
              aria-label='Back Arrow'
              icon={<CloseIcon fontSize={[18, 25]} />}
            />
          )}
          {(isBreeding || isBroodFish) && (
            <Text
              h='fit-content'
              textAlign={'center'}
              fontWeight={'medium'}
              fontSize={['sm', 'md', 'l', 'xl', '2xl']}
              w='60%'
              position='absolute'
              zIndex={999}
              m='auto'
              top={0}
              right={0}
              left={0}
              bottom={0}
              textTransform={'uppercase'}
            >
              {isBroodFish
                ? hasOffspring
                  ? 'completed: success'
                  : 'completed: failure'
                : 'in breeding program'}
            </Text>
          )}
          <Image
            style={{
              margin: 'auto',
              width: '100%',
              height: 'auto',
              filter: isBreeding || isBroodFish ? 'blur(5px)' : 'none',
            }}
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
          <Divider opacity={1} borderBottomWidth={2} borderColor={'white'} />
          <Flex
            flexDirection={['column', 'row']}
            justifyContent='space-between'
          >
            {isNotMobile && isBreeding && (
              <HTModal
                isDark
                bgColor={bgColor}
                CallToAction={CallToAction}
                closeButtonType='hollow'
                Content={(props: any) => (
                  <Content
                    specialColor={specialColor}
                    hasNoHistory={hasNoHistory}
                    borderColor={borderColor}
                    textColor={textColor}
                    {...props}
                  />
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
            )}
            <Text
              visibility={isBreeding ? 'visible' : 'hidden'}
              textAlign={['right', 'left']}
              fontWeight={'bold'}
              fontSize={['s', 'm']}
            >
              N/A
            </Text>
          </Flex>
          <Divider
            opacity={1}
            borderBottomWidth={2}
            borderColor={isBreeding ? 'white' : 'brand.800'}
          />
        </Stack>
      </CardBody>
      <CardFooter mt='25px' w='100%' p='0' justifyContent={'center'}>
        {isBreeding ? (
          <Button
            disabled={isDisabled}
            w={['100%']}
            p={['0', '30px 50px']}
            _hover={{
              background: isDisabled ? 'brand.600' : 'white',
              color: isDisabled ? 'white' : 'brand.900',
            }}
            background={isDisabled ? 'brand.600' : 'brand.900'}
          >
            <Text
              textTransform={'uppercase'}
              fontWeight={'medium'}
              fontSize={['md', 'lg', 'xl']}
            >
              {buttonText}
            </Text>
          </Button>
        ) : (
          <HTModal
            bgColor={bgColor}
            CallToAction={CallToAction}
            closeButtonType='hollow'
            Content={(props: any) => (
              <Content
                specialColor={specialColor}
                hasNoHistory={hasNoHistory}
                borderColor={borderColor}
                textColor={textColor}
                {...props}
              />
            )}
            Trigger={(props: any) => (
              <Button
                {...props}
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
                  view offspring
                </Text>
              </Button>
            )}
          />
        )}
      </CardFooter>
    </Card>
  );
};
export default Trigger;
