"use client";

import React, { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const fishData = [
  {
    id: 1,
    src: "/static/images/home/Example_Fish3.webp",
  },
  {
    id: 2,
    src: "/static/images/home/Example_Fish3.webp",
  },
  {
    id: 3,
    src: "/static/images/home/Example_Fish3.webp",
  },
  {
    id: 4,
    src: "/static/images/home/Example_Fish3.webp",
  },
];

// Function to generate random values within a range
const getRandom = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const FishAnimation = () => {
  const aquariumWidth = window.innerWidth * 0.58; // 60vw
  const aquariumHeight = window.innerHeight * 0.3; // 30vh
  const fishSize = 10; // Fish size in vw

  const [fishPositions, setFishPositions] = useState(
    fishData.map(() => ({
      x: getRandom(-fishSize, aquariumWidth), // Fish start within the aquarium
      y: getRandom(-fishSize, aquariumHeight),
      directionX: 1, // Start moving to the right
      directionY: 1, // Start moving downwards
      outOfViewX: false, // Track if fish is out of view on X axis
      outOfViewY: false, // Track if fish is out of view on Y axis
    }))
  );

  // Function to randomly update fish direction and movement
  const moveFish = (index: number) => {
    setFishPositions((prev) =>
      prev.map((fish, i) => {
        if (i !== index) return fish;

        let { x, y, directionX, directionY, outOfViewX, outOfViewY } = fish;

        // Move the fish
        const newX = x + directionX * getRandom(10, 50);
        const newY = y + directionY * getRandom(10, 50);

        // Check if fish is out of view (beyond the aquarium's boundaries)
        const isOutOfXView = newX <= -fishSize || newX >= aquariumWidth;
        const isOutOfYView = newY <= -fishSize || newY >= aquariumHeight;

        // Only flip the direction once the fish is fully out of view
        if (!outOfViewX && isOutOfXView) {
          directionX *= -1; // Flip X direction when out of view
          outOfViewX = true; // Mark X as out of view
        }
        if (!outOfViewY && isOutOfYView) {
          directionY *= -1; // Flip Y direction when out of view
          outOfViewY = true; // Mark Y as out of view
        }

        // Reset the outOfView flag once the fish re-enters the aquarium
        if (outOfViewX && !isOutOfXView) {
          outOfViewX = false;
        }
        if (outOfViewY && !isOutOfYView) {
          outOfViewY = false;
        }

        return {
          x: newX,
          y: newY,
          directionX,
          directionY,
          outOfViewX,
          outOfViewY,
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
        w="58vw"
        h="30vw"
        position="absolute" // Allows manual positioning
        top="12vw" // Adjust this to place the aquarium vertically
        left="20vw" // Adjust this to place the aquarium horizontally
        overflow="hidden"
        p={4}
        id="aquarium"
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
              width: `${fishSize}vw`, // Fish image width
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FishAnimation;
