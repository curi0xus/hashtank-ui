// import NextLink from 'next/link';
import { Link, Text } from '@chakra-ui/react';

const CustomHTLink = ({ path, title, onClick }: any) => {
  return (
    <Link
      // prefetch={true}
      onClick={onClick}
      _hover={{
        color: 'brand.900',
      }}
      color='white'
      // as={NextLink}
      href={path}
    >
      <Text fontWeight={'normal'} fontSize='2xl'>
        {title}
      </Text>
    </Link>
  );
};

export default CustomHTLink;
