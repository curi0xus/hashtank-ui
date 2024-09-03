import { Flex } from '@chakra-ui/react';

const SlideLayout = ({ children }: any) => {
  return (
    <Flex h='fit-content' justify={'center'} align={'center'}>
      {children}
    </Flex>
  );
};

export default SlideLayout;
