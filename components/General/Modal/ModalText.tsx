import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

const ModalText = ({ title, content }: any) => {
  return (
    <Stack w='80%' maxW='80%' margin='auto'>
      <Text
        color='black'
        textTransform={'uppercase'}
        fontWeight={'bold'}
        fontSize={['md', 'lg', '2xl']}
      >
        {title}
      </Text>
      {content.map((each: string, i: number) => (
        <Text
          color='black'
          maxW={['100%', '100%', '100%', '100%', '100%', '100%']}
          whiteSpace={'pre-line'}
          key={i}
          fontWeight={'normal'}
          fontSize={['xs', 'sm']}
        >
          {each}
        </Text>
      ))}
    </Stack>
  );
};

export default ModalText;
