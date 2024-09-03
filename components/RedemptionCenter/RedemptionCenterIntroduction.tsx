import React from 'react';
import { Box } from '@chakra-ui/react';
import TextBlock from '../General/Shared/TextBlock';
import Image from 'next/image';
import tv from '@/public/static/images/RedemptionCenter/television.png';

const PARAGRAPHS = [
  'Welcome to MojoMart, operated by yours truly, Mojo!',
  "We accept all kinds of fishy characters with zero judgment as long as you've got cold hard SHELLS. Redeem your physical sauce here on your Vanity Shelf or check in on your other airdrops and collectibles in your Cold Storage.",
  "We also buy back sauce from you (at market price, of course) based on your sauce attributes and grade. Please note, we won't ever sell them back, so make your choice carefully!",
];

const RedemptionCenterIntroductionText = () => {
  return (
    <Box
      p={[
        '116vw 8vw 10vw 8vw',
        '115vw 15vw 0vh 15vw',
        '80vw 15vw 0 15vw',
        '80vw 15vw 0vh 15vw',
        '80vw 16vw 10vh 16vw',
        '80vw 11vw 0vh 11.2vw',
      ]}
      position='relative'
    >
      <Box
        width={['20.8vw']}
        position='absolute'
        top={['48vw']}
        left={['11.2vw']}
      >
        <Image src={tv} alt='tv-img' />
      </Box>
      <TextBlock title='over here, stranger' paragraphs={PARAGRAPHS} />
    </Box>
  );
};

export default RedemptionCenterIntroductionText;
