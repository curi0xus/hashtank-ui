import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import { NotAllowedIcon } from '@chakra-ui/icons';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';

const CallToAction = () => {
  const isInTank = true;
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = isLandscape && mobileCheck;

  const margin = isMobileLandscape ? 0 : '10px';

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
          height: '100px',
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
          color='white'
          _hover={{
            bg: '#212431',
            color: 'white',
          }}
          mt={[margin, '0']}
          // mb={['10px', '28px']}
          mb={[margin, margin, margin, '28px']}
          w={['60%', '35%']}
          bg='#212431'
          p='3'
          height='fit-content'
          leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
        >
          <Text textTransform={'uppercase'} fontWeight={'bold'} fontSize='md'>
            locked
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default CallToAction;
