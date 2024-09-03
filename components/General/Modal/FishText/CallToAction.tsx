import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';

const CallToAction = ({ ...props }: any) => {
  return (
    <Box>
      <Box
        css={{
          left: 0,
          bottom: 30,
          borderRadius: '6px',
          background: 'brand.700',
          position: 'absolute',
          mask: 'linear-gradient(transparent, black, black)',
          backdropFilter: 'blur(20px)',
          height: '110px',
          width: '100%',
        }}
      ></Box>
      <Flex
        flexDir={['column', 'row']}
        pl={[0, '80px']}
        pr={[0, '80px']}
        alignItems={'center'}
        gap={[0, '30px']}
        justifyContent={'center'}
        w='100%'
      >
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            props.closeModalsList?.map((each: any) => each?.(e));
          }}
          color='white'
          _hover={{
            bg: '#3D4B65',
            color: 'white',
          }}
          mb={['0px', 0, 0, '28px']}
          w={['60%', '35%']}
          bg='#3D4B65'
          p='3'
          height='fit-content'
        >
          <Text textTransform={'uppercase'} fontWeight={'medium'} fontSize='md'>
            exit
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default CallToAction;
