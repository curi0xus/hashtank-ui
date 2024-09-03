import React from 'react';
import { Flex, Divider, HStack, Text, Box } from '@chakra-ui/react';
import useSelectedFishIds from '@/hooks/SauceFactory/useSelectedFishIds';
import { UNIQUENESS_MAP } from '@/hooks/admin/redemption/useMintSauceToUsers';
import useFetchFishDetailsByIds from '@/new-hooks/fish/useFetchFishDetailsByIds';
import useFetchTokenMetas from '@/new-hooks/useFetchTokenMetas';

const FishAttribute = ({ attributeName, attributeScore }: any) => {
  return (
    <HStack
      textColor={'black'}
      p={['5px 0', 0]}
      justifyContent={'space-between'}
      w={['100%', '45%']}
    >
      <HStack>
        <Text fontWeight={'bold'} fontSize={['sm', 'md']}>
          {attributeName}:
        </Text>
        <Text fontWeight={'normal'} fontSize={['sm', 'md']}>
          {attributeScore}
        </Text>
      </HStack>
    </HStack>
  );
};

function getSauceAttributes(metas: any, sauceContentLength: number) {
  if (metas.length && sauceContentLength) {
    let uniqueFamilies = [] as string[];
    let uniqueSpecies = [] as string[];
    let totalFertility = 0;
    let totalWeightedAverageUmami = 0;
    let totalRadiation = 0;
    let totalSize = metas.reduce(
      (acc: any, curr: any) =>
        acc +
          curr?.attributes?.find((each: any) => each.trait_type === 'size')
            ?.value || 0,
      0
    );
    for (let i = 0; i < metas.length; i++) {
      totalWeightedAverageUmami +=
        (metas[i].attributes.find((attr: any) => attr.trait_type === 'size')
          .value /
          totalSize) *
        metas[i].attributes.find((attr: any) => attr.trait_type === 'umami')
          .value;
      totalFertility += metas[i].attributes.find(
        (attr: any) => attr.trait_type === 'fertility'
      ).value;
      totalRadiation += metas[i].attributes.find(
        (attr: any) => attr.trait_type === 'radiation'
      ).value;
      const family = metas[i].attributes.find(
        (attr: any) => attr.trait_type === 'family'
      ).value;
      if (uniqueFamilies.indexOf(family)) {
        uniqueFamilies.push(family);
      }
      const species = metas[i].attributes.find(
        (attr: any) => attr.trait_type === 'species'
      ).value;
      if (uniqueSpecies.indexOf(family)) {
        uniqueSpecies.push(species);
      }
    }
    const avgFertility = totalFertility / sauceContentLength;
    const avgRadiaton = totalRadiation / sauceContentLength;
    const m2 =
      UNIQUENESS_MAP[uniqueFamilies.length - 1][uniqueSpecies.length - 1];
    const m1 = (50 - avgFertility + avgRadiaton) / 200;
    const complexity = totalWeightedAverageUmami * (1 - m1) * (1 + m2);

    return { complexity, totalWeightedAverageUmami };
  }

  return {
    complexity: 0,
    totalWeightedAverageUmami: 0,
  };
}

const SauceSummary = () => {
  const { selectedFishIds } = useSelectedFishIds();
  const fishDetailList = useFetchFishDetailsByIds(selectedFishIds);
  const listOfMetadataUrls =
    fishDetailList?.map((each: any) => each.metadata_url) || [];
  const tokenMetas = useFetchTokenMetas(listOfMetadataUrls);
  const { totalWeightedAverageUmami, complexity } = getSauceAttributes(
    tokenMetas,
    selectedFishIds.length
  );

  const totalBidValue = fishDetailList.reduce(
    (acc, curr) => acc + curr.winning_bid,
    0
  );

  return (
    <>
      <Flex
        flexDir={['column', 'row']}
        w='100%'
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <Box w={'48%'} pt={2} pb={2}>
          <HStack pb={2}>
            <Text fontWeight={'bold'} fontSize={['sm', 'md']}>
              Total Fish Selected: {selectedFishIds.length}
            </Text>
          </HStack>
          {tokenMetas.map((meta: any) => (
            <Text fontWeight={'normal'} fontSize={['xs', 'sm']} key={meta.name}>
              {meta.name}{' '}
            </Text>
          ))}
        </Box>
        <Text
          pt={2}
          textAlign={'center'}
          w={'48%'}
          fontWeight={'bold'}
          fontSize={['sm', 'md']}
        >
          Total Bid Value: ⌘ {totalBidValue}
        </Text>
      </Flex>
      <Divider opacity={1} borderWidth={'1px'} borderColor={'brand.900'} />
      <Flex
        flexDir={['column', 'row']}
        w='100%'
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        <FishAttribute
          attributeName='Weighted Avg. Umami'
          attributeScore={totalWeightedAverageUmami.toFixed(2)}
        />
        <FishAttribute
          attributeName='Complexity'
          attributeScore={complexity.toFixed(2)}
        />
      </Flex>
      <Text fontStyle={'italic'} fontWeight={'normal'} fontSize={['sm', 'md']}>
        • estimated result, actual output may vary *
      </Text>
      <Divider opacity={1} borderWidth={'1px'} borderColor={'brand.900'} />
    </>
  );
};
export default SauceSummary;
