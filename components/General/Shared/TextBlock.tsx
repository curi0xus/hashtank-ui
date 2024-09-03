import React from 'react';
import { Text, Divider } from '@chakra-ui/react';

const TextBlock = ({ title, paragraphs }: any) => {
  return (
    <>
      <Text
        textTransform={'uppercase'}
        color='brand.900'
        fontWeight={'bold'}
        fontSize={['3xl', '2xl', '3xl', '4xl', '5xl']}
      >
        {title}
      </Text>
      <Divider opacity={1} borderBottomWidth={3} mb={[10, 10]} />
      {paragraphs.map((each: string, i: number) => {
        return (
          <Text
            key={i}
            mt={['5vh', '15px']}
            fontWeight={'normal'}
            fontSize={['sm', 'sm']}
          >
            {each}
          </Text>
        );
      })}
    </>
  );
};

export default TextBlock;
