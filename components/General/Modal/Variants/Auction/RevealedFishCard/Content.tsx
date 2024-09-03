import ModalTemplate from '@/components/General/Modal/CardModal';
import useGetWinnersBidByTokenId from '@/hooks/useGetWinnersBidByTokenId';
import useGetTokenMetadata from '@/hooks/useGetTokenMetadata';
import useGetTxHashByTokenId from '@/hooks/useGetTxHashById';
import useFetchMetadata from '@/new-hooks/useFetchMetadata';
import useFetchBidHistory from '@/new-hooks/auction/useFetchBidHistory';
import { formatDate } from '@/util/formatDate';
import { formatTime } from '@/util/formatTime';

const Content = ({
  metadata_url,
  batchPrefix,
  winning_bid,
  owner_address,
  auctionId,
  fishId,
}: any) => {
  const { data } = useFetchMetadata(metadata_url);
  const image = data?.image;
  const name = data?.name;
  const attributes = data?.attributes || [];
  const { data: winningBids } = useFetchBidHistory(auctionId, fishId);

  const bidCreatedAt = winningBids?.history?.[0]?.created_at;

  const ACTIONS = [
    {
      actionText: 'winning bid',
      amount: winning_bid,
      ts: {
        content: `${formatDate(bidCreatedAt)} / ${formatTime(bidCreatedAt)}`,
        color: 'brand.800',
      },
      walletAddress: owner_address,
    },
  ];
  return (
    // <div style={{ height: 1000 }}>
    //   <SubmitBidModal closeModalsList={props.closeModalsList} />
    // </div>
    <ModalTemplate
      batchPrefix={batchPrefix}
      auctionId={auctionId}
      fishId={fishId}
      txHash={'txHash'}
      attributes={attributes}
      actions={ACTIONS}
      title={name}
      hasFishTraits
      textColor='brand.800'
      img={image}
    />
  );
};

export default Content;
