import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const LoveSauceProgramTitle = () => {
  return (
    <Box
      position='relative'
      height={[
        '105vw',
        '100vw',
        '80vw',
        '80vw',
        '80vw',
        '65vw',
        '65vw',
        '70vw',
        '70vw',
      ]}
    >
      <Text
        width={['70%', 'fit-content']}
        position='absolute'
        top={['18vw', '16vw', '18vw', '18vw', '12vw', '12vw', '12vw']}
        left={['8vw', '15vw', '11vw', '11vw', '15vw', '15vw', '11vw']}
        textTransform={'uppercase'}
        color='brand.900'
        fontWeight={'bold'}
        fontSize={['4xl', '2xl', '3xl', '4xl', '5xl']}
      >
        lovesauce program
      </Text>
    </Box>
  );
};

export default LoveSauceProgramTitle;
