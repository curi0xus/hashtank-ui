import ModalTemplate from '@/components/General/Modal/CardModal';
import OffspringIcon from 'public/static/images/Symbols/Offspring.webp';
import LoveSauceAlumniIcon from 'public/static/images/Symbols/LoveSauceAlumni.webp';
import useGetWinnersBidByTokenId from '@/hooks/useGetWinnersBidByTokenId';
import useGetTxHashByTokenId from '@/hooks/useGetTxHashById';

const Content = (props: any) => {
  const { imageUrl, name, nftId, isBroodFish, isOffSpring, attributes } = props;
  const { txHash } = useGetTxHashByTokenId(nftId);

  const {
    bidInEtherString,
    bidder,
    humanReadableBidDate,
    humanReadableBidTime,
  } = useGetWinnersBidByTokenId(nftId);

  const ACTIONS = [
    {
      actionText: 'winning bid',
      amount: bidInEtherString,
      ts: {
        content: `${humanReadableBidDate} / ${humanReadableBidTime}`,
        color: props.isBreeding ? 'white' : 'brand.800',
      },
      walletAddress: bidder,
    },
  ];
  return (
    // <div style={{ height: 1000 }}>
    //   <SubmitBidModal closeModalsList={props.closeModalsList} />
    // </div>
    <ModalTemplate
      nftId={nftId}
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
