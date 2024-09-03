import React from 'react';
import { Box, Text, Flex, Divider } from '@chakra-ui/react';
import Image from 'next/image';

const GradeInfo = ({ gradeColor, grade, gradeName, description }: any) => {
  return (
    <Box m='0' w={['100%', '100%', '100%', '100%']}>
      <Text
        textTransform={'uppercase'}
        color={gradeColor}
        fontWeight={'bold'}
        fontSize={['2xl', 'xl']}
      >
        FOR {grade} <br />({gradeName})
      </Text>
      <Divider
        w='90%'
        m='10px 0'
        borderWidth={2}
        borderStyle={['solid', 'dashed']}
        borderColor={gradeColor}
        orientation='horizontal'
      />

      {description.map((text: string, index: number) => (
        <Text
          mb={3}
          key={text}
          w='95%'
          color='white'
          fontWeight={'normal'}
          fontSize={['sm', 'md']}
        >
          {text}
        </Text>
      ))}
    </Box>
  );
};

const Opportunities = ({
  img,
  boxProps,
  gradeColor,
  imageProps,
  description,
  grade,
  gradeName,
}: any) => {
  return (
    <Flex
      m={['15vh 0 5vh 0', '15vh 0 5vh 0', '15vh 0 5vh 0', '15vh 0 5vh 0vw']}
      h='fit-content'
      direction={['column']}
      w='fit-content'
      justify={'center'}
    >
      <Box
        mr={['0', '0', '0', '0']}
        alignSelf={['center', 'center', 'center', 'center']}
        {...boxProps}
      >
        <Image
          {...imageProps}
          style={imageProps.style}
          src={img}
          alt={gradeName}
        />
      </Box>
      <GradeInfo
        description={description}
        gradeColor={gradeColor}
        grade={grade}
        gradeName={gradeName}
      />
    </Flex>
  );
};

export default Opportunities;
