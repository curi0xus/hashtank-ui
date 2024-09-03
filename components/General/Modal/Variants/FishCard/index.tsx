import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';
import useFetchMetadata from '@/new-hooks/useFetchMetadata';

const GeneralFishCard = ({
  metadataUrl,
  isDisable,
  isTiny,
  type,
  isBreeding,
  isSelected,
  nftId = 1,
  serialNumber,
  winningBid,
  auctionId,
}: any) => {
  const { data } = useFetchMetadata(metadataUrl);

  if (data) {
    const {
      image,
      attributes,
      name,
      description,
      isNew,
      isOffspring,
      isBroodFish,
    } = data;

    const isDisabled =
      isDisable ||
      isBreeding ||
      (type === 'love-sauce-program' && (isBroodFish || isOffspring));
    const btnText = isBreeding
      ? 'unavailable'
      : type === 'tank'
      ? 'send to tank'
      : type === 'sauce-factory'
      ? 'select fish'
      : isBroodFish
      ? 'lovesauce alumni'
      : isOffspring
      ? 'offspring'
      : 'add to program';

    return (
      <HTModal
        isRounded={isOffspring}
        bgColor={isOffspring ? '#87B4FF' : isBreeding ? '#3D4B65' : undefined}
        // bgColor={'#87B4FF'}
        isDark={isBreeding}
        CallToAction={(props: any) => (
          <CallToAction
            {...props}
            nftId={nftId}
            isBroodFish={isBroodFish}
            isOffSpring={isOffspring}
            isLoveSauceProgram={type === 'love-sauce-program'}
            isSauceFactory={type === 'sauce-factory'}
            isSelected={isSelected}
            isBreeding={isBreeding}
          />
        )}
        closeButtonType='hollow'
        Content={(props: any) => (
          <Content
            auctionId={auctionId}
            attributes={attributes}
            imageUrl={image}
            name={name}
            nftId={nftId}
            isSelected={isSelected}
            {...props}
            isBreeding={isBreeding}
            isBroodFish={isBroodFish}
            isOffSpring={isOffspring}
          />
        )}
        Trigger={(props: any) => (
          <Trigger
            serialNumber={serialNumber}
            isTiny={isTiny}
            isNew={isNew}
            buttonText={btnText}
            {...props}
            imageUrl={image}
            name={name}
            winningBid={winningBid}
            nftId={nftId}
            isSelected={isSelected}
            isDisabled={isDisabled}
            isBreeding={isBreeding}
            isOffSpring={isOffspring}
            isBroodFish={isBroodFish}
            type={type}
          />
        )}
      />
    );
  }

  return <h1>Placeholder Card...</h1>;
};

export default GeneralFishCard;
