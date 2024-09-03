import React from 'react';
import { Flex, VStack, Text, Divider } from '@chakra-ui/react';
import HTSelect from '../Select';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';

const FilterLayout = ({
  title,
  filters,
  items,
  sortFilters,
  CustomLayout,
  InfoBar,
}: any) => {
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  return (
    <VStack mt={[100, 0]} width='100%' alignItems='flex-start'>
      <Flex w='100%' justifyContent={'space-between'}>
        <Text
          mr='5'
          textTransform={'uppercase'}
          color='white'
          fontWeight={'bold'}
          fontSize={['3xl', '2xl', '3xl', '4xl', '5xl']}
        >
          {title}
        </Text>
        {InfoBar && <InfoBar />}
      </Flex>

      <Divider
        borderColor={['brand.900', 'brand.900', 'white']}
        mb={[0, '20px !important']}
        opacity={1}
        borderBottomWidth={3}
      />
      <Flex
        width='100%'
        flexDir={['column', 'column', 'column', 'row', 'column', 'row']}
        justifyContent={'space-between'}
      >
        {/* Filter Groups */}
        <Flex mb={[0, '45px !important']} flexDir={['column', 'row']}>
          <Text
            mt={[5, 0]}
            mb={[2, 0]}
            mr={[0, 10]}
            color='white'
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'sm', 'md', 'xl']}
          >
            filter
          </Text>
          <Flex
            w='100%'
            gap={[3]}
            flexDir={['column', 'column', 'row', 'column', 'row']}
          >
            {filters.map((each: any, i: number) => (
              <HTSelect key={i} options={each} />
            ))}
          </Flex>
        </Flex>

        {/* Sort Group */}
        <Flex flexDir={['column', 'row']}>
          <Text
            whiteSpace={'nowrap'}
            mt={[5, 0]}
            mb={[2, 0]}
            mr={[0, 8, 8, 8, 7]}
            color='white'
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'sm', 'md', 'xl']}
          >
            sort by
          </Text>
          <Flex w='100%' flexDir={['column', 'row']}>
            {sortFilters.map((each: any, i: number) => (
              <HTSelect key={i} options={each} />
            ))}
          </Flex>
        </Flex>
      </Flex>

      {CustomLayout ? (
        <CustomLayout> {items()}</CustomLayout>
      ) : (
        <Flex
          w='100%'
          gap={isMobileLandscape ? 0 : ['0%', '10%', '5%', '5%', '4%']}
          columnGap={['5%', '5%', '5%', '4%']}
          flexWrap={'wrap'}
        >
          {items()}
        </Flex>
      )}
    </VStack>
  );
};

export default FilterLayout;
