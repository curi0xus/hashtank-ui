import React from 'react';
import { Box } from '@chakra-ui/react';

const CallToAction = () => (
  <Box>
    <Box
      css={{
        left: 0,
        bottom: 0,
        borderRadius: '6px',
        background: 'brand.700',
        position: 'absolute',
        mask: 'linear-gradient(transparent, black, black)',
        backdropFilter: 'blur(20px)',
        height: '100px',
        width: '100%',
      }}
    ></Box>
  </Box>
);

export default CallToAction;
