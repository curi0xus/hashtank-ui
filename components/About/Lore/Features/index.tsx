import React from 'react';
import Image from 'next/image';
import { Text, Box, Flex, useMediaQuery } from '@chakra-ui/react';
import SlideLayout from '../../Shared/SlideLayout';

const Feature = ({ description, mobileImage, desktopImage, title }: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });

  return (
    <SlideLayout>
      <Flex direction={['column']}>
        <Flex direction={['column']} p={['8vh 0 0 0', '5vh 15vw']}>
          <Box>
            <Image
              style={{
                width: '100%',
                height: 'auto',
              }}
              height={100}
              width={100}
              src={isNotMobile ? desktopImage : mobileImage}
              alt={title}
            />
          </Box>
        </Flex>
        <Flex direction={['column']} p={['0vh 5vw', '0vh 10vw']}>
          <Text
            lineHeight={1.1}
            m={['2vh 0', '2vh 0']}
            fontStyle={'normal'}
            fontWeight={'bold'}
            fontSize={['4xl', '5xl']}
            color='#FFEE57'
          >
            {title}
          </Text>
          {description.map((text: string, index: number) => (
            <Text
              mb={3}
              key={text}
              w='100%'
              color='white'
              fontWeight={'normal'}
              fontSize={['sm', 'md']}
            >
              {text}
            </Text>
          ))}
        </Flex>
      </Flex>
    </SlideLayout>
  );
};

export default Feature;
