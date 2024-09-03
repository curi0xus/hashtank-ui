import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import useScreenOritentation from '@/hooks/useScreenOritentation';
import mobileCheck from '@/helpers/mobileCheck';

const ModalTemplate = ({ imgSrc, CustomContent }: any) => {
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  return (
    <VStack pb='100px' color={'black'} justifyContent={'center'}>
      {imgSrc && (
        <Box
          position='relative'
          height={['fit-content', 'fit-content']}
          width={['fit-content', isMobileLandscape ? '20%' : '50%']}
        >
          <Image
            height={100}
            width={100}
            style={{ margin: 'auto', width: '100%', height: 'auto' }}
            src={imgSrc}
            alt='More details fish'
          />
        </Box>
      )}
      <VStack width={['90%']}>
        <CustomContent />
      </VStack>
    </VStack>
  );
};

export default ModalTemplate;
