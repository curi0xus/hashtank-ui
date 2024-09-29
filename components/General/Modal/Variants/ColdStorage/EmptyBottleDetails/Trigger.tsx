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
import EmptySauceThumbnail from "public/static/images/ColdStorage/EmptySauceThumbnail.webp";
import CloseIcon from "@/components/General/Icons/CloseIcon";

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
  name,
  image,
  redemptionLink,
  dropType,
  description,
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
          {/* {(isBreeding || isBroodFish) && (
            <Text
              h='fit-content'
              textAlign={'center'}
              fontWeight={'medium'}
              fontSize={['sm', 'xl', '2xl', '3xl', '4xl']}
              w='60%'
              position='absolute'
              zIndex={999}
              m='auto'
              top={0}
              right={0}
              left={0}
              bottom={0}
              textTransform={'uppercase'}
            >
              {isBroodFish
                ? hasOffspring
                  ? 'completed: success'
                  : 'completed: failure'
                : 'in breeding program'}
            </Text>
          )} */}

          <Box padding="10%">
            <Image
              width={100}
              height={100}
              style={{
                margin: "auto",
                width: "100%",
                height: "auto%",
              }}
              src={image}
              alt="Green double couch with wooden legs"
            />
          </Box>
        </Box>

        <Stack mt="6" spacing="0">
          <Text
            textTransform={"uppercase"}
            color="brand.900"
            fontWeight={"normal"}
            fontSize={["xs", "sm"]}
          >
            {dropType}
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
            {name}
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
    </Card>
  );
};
export default Trigger;
