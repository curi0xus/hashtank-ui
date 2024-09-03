import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { NotAllowedIcon } from '@chakra-ui/icons';

const CallToAction = (props: any) => {
  return (
    <Box>
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
          _hover={{
            bg: 'white',
            color: 'brand.900',
          }}
          mb={['0px', 0, 0, '28px']}
          w={['fit-content', 'fit-content']}
          bg='brand.900'
          p='3'
          color='white'
          height='fit-content'
          // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
        >
          <Text textTransform={'uppercase'} fontWeight={'medium'} fontSize='md'>
            redeem physical goods
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default CallToAction;
