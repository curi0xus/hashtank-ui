import { Box, Image, keyframes } from "@chakra-ui/react";

// Define keyframes for subtle wavy swimming animations
const swimLeftToRight = keyframes`
  0% { transform: translate(100vw, 0); }
  10% { transform: translate(90vw, 1vw); }
  20% { transform: translate(80vw, -1vw); }
  30% { transform: translate(70vw, 1vw); }
  40% { transform: translate(60vw, -1vw); }
  50% { transform: translate(50vw, 1vw); }
  60% { transform: translate(40vw, -1vw); }
  70% { transform: translate(30vw, 1vw); }
  80% { transform: translate(20vw, -1vw); }
  90% { transform: translate(10vw, 1vw); }
  100% { transform: translate(-50%, 0); }
`;

const swimRightToLeft = keyframes`
  0% { transform: translate(100vw, 0); }
  10% { transform: translate(90vw, 1vw); }
  20% { transform: translate(80vw, -1vw); }
  30% { transform: translate(70vw, 1vw); }
  40% { transform: translate(60vw, -1vw); }
  50% { transform: translate(50vw, 1vw); }
  60% { transform: translate(40vw, -1vw); }
  70% { transform: translate(30vw, 1vw); }
  80% { transform: translate(20vw, -1vw); }
  90% { transform: translate(10vw, 1vw); }
  100% { transform: translate(-50%, 0); }
`;

// Generate random swim paths
const getRandomSwim = () => {
  const directions = [swimLeftToRight, swimRightToLeft];
  const sizes = ["100px", "120px", "80px", "150px"];
  const directionsIdx = Math.floor(Math.random() * directions.length);
  const sizeIdx = Math.floor(Math.random() * sizes.length);
  const randomDuration = Math.floor(Math.random() * 10) + 10; // Random duration between 10s and 20s

  // Determine if the current direction is swimRightToLeft
  const isRightToLeft = directions[directionsIdx] === swimRightToLeft;

  return {
    animation: `${directions[directionsIdx]} ${randomDuration}s linear infinite`,
    size: sizes[sizeIdx],
    position: Math.floor(Math.random() * 60) + 20 + "%", // Random vertical position between 20% and 80%
    rotation: isRightToLeft ? "rotateY(90deg)" : "rotateY(0deg)", // Rotate by 90 degrees for RightToLeft
  };
};

const SwimmingFish = () => {
  const fishData = [
    { src: "/static/images/home/Example_Fish3.webp", id: 1 },
    { src: "/static/images/home/Example_Fish3.webp", id: 2 },
    { src: "/static/images/home/Example_Fish3.webp", id: 3 },
    { src: "/static/images/home/Example_Fish3.webp", id: 4 },
    { src: "/static/images/home/Example_Fish3.webp", id: 5 },
  ];

  return (
    <Box position="relative">
      <Box
        position="absolute"
        top={["13vw"]}
        left={["20vw"]}
        w="60vw"
        h="30vw" // Define swimming area height
        overflow="hidden"
        bg="transparent"
      >
        {fishData.map((fish) => {
          const { animation, size, position, rotation } = getRandomSwim();
          return (
            <Image
              key={fish.id}
              src={fish.src}
              alt={`Fish ${fish.id}`}
              position="absolute"
              top={position}
              left={animation.includes("LeftToRight") ? "-100px" : "auto"}
              right={animation.includes("RightToLeft") ? "-100px" : "auto"}
              boxSize={size}
              animation={animation}
              transform={rotation} // Apply rotation on Y-axis (90 degrees for RightToLeft)
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default SwimmingFish;
