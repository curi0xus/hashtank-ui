import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';

const RevealedFishModal = ({
  size,
  batchPrefix,
  serialNumber,
  metadata_url,
  owner_address,
  winning_bid,
  auctionId,
  fishId,
}: any) => {
  return (
    <HTModal
      // bgColor={'#3D4B65'}
      // bgColor={'#87B4FF'}
      // isDark
      CallToAction={CallToAction}
      closeButtonType='hollow'
      Content={(props: any) => (
        <Content
          fishId={fishId}
          auctionId={auctionId}
          batchPrefix={batchPrefix}
          metadata_url={metadata_url}
          owner_address={owner_address}
          winning_bid={winning_bid}
          {...props}
        />
      )}
      Trigger={(props: any) => (
        <Trigger
          serialNumber={serialNumber}
          metadata_url={metadata_url}
          owner_address={owner_address}
          winning_bid={winning_bid}
          {...props}
        />
      )}
    />
  );
};

export default RevealedFishModal;
