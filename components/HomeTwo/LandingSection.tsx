import React from "react";
import { Box } from "@chakra-ui/react";
import SectionLayout from "./Shared/SectionLayout";
import Image from "next/image";
import MobileLogo from "public/static/images/Home/mobile/logo-mobile.webp";

const LandingSection = ({ height, background }: any) => {
  return (
    <SectionLayout height={height} background={background}>
      {/* <Box h='100%' w={['0', '40%', '35%', '40%', '50%']} /> */}
      <Box
        height="100%"
        alignItems={"flex-end"}
        justifyContent={"center"}
        display={["flex", "none"]}
        // width={["50vw"]}
      >
        <Image
          style={{ marginBottom: "15vw", width: "65vw" }}
          src={MobileLogo}
          alt="Hashtank Mobile Logo"
        />
      </Box>
    </SectionLayout>
  );
};

export default LandingSection;
