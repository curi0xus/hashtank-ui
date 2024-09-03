import React, { useState } from "react";
import {
  Text,
  Flex,
  Box,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from "@chakra-ui/react";
import Image from "next/image";
import useToolTips from "@/hooks/useTooltips";

const HashtankTooltip = ({
  auctionTrigger = true,
  InstructionId = 0,
  storageKey,
  Trigger,
  title,
  Instruction,
  Icon,
  placement,
  offset,
  defaultIsOpen = false,
}: any) => {
  const { isSeen, setSeen } = useToolTips(storageKey);
  const [isTooltipOpen, setIsTooltipOpen] = useState(defaultIsOpen);

  async function onClose(e: any) {
    e.preventDefault();
    e.stopPropagation();
    await setSeen();
    setIsTooltipOpen(false);
  }

  function onOpen() {
    setIsTooltipOpen(true);
  }
  return isSeen ? (
    <Trigger />
  ) : (
    <Popover
      defaultIsOpen={defaultIsOpen}
      offset={offset}
      placement={placement}
      arrowShadowColor="0 4px 6px rgba(0, 0, 0, 0.1)"
      arrowSize={35}
      arrowPadding={25}
      isOpen={isTooltipOpen}
      onOpen={onOpen}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Box
          onMouseLeave={() => setIsTooltipOpen(auctionTrigger)}
          onMouseEnter={(e: any) => {
            setIsTooltipOpen(true);
          }}
        >
          <Trigger />
        </Box>
      </PopoverTrigger>
      {InstructionId === 0 && (
        <PopoverContent
          onMouseEnter={(e: any) => {
            setIsTooltipOpen(true);
          }}
          onMouseLeave={() => setIsTooltipOpen(auctionTrigger)}
          _focusVisible={{
            outline: "none",
          }}
          borderColor="#FFEE57"
          bg={"#FFEE57"}
          p={[2, 5]}
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          rounded={30}
          minWidth={[200, 550]}
          textColor={"black"}
        >
          <PopoverArrow bg={"#FFEE57"} />
          <Flex padding={"10px"}>
            <Box mt="10px" mr="10px" w={100} h={100}>
              <Image
                src={Icon}
                width={0}
                height={0}
                style={{ height: "auto", width: "100%" }}
                alt="notify"
              />
            </Box>
            <Box px={5}>
              <Text
                textTransform={"uppercase"}
                fontWeight={"bold"}
                fontSize={["md", "2xl"]}
              >
                {title}
              </Text>
              <Divider
                opacity={1}
                my={2}
                borderColor={"#FF530D"}
                borderWidth={2}
              />
              <Text
                minHeight={"104px"}
                fontSize={["sm", "md"]}
                fontWeight={"normal"}
              >
                <Instruction />
              </Text>
              <Text
                onClick={onClose}
                cursor={"pointer"}
                fontWeight={"bold"}
                fontSize={["md", "2xl"]}
                color="#FF530D"
                w="fit-content"
                float={"right"}
              >
                OK
              </Text>
            </Box>
          </Flex>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default HashtankTooltip;
