import { Box } from '@chakra-ui/react';

const PageLayout = ({ children, padding }: any) => {
  return (
    <Box
      h='100%'
      p={
        padding ?? [
          '0vh 10vw',
          '0vh 15vw',
          '0vh 15vw',
          '0vh 15vw 20vw 15vw',
          '0vh 10vw 20vh 10vw',
        ]
      }
    >
      {children}
    </Box>
  );
};

export default PageLayout;
