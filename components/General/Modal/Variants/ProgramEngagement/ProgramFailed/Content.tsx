import ModalTemplate from '@/components/General/Modal/CardModal';
import PikeImage from 'public/static/images/PlentyOfFish/PikeSpace.webp';
import CallToAction from './CallToAction';
import LoveSauceAlumniIconYellow from 'public/static/images/Symbols/LoveSauceAlumniYellow.webp';

const ACTIONS = [
  {
    actionText: 'winning bid',
    amount: '0.92',
    ts: {
      content: '1.5.2023 / 20:49',
      color: 'black',
    },
    walletAddress: '0x5124781278347218423432423432',
  },
];

const Content = ({
  textColor,
  hasNoHistory,
  borderColor,
  specialColor,
  name,
  image,
  ...props
}: any) => {
  return (
    // <div style={{ height: 1000 }}>
    //   <SubmitBidModal closeModalsList={props.closeModalsList} />
    // </div>
    <ModalTemplate
      isBreedFailed
      CallToAction={() => <CallToAction {...props} />}
      specialText={{
        textColor: '#FFEE57',
        content1: 'breeding failed!',
        content2: 'fish attributes degraded',
        alignment: 'left',
      }}
      specialColor={specialColor}
      hasNoHistory={hasNoHistory}
      actions={ACTIONS}
      title={name}
      hasFishTraits
      textColor={textColor}
      borderColor={borderColor}
      img={image}
      icon={LoveSauceAlumniIconYellow}
    />
  );
};

export default Content;
