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
  name,
  image,
  nftId,
  ...props
}: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  return (
    <Card
      cursor={'pointer'}
      onClick={onClick}
      {...props}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'stretch'}
      m='25px 0'
      w={['45%', '45%', '30%', '30%', '22%']}
      color='white'
      background='none'
      shadow={'none'}
      maxW='sm'
    >
      <CardBody p={0} display={'flex'} flexDirection={'column'} flexGrow={1}>
        <Box
          position='relative'
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
            width={100}
            height={100}
            style={{
              margin: 'auto',
              width: '100%',
              height: 'auto',
              filter: isBreeding || isBroodFish ? 'blur(5px)' : 'none',
            }}
            src={image}
            alt='Green double couch with wooden legs'
          />
        </Box>

        <Stack flexGrow={1} mt='6' spacing='0'>
          <Stack h='full'>
            <Text
              color='brand.900'
              fontWeight={'normal'}
              fontSize={['xs', 'sm']}
            >
              #SG-0{nftId}
            </Text>
            <Text
              maxW={['100%', '80%']}
              mb='5px'
              color='brand.900'
              mt={['0px !important', '0px !important']}
              textTransform={'uppercase'}
              fontWeight={['medium', 'normal']}
              fontSize={['md', 'xl']}
            >
              {name}
            </Text>
          </Stack>
          <div>
            <Divider opacity={1} borderBottomWidth={2} borderColor={'white'} />
            <Flex
              m={['10px 0 14px 0', '15px 0']}
              flexDirection={['column', 'row']}
              justifyContent='space-between'
            >
              {isNotMobile && isBreeding && (
                <Text
                  {...props}
                  cursor={'pointer'}
                  decoration={'underline'}
                  fontWeight={'medium'}
                  fontSize={['sm', 'md']}
                >
                  details {'>'}
                </Text>
              )}
              <Text
                visibility={isBreeding ? 'visible' : 'hidden'}
                textAlign={['right', 'left']}
                fontWeight={'bold'}
                fontSize={['md', 'md']}
              >
                N/A
              </Text>
            </Flex>
            <Divider
              opacity={1}
              borderBottomWidth={2}
              borderColor={isNotMobile ? 'transparent' : 'white'}
            />
          </div>
        </Stack>
      </CardBody>
      <CardFooter mt='25px' w='100%' p='0' justifyContent={'center'}>
        {isBreeding ? (
          <Button
            color='white'
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
              fontSize={['sm', 'l', 'xl']}
            >
              {buttonText}
            </Text>
          </Button>
        ) : (
          <Button
            color='white'
            {...props}
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              onClick(e);
            }}
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
              fontSize={['sm', 'l', 'xl']}
            >
              view
            </Text>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default Trigger;
