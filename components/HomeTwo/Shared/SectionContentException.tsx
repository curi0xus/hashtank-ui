import React from "react";
import { Stack, Text } from "@chakra-ui/react";

const SectionContentException = ({ title, content }: any) => {
  return (
    <Stack>
      <Text
        // p={["2vw 0 0 0", "0.8vw 0 0 0"]}
        textTransform={"uppercase"}
        decoration={"underline"}
        fontWeight={["semibold", "bold"]}
        fontSize={["5.15vw", "1.42vw"]}
      >
        {title}
      </Text>
      {content.map((each: string, i: number) => (
        <Text
          p={["4vw 0 0 0", "0.2vw 0 0 0"]}
          maxW={["100%"]}
          whiteSpace={"pre-line"}
          key={i}
          fontWeight={"normal"}
          fontSize={["4.65vw", "1vw"]}
          lineHeight={["5.9vw", "1.2vw"]}
        >
          {each}
        </Text>
      ))}
    </Stack>
  );
};

export default SectionContentException;
