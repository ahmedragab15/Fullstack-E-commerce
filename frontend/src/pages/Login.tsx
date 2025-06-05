import { Flex, Box, Input, Stack, Button, Heading, Text, Field, Checkbox, FieldHelperText } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { PasswordInput } from "@/components/ui/password-input";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema";
import { selectLogin, userLogin } from "@/app/features/loginSlice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { toaster } from "@/components/ui/toaster";

interface IForm {
  identifier: string;
  password: string;
}

const Login = () => {
  const { colorMode } = useColorMode();
  const { isLoading } = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const resultAction = await dispatch(userLogin(data));
    if (userLogin.fulfilled.match(resultAction)) {
      toaster.success({
        title: "Logging in...",
      });
      setTimeout(() => {
        window.location.href = "/";
      })
    } else if (userLogin.rejected.match(resultAction)) {
      const errorMessage = resultAction.payload as string;
      toaster.error({
        title: errorMessage || "Login failed",
      });
    }
  };

  return (
    <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"} bg={useColorModeValue("gray.200", "gray.800")}>
      <Stack spaceX={8} mx={"auto"} minW={600} maxW={"xl"} py={12} px={6}>
        <Stack align={"center"} mb={5}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>
        <Box asChild spaceY={4} rounded={"lg"} bg={useColorModeValue("white", "gray.900")} boxShadow={"xl"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field.Root invalid={!!errors?.identifier}>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="Enter your Email" {...register("identifier")} />
              {errors?.identifier && (
                <FieldHelperText ml={1} color={"red.500"} fontSize={"xs"} fontWeight={"semibold"}>
                  {errors?.identifier?.message}
                </FieldHelperText>
              )}
            </Field.Root>

            <Field.Root invalid={!!errors?.password}>
              <Field.Label>
                Password <Field.RequiredIndicator />
              </Field.Label>
              <PasswordInput placeholder="Enter you Password" {...register("password")} />
              {errors?.password && (
                <FieldHelperText ml={1} color={"red.500"} fontSize={"xs"} fontWeight={"semibold"}>
                  {errors?.password?.message}
                </FieldHelperText>
              )}
            </Field.Root>
            <Stack direction={{ base: "column", sm: "row" }} mt={2} justify={"space-between"}>
              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Remember me</Checkbox.Label>
              </Checkbox.Root>
              <Text color={"blue.500"}>Forgot password?</Text>
            </Stack>

            <Stack spaceX={10} pt={2}>
              <Button
                type="submit"
                loading={isLoading}
                loadingText="Submitting"
                size="lg"
                bg={colorMode === "light" ? "blue.500" : "purple.500"}
                color={"white"}
                _hover={{
                  background: colorMode === "light" ? "blue.600" : "purple.600",
                }}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text textAlign={"center"}>
                Create a new account
                <Link to={"/sign"} style={{ color: "teal" }}>
                  {" "}
                  SignUp
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Login;
