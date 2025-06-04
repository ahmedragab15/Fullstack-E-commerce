import { Alert, Box, Button, CloseButton, Flex } from "@chakra-ui/react";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IErrorData {
  error: {
    message: string;
    name: string;
    details?: Record<string, unknown>;
    status?: number;
  };
}

type TError = FetchBaseQueryError | SerializedError;

const ErrorMessage = ({ error }: { error: TError }) => {
  const [isVisible, setIsVisible] = useState(true);
  if (!error || !isVisible) return null;

  let status: number | undefined;
  let message = "Something went wrong.";

  if ("status" in error && typeof error.status === "number") {
    status = error.status;
    const errData = error.data as IErrorData;
    message = errData?.error?.message || message;
  } else if ("message" in error) {
    message = error.message || message;
  }

  return (
    <Box py={4}>
      <Alert.Root status="error" variant={"solid"} borderRadius={"md"} bg={"red.50"} color={"red.800"} boxShadow={"md"} p={4}>
        <Flex w="full" justify="space-between" align="start">
          <Box>
            <Flex align="center" gap={2} mb={1}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title fontSize="lg" fontWeight="bold">
                  {status ? `Error ${status}` : "Error"}
                </Alert.Title>
                <Alert.Description fontSize="sm">{message}</Alert.Description>
              </Alert.Content>
            </Flex>
          </Box>
          <Box spaceX={2}>
            <Button asChild variant={"surface"} color={"white"}>
              <Link to="/" reloadDocument>
                Go Back to Home
              </Link>
            </Button>
            <Button asChild variant={"outline"} color={"black"} _hover={{ bg: "black", color: "white" }}>
              <Link to="." reloadDocument>
                Refresh the Page
              </Link>
            </Button>
            <CloseButton alignSelf="start" position="relative" top={0} onClick={() => setIsVisible(false)} />
          </Box>
        </Flex>
      </Alert.Root>
    </Box>
  );
};

export default ErrorMessage;