import ModalTemplate from '@/components/General/Modal/CardModal';
import OffspringIcon from 'public/static/images/Symbols/Offspring.webp';
import LoveSauceAlumniIcon from 'public/static/images/Symbols/LoveSauceAlumni.webp';
// import useGetWinnersBidByTokenId from '@/hooks/useGetWinnersBidByTokenId';
// import { useReadContract } from 'wagmi';
// import auctionContractConfig from '@/contracts/config/hashTankNFT';
// import useGetTxHashByTokenId from '@/hooks/useGetTxHashById';
import useFetchBidHistory from '@/new-hooks/auction/useFetchBidHistory';
import { formatDate } from '@/util/formatDate';
import { formatTime } from '@/util/formatTime';

const Content = (props: any) => {
  const {
    imageUrl,
    name,
    nftId,
    isBroodFish,
    isOffSpring,
    attributes,
    auctionId,
  } = props;
  const txHash = '';
  // const { txHash } = useGetTxHashByTokenId(nftId);
  const { data: winningBids } = useFetchBidHistory(auctionId, nftId);
  const bidCreatedAt = winningBids?.history?.[0]?.created_at;
  const winnerAddress = winningBids?.history?.[0]?.user_id;
  const winningBid = winningBids?.history?.[0]?.bid_amount;
  // const {
  //   bidInEtherString,
  //   bidder,
  //   humanReadableBidDate,
  //   humanReadableBidTime,
  // } = useGetWinnersBidByTokenId(nftId);
  // const { data: ownerAddress } = useReadContract({
  //   ...auctionContractConfig,
  //   functionName: 'ownerOf',
  //   args: [nftId],
  // });
  const ACTIONS = [
    {
      actionText: 'winning bid',
      amount: winningBid,
      ts: {
        content: `${formatDate(bidCreatedAt)} / ${formatTime(bidCreatedAt)}`,
        color: 'brand.800',
      },
      walletAddress: winnerAddress,
    },
  ];
  return (
    // <div style={{ height: 1000 }}>
    //   <SubmitBidModal closeModalsList={props.closeModalsList} />
    // </div>
    <ModalTemplate
      fishId={nftId}
      auctionId={auctionId}
      txHash={txHash}
      attributes={attributes}
      // isInTank={props.isSelected}
      actions={ACTIONS}
      title={name}
      hasFishTraits
      textColor={props.isBreeding ? 'white' : 'brand.800'}
      img={imageUrl}
      icon={
        isOffSpring
          ? OffspringIcon
          : isBroodFish
          ? LoveSauceAlumniIcon
          : undefined
      }
    />
  );
};

export default Content;
