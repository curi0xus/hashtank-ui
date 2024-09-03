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
import RemoveFromSelection from '@/components/General/Icons/RemoveFromSelection';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';
import useSelectedFishIds from '@/hooks/SauceFactory/useSelectedFishIds';
import useSelectedBroodFish from '@/hooks/LoveSauceProgram/useSelectedBroodFish';
import OffspringIcon from 'public/static/images/Symbols/Offspring.webp';
import LoveSauceAlumniIcon from 'public/static/images/Symbols/LoveSauceAlumni.webp';
import useSelectedFishIdsToTank from '@/hooks/EditAquarium/useSelectedFishIdsToTank';

const Trigger = ({
  isNew,
  onClick,
  isDisabled,
  isSelected,
  isBreeding,
  isOffSpring,
  isBroodFish,
  isTiny,
  buttonText,
  type,
  imageUrl,
  name,
  nftId,
  winningBid,
  serialNumber,
  ...props
}: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  const isBatchSauceSelectedCard = isSelected && type === 'sauce-factory';
  // @ts-ignore
  const { addSelectedFish, removeSelectedFish } = useSelectedFishIds();
  const { addSelectedBroodFish, removeSelectedBroodFish } =
    useSelectedBroodFish();
  const {
    addSelectedFish: addSelectFishToTank,
    removeSelectedFish: removeSlectedFishFromTank,
  } = useSelectedFishIdsToTank();

  const cardBgColor = isBreeding
    ? 'brand.600'
    : isOffSpring
    ? isNew
      ? 'radial-gradient(#87B4FF 1%, #FFF387 100%)'
      : '#87B4FF'
    : isNew
    ? 'radial-gradient(#4AF8FF 45%, #FFF387 100%)'
    : 'brand.700';

  return (
    <Card
      cursor={'pointer'}
      onClick={onClick}
      {...props}
      // h='fit-content'
      display={'flex'}
      flexDirection={'column'}
      alignItems={'stretch'}
      m={isTiny ? '5px 0' : '25px 0'}
      w={
        isTiny
          ? ['23%', '23%', '15%', '15%', '9%']
          : isBatchSauceSelectedCard
          ? ['47%', '47%', '30%', '30%', '16.8%']
          : ['45%', '45%', '30%', '30%', '22%']
      }
      color='white'
      background='none'
      shadow={'none'}
      maxW='sm'
    >
      <CardBody display={'flex'} flexDirection={'column'} flexGrow={1} p={0}>
        <Box
          position='relative'
          // height='100%'
          borderRadius={isOffSpring ? '45px' : '20px'}
          background={cardBgColor}
        >
          {isOffSpring && (
            <Box
              width={'15%'}
              bottom={[1, 3]}
              right={[1, 3]}
              position='absolute'
              background='none'
            >
              <Image
                width={100}
                height={100}
                style={{
                  margin: 'auto',
                  width: '100%',
                  height: 'auto',
                  filter: isBreeding ? 'blur(5px)' : 'none',
                }}
                src={OffspringIcon}
                alt='Offspring Icon'
              />
            </Box>
          )}
          {isBroodFish && (
            <Box
              width={'15%'}
              // height={'33px'}
              bottom={[1, 3]}
              right={[1, 3]}
              position='absolute'
              background='none'
            >
              <Image
                width={100}
                height={100}
                style={{
                  margin: 'auto',
                  width: '100%',
                  height: 'auto',
                  filter: isBreeding ? 'blur(5px)' : 'none',
                }}
                src={LoveSauceAlumniIcon}
                alt='Broodfish icon'
              />
            </Box>
          )}
          {isSelected && (
            <IconButton
              _hover={{
                background: 'none',
                color: 'brand.800',
              }}
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                buttonText === 'select fish' && removeSelectedFish(nftId);
                buttonText === 'add to program' &&
                  removeSelectedBroodFish(nftId);
                buttonText === 'send to tank' &&
                  removeSlectedFishFromTank(nftId);
              }}
              top={[1, 3]}
              right={[1, 3]}
              position='absolute'
              color='brand.800'
              background='none'
              aria-label='Back Arrow'
              icon={<RemoveFromSelection fontSize={[18, 25]} />}
            />
          )}
          {isBreeding && (
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
              in breeding program
            </Text>
          )}
          <Image
            width={100}
            height={100}
            style={{
              margin: 'auto',
              width: '100%',
              height: 'auto',
              filter: isBreeding ? 'blur(5px)' : 'none',
            }}
            src={imageUrl || PikeImage}
            alt='Green double couch with wooden legs'
          />
        </Box>

        {!isTiny && (
          <Stack flexGrow={1} mt='6' spacing='0'>
            <Stack h='full'>
              <Text
                color='brand.900'
                fontWeight={'normal'}
                fontSize={['xs', 'sm']}
              >
                #{serialNumber}
              </Text>
              <Text
                mb={['5px']}
                maxW={['100%', '80%']}
                color='brand.900'
                mt={['0px !important', '0px !important']}
                textTransform={'uppercase'}
                fontWeight={'medium'}
                fontSize={['md', 'xl']}
              >
                {name}
              </Text>
            </Stack>
            <div>
              <Divider
                opacity={1}
                borderBottomWidth={2}
                borderColor={'white'}
              />
              <Flex
                m={[
                  '10px 0 14px 0',
                  '10px 0 14px 0',
                  '10px 0 14px 0',
                  '15px 0',
                ]}
                flexDirection={['column', 'row']}
                justifyContent='space-between'
              >
                {isNotMobile && (
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
                <Text
                  textAlign={['right', 'left']}
                  fontWeight={['bold', 'normal']}
                  fontSize={['md', 'md']}
                >
                  ⌘ {winningBid}
                </Text>
              </Flex>
              <Divider
                opacity={1}
                borderBottomWidth={2}
                borderColor={'white'}
              />
            </div>
          </Stack>
        )}
      </CardBody>

      {!isSelected && (
        <CardFooter mt='25px' w='100%' p='0' justifyContent={'center'}>
          {buttonText === 'select fish' ? (
            <Button
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                addSelectedFish(nftId);
              }}
              color='white'
              w={['100%']}
              p={['0px', '30px 50px']}
              _hover={{
                background: isDisabled ? 'brand.600' : 'white',
                color: isDisabled ? 'white' : 'brand.900',
              }}
              background={isDisabled ? 'brand.600' : 'brand.900'}
            >
              <Text
                textTransform={'uppercase'}
                fontWeight={'medium'}
                fontSize={[
                  isMobileLandscape ? 'md' : 'sm',
                  'l',
                  'md',
                  'md',
                  'xl',
                ]}
              >
                {buttonText}
              </Text>
            </Button>
          ) : buttonText === 'add to program' ? (
            <Button
              {...props}
              isDisabled={isDisabled}
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                addSelectedBroodFish(nftId);
                const elementTop =
                  document
                    ?.getElementById('loveSauceProgramEnrolment')
                    ?.getBoundingClientRect().top || 0;
                const bodyTop =
                  document?.body?.getBoundingClientRect().top || 0;
                const offset = (bodyTop - elementTop) * -1;
                console.log('OFFSET', offset);
                window.scroll(0, offset);
              }}
              color='white'
              w={['100%']}
              p={['0px', '30px 50px']}
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
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                addSelectFishToTank(nftId);
              }}
              color='white'
              w={['100%']}
              p={['0px', '30px 50px']}
              _hover={{
                background: isDisabled ? 'brand.600' : 'white',
                color: isDisabled ? 'white' : 'brand.900',
              }}
              background={isDisabled ? 'brand.600' : 'brand.900'}
            >
              <Text
                textTransform={'uppercase'}
                fontWeight={'medium'}
                fontSize={[
                  buttonText === 'lovesauce alumni' ? '12px' : 'sm',
                  'l',
                  'xl',
                ]}
              >
                {buttonText}
              </Text>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
export default Trigger;
