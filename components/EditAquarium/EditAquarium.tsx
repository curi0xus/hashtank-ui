import React from 'react';
import { Box, Text, Divider, Flex, VStack, HStack } from '@chakra-ui/react';
import HTSelect from '../General/Select';
import { IconButton } from '@chakra-ui/react';
import EditIcon from '../General/Icons/EditIcon';
import ShareIcon from '../General/Icons/Share';

const AquariumDetails = () => {
  return (
    <Box
      p={[
        '0vh 7vw',
        '0vh 15vw',
        '0vh 15vw',
        '5vw 15vw 20vh 15vw',
        '5vw 16vw 20vh 16vw',
      ]}
    >
      <VStack alignItems={'flex-start'}>
        <Flex flexDir={['column-reverse', 'row']}>
          <Text
            mr='5'
            textTransform={'uppercase'}
            color='brand.900'
            fontWeight={'bold'}
            fontSize={['4xl', '2xl', '3xl', '4xl', '5xl']}
          >
            my first tank
          </Text>
          <HStack>
            <IconButton
              onClick={() => {}}
              display={'flex'}
              _hover={{
                background: 'none',
              }}
              variant='ghost'
              color={'white'}
              background='none'
              aria-label='Edit Aquarium Name'
              icon={<EditIcon fontSize={40} />}
            />

            <IconButton
              onClick={() => {}}
              display={'flex'}
              _hover={{
                background: 'none',
              }}
              variant='ghost'
              color={'white'}
              background='none'
              aria-label='Share aquarium'
              icon={<ShareIcon fontSize={30} />}
            />
          </HStack>
        </Flex>

        <Text
          mt={'0 !important'}
          mb={'20px !important'}
          color='white'
          fontWeight={'normal'}
          fontSize={['xs', 'sm', 'md', 'lg', 'xl']}
        >
          created 22.8.2023 - 16:37 / last modified 2.10.2023 - 0:44
        </Text>
      </VStack>
      <Divider opacity={1} borderBottomWidth={3} />
      <Flex mt={['20px']} flexWrap={'wrap'} justifyContent={'space-between'}>
        <HStack
          mt={['10px']}
          width={['100%', '45%']}
          justifyContent={'space-between'}
        >
          <Text
            color='white'
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'sm', 'md', 'xl']}
          >
            current capacity
          </Text>
          <Text color='white' fontSize={['xs', 'xs', 'sm', 'md', 'xl']}>
            4 / 14
          </Text>
        </HStack>
        <HStack
          mt={['10px']}
          width={['100%', '45%']}
          justifyContent={'space-between'}
        >
          <Text
            color='white'
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'sm', 'md', 'xl']}
          >
            tank value
          </Text>
          <Text color='white' fontSize={['xs', 'xs', 'sm', 'md', 'xl']}>
            ⌘ 6.24
          </Text>
        </HStack>
        <HStack
          mt={['10px']}
          width={['100%', '45%']}
          justifyContent={'space-between'}
        >
          <Text
            color='white'
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'sm', 'md', 'xl']}
          >
            sharing settings
          </Text>
          <HTSelect width='fit-content' options={['public', 'private']} />
        </HStack>
        <HStack
          mt={['10px']}
          width={['100%', '45%']}
          justifyContent={'space-between'}
        >
          <Text
            color='white'
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'sm', 'md', 'xl']}
          >
            tank composition
          </Text>
          <Text color='white' fontSize={['xs', 'xs', 'sm', 'md', 'xl']}>
            47% irradiated
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default AquariumDetails;
