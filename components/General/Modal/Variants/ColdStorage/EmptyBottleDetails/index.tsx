import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';
import useFetchMetadata from '@/new-hooks/useFetchMetadata';

const EmptyBottleCard = ({ metadataUrl }: any) => {
  const hasOffspring = false;
  const isBroodFish = true;
  const isDisabled = false;
  const btnText = 'view';

  const bgColor = '#9A9FB0';

  const textColor = 'black';
  const borderColor = 'brand.800';
  const hasNoHistory = true;

  const { data: metadata } = useFetchMetadata(metadataUrl);
  if (metadata) {
    const { name, image, description, attributes } = metadata;

    const bottleType = attributes?.find(
      (each: any) => each.trait_type === 'bottle_type'
    ).value;
    const dropType = attributes?.find(
      (each: any) => each.trait_type === 'drop_type'
    ).value;
    const redemption_link = attributes?.find(
      (each: any) => each.trait_type === 'redemption_link'
    ).value;

    return (
      <HTModal
        isDark={true}
        bgColor={bgColor}
        CallToAction={(props: any) => <CallToAction {...props} />}
        closeButtonType='hollow'
        Content={(props: any) => (
          <Content
            name={name}
            image={image}
            description={description}
            dropType={dropType}
            redemptionLink={redemption_link}
            bottleType={bottleType}
            // specialColor={"#FFEE57"}
            hasFishTraits={true}
            hasNoHistory={hasNoHistory}
            borderColor={borderColor}
            textColor={textColor}
            {...props}
          />
        )}
        Trigger={(props: any) => (
          <Trigger
            name={name}
            image={image}
            description={description}
            dropType={dropType}
            redemptionLink={redemption_link}
            isNew={true}
            // specialColor={'#FFEE57'}
            // hasNoHistory={hasNoHistory}
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
  }

  return <h1>Loading...</h1>;
};

export default EmptyBottleCard;
