import React from "react";
import RedemptionCenterIntroduction from "./RedemptionCenterIntroduction";
import VanityShelf from "@/components/General/Shared/VanityShelf";
import ColdStorage from "@/components/General/Shared/ColdStorage";

const RedemptionCenterPageContent = () => {
  return (
    <main
      style={{
        height: "fit-content",
        backgroundColor: "#373A49",
        paddingBottom: "10vw",
      }}
      id="redemption-center-main"
    >
      <RedemptionCenterIntroduction />
      <VanityShelf />
      <ColdStorage />
    </main>
  );
};

export default RedemptionCenterPageContent;
