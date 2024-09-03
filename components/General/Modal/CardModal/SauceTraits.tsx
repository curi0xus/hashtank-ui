import React from 'react';
import { Flex, Box, Divider, HStack, Text } from '@chakra-ui/react';
import AlertBell from '../../Icons/Bell';

const SauceAttribute = ({
  attributeName,
  attributeScore,
  textColor,
  specialColor,
}: any) => {
  const displayedAttributeScore = Math.round(attributeScore / 20);
  const finalTextColor = specialColor || textColor;
  return (
    <HStack
      textColor={specialColor || undefined}
      p={['5px 0', 0]}
      justifyContent={'space-between'}
      w={['100%', '45%']}
    >
      <HStack>
        {specialColor && <AlertBell />}
        <Text
          textTransform={'capitalize'}
          fontWeight={'normal'}
          fontSize={['sm', 'md']}
        >
          {attributeName}
        </Text>
      </HStack>

      <HStack>
        {Array.from({ length: displayedAttributeScore }).map((_, i: number) => (
          <Box
            key={i}
            h='10px'
            w='10px'
            borderRadius={'100%'}
            border={'none'}
            background={finalTextColor || 'black'}
          ></Box>
        ))}

        {Array.from({ length: 5 - displayedAttributeScore }).map(
          (_, i: number) => (
            <Box
              key={i}
              h='10px'
              w='10px'
              borderRadius={'100%'}
              border={
                finalTextColor && finalTextColor !== 'brand.800'
                  ? `1px solid ${finalTextColor}`
                  : '1px solid black'
              }
            ></Box>
          )
        )}
        {/* 
        <Box
          h='10px'
          w='10px'
          borderRadius={'100%'}
          border={'none'}
          background={finalTextColor || 'black'}
        ></Box>
        <Box
          h='10px'
          w='10px'
          borderRadius={'100%'}
          border={
            finalTextColor && finalTextColor !== 'brand.800'
              ? `1px solid ${finalTextColor}`
              : '1px solid black'
          }
        ></Box> */}
      </HStack>
    </HStack>
  );
};

const DISPLAYABLE_ATTRIBUTES = [
  'umami',
  'w.a. umami',
  'complexity',
  'radiation',
  'fertility',
];

const SauceTraits = ({
  attributes,
  textColor,
  borderColor,
  specialColor,
  specialText,
}: any) => {
  return (
    <>
      <Flex
        mt={2}
        flexDir={['column', 'row']}
        w='100%'
        justifyContent={'space-between'}
        flexWrap={'wrap'}
      >
        {attributes
          .filter(
            (attr: any) => DISPLAYABLE_ATTRIBUTES.indexOf(attr.trait_type) > -1
          )
          .map((attr: any) => (
            <SauceAttribute
              key={attr.trait_type}
              specialColor={specialColor}
              textColor={textColor}
              attributeName={attr.trait_type}
              attributeScore={attr.value}
            />
          ))}
        {/* <FishAttribute
          specialColor={specialColor}
          textColor={textColor}
          attributeName='Umami'
        />
        <FishAttribute textColor={textColor} attributeName='Radiation' />
        <FishAttribute
          specialColor={specialColor}
          textColor={textColor}
          attributeName='Fertility'
        /> */}
      </Flex>
      {specialText && (
        <Text
          w='100%'
          textAlign={'left'}
          fontWeight={'bold'}
          fontSize={['md', 'md']}
          color={specialText.color}
          textTransform={'uppercase'}
        >
          {specialText.content}
        </Text>
      )}

      <Divider
        mt={2}
        opacity={0.9}
        borderWidth={'1px'}
        borderColor={borderColor || 'brand.900'}
      />
    </>
  );
};
export default SauceTraits;
