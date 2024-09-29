import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Box,
  Text,
  Divider,
  Flex,
  Button,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import Image from "next/image";
import HTModal from "@/components/General/Modal";
import CallToAction from "./CallToAction";
import Content from "./Content";
import CloseIcon from "@/components/General/Icons/CloseIcon";
import TshirtThumbnail from "public/static/images/ColdStorage/TshirtThumbnail.webp";

const Trigger = ({
  specialColor,
  borderColor,
  isDark,
  textColor,
  bgColor,
  onClick,
  isDisabled,
  isSelected,
  isBreeding,
  isOffSpring,
  isBroodFish,
  buttonText,
  hasOffspring,
  hasNoHistory,
  ...props
}: any) => {
  const [isNotMobile] = useMediaQuery("(min-width: 480px)", {
    ssr: true,
    fallback: false,
  });
  return (
    <Card
      cursor={"pointer"}
      onClick={onClick}
      {...props}
      h="fit-content"
      m="25px 0"
      w={["45%", "45%", "30%", "30%", "22%"]}
      color="white"
      background="none"
      shadow={"none"}
      maxW="sm"
    >
      <CardBody p={0} flex="none">
        <Box
          position="relative"
          height="100%"
          borderRadius={"20px"}
          background={"#9A9FB0"}
        >
          {isSelected && (
            <IconButton
              _hover={{
                background: "none",
                color: "brand.800",
              }}
              onClick={(e: any) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("deselect");
              }}
              top={[1, 3]}
              right={[1, 3]}
              position="absolute"
              color="brand.800"
              background="none"
              aria-label="Back Arrow"
              icon={<CloseIcon fontSize={[18, 25]} />}
            />
          )}

          <Box padding="10%">
            <Image
              style={{
                margin: "auto",
                width: "100%",
                height: "auto%",
              }}
              src={TshirtThumbnail}
              alt="Green double couch with wooden legs"
            />
          </Box>
        </Box>

        <Stack mt="6" spacing="0">
          <Text color="brand.900" fontWeight={"normal"} fontSize={["xs", "sm"]}>
            RELIC
          </Text>
          <Text
            maxW={["100%", "100%", "100%", "100%", "80%"]}
            mb="5px"
            color="brand.900"
            mt={["0px !important", "0px !important"]}
            textTransform={"uppercase"}
            fontWeight={"normal"}
            fontSize={["sm", "xl"]}
          >
            NOUNS HERMIT CRAB LONG SLEEVE SHIRT
          </Text>
          <Divider opacity={1} borderBottomWidth={2} borderColor={"white"} />
          <Flex
            m={["10px 0 15px 0"]}
            flexDirection={["column", "row"]}
            justifyContent="space-between"
          >
            {isNotMobile && (
              <Text
                {...props}
                cursor={"pointer"}
                decoration={"underline"}
                fontWeight={"normal"}
                fontSize={["sm", "md"]}
              >
                details {">"}
              </Text>
            )}
            <Text
              textAlign={["right", "left"]}
              fontWeight={"normal"}
              fontSize={["sm", "md"]}
            >
              N/A
            </Text>
          </Flex>
          <Divider opacity={1} borderBottomWidth={2} borderColor={"white"} />
        </Stack>
      </CardBody>
      <CardFooter mt="25px" w="100%" p="0" justifyContent={"center"}>
        {isBreeding ? (
          <Button
            disabled={isDisabled}
            w={["100%"]}
            p={["0", "30px 50px"]}
            _hover={{
              background: isDisabled ? "brand.600" : "white",
              color: isDisabled ? "white" : "brand.900",
            }}
            background={isDisabled ? "brand.600" : "brand.900"}
          >
            <Text
              textTransform={"uppercase"}
              fontWeight={"medium"}
              fontSize={["md", "lg", "xl"]}
            >
              {buttonText}
            </Text>
          </Button>
        ) : (
          <HTModal
            bgColor={bgColor}
            CallToAction={CallToAction}
            closeButtonType="hollow"
            Content={(props: any) => (
              <Content
                specialColor={specialColor}
                hasNoHistory={hasNoHistory}
                borderColor={borderColor}
                textColor={textColor}
                {...props}
              />
            )}
            Trigger={(props: any) => (
              <Button
                color="white"
                {...props}
                onClick={(e: any) => {
                  e.stopPropagation();
                  e.preventDefault();
                  props.onClick(e);
                }}
                w={["100%"]}
                p={["0", "30px 50px"]}
                _hover={{
                  background: "white",
                  color: "brand.900",
                }}
                background={"brand.900"}
              >
                <Text
                  textTransform={"uppercase"}
                  fontWeight={"medium"}
                  fontSize={["md", "lg", "xl"]}
                >
                  redeem item
                </Text>
              </Button>
            )}
          />
        )}
      </CardFooter>
    </Card>
  );
};
export default Trigger;
