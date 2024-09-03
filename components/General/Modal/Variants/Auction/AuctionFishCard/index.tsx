import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';

const AuctionModal = ({
  batchPrefix,
  batchFishIndex,
  fishId,
  serialNumber,
  batchNumber,
  currentBatchId,
  currentFishName,
  fishImage,
  auctionEndTime,
  auctionCreatedAt,
  batchName,
  auctionId,
  sizeRange,
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
          sizeRange={sizeRange}
          batchName={batchName}
          auctionId={auctionId}
          auctionEndTime={auctionEndTime}
          auctionCreatedAt={auctionCreatedAt}
          batchPrefix={batchPrefix}
          hiddenFishImage={fishImage}
          currentBatchId={currentBatchId}
          batchNumber={batchNumber}
          fishId={fishId}
          batchFishIndex={batchFishIndex}
          fishName={currentFishName}
          {...props}
        />
      )}
      Trigger={(props: any) => (
        <Trigger
          serialNumber={serialNumber}
          hiddenFishImage={fishImage}
          currentBatchId={currentBatchId}
          fishId={fishId}
          fishName={currentFishName}
          batchFishIndex={batchFishIndex}
          {...props}
        />
      )}
    />
  );
};

export default AuctionModal;

// import Content from './Content';
// import CallToAction from './CallToAction';
// import Trigger from './Trigger';

// export { Content, CallToAction, Trigger };
