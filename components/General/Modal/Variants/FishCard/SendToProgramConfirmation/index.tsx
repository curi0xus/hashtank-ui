import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';

const SendToProgramConfirmation = ({ Trigger }: any) => {
  const bgColor = '#FFEE57';

  const textColor = 'black';
  const borderColor = 'brand.900';
  const hasNoHistory = true;
  return (
    <HTModal
      customSize='3xl'
      bgColor={bgColor}
      CallToAction={(props: any) => <CallToAction {...props} />}
      closeButtonType='hollow'
      Content={(props: any) => (
        <Content
          hasFishTraits={true}
          hasNoHistory={hasNoHistory}
          borderColor={borderColor}
          textColor={textColor}
          {...props}
        />
      )}
      Trigger={(props: any) => (
        <Trigger {...props} />
        // <Trigger
        //   specialColor={'#FF530D'}
        //   hasNoHistory={hasNoHistory}
        //   borderColor={borderColor}
        //   isDark
        //   textColor={textColor}
        //   hasOffspring={hasOffspring}
        //   bgColor={bgColor}
        //   buttonText={btnText}
        //   {...props}
        //   isSelected={false}
        //   isDisabled={isDisabled}
        //   isBroodFish={isBroodFish}
        // />
      )}
    />
  );
};

export default SendToProgramConfirmation;
// import Content from './Content';
// import CallToAction from './CallToAction';
// import Trigger from './Trigger';

// export { Content, CallToAction, Trigger };
