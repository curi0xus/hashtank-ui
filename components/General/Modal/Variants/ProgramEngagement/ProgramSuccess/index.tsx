import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';
import useGetTokenMetadata from '@/hooks/useGetTokenMetadata';

const ProgramSuccessCard = ({ type, nftId }: any) => {
  const { name, image } = useGetTokenMetadata(nftId);
  const hasOffspring = true;
  const isBroodFish = true;
  const isDisabled = false;
  const btnText = 'view';
  const bgColor = '#A0FF56';

  const textColor = 'black';
  const borderColor = undefined;
  const hasNoHistory = false;
  return (
    <HTModal
      isRounded={true}
      bgColor={bgColor}
      closeButtonType='hollow'
      Content={(props: any) => (
        <Content
          name={name}
          image={image}
          hasNoHistory={hasNoHistory}
          borderColor={borderColor}
          textColor={textColor}
          {...props}
        />
      )}
      Trigger={(props: any) => (
        <Trigger
          nftId={nftId}
          name={name}
          image={image}
          hasNoHistory={hasNoHistory}
          borderColor={borderColor}
          isDark
          textColor={textColor}
          hasOffspring={hasOffspring}
          bgColor={bgColor}
          buttonText={btnText}
          {...props}
          isSelected={false}
          isDisabled={isDisabled}
          isBroodFish={isBroodFish}
        />
      )}
    />
  );
};

export default ProgramSuccessCard;
