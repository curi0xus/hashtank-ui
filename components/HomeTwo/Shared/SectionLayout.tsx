import React from 'react';
import { Box } from '@chakra-ui/react';

const SectionLayout = ({ children, background, height }: any) => {
  return (
    <Box
      overflow='hidden'
      background={background}
      width='100%'
      height={height}
      // maxH={['100%', '100%', '100%', '90vh', '100%', '100%']}
    >
      {children}
    </Box>
  );
};

export default SectionLayout;
