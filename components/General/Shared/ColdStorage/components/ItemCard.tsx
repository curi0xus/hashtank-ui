import { Box, Button, Image, Text, Flex } from "@chakra-ui/react";

const ItemCard = ({ type, title, imageUrl, detailsLink, buttonText }: any) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="gray.800"
      color="white"
      p={4}
      textAlign="center"
    >
      <Image src={imageUrl} alt={title} />

      <Box p={4}>
        <Text fontSize="sm" color="orange.300" mb={2}>
          {type.toUpperCase()}
        </Text>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          {title}
        </Text>
        <Flex justify="space-between" mt={4} alignItems="center">
          <Text fontSize="sm">
            <a href={detailsLink}>details &gt;</a>
          </Text>
          <Text fontSize="sm">N/A</Text>
        </Flex>
      </Box>

      {buttonText && (
        <Button colorScheme="orange" mt={4}>
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default ItemCard;
