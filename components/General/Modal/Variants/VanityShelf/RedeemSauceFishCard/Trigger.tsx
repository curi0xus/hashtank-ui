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
  VStack,
  useMediaQuery,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import Image from 'next/image';
import CloseIcon from '@/components/General/Icons/CloseIcon';
import HashtankTooltip from '@/components/General/Tooltip';
import BellImage from 'public/static/images/General/Tooltip/Bell.webp';

const Trigger = ({
  tiggerId,
  isNew,
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
  imageUrl,
  sauceId,
  resaleValue,
  serialNumber,
  name,
  isGunk,
  gunkSauceCount,
  ...props
}: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 900px)', {
    ssr: true,
    fallback: false,
  });

  return (
    <Card
      position={'relative'}
      cursor={'pointer'}
      onClick={isGunk ? () => {} : onClick}
      {...props}
      h='fit-content'
      m='25px 0'
      w={['45%', '45%', '30%', '30%', '22%']}
      color='white'
      background='none'
      shadow={'none'}
      maxW='sm'
    >
      {isGunk && gunkSauceCount > 1 && (
        <Tag
          zIndex={999}
          top={-2}
          right={-3}
          position={'absolute'}
          w='fit-content'
          size='lg'
          bg='brand.700'
          borderRadius='full'
        >
          <TagLabel>+{gunkSauceCount - 1}</TagLabel>
        </Tag>
      )}
      <HashtankTooltip
        InstructionId={tiggerId}
        storageKey='trinkets'
        defaultIsOpen
        Icon={BellImage}
        title='your trinkets'
        Instruction={() => (
          <>
            Once sauced, your empty bottle is returned to you. But maybe you’ll
            keep them around? Who knows if you’ll need them again one day.
          </>
        )}
        Trigger={() => (
          <>
            <CardBody p={0} flex='none'>
              <Box
                position='relative'
                height='100%'
                borderRadius={'20px'}
                background={
                  isNew ? 'radial-gradient(#B276FF, #FFF387)' : '#B276FF'
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
                {/* {(isBreeding || isBroodFish) && (
            <Text
              h='fit-content'
              textAlign={'center'}
              fontWeight={'medium'}
              fontSize={['sm', 'xl', '2xl', '3xl', '4xl']}
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
          )} */}
                <Box padding='10%'>
                  <Image
                    height={100}
                    width={100}
                    style={{
                      margin: 'auto',
                      width: '100%',
                      height: 'auto',
                    }}
                    src={imageUrl}
                    alt='Green double couch with wooden legs'
                  />
                </Box>
              </Box>

              <Stack mt='6' spacing='0'>
                {!isGunk && (
                  <Text
                    color='brand.900'
                    fontWeight={'normal'}
                    fontSize={['xs', 'sm']}
                  >
                    #{serialNumber}{' '}
                  </Text>
                )}
                <Text
                  mb={['5px', '10px']}
                  color='brand.900'
                  mt={['0px !important', '0px !important']}
                  textTransform={'uppercase'}
                  fontWeight={'normal'}
                  fontSize={['md', 'xl']}
                >
                  {name}
                </Text>
                <Divider
                  opacity={1}
                  borderBottomWidth={2}
                  borderColor={'white'}
                />

                <Flex
                  mt={['0px !important', '10px !important']}
                  flexDirection={['column', 'row']}
                  justifyContent={[
                    'flex-end',
                    'flex-end',
                    'flex-end',
                    'space-between',
                  ]}
                >
                  {isNotMobile && !isGunk && (
                    <Text
                      {...props}
                      cursor={'pointer'}
                      decoration={'underline'}
                      fontWeight={'normal'}
                      fontSize={['sm', 'md']}
                    >
                      details {'>'}
                    </Text>
                  )}
                  <VStack
                    flexDir={isGunk ? 'row' : 'column'}
                    w={isGunk ? '100%' : '60%'}
                    gap='0'
                    m={['10px 0', '5px 0']}
                    justify={'space-between'}
                    alignItems={isGunk ? 'space-between' : 'flex-end'}
                  >
                    <Text
                      mb={['15px', '0px']}
                      textTransform={'uppercase'}
                      fontWeight={['normal', 'normal']}
                      fontSize={['sm', 'md']}
                    >
                      resale value
                    </Text>
                    <Text
                      mt='0 !important'
                      // textAlign={'right'}
                      textAlign={['right', 'left']}
                      fontWeight={['normal', 'normal']}
                      fontSize={['sm', 'md']}
                    >
                      ⌘{' '}
                      {resaleValue?.toFixed
                        ? resaleValue.toFixed(2)
                        : resaleValue}
                    </Text>
                  </VStack>
                </Flex>
                <Divider
                  opacity={1}
                  borderBottomWidth={2}
                  borderColor={'white'}
                />
              </Stack>
            </CardBody>
            {resaleValue > 0 && (
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
                  <Button
                    color='white'
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
                      sell / redeem
                    </Text>
                  </Button>
                  // <RedeemSauceConfirmation
                  //   Trigger={(props: any) => (
                  //     <Button
                  //       color='white'
                  //       {...props}
                  //       onClick={(e: any) => {
                  //         e.preventDefault();
                  //         e.stopPropagation();
                  //         props.onClick(e);
                  //       }}
                  //       w={['100%']}
                  //       p={['0', '30px 50px']}
                  //       _hover={{
                  //         background: 'white',
                  //         color: 'brand.900',
                  //       }}
                  //       background={'brand.900'}
                  //     >
                  //       <Text
                  //         textTransform={'uppercase'}
                  //         fontWeight={'medium'}
                  //         fontSize={['md', 'lg', 'xl']}
                  //       >
                  //         redeem sauce
                  //       </Text>
                  //     </Button>
                  //   )}
                  // />
                )}
              </CardFooter>
            )}
          </>
        )}
      />
    </Card>
  );
};
export default Trigger;
