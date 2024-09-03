import React from 'react';
import { HStack, VStack, Text, List } from '@chakra-ui/react';

const Description = ({ hasNoPadding, description }: any) => {
  return (
    <VStack
      pb={hasNoPadding ? 0 : '100px'}
      mt='20px !important'
      w='100%'
      alignItems='flex-start'
    >
      <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize='md'>
        Description
      </Text>
      <Text fontWeight={'normal'} fontSize='md'>
        {description}
      </Text>
    </VStack>
  );
};

export default Description;
