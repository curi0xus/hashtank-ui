import React from 'react';
import { Text } from '@chakra-ui/react';

const Trigger = ({ name, onClick, ...props }: any) => {
  return (
    <Text
      {...props}
      onClick={onClick}
      cursor={'pointer'}
      color={['#0059FF', 'black']}
      textDecoration={'underline'}
      pt={2}
      w={'48%'}
      fontWeight={'normal'}
      fontSize={['sm', 'md']}
      key={name}
    >
      {name}{' '}
    </Text>
  );
};
export default Trigger;
