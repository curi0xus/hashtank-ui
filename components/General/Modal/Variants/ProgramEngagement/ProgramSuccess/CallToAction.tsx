import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { NotAllowedIcon } from '@chakra-ui/icons';
import BroodFishDegraded from '@/components/General/Modal/Variants/ProgramEngagement/BroodFishDegraded';

const CallToAction = (props: any) => {
  return (
    <Box w='100%'>
      {/* <Box
        css={{
          left: 0,
          bottom: 30,
          borderRadius: '6px',
          background: 'brand.700',
          position: 'absolute',
          mask: 'linear-gradient(transparent, black, black)',
          backdropFilter: 'blur(20px)',
          height: '200px',
          width: '100%',
        }}
      ></Box> */}
      <Flex
        flexDir={['column', 'row']}
        pl={[0, '80px']}
        pr={[0, '80px']}
        alignItems={'center'}
        gap={[0, '30px']}
        justifyContent={'center'}
        w='100%'
      >
        <BroodFishDegraded
          Trigger={(props: any) => (
            <Button
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              {...props}
              color='white'
              _hover={{
                bg: 'white',
                color: 'brand.900',
              }}
              mb={['0px', 0, 0, '28px']}
              w={['60%', '35%']}
              bg='brand.900'
              p='3'
              height='fit-content'
              // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
            >
              <Text
                textTransform={'uppercase'}
                fontWeight={'bold'}
                fontSize='md'
              >
                next
              </Text>
            </Button>
          )}
          {...props}
        />
      </Flex>
    </Box>
  );
};

export default CallToAction;
