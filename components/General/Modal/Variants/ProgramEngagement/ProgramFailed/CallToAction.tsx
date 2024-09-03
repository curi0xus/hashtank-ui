import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { NotAllowedIcon } from '@chakra-ui/icons';
import BroodFishDegraded from '@/components/General/Modal/Variants/ProgramEngagement/BroodFishDegraded';

const CallToAction = (props: any) => {
  return (
    <Box mt='50px' w='100%'>
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
            props?.closeModalsList?.map((each: any) => each?.(e));
          }}
          color='white'
          _hover={{
            bg: 'brand.600',
            color: 'white',
          }}
          mt={['10px', '0']}
          mb={['10px', '28px']}
          w={['60%', '35%']}
          bg='brand.600'
          p='3'
          height='fit-content'
          // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
        >
          <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize='md'>
            exit
          </Text>
        </Button>
        {/* <BroodFishDegraded
          Trigger={(props: any) => (
            <Button
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              {...props}
              _hover={{
                bg: '#FFEE57',
                color: 'black',
              }}
              mb={['10px', '28px']}
              w={['60%', '35%']}
              bg='#FFEE57'
              p='3'
              color='black'
              height='fit-content'
              // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
            >
              <Text
                textTransform={'uppercase'}
                fontWeight={'bold'}
                fontSize='md'
              >
                view broodfish
              </Text>
            </Button>
          )}
        /> */}
      </Flex>
    </Box>
  );
};

export default CallToAction;
