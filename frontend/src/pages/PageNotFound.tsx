import { Link } from "react-router-dom";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

const PageNotFound = () => {
  return (
    <Flex position="fixed" inset={0} align="center" justify="center" w="100vw" h="100vh" p={4} bg="gray.50" _dark={{ bg: "gray.800" }}>
      <Box>
        <Flex direction="column" align="center" justify="center" py={[12, 24, 32]}>
          <Heading fontSize="9xl" color="blue.500" fontWeight="bold" mb={10}>
            404
          </Heading>

          <Text fontSize={["2xl", "3xl"]} fontWeight="bold" textAlign="center" mb={2}>
            <Text as="span" color="red.500">
              Oops!
            </Text>{" "}
            Page not found
          </Text>

          <Text textAlign="center" fontSize={["md", "lg"]} mb={4}>
            The page you’re looking for doesn’t exist.
          </Text>

          <Button asChild colorScheme="blue">
            <Link to="/" reloadDocument>
              Go Home
            </Link>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default PageNotFound;
