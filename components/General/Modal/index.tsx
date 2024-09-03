import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import ArrowBackIcon from "../Icons/ArrowBackIcon";
import useScreenOritentation from "@/hooks/useScreenOritentation";
import mobileCheck from "@/helpers/mobileCheck";

const MobileBackButton = ({ isDark, onClick, position }: any) => {
  return (
    <IconButton
      {...position}
      h="40px"
      w="40px"
      minHeight={"40px"}
      minWidth={"40px"}
      borderRadius={"100%"}
      borderWidth={"2px"}
      variant={"outline"}
      color={isDark ? "white" : "brand.800"}
      borderColor={isDark ? "white" : "brand.800"}
      onClick={onClick}
      _hover={{
        background: "none",
        color: "white",
      }}
      background="none"
      aria-label="Back Arrow"
      icon={<ArrowBackIcon fontSize={25} />}
    />
  );
};

const HTModal = ({
  closeModals,
  Trigger,
  Content,
  CallToAction,
  closeButtonType,
  bgColor,
  isDark,
  customSize,
  hideCloseButton,
  isRounded,
}: any) => {
  const { isLandscape } = useScreenOritentation();
  const isMobileLandscape = mobileCheck() && isLandscape;
  const [isNotMobile] = useMediaQuery(
    isMobileLandscape ? "(min-width: 480px)" : "(min-width: 850px)",
    // '(min-width: 850px)',
    {
      ssr: true,
      fallback: false,
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    if (isOpen) {
      document.getElementsByTagName("body")[0].style.cssText =
        "margin-right:0px !important";
    }
  }, [isOpen]);

  return (
    <>
      <Trigger ref={btnRef} onClick={onOpen} />
      <Modal
        blockScrollOnMount={true}
        scrollBehavior="inside"
        size={customSize || "3xl"}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={isRounded ? "40px" : "16px"}
          // minW={[undefined, 'fit-content !import']}
          minHeight={
            isNotMobile ? "fit-content !important" : "100vh !important"
          }
          maxW={isNotMobile ? undefined : "100vw !important"}
          css={{
            // minHeight: '100vh !important',
            padding: "0 !important",
            // borderRadius: '40px !important',
          }}
          position="relative"
          p="1"
          bg={bgColor || "brand.700"}
        >
          {isNotMobile && !hideCloseButton && (
            <>
              {closeButtonType === "hollow" && (
                <ModalCloseButton
                  color={isDark ? "white" : "brand.800"}
                  borderColor={isDark ? "white" : "brand.800"}
                  borderWidth={"2px"}
                  top="5"
                  right="5"
                  bg="none"
                  borderRadius={"100%"}
                />
              )}
              {closeButtonType === "filled" && (
                <ModalCloseButton
                  color={isDark ? "brand.800" : "white"}
                  top="5"
                  right="5"
                  bg={isDark ? "white" : "brand.800"}
                  borderRadius={"100%"}
                />
              )}
            </>
          )}
          <ModalBody
            css={{
              height: "fit-content",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              paddingInlineStart: 0,
              paddingInlineEnd: 0,
            }}
          >
            {!isNotMobile && (
              <MobileBackButton
                zIndex={9999}
                onClick={onClose}
                isDark={isDark}
                position={{ top: 5, left: 5 }}
              />
            )}
            <Content
              closeModalsList={[
                ...(closeModals?.length ? closeModals : []),
                onClose,
              ]}
            />
          </ModalBody>

          {CallToAction && (
            <CallToAction
              closeModalsList={[
                ...(closeModals?.length ? closeModals : []),
                onClose,
              ]}
            />
          )}
          {!isNotMobile && (
            <MobileBackButton
              zIndex={9999}
              onClick={onClose}
              isDark={isDark}
              position={{ marginLeft: 5, marginTop: 0, marginBottom: 5 }}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default HTModal;
