import ModalTemplate from '@/components/General/Modal/CardModal';
import PikeImage from 'public/static/images/PlentyOfFish/PikeSpace.webp';
import CallToAction from './CallToAction';
import LoveSauceAlumniIcon from 'public/static/images/Symbols/LoveSauceAlumni.webp';

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
  ...props
}: any) => {
  console.log('PROPS', props);
  return (
    <div style={{ margin: '50px 0 0 0' }}>
      <ModalTemplate
        CallToAction={() => <CallToAction {...props} />}
        specialText={{
          textColor: 'brand.900',
          content1: 'BROODFISH ATTRIBUTES DEGRADED',
          alignment: 'center',
        }}
        specialColor={specialColor}
        hasNoHistory={hasNoHistory}
        actions={ACTIONS}
        title='Unidentified Sunfish'
        hasFishTraits
        textColor={textColor}
        borderColor={borderColor}
        img={PikeImage}
        icon={LoveSauceAlumniIcon}
      />
    </div>
  );
};

export default Content;
