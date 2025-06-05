import { Flex, Box, Input, Stack, Button, Heading, Text, Field, FieldHelperText } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { PasswordInput } from "@/components/ui/password-input";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schema";
import { selectRegister, userRegister } from "@/app/features/registerSlice";
import { toaster } from "@/components/ui/toaster";
import { useAppDispatch, useAppSelector } from "@/app/store";

interface IForm {
  email: string;
  password: string;
  username: string;
}

const Register = () => {
  const { colorMode } = useColorMode();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(registerSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(selectRegister);

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const resultAction = await dispatch(userRegister(data));
    if (userRegister.fulfilled.match(resultAction)) {
      toaster.success({
        title: "You registered successfully. Redirecting to login...",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else if (userRegister.rejected.match(resultAction)) {
      const errorMessage = resultAction.payload as string;
      toaster.error({
        title: errorMessage || "Register failed",
      });
    }
  };

  return (
    <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"} bg={useColorModeValue("gray.200", "gray.800")}>
      <Stack spaceX={8} mx={"auto"} minW={600} maxW={"xl"} py={12} px={6}>
        <Stack align={"center"} mb={5}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box asChild spaceY={4} rounded={"lg"} bg={useColorModeValue("white", "gray.900")} boxShadow={"xl"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Field.Root invalid={!!errors?.username}>
              <Field.Label>
                Username <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="Enter your Username" {...register("username")} />
              {errors?.username && (
                <FieldHelperText ml={1} color={"red.500"} fontSize={"xs"} fontWeight={"semibold"}>
                  {errors?.username?.message}
                </FieldHelperText>
              )}
            </Field.Root>
            
            <Field.Root invalid={!!errors?.email}>
              <Field.Label>
                Email <Field.RequiredIndicator />
              </Field.Label>
              <Input placeholder="Enter your Email" {...register("email")} />
              {errors?.email && (
                <FieldHelperText ml={1} color={"red.500"} fontSize={"xs"} fontWeight={"semibold"}>
                  {errors?.email?.message}
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
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text textAlign={"center"}>
                Already a user?
                <Link to={"/login"} style={{ color: "teal" }}>
                  {" "}
                  Login
                </Link>
              </Text>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Register;
