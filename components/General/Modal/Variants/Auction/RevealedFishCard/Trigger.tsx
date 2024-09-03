import React from 'react';
import {
  Card,
  CardBody,
  Stack,
  Box,
  Text,
  Divider,
  Flex,
  useMediaQuery,
} from '@chakra-ui/react';
import Image from 'next/image';
import truncateAddress from '@/util/truncateAddress';
import useFetchMetadata from '@/new-hooks/useFetchMetadata';

const Trigger = ({
  onClick,
  metadata_url,
  owner_address,
  serialNumber,
  winning_bid,
  ...props
}: any) => {
  const [isNotMobile] = useMediaQuery('(min-width: 480px)', {
    ssr: true,
    fallback: false,
  });
  const { data } = useFetchMetadata(metadata_url);
  const image = data?.image;
  const description = data?.description;
  const name = data?.name;
  const size =
    data?.attributes?.find((attri: any) => attri.trait_type === 'size').value ||
    '';

  return (
    <Card
      cursor={'pointer'}
      onClick={onClick}
      {...props}
      h='fit-content'
      m='25px 0'
      w={['45%', '45%', '30%', '30%', '22%']}
      color='white'
      background='none'
      shadow={'none'}
      maxW='sm'
    >
      <CardBody p={0} flex='none'>
        <Box borderRadius={'20px'} background='brand.700'>
          {image && (
            <Image
              height={100}
              width={100}
              style={{ margin: 'auto', width: '100%', height: 'auto' }}
              src={image}
              alt={description}
            />
          )}
        </Box>

        <Stack mt='6' spacing='0'>
          <Text
            color={'brand.900'}
            fontWeight={'normal'}
            fontSize={['xs', 'sm']}
          >
            #{serialNumber}
          </Text>
          <Text
            maxW={['100%', '70%']}
            mb='25px'
            color={'brand.900'}
            mt={['0px !important', '0px !important']}
            textTransform={'uppercase'}
            fontWeight={'normal'}
            fontSize={['md', 'xl']}
          >
            {name}
          </Text>
          <Divider
            opacity={1}
            borderBottomWidth={2}
            borderColor={'brand.900'}
          />
          <Flex
            pt={[0, '10px']}
            flexDirection={['column', 'row']}
            justifyContent='space-between'
          >
            <Text
              mb='10px'
              textAlign={['left', 'left']}
              fontWeight={'bold'}
              textTransform={isNotMobile ? 'uppercase' : 'lowercase'}
              fontSize={['sm', 'md']}
            >
              sold to
              <br />
              <Text
                textDecoration={'underline'}
                as={'span'}
                textTransform={'uppercase'}
                fontWeight={'normal'}
                fontSize={['sm', 'sm']}
              >
                {!owner_address ? '...' : truncateAddress(owner_address)}
              </Text>
            </Text>
            <Flex flexDirection={['row']} justifyContent='space-between'>
              <Text
                display={['block', 'none']}
                whiteSpace={'nowrap'}
                textAlign={['left', 'left']}
                fontWeight={'medium'}
                textTransform={'uppercase'}
                fontSize={['sm', 'sm']}
              >
                Size: {size}
              </Text>
              <Text
                textAlign={['right', 'left']}
                fontWeight={'normal'}
                fontSize={['md', 'md']}
              >
                ⌘ {!winning_bid ? '...' : winning_bid}
              </Text>
            </Flex>
          </Flex>
          <Divider
            opacity={1}
            borderBottomWidth={2}
            borderColor={'brand.900'}
          />
          {isNotMobile && (
            <Flex
              pt={[0, '10px']}
              flexDirection={['column', 'row']}
              justifyContent='space-between'
            >
              <Text
                whiteSpace={'nowrap'}
                textAlign={['left', 'left']}
                fontWeight={'medium'}
                textTransform={isNotMobile ? 'uppercase' : 'lowercase'}
                fontSize={['sm', 'sm']}
              >
                Size: {size}
              </Text>
              <Text
                w='100%'
                textAlign={'right'}
                {...props}
                cursor={'pointer'}
                decoration={'underline'}
                fontWeight={'normal'}
                fontSize={['s', 'm']}
              >
                details {'>'}
              </Text>
            </Flex>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};
export default Trigger;
