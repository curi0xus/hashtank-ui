import React from "react";
import {
  Box,
  Text,
  Flex,
  VStack,
  HStack,
  Avatar,
  Progress,
  Button,
} from "@chakra-ui/react";
import TextBlock from "../General/Shared/TextBlock";
import Image from "next/image";
import CupidImage from "public/static/images/LoveSauceProgram/cupid.png";
import MrChingImage from "public/static/images/LoveSauceProgram/mr-ching.png";
import useLoveSauceProgram from "@/hooks/LoveSauceProgram/useLoveSauceProgram";
import HashTankCountdownTimer, {
  formatCountdownTime,
} from "@/components/CountdownTimer";
import useSelectedBroodFish from "@/hooks/LoveSauceProgram/useSelectedBroodFish";
import SendToProgramConfirmation from "../General/Modal/Variants/FishCard/SendToProgramConfirmation";
import { CloseIcon } from "@chakra-ui/icons";
import useGetTokenMetadata from "@/hooks/useGetTokenMetadata";
import useGetFishInLoveSauceProgram from "@/hooks/LoveSauceProgram/useGetFishInLoveSauceProgram";

const TEXTBLOCK_1_PARAGRAPHS = [
  "Help us repopulate the ocean and bring back life on Earth. It may not be the most unblemished, but a life is a life. Send your fish into the breeding tank for the potential to receive offspring to further your brood. Build your family of fish and nurture them, and they may pay off dividends before long.",
  "The program is closed for the moment, but we will be ready to open the tanks to you soon.",
];
const TEXTBLOCK_2_PARAGRAPHS = [
  "Every month (except in extenuating circumstances), our LoveSauce program opens for business with a limited capacity. You can submit up to 3 fish from your collection to join the program, to be locked into a breeding cycle for 30 days. At the end of this period, your fish is released back to you with the possibility of spawning an OFFSPRING fish that inherits some of the BROODFISH’s traits. The likelihood of this happening is determined by the fertility level of the BROODFISH.",

  "A fish can only be used as BROODFISH once, and an OFFSPRING cannot become a BROODFISH.",

  "An OFFSPRING can be minted into a sauce but it will never be able to achieve a premium sauce grade.",

  "If the breeding program does not get at least 50% full, it will not run.",
];

const SelectedBroodFishAvatar = ({ nftId }: any) => {
  const { image } = useGetTokenMetadata(String(nftId));
  const { removeSelectedBroodFish } = useSelectedBroodFish();

  const onClickHandler = () => {
    removeSelectedBroodFish(nftId);
  };

  return (
    <Box cursor={"pointer"} position="relative" onClick={onClickHandler}>
      <CloseIcon
        zIndex={999}
        cursor={"pointer"}
        fontSize="sm"
        color="brand.900"
        position={"absolute"}
        top={"5px"}
        right={"5px"}
      />
      <Avatar
        borderStyle={"solid"}
        borderWidth={"1px"}
        borderColor={"brand.700"}
        size="xl"
        bg="brand.600"
        src={image}
      />
    </Box>
  );
};

const PROGRAM_STATUS_TEXT = ["ACTIVE", "DISTRIBUTED"];

const LoveSauceProgramIntroduction = () => {
  const {
    currentLoveSauceProgramId,
    startAtTsInMs,
    endAtTsInMs,
    humanReadableStartTime,
    maxCohortSizeNumber,
    minCohortSizeNumber,
    status,
    isParticipantInLoveSauceBatch,
  } = useLoveSauceProgram();
  const { selectedBroodFishIds, totalFertility } = useSelectedBroodFish();
  const { fishInLoveSauceProgram } = useGetFishInLoveSauceProgram(
    currentLoveSauceProgramId
  );
  const fishEntered =
    selectedBroodFishIds.length || fishInLoveSauceProgram.length;
  const progressValue =
    fishEntered > 0 ? (fishEntered / maxCohortSizeNumber) * 100 : 0;
  const isProgramStarted =
    startAtTsInMs > 0 && startAtTsInMs <= new Date().getTime();
  const isProgramExpired =
    endAtTsInMs > 0 && endAtTsInMs <= new Date().getTime();

  const isDisabled =
    isParticipantInLoveSauceBatch ||
    totalFertility < 100 ||
    selectedBroodFishIds.length < minCohortSizeNumber ||
    !isProgramStarted ||
    isProgramExpired;

  const programStatusText = isProgramExpired
    ? "CLOSED"
    : PROGRAM_STATUS_TEXT[Number(status?.toString || "0") - 1];
  return (
    <Box
      p={[
        "0vh 7vw",
        "0vh 15vw",
        "0vh 15vw",
        "0vh 15vw 0vw 15vw",
        "0vh 16vw 0vw 16vw",
      ]}
    >
      <Flex
        flexDirection={["column", "row"]}
        alignItems={["center", "flex-start"]}
      >
        <Flex
          mt={["0", "10px", "10px", "10px", "10px"]}
          mr={["0", "48px", "48px", "48px", "48px"]}
          mb={["30px", 0]}
          flex={["1", "1"]}
        >
          <Avatar
            transformOrigin={"top right"}
            transform={["scale(1)", "scale(1.3)"]}
            src={MrChingImage.src}
            m="auto"
            minW={["100%", "100%"]}
            minH={["100%", "100%"]}
            height={["100%", "100%"]}
            width={["100%", "100%"]}
          />
        </Flex>
        <VStack flex="5" alignItems={"flex-start"}>
          <Box mb="50px">
            <TextBlock
              title="greetings, conservators"
              paragraphs={TEXTBLOCK_1_PARAGRAPHS}
            />
          </Box>
          <Box>
            <TextBlock
              title="how it works"
              paragraphs={TEXTBLOCK_2_PARAGRAPHS}
            />
          </Box>
        </VStack>
      </Flex>
      <Flex
        mt={["54px", "54px", "54px", "100px", "200px"]}
        mb={["54px", "54px", "54px", "54px", "54px"]}
        flexDirection={["column", "row"]}
      >
        <Flex
          display={["none", "flex"]}
          h="100%"
          m="auto 48px auto 0"
          direction={["row", "column"]}
          align={"flex-end"}
          flex={["2", "1"]}
        >
          <HStack>
            <Text
              color="white"
              fontWeight={"normal"}
              fontSize={["l", "xl", "2xl", "3xl", "4xl"]}
            >
              {fishEntered}
            </Text>
            <Text
              color="white"
              fontWeight={"normal"}
              fontSize={["xs", "s", "md", "l", "xl"]}
            >
              / {maxCohortSizeNumber}
            </Text>
          </HStack>
          {endAtTsInMs && (
            <HashTankCountdownTimer
              renderer={({ hours, minutes, seconds, completed }: any) => {
                return (
                  <Text
                    mt="0 !important"
                    color="brand.900"
                    fontWeight={"bold"}
                    fontSize={["xs", "s", "md", "l", "xl"]}
                  >
                    {formatCountdownTime(hours)}:{formatCountdownTime(minutes)}:
                    {formatCountdownTime(seconds)}
                  </Text>
                );
              }}
              date={endAtTsInMs}
            />
          )}
        </Flex>
        <VStack id="loveSauceProgramEnrolment" flex="7">
          <VStack alignItems={"flex-start"} width={"100%"}>
            <Text
              maxW={["80%", "100%"]}
              textTransform={"uppercase"}
              color="brand.900"
              fontWeight={"bold"}
              fontSize={["4xl", "2xl", "3xl", "4xl", "5xl"]}
            >
              PROGRAM #0{currentLoveSauceProgramId}{" "}
              {isProgramStarted ? programStatusText : ""}
            </Text>
            {startAtTsInMs && (
              <HashTankCountdownTimer
                renderer={({ hours, minutes, seconds, completed }: any) => {
                  if (completed) {
                    return (
                      <Text
                        color="white"
                        fontWeight={"normal"}
                        fontSize={["md", "s", "md", "l", "xl"]}
                      >
                        launched {humanReadableStartTime}
                      </Text>
                    );
                  }
                  return (
                    <Text
                      color="white"
                      fontWeight={"normal"}
                      fontSize={["md", "s", "md", "l", "xl"]}
                    >
                      Starting in {formatCountdownTime(hours)}:
                      {formatCountdownTime(minutes)}:
                      {formatCountdownTime(seconds)}
                    </Text>
                  );
                }}
                date={startAtTsInMs}
              />
            )}

            <Box
              m={["20px 0 0px 0 !important", "40px 0 40px 0 !important"]}
              h={["15px", "31px"]}
              w="100%"
              borderRadius={"50px"}
              borderWidth={1}
              p={["1px", "2px"]}
              borderColor={"brand.700"}
            >
              <Progress
                borderRadius={"50px"}
                background="none"
                w="100%"
                colorScheme="brand.900"
                height={["11px", "25px"]}
                value={progressValue}
              />
            </Box>

            <VStack
              w="100%"
              alignItems={"flex-end"}
              m="0"
              display={["flex", "none"]}
            >
              <HStack>
                <Text
                  color="white"
                  fontWeight={"normal"}
                  fontSize={["l", "xl", "2xl", "3xl", "4xl"]}
                >
                  {fishEntered}
                </Text>
                <Text
                  color="white"
                  fontWeight={"normal"}
                  fontSize={["md", "s", "md", "l", "xl"]}
                >
                  / {maxCohortSizeNumber}
                </Text>
              </HStack>
              {endAtTsInMs && (
                <HashTankCountdownTimer
                  renderer={({ hours, minutes, seconds, completed }: any) => {
                    return (
                      <Text
                        mt="0 !important"
                        color="brand.900"
                        fontWeight={"bold"}
                        fontSize={["xs", "s", "md", "l", "xl"]}
                      >
                        {formatCountdownTime(hours)}:
                        {formatCountdownTime(minutes)}:
                        {formatCountdownTime(seconds)}
                      </Text>
                    );
                  }}
                  date={endAtTsInMs}
                />
              )}
            </VStack>
          </VStack>
          <Flex flexDirection={["column", "row"]}>
            <Box
              mt={"36px"}
              mr={["24px"]}
              position={"relative"}
              minW="74px"
              h="74px"
              w="74px"
              mb={["22px", "0px"]}
            >
              <Image
                style={{ objectFit: "contain" }}
                fill={true}
                src={CupidImage}
                alt="cupid"
              />
            </Box>
            <VStack>
              <Text
                w="100%"
                textAlign={"left"}
                color="brand.900"
                fontWeight={"bold"}
                fontSize={["xl", "s", "md", "l", "xl"]}
              >
                MODIFIER - CUPID’S ARROW{" "}
              </Text>
              <Text fontWeight={"normal"} fontSize={["xs", "sm"]}>
                Love is in the water, and all the fish are extra star struck by
                their chosen partner. This month’s modifier allows a 5% chance
                to acquire TWO OFFSPRINGS instead of one at the end of the
                breeding period.
              </Text>
            </VStack>
          </Flex>
        </VStack>
      </Flex>
      <SendToProgramConfirmation
        Trigger={(props: any) => {
          return (
            <Button
              {...props}
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isDisabled) {
                  props.onClick();
                }
              }}
              display={"flex"}
              m="0 auto 154px auto"
              color="white"
              p={["0px", "30px 50px"]}
              _hover={{
                background: isDisabled ? "brand.600" : "white",
                color: isDisabled ? "white" : "brand.900",
              }}
              background={isDisabled ? "brand.600" : "brand.900"}
            >
              <Text
                textTransform={"uppercase"}
                fontWeight={"medium"}
                fontSize={["sm", "l", "xl"]}
              >
                {fishInLoveSauceProgram.length
                  ? `${fishInLoveSauceProgram.length} fish in program`
                  : status === 1
                  ? isProgramStarted
                    ? `Send ${fishEntered} Fish To Program`
                    : "Program starting soon..."
                  : "Preparing next program..."}
              </Text>
            </Button>
          );
        }}
      />
      <HStack flexWrap={"wrap"} maxW={"100%"} mb="50px" spacing={"30px"}>
        {selectedBroodFishIds.map((each: any) => (
          <SelectedBroodFishAvatar key={each} nftId={each} />
        ))}
      </HStack>
    </Box>
  );
};

export default LoveSauceProgramIntroduction;
