import { Box, Flex, Button, Stack, Menu, Center, Avatar, Portal, ClientOnly, Skeleton, IconButton, Heading, InputGroup, Input } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import type { ReactNode } from "react";
import CookieService from "@/services/CookieService";
import { openDrawer } from "@/app/features/cartDrawerSlice";
import { selectCart } from "@/app/features/cartSlice";
import { LuMoon, LuSearch, LuSun } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { MdOutlineShoppingCart } from "react-icons/md";

const NavItem = ({ children, to }: { to: string; children: ReactNode }) => {
  return (
    <Box
      asChild
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      <NavLink to={to}>{children}</NavLink>
    </Box>
  );
};

const Navbar = () => {
  const token = CookieService.get("jwt");
  const userName = CookieService.get("username");
  const onLogout = () => {
    CookieService.remove("jwt");
    location.reload();
  };
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector(selectCart);

  return (
    <>
      <Box bg={useColorModeValue("white", "black")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-evenly"}>
          <Flex alignItems={"center"} gap={8}>
            <Heading asChild fontSize={"2xl"} letterSpacing={"wide"}>
              <NavLink to={"/"}>SHOP.CO</NavLink>
            </Heading>
            <Flex alignItems={"center"} justifyContent={"space-evenly"} gap={4}>
              <NavItem to={"/"}>Shop</NavItem>
              <NavItem to={"/about"}>On Sale</NavItem>
              <NavItem to={"/products"}>New Arrival</NavItem>
              <NavItem to={"/dashboard"}>Brands</NavItem>
            </Flex>
          </Flex>

          <InputGroup flex="1" startElement={<LuSearch />} maxW={"md"}>
            <Input placeholder="Search for products..." rounded={"2xl"} bg={colorMode === "light" ? "#F0F0F0" : "gray.800"} border={"none"} />
          </InputGroup>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} alignItems={"center"} spaceX={5}>
              <ClientOnly fallback={<Skeleton boxSize="8" />}>
                <IconButton
                  onClick={toggleColorMode}
                  variant="outline"
                  size="md"
                  bg={colorMode === "light" ? "gray.50" : "gray.800"}
                  _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                >
                  {colorMode === "light" ? <LuSun /> : <LuMoon />}
                </IconButton>
              </ClientOnly>

              <Menu.Root>
                <Button
                  onClick={() => dispatch(openDrawer())}
                  bg={colorMode === "light" ? "gray.50" : "gray.800"}
                  color={colorMode === "light" ? "black" : "white"}
                  _hover={{ background: colorMode === "light" ? "gray.300" : "gray.700" }}
                >
                  <MdOutlineShoppingCart />({cartItems.length})
                </Button>

                {token ? (
                  <>
                    <Menu.Trigger asChild>
                      <Button rounded={"full"} variant={"outline"} cursor={"pointer"} minW={0} bg={colorMode === "light" ? "gray.50" : "gray.800"}>
                        <Avatar.Root>
                          <Avatar.Fallback name="Segun Adebayo" />
                          <Avatar.Image src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" />
                        </Avatar.Root>
                      </Button>
                    </Menu.Trigger>

                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content w={200} py={5}>
                          <Center>
                            <Avatar.Root>
                              <Avatar.Fallback name="Segun Adebayo" />
                              <Avatar.Image src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" />
                            </Avatar.Root>
                          </Center>
                          <br />
                          <Center>
                            <p>{userName || "username"}</p>
                          </Center>
                          <Menu.Separator />
                          <Menu.ItemGroup>
                            <Menu.ItemGroupLabel>Settings</Menu.ItemGroupLabel>
                            <Menu.Item value="Your Servers">Your Servers</Menu.Item>
                            <Menu.Item value="Account Settings">Account Settings</Menu.Item>
                            <Menu.Item value="Logout" onClick={onLogout}>
                              Logout
                            </Menu.Item>
                          </Menu.ItemGroup>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </>
                ) : (
                  <Flex alignItems={"center"}>
                    <NavItem to={"/register"}>Register</NavItem> /<NavItem to={"/login"}>Login</NavItem>
                  </Flex>
                )}
              </Menu.Root>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
