import React from 'react';
import { Text, Stack } from '@chakra-ui/react';

//Achieve all the sizes 48, 32, 24, 20, 16, 14
//Weight: Regular, Medium, Bold,
//Decoration None, Underline,
//Upper, lowercase
//Color

const Typography = () => {
  return (
    <div>
      <Stack
        _hover={{
          textDecoration: 'underline',
          color: 'brand.900',
        }}
        spacing={3}
      >
        {/* <Text fontSize='6xl'>In love with React & Next</Text> */}
        <Text color='brand.900' fontWeight={'bold'} fontSize='5xl'>
          Headline Roboto Mono Bold 48px
        </Text>
        <Text fontWeight={'medium'} fontSize='5xl'>
          48px
        </Text>
        <Text fontWeight={'normal'} fontSize='5xl'>
          48px
        </Text>

        <Text fontWeight={'normal'} fontSize='4xl'>
          32px
        </Text>
        {/* <Text fontSize='3xl'>In love with React & Next</Text> */}
        <Text fontSize='2xl'>24px</Text>
        <Text
          textTransform={'uppercase'}
          decoration={'underline'}
          fontWeight={'bold'}
          fontSize='xl'
        >
          CONTACT US
        </Text>
        {/* <Text fontSize='lg'>In love with React & Next</Text> */}
        <Text fontSize='md'>16px</Text>
        <Text fontSize='sm'>14px</Text>
        {/* <Text fontSize='xs'>In love with React & Next</Text> */}
      </Stack>
    </div>
  );
};

export default Typography;
