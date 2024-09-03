import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';

const FishText = ({ metadata, nftId }: any) => {
  if (metadata) {
    const { image, attributes, name } = metadata;

    return (
      <HTModal
        CallToAction={(props: any) => <CallToAction {...props} />}
        closeButtonType='hollow'
        Content={(props: any) => (
          <Content
            nftId={nftId}
            attributes={attributes}
            imageUrl={image}
            name={name}
            {...props}
          />
        )}
        Trigger={(props: any) => <Trigger name={name} {...props} />}
      />
    );
  }

  return <h1>...</h1>;
};

export default FishText;
