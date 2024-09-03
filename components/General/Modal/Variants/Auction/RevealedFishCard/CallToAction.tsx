import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { NotAllowedIcon } from '@chakra-ui/icons';

const CallToAction = () => (
  <Box>
    <Box
      css={{
        left: 0,
        bottom: 30,
        borderRadius: '6px',
        background: 'brand.700',
        position: 'absolute',
        mask: 'linear-gradient(transparent, black, black)',
        backdropFilter: 'blur(10px)',
        height: '110px',
        width: '100%',
      }}
    ></Box>
    <Flex justifyContent={'center'} w='100%'>
      <Button
        color='white'
        _hover={{
          bg: 'brand.800',
        }}
        mb={['0px', 0, 0, '28px']}
        w='50%'
        bg='brand.800'
        p='3'
        height='fit-content'
        leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
      >
        <Text textTransform={'uppercase'} fontWeight={'normal'} fontSize='sm'>
          VIEW IN AQUARIUM
          <br />
          <Text
            as='i'
            textTransform={'none'}
            fontWeight={'normal'}
            fontSize='sm'
          >
            (private)
          </Text>
        </Text>
      </Button>
    </Flex>
  </Box>
);

export default CallToAction;
