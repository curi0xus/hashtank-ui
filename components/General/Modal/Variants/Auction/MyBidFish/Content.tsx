import ModalTemplate from "@/components/General/Modal/CardModal";
import useFetchAuctionDetailById from "@/new-hooks/auction/useFetchAuctionDetailsById";
import { formatDate } from "@/util/DateFormatter";
import { formatTime } from "@/util/formatTime";
import useFetchFishMetadataById from "@/new-hooks/fish/useFetchFishMetadataById";
import useFetchBidHistory from "@/new-hooks/auction/useFetchBidHistory";

const Content = ({
  closeModalsList,
  batchNumber,
  fishTypeId,
  fishName,
  batchFishIndex,
  currentBatchId,
  hiddenFishImage,
  fishId,
  ...rest
}: any) => {
  const { data: bidDetails } = useFetchBidHistory(currentBatchId, fishId);
  const bidHistory = bidDetails?.history || [];
  const winningBid = bidHistory[0]?.bid_amount;
  const winnerAddress = bidHistory[0]?.user_id;
  const bidCreatedAt = bidHistory[0]?.created_at;
  const { data: fishMetadata } = useFetchFishMetadataById(fishId);
  const revealedFishName = fishMetadata?.name;
  const revealedFishImage = fishMetadata?.image;
  const attributes = fishMetadata?.attributes;
  const { data } = useFetchAuctionDetailById(currentBatchId);
  const batchName = data?.batchName || "";
  const createdAt = data?.auctionCreatedAt;
  const endAt = data?.auctionEndTime;

  const ACTIONS = fishMetadata
    ? [
        {
          actionText: "winning bid",
          amount: winningBid,
          ts: {
            content: `${formatDate(bidCreatedAt)} / ${formatTime(
              bidCreatedAt
            )}`,
            color: "brand.800",
          },
          walletAddress: winnerAddress,
        },
      ]
    : [
        {
          actionDetails: `released ${formatDate(createdAt)}`,
          actionText: `0${batchNumber} - ${batchName.toUpperCase()}`,
          ts: {
            isCountdown: true,
            content: endAt,
            color: "brand.900",
          },
        },
      ];

  return (
    <ModalTemplate
      closeModalsList={closeModalsList}
      batchFishIndex={batchFishIndex}
      auctionId={currentBatchId}
      fishId={fishId}
      actions={ACTIONS}
      batchNumber={batchNumber}
      attributes={attributes}
      batchName={batchName}
      title={revealedFishName || fishName}
      hasFishTraits={!!fishMetadata}
      hasBidSubmissionForm={!fishMetadata}
      textColor="brand.800"
      img={revealedFishImage || hiddenFishImage}
    />
  );
};

export default Content;
