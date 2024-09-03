import React from "react";
import SectionLayout from "./Shared/SectionLayout";
import {
  Stack,
  Flex,
  Text,
  Divider,
  Box,
  IconButton,
  position,
} from "@chakra-ui/react";
import SectionContent from "./Shared/SectionContent";
import { StarIcon } from "@chakra-ui/icons";
import HTModal from "@/components/General/Modal";
import dynamic from "next/dynamic";
const PlentyOfFish = dynamic(() => import("../PlentyOfFish"), { ssr: false });
const SauceModal = dynamic(() => import("../SauceModal"), { ssr: false });
import Image from "next/image";
import eyefish from "@/public/static/images/Home/eye_fish.png";
import FishSlider from "../General/Home/FishSlider";
import SectionContentException from "./Shared/SectionContentException";
import { Parallax } from "react-parallax";
import tentacle from "@/public/static/images/Home/Tentacle.png";

const BackgroundSection = ({ height, background }: any) => {
  return (
    <>
      {" "}
      <SectionLayout height={height} background={background}>
        <Flex
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
          // transform="translateY(-143vw)"
          // height={[
          //   '405vmin',
          //   '295vmin',
          //   'fit-content',
          //   'fit-content', //will look weird for 12.9inch ipad portrait mode
          //   '95vmin',
          //   '110vmin',
          // ]}
        >
          <Box h="100%" w={["0vw", "40vw"]} />
          <Stack
            height="100%"
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            p={[
              "156.5vw 0 0 0",
              "4vw 0",
              // '5vh 0 0 0',
              // '6vh 0 0 0',
              // '5vh 0 0 0',
              // '10vmin 0 0 0',
              // '15vw 0 0 0',
            ]}
            width={["86vw", "100%"]}
          >
            <Stack spacing={["4.8vw", "1.5vw"]} mb={["11vw"]}>
              <Text fontWeight={"normal"} fontSize={["5.15vw", "1.4vw"]}>
                The year is 2048 AD.
              </Text>
              <Text fontWeight={"normal"} fontSize={["5.15vw", "1.4vw"]}>
                The oceans are irradiated.
              </Text>
              <Text fontWeight={"normal"} fontSize={["5.15vw", "1.4vw"]}>
                Sea life was extinguished a decade ago.
              </Text>
              <Flex>
                <Text fontWeight={"normal"} fontSize={["5.15vw", "1.4vw"]}>
                  But now we&apos;ve found the
                  <Text
                    as="span"
                    ml="1vw"
                    textTransform={"uppercase"}
                    color="brand.900"
                    fontWeight={"medium"}
                    fontSize={["5.15vw", "1.4vw"]}
                  >
                    hashtank.
                  </Text>
                </Text>
              </Flex>
              <Text fontWeight={"normal"} fontSize={["5.15vw", "1.4vw"]}>
                What bizarre creatures lie beneath its depths?
              </Text>
              <Flex justifyContent={"start"} display={["flex"]}>
                <Box
                  marginTop={["0vw"]}
                  alignItems={"flex-start"}
                  justifyContent={"center"}
                  display={["none", "flex"]}
                  // width={["50vw"]}
                >
                  <Image
                    style={{ marginBottom: "0vw", width: "5vw" }}
                    src={eyefish}
                    alt="Hashtank Mobile Logo"
                  />
                </Box>
                <Box
                  marginTop={["5vw"]}
                  width={"100%"}
                  alignItems={"flex-center"}
                  justifyContent={"center"}
                  display={["flex", "none"]}
                  // width={["50vw"]}
                >
                  <Image
                    style={{ marginBottom: "0vw", width: "20vw" }}
                    src={eyefish}
                    alt="Hashtank Mobile Logo"
                  />
                </Box>
              </Flex>
            </Stack>

            <Stack
              justifyContent={["start", "space-between"]}
              alignItems={["start", "space-between"]}
              height="100%"
              width={["95%", "100%"]}
              marginTop={["0", "8vw"]}
            >
              <Box display={["none", "flex"]}>
                <SectionContent
                  title="how did we get here?"
                  content={[
                    "Capitalism was always going to win.",
                    "Sea life was wiped out a decade ago, erasing 170 million years of marine species' evolution, and with it, the unthinkable happened: a world without fish sauce - or so it seemed.",
                    'In a desperate bid to preserve the last scraps of marine biodiversity, an industrial complex constructed a "doomsday" vault, the HASHTANK. This underwater ark was meant to harbor the genetic codes capable of resurrecting the vanished species. But fate, as always, had other plans.',
                    "The project rapidly deteriorated, much like other failed attempts at human resilience, such as refreezing the ice caps with a swarm of refrigerator drones - that went about as well as you'd expect. Intense radiation mutated the DNA, causing most of the fishes grown there to become proper horror shows and the project was quietly abandoned. ",
                    "Enter Mrs. Ching.",
                  ]}
                />
              </Box>
              <Box display={["flex", "none"]}>
                <SectionContentException
                  title="how did we get here?"
                  content={[
                    "Capitalism was always going to win.",
                    "Sea life was wiped out a decade ago, erasing 170 million years of marine species' evolution, and with it, the unthinkable happened: a world without fish sauce - or so it seemed.",
                    'In a desperate bid to preserve the last scraps of marine biodiversity, an industrial complex constructed a "doomsday" vault, the HASHTANK. This underwater ark was meant to harbor the genetic codes capable of resurrecting the vanished species. But fate, as always, had other plans.',
                    "The project rapidly deteriorated, much like other failed attempts at human resilience, such as refreezing the ice caps with a swarm of refrigerator drones - that went about as well as you'd expect. Intense radiation mutated the DNA, causing most of the fishes grown there to become proper horror shows and the project was quietly abandoned. ",
                    "Enter Mrs. Ching.",
                  ]}
                />
              </Box>
              <Box display={["flex", "none"]} height={["290vw"]} width="100%" />
              <Box>
                <SectionContent
                  title="in crisis there is opportunity"
                  content={[
                    "Her entrepreneurial spirit knew no bounds - peddling counterfeit meds, dumping biohazards on highways, even trafficking organs from the dearly departed. When HASHTANK shut down, she struck gold: monopolizing fish sauce production through ownership of the last fishes on Earth, leaving the grisly tasks to her husband while she managed the books. The free market's a beautiful thing.",
                    "And if there’s anyone who will unscrupulously sell fish sauce made from the last mutated, irradiated marine survivors through shadowy NFTs and customized tokens, it'll be Mrs. Ching.",
                  ]}
                />
              </Box>
              <Box display={["flex", "none"]} height={["117vw"]} width="100%" />
              <Box
                width="100%"
                height="20vw"
                display={["none", "flex"]}
                alignItems="center"
                justifyContent="center"
              >
                <FishSlider />
              </Box>

              <Box
                width={["85vw", "48vw"]}
                transform={[
                  "translateY(-60vw)",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                ]}
              >
                {/* <Box
                display={["none", "block"]}
                transform={[
                  `translate(-20vw, calc(10vw))`,
                  `translate(-20vw, calc(10vw))`,
                  `translate(-20vw, calc(10vw))`,
                  `translate(-20vw, calc(10vw))`,
                  `translate(-20vw, calc(500px - 10vw))`,
                ]}
              >
                <HTModal
                  closeButtonType="filled"
                  Content={() => <SauceModal />}
                  Trigger={(props: any) => (
                    <IconButton
                      {...props}
                      _hover={{
                        transform: "scale(1.5)",
                      }}
                      color="brand.900"
                      background="none"
                      aria-label="Star"
                      icon={<StarIcon fontSize={"5xl"} />}
                    />
                  )}
                />
              </Box>

              <Box
                display={["none", "block"]}
                transform={["translate(-28vw, 15vh)"]}
              >
                <HTModal
                  closeButtonType="filled"
                  Content={() => <PlentyOfFish />}
                  Trigger={(props: any) => (
                    <IconButton
                      {...props}
                      _hover={{
                        transform: "scale(1.5)",
                      }}
                      color="brand.900"
                      background="none"
                      aria-label="Star"
                      icon={<StarIcon fontSize={"5xl"} />}
                    />
                  )}
                />
              </Box> */}

                {/* <Box
                // pt={['5vh', '5vh', '5vh', '30vw', '7vw', '15vw']}
                __css={{
                  marginTop: "1vh !important",
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
              </Box> */}
                <Box position="relative" zIndex={99} top={["-27vw"]}>
                  <Parallax
                    bgImage={tentacle.src}
                    strength={500}
                    bgImageStyle={{
                      position: "absolute",
                      width: "120vw",
                      height: "100vw",
                      objectFit: "cover",
                      transform: "translateY(-100vw)", // Adjust this value to control the vertical positioning of the image
                    }}
                  >
                    <Box
                      style={{ height: "143vw" }}
                      display={["flex", "none"]}
                    ></Box>
                  </Parallax>
                </Box>

                <SectionContent
                  title="what is the hashtank?"
                  content={[
                    "The HASHTANK is a collection of underwater creatures released in themed batches, each with its unique flavor. Each creature is a 100% unique non-fungible token (NFT) on the Ethereum blockchain.",
                    "These creatures consist of various mutation traits from the contaminated oceans. However, Mrs. Ching doesn't aim to dominate only web3; she desires to conquer the physical world as well.",
                    "Nurture your fish or turn them into the world's last fish sauces and redeem them as physical products.",
                    "The choice is yours, but be cautious; some fishes are definitely less edible than others...",
                    // "Oh wait, there wasn't any fish sauce left to begin with.",
                  ]}
                />
              </Box>
              <Box display={["flex", "none"]} height={["140vw"]} width="100%" />
              <Box
                width="100%"
                height={["70vw", "20vw"]}
                display={["flex", "none"]}
                alignItems="center"
                justifyContent="center"
              >
                <FishSlider />
              </Box>
            </Stack>
            <Box height={["9vw"]} width="100%" />
          </Stack>
        </Flex>
      </SectionLayout>
    </>
  );
};

export default BackgroundSection;
