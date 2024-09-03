import React from 'react';
import { Select } from '@chakra-ui/react';

const HTSelect = ({ options, ...props }: any) => {
  return (
    <Select
      {...props}
      fontSize={['xs', 'xs', 'sm', 'md', 'l']}
      borderWidth={2}
      borderRadius={0}
      placeholder='Select filter'
    >
      {options.map((each: any, i: number) => (
        <option key={i} value={each}>
          {each}
        </option>
      ))}
    </Select>
  );
};

export default HTSelect;
