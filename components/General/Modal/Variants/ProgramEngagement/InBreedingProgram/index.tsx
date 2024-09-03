import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';

const InBreedingProgramCard = ({
  metadata,
  distributeAtTs,
  nftId = '1',
}: any) => {
  if (metadata) {
    const { name, image } = metadata;
    const isBreeding = true;
    const isDisabled = true;
    const btnText = 'unavailable';
    const textColor = isBreeding ? 'white' : 'brand.800';

    return (
      <HTModal
        isDark={true}
        bgColor={'#3D4B65'}
        CallToAction={CallToAction}
        closeButtonType='hollow'
        Content={(props: any) => (
          <Content
            nftId={nftId}
            distributeAtTs={distributeAtTs}
            name={name}
            image={image}
            textColor={textColor}
            {...props}
          />
        )}
        Trigger={(props: any) => (
          <Trigger
            nftId={nftId}
            name={name}
            image={image}
            isDark
            textColor={textColor}
            bgColor={'#3D4B65'}
            buttonText={btnText}
            {...props}
            isSelected={false}
            isDisabled={isDisabled}
            isBreeding={isBreeding}
          />
        )}
      />
    );
  }

  return <h1>...</h1>;
};

export default InBreedingProgramCard;
