import { Link, useLocation } from "react-router-dom";
import { Button,  Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";

interface IProps {
  statusCode?: number;
  title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Server Error" }: IProps) => {
  const { pathname } = useLocation();

  return (
    <Flex position="fixed" inset={0} align="center" justify="center" p={5} w="full" bg="gray.50" _dark={{ bg: "gray.800" }}>
      <Stack textAlign="center" spaceX={6}>
        <Flex align="center" justify="center" bg="red.100" rounded="full" p={4} w="fit-content" mx="auto">
          <Flex bg="red.200" p={4} rounded="full">
            <Icon as={FiAlertTriangle} w={16} h={16} color="red.600" />
          </Flex>
        </Flex>

        <Heading fontSize={["2xl", "3xl", "4xl"]} fontWeight="bold">
          {statusCode} - {title}
        </Heading>

        <Text fontSize={["md", "lg"]}>
          Oops, something went wrong. Try to refresh this page or <br />
          feel free to contact us if the problem persists.
        </Text>

        <Flex gap={4} justify="center" flexWrap="wrap">
          <Button asChild colorScheme="blue">
            <Link to="/" reloadDocument>
              Home
            </Link>
          </Button>
          <Button asChild colorScheme="blue">
            <Button asChild colorScheme="blue">
              <Link to={pathname} reloadDocument>
                Refresh
              </Link>
            </Button>
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default ErrorHandler;
