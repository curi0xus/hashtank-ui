"use client";

import React, { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const fishData = [
  {
    id: 1,
    src: "/static/images/home/Example_Fish3.webp",
    mirror: true,
  },
  {
    id: 2,
    src: "/static/images/home/Example_Fish3.webp",
    mirror: true,
  },
  {
    id: 3,
    src: "/static/images/home/Example_Fish3.webp",
    mirror: true,
  },
  {
    id: 4,
    src: "/static/images/home/Example_Fish3.webp",
    mirror: true,
  },
];

// Function to generate random values within a range
const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const FishAnimation = () => {
  const [fishPositions, setFishPositions] = useState(
    fishData.map(() => ({
      x: getRandom(0, window.innerWidth * 0.58 - 100), // Aquarium width is 60vw
      y: getRandom(0, window.innerHeight * 0.3 - 100), // Aquarium height is 20vw
      directionX: Math.random() > 0.5 ? 1 : -1, // Random initial X direction
      directionY: Math.random() > 0.5 ? 1 : -1, // Random initial Y direction
    }))
  );

  // Function to randomly update fish direction and movement
  const moveFish = (index: number) => {
    setFishPositions((prev) =>
      prev.map((fish, i) => {
        if (i !== index) return fish;

        let { x, y, directionX, directionY } = fish;

        // Change direction if fish hits the aquarium boundaries
        if (x <= 0 || x >= window.innerWidth * 0.58 - 100) directionX *= -1; // 60vw width
        if (y <= 0 || y >= window.innerHeight * 0.3 - 100) directionY *= -1; // 20vw height

        return {
          x: x + directionX * getRandom(10, 50), // Random movement in X
          y: y + directionY * getRandom(10, 50), // Random movement in Y
          directionX,
          directionY,
        };
      })
    );
  };

  // Periodically move each fish with random intervals
  useEffect(() => {
    const intervalIds = fishPositions.map(
      (_, index) => setInterval(() => moveFish(index), getRandom(1000, 3000)) // Move fish at random intervals
    );

    return () => intervalIds.forEach(clearInterval); // Cleanup on unmount
  }, [fishPositions]);

  return (
    <Box
      position="relative" // Relative to the parent container
      width="100vw"
      height="100vh"
    >
      <Box
        // bg="#80808080"
        w="58vw"
        h="30vw"
        position="absolute" // Allows manual positioning
        top="12vw" // Adjust this to place the aquarium vertically
        left="20vw" // Adjust this to place the aquarium horizontally
        overflow="hidden"
        p={4}
        id="aquarium"
        // border="2px solid #FFFFFF" // Optional border to represent the aquarium
        borderRadius="md"
      >
        {fishPositions.map((fish, index) => (
          <MotionBox
            key={index}
            as={Image}
            src={fishData[index].src}
            position="absolute"
            animate={{
              x: fish.x,
              y: fish.y,
              scaleX: fish.directionX > 0 ? 1 : -1, // Flip horizontally based on direction
            }}
            transition={{
              ease: "linear",
              duration: 2,
            }}
            style={{
              width: "10vw", // Fish image width
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FishAnimation;
