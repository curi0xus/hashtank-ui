// components/FishSlider.js
import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import fishImage from "@/public/static/images/Home/Example_Fish1.webp";
import fishImage2 from "@/public/static/images/Home/Example_Fish2.webp";
import fishImage3 from "@/public/static/images/Home/Example_Fish3.webp";
import fishImage4 from "@/public/static/images/Home/Example_Fish4.webp";

const images = [fishImage, fishImage2, fishImage3, fishImage4];

const FishSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const arrowSize = useBreakpointValue({ base: "4vw", md: "5vw" });
  return (
    <Box
      position="relative"
      width={["100vw", "50vw"]}
      height={["100vw", "30vw"]}
      overflow="hidden"
      background="radial-gradient(circle, rgba(116, 152, 201, 1) 0%, rgba(204,204,204,0) 55%)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 1 }}
      >
        <Box
          width={["60vw", "22.5vw"]}
          height={["60vw", "22.5vw"]}
          position="relative"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            objectFit="cover"
            layout="fill"
          />
        </Box>
      </motion.div>

      <IconButton
        aria-label="Previous Slide"
        icon={<MdKeyboardArrowLeft />}
        position="absolute"
        left="5px"
        top="50%"
        transform="translateY(-50%)"
        // size={arrowSize}
        onClick={prevSlide}
        zIndex="2"
        color="#FF530D"
        background="transparent"
        fontSize="10vw"
        fontWeight="0.4vw"
        _hover={{
          background: "none",
          color: "white",
        }}
        height="0"
      />

      <IconButton
        aria-label="Next Slide"
        icon={<MdKeyboardArrowRight />}
        position="absolute"
        right="5px"
        top="50%"
        transform="translateY(-50%)"
        // size={arrowSize}
        onClick={nextSlide}
        zIndex="2"
        color="#FF530D"
        background="transparent"
        fontSize="10vw"
        _hover={{
          background: "none",
          color: "white",
        }}
        height="0"
      />
    </Box>
  );
};

export default FishSlider;
