import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';
import UnknownFishImage from 'public/static/images/Auction/UnidentifiedFish.webp';
import useFetchFishTypeById from '@/new-hooks/fishtype/useFetchFishTypeById';

const MyBidFish = ({
  batchFishIndex,
  fishTypeId,
  batchNumber,
  serialNumber,
  currentBatchId,
  fishId,
  myBid,
}: any) => {
  const { data } = useFetchFishTypeById(fishTypeId);
  const fishName = data?.type_name || '-';
  const hiddenFishImage = data
    ? data?.silhouette_img_thumbnail
    : UnknownFishImage;

  return (
    <HTModal
      // bgColor={'#3D4B65'}
      // bgColor={'#87B4FF'}
      // isDark
      CallToAction={CallToAction}
      closeButtonType='hollow'
      Content={(props: any) => (
        <Content
          hiddenFishImage={hiddenFishImage}
          fishId={fishId}
          currentBatchId={currentBatchId}
          batchNumber={batchNumber}
          fishTypeId={fishTypeId}
          batchFishIndex={batchFishIndex}
          fishName={fishName}
          {...props}
        />
      )}
      Trigger={(props: any) => (
        <Trigger
          serialNumber={serialNumber}
          myBid={myBid}
          fishId={fishId}
          hiddenFishImage={hiddenFishImage}
          currentBatchId={currentBatchId}
          fishTypeId={fishTypeId}
          fishName={fishName}
          batchFishIndex={batchFishIndex}
          {...props}
        />
      )}
    />
  );
};

export default MyBidFish;

// import Content from './Content';
// import CallToAction from './CallToAction';
// import Trigger from './Trigger';

// export { Content, CallToAction, Trigger };
