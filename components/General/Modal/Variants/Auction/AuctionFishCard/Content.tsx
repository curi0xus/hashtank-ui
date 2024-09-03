import ModalTemplate from '@/components/General/Modal/CardModal';
import { formatDate } from '@/util/DateFormatter';

const Content = ({
  closeModalsList,
  batchPrefix,
  hiddenFishImage,
  currentBatchId,
  batchNumber,
  fishId,
  batchFishIndex,
  batchName,
  fishName,
  auctionId,
  auctionCreatedAt,
  auctionEndTime,
  sizeRange,
  ...rest
}: any) => {
  const ACTIONS = [
    {
      actionDetails: `released  ${formatDate(auctionCreatedAt)}`,
      actionText: `0${batchNumber} - ${batchName?.toUpperCase()}`,
      ts: {
        isCountdown: true,
        content: auctionEndTime,
        color: 'brand.900',
      },
    },
  ];

  return (
    <ModalTemplate
      sizeRange={sizeRange}
      closeModalsList={closeModalsList}
      batchFishIndex={batchFishIndex}
      actions={ACTIONS}
      batchPrefix={batchPrefix}
      batchNumber={batchNumber}
      batchName={batchName}
      auctionId={auctionId}
      title={fishName}
      fishId={fishId}
      hasBidSubmissionForm
      textColor='brand.800'
      img={hiddenFishImage}
    />
  );
};

export default Content;
