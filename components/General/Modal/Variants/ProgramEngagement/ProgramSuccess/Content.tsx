import ModalTemplate from '@/components/General/Modal/CardModal';
import PikeImage from 'public/static/images/PlentyOfFish/PikeSpace.webp';
import CallToAction from './CallToAction';
import OffspringIcon from 'public/static/images/Symbols/Offspring.webp';

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
  name,
  image,
  ...props
}: any) => {
  return (
    // <div style={{ height: 1000 }}>
    //   <SubmitBidModal closeModalsList={props.closeModalsList} />
    // </div>
    <ModalTemplate
      CallToAction={() => <CallToAction {...props} />}
      specialText={{
        textColor: 'brand.900',
        content1: 'breeding success!',
        content2: 'offspring rewarded',
        alignment: 'left',
      }}
      hasNoHistory={hasNoHistory}
      actions={ACTIONS}
      title={name}
      hasFishTraits
      textColor={textColor}
      borderColor={borderColor}
      icon={OffspringIcon}
      img={image}
    />
  );
};

export default Content;
