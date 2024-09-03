import ModalTemplate from '@/components/General/Modal/CardModal';
import useGetWinnersBidByTokenId from '@/hooks/useGetWinnersBidByTokenId';

const Content = ({
  nftId,
  textColor,
  hasNoHistory,
  borderColor,
  name,
  image,
  distributeAtTs,
  ...props
}: any) => {
  const {
    bidInEtherString,
    bidder,
    humanReadableBidDate,
    humanReadableBidTime,
  } = useGetWinnersBidByTokenId(nftId);
  const ACTIONS = [
    {
      textColor: 'white',
      actionText: 'winning bid',
      amount: bidInEtherString,
      ts: {
        content: `${humanReadableBidDate} / ${humanReadableBidTime}`,
        color: 'white',
      },
      walletAddress: bidder,
    },
  ];

  return (
    <ModalTemplate
      nftId={nftId}
      distributeAtTs={distributeAtTs}
      isBreeding
      hasNoHistory={hasNoHistory}
      actions={ACTIONS}
      title={name}
      hasFishTraits
      textColor={'white'}
      borderColor={borderColor}
      img={image}
    />
  );
};

export default Content;
