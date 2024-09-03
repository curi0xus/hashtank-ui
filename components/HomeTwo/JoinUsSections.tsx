import React from "react";
import SectionLayout from "./Shared/SectionLayout";
import {
  Stack,
  Flex,
  Box,
  Button,
  Text,
  Divider,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import SectionContent from "./Shared/SectionContent";
import SocialTelegram from "../General/Icons/Telegram";
import SocialWarpcaster from "../General/Icons/Warpcast";
import TwitterX from "../General/Icons/TwitterX";
import Image from "next/image";

const JoinUsSections = ({ height, background }: any) => {
  return (
    <SectionLayout height={height} background={background}>
      <>
        {/* <Flex height={['fit-content', '100vh', '100vh']}> */}
        <Flex
          marginTop={["0vw", "4vw"]}
          id="background-info"
          // __css={{
          //   scrollbarWidth: 0,
          // }}
          overflowX="hidden"
          scrollPadding={0}
          overflowY="scroll"
          height="100%"
          justify={["center"]}
          alignItems={"flex-start"}

          // height={[
          //   '405vmin',
          //   '295vmin',
          //   'fit-content',
          //   'fit-content', //will look weird for 12.9inch ipad portrait mode
          //   '95vmin',
          //   '110vmin',
          // ]}
        >
          <Box
            h="100%"
            w={["0", "38.5vw"]}
            display={["none", "flex"]}
            justifyItems={["center", "end"]}
            alignItems={["center", "start"]}
            p={["0 0 0 0", "5vw 0 0 5vw"]}
          >
            <Box h={["0", "30vw"]} w={["0", "30vw"]}>
              <Image
                src={require("@/public/static/images/Home/Sauce-duo.webp")}
                alt="sauce"
              />
            </Box>
          </Box>
          <Stack
            height="100%"
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            p={[
              // "140vmin 0 0 0",
              "1vw 0",
              // '5vh 0 0 0',
              // '6vh 0 0 0',
              // '5vh 0 0 0',
              // '10vmin 0 0 0',
              // '15vw 0 0 0',
            ]}
            width={["85%", "44%"]}
          >
            <Stack
              justifyContent={"start"}
              alignItems={["flex-start"]}
              height="100%"
            >
              <SectionContent
                title="JOIN THE FISH SAUCE EMPIRE"
                content={[
                  "Hashtank is a layered narrative that goes deeper than just artwork and merchandise, with a universe slowly unfolding through the participation of the community using the special mechanisms afforded to us with NFTs.",
                  "Sounds fishy? Don’t worry, Mrs. Ching got this.",
                  "Follow us on these platforms and stay afloat of news.",
                ]}
              />
              <Box
                h="120vw"
                w="85vw"
                display={["flex", "none"]}
                justifyItems={["center", "end"]}
                alignItems={["center", "start"]}
                // p={["0 0 0 0", "5vw 0 0 5vw"]}
              >
                <Box h={"100vw"} w={["100vw"]}>
                  <Image
                    src={require("@/public/static/images/Home/Sauce-duo.webp")}
                    alt="sauce"
                  />
                </Box>
              </Box>
              <ButtonGroup
                spacing={["6.3vw", "0vw"]}
                mt={["2vw !important"]}
                display="flex"
                marginInline={["auto", "0"]}
                marginBottom={["8vw", "1vw"]}
                // css={{ marginTop: '72px !important' }}
              >
                <Box>
                  <IconButton
                    fontSize={["14vw", "3.5vw"]}
                    _hover={{
                      background: "none",
                      color: "white",
                    }}
                    color="brand.900"
                    background="none"
                    aria-label="Telegram"
                    icon={<SocialTelegram />}
                  />
                </Box>
                <Box>
                  <IconButton
                    fontSize={["14vw", "3.5vw"]}
                    _hover={{
                      background: "none",
                      color: "white",
                    }}
                    color="brand.900"
                    background="none"
                    aria-label="Wrapcaster"
                    icon={<SocialWarpcaster />}
                  />
                </Box>
                <Box>
                  <IconButton
                    fontSize={["14vw", "3.5vw"]}
                    _hover={{
                      background: "none",
                      color: "white",
                    }}
                    color="brand.900"
                    background="none"
                    aria-label="Twitter"
                    icon={<TwitterX />}
                  />
                </Box>
              </ButtonGroup>
              <SectionContent
                content={[
                  "HASHTANK is currently in a closed alpha, but you can apply to join our open beta below.",
                ]}
              />
              <Box
                w={["100%", "75% !important"]}
                display={"flex"}
                ml={["8vw", "0"]}
                mt={["11vw", "3vw"]}
              >
                <Button
                  maxW={["70vw", "24vw"]}
                  w={["fit-content"]}
                  paddingInlineEnd={0}
                  paddingInlineStart={0}
                  p={["6.5vw 10vw", "2vw 3vw"]}
                  _hover={{
                    background: "white",
                    color: "brand.900",
                  }}
                  background={"brand.900"}
                  color="white"
                >
                  <Text
                    textTransform={"uppercase"}
                    fontWeight={"medium"}
                    fontSize={["4vw", "1.4vw"]}
                  >
                    join our beta waitlist
                  </Text>
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Flex>
        {/* <Flex
          height={['fit-content', '100vh', '100vh', '100vh', '100vh', '246vh']}
        > */}
        {/* <Box h='100%' w={['0', '40%', '35%', '40%', '50%']} /> */}
        {/* <Flex height="fit-content">
          <Box w={["0", "40%", "35%", "40%", "50%"]} />
          <Stack
            margin={"0 auto"}
            p={[
              "120vmin 0 200vmin 0",
              "35vw 0 0 0",
              "35vw 0 0 0",
              "70vw 0 0 0",
              "25vw 0 0 0",
              "30vw 0 0 0",
            ]}
            width={["85%", "60%", "50%"]}
          >
            <Box
              __css={{
                marginTop: "5vh !important",
                width: "100%",
                marginBottom: "1vw !important",
              }}
            >
              <Divider
                width="13%"
                opacity={1}
                borderColor="white"
                borderWidth={"1.5px"}
              />
            </Box>
          </Stack>
        </Flex> */}
      </>
    </SectionLayout>
  );
};

export default JoinUsSections;
