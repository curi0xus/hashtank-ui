import React from 'react';
import HTModal from '@/components/General/Modal';
import Content from './Content';
import CallToAction from './CallToAction';
import Trigger from './Trigger';

const RedeemSauceConfirmation = ({
  Trigger,
  sauceId,
  closeModalsList,
  sauceMetadata,
}: any) => {
  const bgColor = '#FFEE57';

  const textColor = 'black';
  const borderColor = 'brand.900';
  const hasNoHistory = true;
  return (
    <HTModal
      bgColor={bgColor}
      // CallToAction={CallToAction}
      closeButtonType='hollow'
      Content={(props: any) => (
        <Content
          CallToAction={() => (
            <CallToAction
              {...props}
              closeModalsList={[
                ...(closeModalsList?.length ? closeModalsList : []),
                ...(props.closeModalsList?.length ? props.closeModalsList : []),
              ]}
              sauceId={sauceId}
            />
          )}
          hasFishTraits={true}
          hasNoHistory={hasNoHistory}
          borderColor={borderColor}
          textColor={textColor}
          sauceId={sauceId}
          sauceMetadata={sauceMetadata}
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

export default RedeemSauceConfirmation;
// import Content from './Content';
// import CallToAction from './CallToAction';
// import Trigger from './Trigger';

// export { Content, CallToAction, Trigger };
