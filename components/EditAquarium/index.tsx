import React from "react";
import AquariumName from "./AquariumName";
import EditAquarium from "./EditAquarium";
import TankRoster from "./TankRoster";
import Fishery from "./Fishery";
import FishAnimation from "./SwimmingFish";

const AquariumPageContent = () => {
  return (
    <main
      style={{
        height: "fit-content",
        backgroundColor: "#373A49",
        paddingBottom: "10vh",
      }}
      id="edit-aquarium-main"
    >
      <AquariumName />
      <EditAquarium />
      <TankRoster />
      <Fishery />
    </main>
  );
};

export default AquariumPageContent;
