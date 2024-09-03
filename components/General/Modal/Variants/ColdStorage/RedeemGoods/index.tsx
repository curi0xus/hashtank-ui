import React from "react";
import HTModal from "@/components/General/Modal";
import Content from "./Content";
import CallToAction from "./CallToAction";
import Trigger from "./Trigger";

const RedeemSauceFishCard = () => {
  const hasOffspring = false;
  const isBroodFish = true;
  const isDisabled = false;
  const btnText = "view";

  const bgColor = "#9A9FB0";

  const textColor = "black";
  const borderColor = "brand.800";
  const hasNoHistory = true;

  return (
    <HTModal
      isDark={true}
      bgColor={bgColor}
      CallToAction={(props: any) => <CallToAction {...props} />}
      closeButtonType="hollow"
      Content={(props: any) => (
        <Content
          // specialColor={'#FFEE57'}
          hasFishTraits={true}
          hasNoHistory={hasNoHistory}
          borderColor={borderColor}
          textColor={textColor}
          {...props}
        />
      )}
      Trigger={(props: any) => (
        <Trigger
          isNew={true}
          // specialColor={'#FFEE57'}
          // hasNoHistory={hasNoHistory}
          borderColor={borderColor}
          isDark
          textColor={textColor}
          hasOffspring={hasOffspring}
          bgColor={bgColor}
          buttonText={btnText}
          {...props}
          isSelected={false}
          isDisabled={isDisabled}
          isBroodFish={isBroodFish}
        />
      )}
    />
  );
};

export default RedeemSauceFishCard;
// import Content from './Content';
// import CallToAction from './CallToAction';
// import Trigger from './Trigger';

// export { Content, CallToAction, Trigger };
