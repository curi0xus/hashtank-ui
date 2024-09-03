import ModalTemplate from '@/components/General/Modal/CardModal';
import { HStack, Box } from '@chakra-ui/react';
import LoveImage from 'public/static/images/LoveSauceProgram/love.webp';
import useSelectedBroodFish from '@/hooks/LoveSauceProgram/useSelectedBroodFish';

export const SpecialContent = () => {
  return (
    <HStack w='90%' maxHeight={'10%'} pt='30px' pb='30px' display='flex'>
      <Box
        m='auto'
        backgroundSize={'cover'}
        backgroundImage={LoveImage.src}
        w='100%'
        height={['auto']}
      >
        <HStack minHeight={[170, 360]} m='auto' w='100%'></HStack>
      </Box>
    </HStack>
  );
};

const Content = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  ...props
}: any) => {
  const { selectedBroodFishIds } = useSelectedBroodFish();

  return (
    // <div style={{ height: 1000 }}>
    //   <SubmitBidModal closeModalsList={props.closeModalsList} />
    // </div>
    <ModalTemplate
      hasBreedSummary
      SpecialContent={SpecialContent}
      // specialText={{
      //   textColor: 'brand.900',
      //   content1: 'BROODFISH ATTRIBUTES DEGRADED',
      //   alignment: 'center',
      // }}
      specialColor={specialColor}
      hasNoHistory={hasNoHistory}
      title={`Batch of ${selectedBroodFishIds.length} creatures`}
      hasFishTraits
      textColor={textColor}
      borderColor={borderColor}
    />
  );
};

export default Content;
