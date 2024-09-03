import React from 'react';
import { Text, Button, Stack, IconButton } from '@chakra-ui/react';
import { StarIcon, NotAllowedIcon } from '@chakra-ui/icons';
import HTModal from '@/components/General/Modal';
import dynamic from 'next/dynamic';
const PlentyOfFish = dynamic(() => import('../PlentyOfFish'), { ssr: false });
// import PlentyOfFish from '../PlentyOfFish';

const Buttons = () => {
  return (
    <div>
      <Stack spacing={3}>
        <Button
          _hover={{
            background: 'white',
            color: 'brand.900',
          }}
          background={'brand.900'}
        >
          <Text textTransform={'uppercase'} fontWeight={'medium'} fontSize='xl'>
            General Button
          </Text>
        </Button>
        <IconButton
          _hover={{
            background: 'none',
            color: 'white',
          }}
          color='brand.900'
          background='none'
          aria-label='Star'
          icon={<StarIcon />}
        />

        <Button
          bg='brand.800'
          p='3'
          height='fit-content'
          leftIcon={<NotAllowedIcon color={'brand.900'} fontSize={'xl'} />}
        >
          <Text textTransform={'uppercase'} fontWeight={'normal'} fontSize='sm'>
            VIEW IN AQUARIUM
            <br />
            <Text
              as='i'
              textTransform={'none'}
              fontWeight={'normal'}
              fontSize='sm'
            >
              (private)
            </Text>
          </Text>
        </Button>
        <HTModal
          closeButtonType='filled'
          Content={() => (
            <div style={{ height: 1000 }}>
              <PlentyOfFish />
            </div>
          )}
          Trigger={(props: any) => (
            <Button
              {...props}
              _hover={{
                background: 'white',
                color: 'brand.900',
              }}
              background={'brand.900'}
            >
              <Text
                textTransform={'uppercase'}
                fontWeight={'medium'}
                fontSize='xl'
              >
                Open Modal
              </Text>
            </Button>
          )}
        />
      </Stack>
    </div>
  );
};

export default Buttons;
