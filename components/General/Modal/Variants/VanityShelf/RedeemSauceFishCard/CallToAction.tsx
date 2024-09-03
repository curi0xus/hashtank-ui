import React from 'react';
import { Box, Flex, Button, Text } from '@chakra-ui/react';
import RedeemSauceConfirmation from './RedeemSauceConfirmation';
import SellSauceConfirmation from './SellSauceConfirmation';

const CallToAction = ({
  sauceId,
  closeModalsList,
  sauceMetadata,
  isShowCTA,
}: any) => {
  return (
    <Box>
      <Flex
        flexDir={['column', 'row']}
        pl={[0, '80px']}
        pr={[0, '80px']}
        alignItems={'center'}
        gap={['20px', '30px']}
        justifyContent={'center'}
        w='100%'
      >
        {isShowCTA && (
          <>
            <RedeemSauceConfirmation
              sauceMetadata={sauceMetadata}
              sauceId={sauceId}
              closeModalsList={closeModalsList}
              Trigger={(props: any) => (
                <Button
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  {...props}
                  _hover={{
                    bg: 'white',
                    color: 'brand.900',
                  }}
                  mb={['0px', 0, 0, '28px']}
                  w={['60%', '35%']}
                  bg='brand.900'
                  p='3'
                  color='white'
                  height='fit-content'
                  // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
                >
                  <Text
                    textTransform={'uppercase'}
                    fontWeight={'bold'}
                    fontSize='md'
                  >
                    redeem sauce
                  </Text>
                </Button>
              )}
            />
            <SellSauceConfirmation
              sauceMetadata={sauceMetadata}
              sauceId={sauceId}
              closeModalsList={closeModalsList}
              Trigger={(props: any) => (
                <Button
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  {...props}
                  _hover={{
                    bg: 'white',
                    color: 'brand.900',
                  }}
                  mb={['0px', 0, 0, '28px']}
                  w={['60%', '35%']}
                  bg='brand.900'
                  p='3'
                  color='white'
                  height='fit-content'
                  // leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
                >
                  <Text
                    textTransform={'uppercase'}
                    fontWeight={'bold'}
                    fontSize='md'
                  >
                    sell sauce
                  </Text>
                </Button>
              )}
            />
          </>
        )}
      </Flex>
    </Box>
  );
};

export default CallToAction;
