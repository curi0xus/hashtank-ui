import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';
import useFetchMetadata from '@/new-hooks/useFetchMetadata';

const RedeemSauceFishCard = ({
  sauceId,
  metdataUrl,
  serialNumber,
  tiggerId,
  isGunk,
  gunkSauceCount,
}: any) => {
  const { data: sauceMetadata } = useFetchMetadata(metdataUrl);
  if (sauceMetadata) {
    const { image, attributes, name, description, createdAt, bought_for } =
      sauceMetadata;
    const resale_value = attributes.find(
      (each: any) => each.trait_type === 'resale_value'
    ).value;
    const txHash = '';
    const hasOffspring = false;
    const isBroodFish = true;
    const isDisabled = false;
    const btnText = 'view';

    const bgColor = '#B276FF';

    const textColor = 'black';
    const borderColor = 'brand.800';
    const isShowCTA = resale_value > 0;
    return (
      <HTModal
        customSize='3xl'
        isDark={true}
        bgColor={bgColor}
        CallToAction={(props: any) => (
          <CallToAction
            isShowCTA={isShowCTA}
            {...props}
            sauceId={sauceId}
            sauceMetadata={sauceMetadata}
          />
        )}
        closeButtonType='hollow'
        Content={(props: any) => (
          <Content
            serialNumber={serialNumber}
            txHash={txHash}
            attributes={attributes}
            boughtFor={bought_for}
            createdAt={createdAt}
            resaleValue={resale_value}
            sauceId={sauceId}
            name={name}
            imageUrl={image}
            // specialColor={'#FFEE57'}
            hasFishTraits={true}
            borderColor={borderColor}
            textColor={textColor}
            {...props}
          />
        )}
        Trigger={(props: any) => (
          <Trigger
            isGunk={isGunk}
            gunkSauceCount={gunkSauceCount}
            tiggerId={tiggerId}
            serialNumber={serialNumber}
            resaleValue={resale_value}
            sauceId={sauceId}
            name={name}
            imageUrl={image}
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

export default RedeemSauceFishCard;
