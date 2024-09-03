import React from 'react';
import { Flex, Divider, HStack, Text } from '@chakra-ui/react';
import useSelectedBroodFish from '@/hooks/LoveSauceProgram/useSelectedBroodFish';
import useGetTokenMetas from '@/hooks/admin/loveSauceProgram/useGetTokenMetas';
import useGetTotalBidByTokenIDs from '@/hooks/useGetTotalBidByTokenIDs';
import FishText from '../FishText';

const BreedSummary = () => {
  const { selectedBroodFishIds } = useSelectedBroodFish();
  const { tokenMetasMap } = useGetTokenMetas(selectedBroodFishIds);
  const { totalBidEthString } = useGetTotalBidByTokenIDs(selectedBroodFishIds);

  return (
    <>
      <Text
        textTransform={'uppercase'}
        textAlign={'left'}
        w={'100%'}
        fontWeight={'bold'}
        fontSize={['sm', 'md']}
      >
        collective batch price: ⌘ {totalBidEthString}
      </Text>
      <Divider opacity={1} borderWidth={'1px'} borderColor={'brand.900'} />
      <Flex
        flexDir={['column', 'row']}
        w='100%'
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        {selectedBroodFishIds.map((nftId: any) => (
          <>
            <FishText nftId={nftId} metadata={tokenMetasMap[nftId]} />
            {/* <Text
              cursor={'pointer'}
              color={['#0059FF', 'black']}
              textDecoration={'underline'}
              pt={2}
              w={'48%'}
              fontWeight={'normal'}
              fontSize={['sm', 'md']}
              key={meta?.name}
            >
              {meta?.name}{' '}
            </Text> */}
            <HStack w='fit-content' justify={'space-between'}>
              <Text textAlign={'right'} fontSize={['sm', 'md']}>
                SIZE
              </Text>
              <Text textAlign={'right'} fontSize={['sm', 'md']}>
                {
                  tokenMetasMap[nftId]?.attributes?.find(
                    (each: any) => each.trait_type === 'size'
                  )?.value
                }
              </Text>
            </HStack>
          </>
        ))}
      </Flex>
      <Divider
        mt={2}
        opacity={1}
        borderWidth={'1px'}
        borderColor={'brand.900'}
      />
    </>
  );
};
export default BreedSummary;
