import React from 'react';
import FooterBg from 'public/static/images/footer-bg.webp';
import SocialTelegram from '../General/Icons/Telegram';
import SocialWarpcaster from '../General/Icons/Warpcast';
import TwitterX from '../General/Icons/TwitterX';
import { Flex, Box, Text, ButtonGroup, IconButton } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      mt='30vh'
      h={['20vh', '30vh', '50vh']}
      bgSize={'cover'}
      bgImage={FooterBg.src}
    >
      <Flex pt='5%' w='fit-content' margin='auto' gap='5vw'>
        <Text fontWeight={'normal'} fontSize={['xs', 'sm']}>
          © 2024 Sleeper Cells, <br />
          All Rights Reserved.
        </Text>
        <ButtonGroup
          spacing={['10px', '34px']}
          // css={{ marginTop: '72px !important' }}
        >
          <Box>
            <IconButton
              fontSize={[30, 50]}
              _hover={{
                background: 'none',
                color: 'white',
              }}
              color='brand.900'
              background='none'
              aria-label='Twitter'
              icon={<TwitterX />}
            />
          </Box>
          <Box>
            <IconButton
              fontSize={[30, 50]}
              _hover={{
                background: 'none',
                color: 'white',
              }}
              color='brand.900'
              background='none'
              aria-label='Telegram'
              icon={<SocialTelegram />}
            />
          </Box>
          <Box>
            <IconButton
              fontSize={[30, 50]}
              _hover={{
                background: 'none',
                color: 'white',
              }}
              color='brand.900'
              background='none'
              aria-label='Wrapcaster'
              icon={<SocialWarpcaster />}
            />
          </Box>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Footer;
