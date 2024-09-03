import React from 'react';
import { Box, Flex, VStack, HStack, Text, Divider } from '@chakra-ui/react';
import Image from 'next/image';
import ModalTitle from '@/components/General/Modal/CardModal/Title';
import BidSummary from '@/components/General/Modal/CardModal/BidSummary';
import SauceTraits from '@/components/General/Modal/CardModal/SauceTraits';
import Gunk from 'public/static/images/RedemptionCenter/VanityShelf/sauces/gunk.webp';
import Standard from 'public/static/images/RedemptionCenter/VanityShelf/sauces/standard.webp';
import Premium from 'public/static/images/RedemptionCenter/VanityShelf/sauces/premium.webp';
import Artisanal from 'public/static/images/RedemptionCenter/VanityShelf/sauces/artisanal.webp';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';
import { formatTime } from '@/util/formatTime';
import { formatDate } from '@/util/formatDate';
import useHashTankAccount from '@/hooks/useHashtankAccount';
import FishText from '../../../FishText';
import useFetchFishDetailsByIds from '@/new-hooks/fish/useFetchFishDetailsByIds';
import useFetchTokenMetas from '@/new-hooks/useFetchTokenMetas';

export const SauceImageMapper = {
  Gunk: Gunk,
  Standard: Standard,
  Premium: Premium,
  Artisanal: Artisanal,
};

const Content = ({
  txHash,
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  resaleValue,
  sauceId,
  serialNumber,
  name,
  imageUrl,
  boughtFor,
  createdAt,
  attributes,
  ...props
}: any) => {
  const { address } = useHashTankAccount();
  const ingredients = attributes.find(
    (attr: any) => attr.trait_type === 'ingredients'
  ).value;
  const fishDetailList = useFetchFishDetailsByIds(ingredients);
  const listOfMetadataUrls =
    fishDetailList?.map((each: any) => each.metadata_url) || [];
  const tokenMetas = useFetchTokenMetas(listOfMetadataUrls);
  const ACTIONS = [
    {
      actionText: 'sauce minted for',
      amount: boughtFor,
      walletAddress: address,
      ts: {
        content: `${formatDate(
          new Date(createdAt).toISOString()
        )} / ${formatTime(new Date(createdAt).toISOString())}`,
        color: 'black',
      },
    },
  ];

  const { isLandscape } = useScreenOritentation();
  const isMobile = mobileCheck();

  const isMobileLandscape = isLandscape && isMobile;

  const imageSize = isMobileLandscape ? '8%' : '30%';
  const gapSize = isMobileLandscape ? '50px' : '80px';
  return (
    <Flex
      pl={[0, '40px']}
      pr={[0, '50px']}
      pt={['0px', '60px']}
      pb={['0px', '50px']}
      gap={[gapSize, gapSize, gapSize, gapSize, '20px']}
      flexDirection={['column', 'row']}
      color={textColor}
      justifyContent={'center'}
      alignItems={['center', 'flex-start']}
    >
      <Box
        pt={['50px', '50px']}
        // pt={['20px', '20px']}
        alignSelf={['flex-start']}
        position='relative'
        w={[imageSize, imageSize, imageSize, '35%']}
        m='0 auto'
      >
        <Image
          width={100}
          height={100}
          style={{ margin: 'auto', width: '100%', height: 'auto' }}
          // @ts-ignore
          src={SauceImageMapper[name]}
          alt='Fish Sauce Modal'
        />
      </Box>
      <VStack width={['90%', '70%']}>
        <ModalTitle
          txHash={txHash}
          isDark
          width={['100%', '70%']}
          textColor={'#FFEE57'}
          borderColor={'white'}
          title={`${name} fish sauce #${serialNumber}`}
        />
        {ACTIONS.map((each: any, i: number) => (
          <BidSummary borderColor={'white'} key={i} {...each} />
        ))}
        <SauceTraits
          attributes={attributes}
          specialColor={specialColor}
          borderColor={'white'}
          specialText={
            name === 'Artisanal' && {
              content: `${name} sauce achieved`,
              color: '#FFEE57',
            }
          }
        />
        {tokenMetas && (
          <Flex
            mb='10%'
            flexDir={['column', 'row']}
            w='100%'
            justifyContent={'space-between'}
            flexWrap={'wrap'}
          >
            {tokenMetas.map((each: any) => (
              <>
                <FishText nftId={each.toString()} metadata={each} />

                <HStack w='fit-content' justify={'space-between'}>
                  <Text
                    textTransform={'uppercase'}
                    textAlign={'right'}
                    fontSize={['sm', 'md']}
                  >
                    umami
                  </Text>
                  <Text textAlign={'right'} fontSize={['sm', 'md']}>
                    {
                      each?.attributes?.find(
                        (each: any) => each.trait_type === 'umami'
                      )?.value
                    }
                  </Text>
                </HStack>
              </>
            ))}
          </Flex>
        )}
        <Divider
          mt={4}
          opacity={0.9}
          borderWidth={'1px'}
          borderColor={'white'}
        />
      </VStack>
    </Flex>
  );
};

export default Content;
