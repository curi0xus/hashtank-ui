import React from 'react';
import { Box, Text, Flex, Divider } from '@chakra-ui/react';
import Image from 'next/image';

const GradeInfo = ({ gradeColor, grade, gradeName, description }: any) => {
  return (
    <Box w={['100%', '100%', '100%', '50%']}>
      <Text
        textTransform={'uppercase'}
        color={gradeColor}
        fontWeight={'bold'}
        fontSize={['2xl', 'xl']}
      >
        GRADE {grade} <br />
        the {gradeName}
      </Text>
      <Divider
        w='90%'
        m='10px 0'
        borderWidth={2}
        borderStyle={['solid', 'dashed']}
        borderColor={gradeColor}
        orientation='horizontal'
      />

      {description.map((text: string) => (
        <Text
          mb={3}
          key={text}
          w='90%'
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

const Flavours = ({
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
      position={'relative'}
      p={['15vh 0 5vh 0', '15vh 0 5vh 0', '15vh 0 5vh 0', '15vh 0 5vh 0']}
      h='fit-content'
      direction={['column', 'column', 'column', 'row']}
      w='fit-content'
    >
      <Box
        mr={['0', '0', '0', '0vw']}
        alignSelf={['center', 'center', 'center', 'flex-end']}
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

export default Flavours;
