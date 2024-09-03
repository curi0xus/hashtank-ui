import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';
import useGetTokenMetadata from '@/hooks/useGetTokenMetadata';

const TankRosterFishCard = ({ type, nftId }: any) => {
  const { name, image } = useGetTokenMetadata(nftId);
  const hasOffspring = false;
  const isBroodFish = true;
  const isDisabled = false;
  const btnText = 'view';

  const bgColor = '#FF530D';

  const textColor = 'black';
  const borderColor = isBroodFish && !hasOffspring ? 'white' : 'brand.900';
  const hasNoHistory = true;
  return (
    <HTModal
      isDark={true}
      bgColor={bgColor}
      // CallToAction={CallToAction}
      closeButtonType='hollow'
      Content={(props: any) => (
        <Content
          name={name}
          image={image}
          specialColor={'#FFEE57'}
          hasFishTraits={true}
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
          specialColor={'#FFEE57'}
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

export default TankRosterFishCard;
// import Content from './Content';
// import CallToAction from './CallToAction';
// import Trigger from './Trigger';

// export { Content, CallToAction, Trigger };
