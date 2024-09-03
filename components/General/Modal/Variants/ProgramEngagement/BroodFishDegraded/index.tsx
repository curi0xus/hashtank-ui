import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';

const TankRosterFishCard = ({ Trigger, ...rest }: any) => {
  const hasOffspring = false;
  const isBroodFish = true;
  const isDisabled = false;
  const btnText = 'done';

  const bgColor = '#FFEE57';

  const textColor = 'black';
  const borderColor = 'brand.900';
  const hasNoHistory = true;

  return (
    <HTModal
      closeModals={rest?.closeModalsList}
      bgColor={bgColor}
      closeButtonType='hollow'
      Content={(props: any) => (
        <Content
          specialColor={'#FF530D'}
          hasFishTraits={true}
          hasNoHistory={hasNoHistory}
          borderColor={borderColor}
          textColor={textColor}
          {...props}
        />
      )}
      Trigger={(props: any) => <Trigger {...props} />}
    />
  );
};

export default TankRosterFishCard;
