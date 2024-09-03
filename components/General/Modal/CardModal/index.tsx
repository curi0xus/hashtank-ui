import React from 'react';
import {
  Box,
  VStack,
  Text,
  CircularProgress,
  Flex,
  HStack,
  Divider,
} from '@chakra-ui/react';
import Image from 'next/image';
import ModalTitle from './Title';
import BidSummary from './BidSummary';
import FishTraits from './FishTraits';
import BiddingHistory from './BidHistory';
import BidModule from '../Auction/BidModule';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';
import BrokenHeartImg from 'public/static/images/LoveSauceProgram/broken-heart.png';
import SauceSummary from './SauceSummary';
import BreedSummary from './BreedingSummary';
import IrradiatedIcon from 'public/static/images/Symbols/AttributeIrradiated.webp';
import ColorIcon from 'public/static/images/Symbols/AttributeColor.webp';
import PureIcon from 'public/static/images/Symbols/AttributePure.webp';
import BloatedEyeIcon from 'public/static/images/Symbols/AttributeBloatEyed.webp';
import RedRotIcon from 'public/static/images/Symbols/AttributeRedRot.webp';
import SpecialMutationIcon from 'public/static/images/Symbols/AttributeSpecialMutation.webp';
import TaggedIcon from 'public/static/images/Symbols/AttributeTagged.webp';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

const IconMapper = {
  Irradiated: IrradiatedIcon,
  'Bloat-eyed': BloatedEyeIcon,
  Redrot: RedRotIcon,
  Tagged: TaggedIcon,
  Streaked: ColorIcon,
  Pure: PureIcon,
};

const ModalTemplate = ({
  nftId,
  txHash,
  distributeAtTs,
  icon,
  SpecialContent,
  specialText,
  specialColor,
  isInTank,
  batchPrefix,
  batchName,
  batchNumber,
  title,
  textColor,
  img,
  hasBidSubmissionForm,
  actions,
  hasFishTraits,
  hasNoHistory,
  borderColor,
  isBreeding,
  closeModalsList,
  CallToAction,
  isBreedFailed,
  attributes,
  hasSauceSummary,
  hasBreedSummary,
  auctionId,
  sizeRange,
  fishId,
}: any) => {
  const size = attributes?.find(
    (attr: any) => attr.trait_type === 'size'
  )?.value;
  const scientificName = attributes?.find(
    (attr: any) => attr.trait_type === 'scientific_name'
  )?.value;
  const mutations = attributes?.find(
    (attr: any) => attr.trait_type === 'mutations'
  )?.value;
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  const humanReadableEndData =
    isBreeding && distributeAtTs
      ? format(
          fromUnixTime(Number(distributeAtTs.toString())),
          'd.mm.yyyy HH:mm'
        )
      : '';
  const progress = distributeAtTs
    ? Math.min(
        100 -
          (distributeAtTs - new Date().getTime() / 1000) /
            (new Date().getTime() / 1000),
        100
      )
    : 0;

  return (
    <VStack
      pl={['10px', '10px']}
      pr={['10px', '10px']}
      pb='100px'
      color={textColor}
      justifyContent={'center'}
    >
      {specialText && (
        <Box mt='50px' width='90%'>
          <Text
            textAlign={specialText.alignment}
            color={specialText.textColor}
            textTransform={'uppercase'}
            fontWeight={'medium'}
            fontSize='3xl'
          >
            {specialText.content1}
            <br />
            {specialText.content2}
          </Text>
        </Box>
      )}
      {SpecialContent ? (
        <SpecialContent />
      ) : (
        <Box
          mt={isMobileLandscape ? 0 : ['0px']}
          position='relative'
          height={['fit-content', 'fit-content']}
          width={[
            'fit-content',
            isBreeding ? '100%' : isMobileLandscape ? '20%' : '60%',
          ]}
        >
          {isInTank && (
            <Box
              h='65%'
              w='65%'
              m='auto'
              top={0}
              right={0}
              left={0}
              bottom={0}
              zIndex={-1}
              position='absolute'
              borderRadius={'10px'}
              border='3px solid'
              borderColor='brand.900'
            />
          )}
          {isBreeding ? (
            <Box
              margin={'auto'}
              w='90%'
              p='0 18px'
              display='flex'
              flexDir={['column-reverse', 'row']}
            >
              <Flex flexDir={'column'} flex='1' alignItems='flex-start'>
                <Text
                  pt='30px'
                  minW='120px'
                  color='brand.700'
                  mt={['0px !important', '0px !important']}
                  textTransform={'uppercase'}
                  fontWeight={'bold'}
                  fontSize={['md', 'l']}
                >
                  in lovesauce program
                </Text>
                <Text
                  display={['none', 'block']}
                  color='white'
                  mt={['0px !important', '0px !important']}
                  textTransform={'lowercase'}
                  fontWeight={'normal'}
                  fontSize={['md', 'md']}
                >
                  -
                </Text>
                <Text
                  color='white'
                  mt={['0px !important', '0px !important']}
                  textTransform={'lowercase'}
                  fontWeight={'normal'}
                  fontSize={['md', 'md']}
                >
                  completes {humanReadableEndData}
                </Text>
              </Flex>
              <Box
                display='flex'
                justifyContent={'center'}
                flex={isMobileLandscape ? 1 : 3}
                position={'relative'}
              >
                <CircularProgress
                  capIsRound
                  trackColor='#212431'
                  size='100%'
                  margin='auto'
                  position='absolute'
                  value={progress}
                  color='brand.700'
                  thickness='2px'
                />
                <Image
                  width={100}
                  height={100}
                  style={{
                    paddingTop: '50px',
                    margin: 'auto',
                    width: '80%',
                    height: 'auto',
                  }}
                  src={img}
                  alt='More details fish'
                />
              </Box>
              <Flex
                flex='1'
                transform={['translateY(40px)', 'none']}
                alignItems={'center'}
                justifyContent={['flex-end', 'center']}
              >
                <Text
                  color='brand.700'
                  mt={['0px !important', '0px !important']}
                  textTransform={'uppercase'}
                  fontWeight={'medium'}
                  fontSize={['2xl', 'l']}
                >
                  {progress}%
                </Text>
              </Flex>
            </Box>
          ) : isBreedFailed ? (
            <Box
              backgroundSize={'contain'}
              backgroundImage={BrokenHeartImg.src}
            >
              <Image
                width={100}
                height={100}
                style={{ margin: 'auto', width: '100%', height: 'auto' }}
                src={img}
                alt='More details fish'
              />
            </Box>
          ) : (
            <Image
              width={100}
              height={100}
              style={{ margin: 'auto', width: '100%', height: 'auto' }}
              src={img}
              alt='More details fish'
            />
          )}
        </Box>
      )}
      <VStack width={['90%']}>
        {icon && (
          <Box alignSelf='flex-start' width={'33px'}>
            <Image
              width={100}
              height={100}
              style={{
                margin: 'auto',
                width: '100%',
                height: 'auto',
                filter: isBreeding ? 'blur(5px)' : 'none',
              }}
              src={icon}
              alt='Hierarchy Icon'
            />
          </Box>
        )}
        {sizeRange && (
          <Text
            color={textColor || 'black'}
            width={'100%'}
            textTransform={'uppercase'}
            fontWeight={'medium'}
            fontSize={['sm', 'md']}
          >
            SIZE RANGE: {sizeRange}
          </Text>
        )}
        <ModalTitle
          txHash={txHash}
          hasBidSubmissionForm={hasBidSubmissionForm}
          secondaryTitle={scientificName}
          textColor={borderColor}
          borderColor={borderColor}
          title={title}
        />
        <Flex
          direction={['column-reverse', 'row']}
          h='100%'
          justifyContent={['space-between']}
          w='100%'
        >
          {size && (
            <Flex
              justifyContent={'space-around'}
              direction='column'
              minH='100%'
              w={['100%', '35%']}
            >
              <HStack p={['10px 0', 0]}>
                <Text
                  color={'black'}
                  width={'100%'}
                  textTransform={'uppercase'}
                  fontWeight={'medium'}
                  fontSize={['sm', 'md']}
                >
                  Size
                </Text>
                <Text
                  textAlign={'right'}
                  color={'black'}
                  width={'100%'}
                  textTransform={'uppercase'}
                  fontWeight={'medium'}
                  fontSize={['sm', 'md']}
                >
                  {size}
                </Text>
              </HStack>
              <Divider
                mt={[0, 10]}
                opacity={0.9}
                borderWidth={'1px'}
                borderColor={borderColor || 'brand.900'}
              />
            </Flex>
          )}
          <Box w={['100%', size ? '60%' : '100%']}>
            {actions &&
              actions.map((each: any, i: number) => (
                <BidSummary borderColor={borderColor} key={i} {...each} />
              ))}
          </Box>
        </Flex>

        {hasBidSubmissionForm && (
          <BidModule
            batchPrefix={batchPrefix}
            batchName={batchName}
            batchNumber={batchNumber}
            fishName={title}
            img={img}
            closeModalsList={closeModalsList}
            borderColor={borderColor}
            auctionId={auctionId}
            fishId={fishId}
          />
        )}
        {!hasBreedSummary && (
          <Flex
            direction={['column', 'row']}
            justifyContent={['space-between']}
            w='100%'
          >
            <Box w={['100%', '35%']}>
              {hasFishTraits && attributes && (
                <FishTraits
                  attributes={attributes}
                  specialColor={specialColor}
                  textColor={textColor}
                  borderColor={borderColor}
                />
              )}
            </Box>
            {mutations && (
              <Box minH='100%' w={['100%', '60%']}>
                <Flex
                  p={'10px 0'}
                  direction={['column', 'row']}
                  minH='100%'
                  flexWrap={'wrap'}
                >
                  {mutations.map((mutation: string) => (
                    <HStack key={mutation} h='fit-content' w='50%'>
                      <Box h={5} w={5}>
                        <Image
                          alt={mutation}
                          // @ts-ignore
                          src={IconMapper[mutation] || SpecialMutationIcon}
                          height={5}
                          width={5}
                          style={{ height: '100%', width: 'auto' }}
                        />
                      </Box>

                      <Text
                        textTransform={'capitalize'}
                        fontWeight={'normal'}
                        fontSize={['sm', 'md']}
                      >
                        {mutation}
                      </Text>
                    </HStack>
                  ))}
                </Flex>
                <Divider
                  mt={-0.5}
                  opacity={0.9}
                  borderWidth={'1px'}
                  borderColor={borderColor || 'brand.900'}
                />
              </Box>
            )}
          </Flex>
        )}
        {hasBreedSummary && <BreedSummary />}
        {hasSauceSummary && <SauceSummary />}
        {!hasNoHistory && (
          <BiddingHistory auctionId={auctionId} fishId={fishId} nftId={nftId} />
        )}
      </VStack>
      {CallToAction && <CallToAction />}
    </VStack>
  );
};

export default ModalTemplate;
