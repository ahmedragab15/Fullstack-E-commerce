import { Avatar, Box, CloseButton, Flex, HStack, VStack, Icon, Text, Drawer, DrawerContent, useDisclosure, Menu, type FlexProps, type BoxProps, Portal, Button, ClientOnly, Skeleton, IconButton } from "@chakra-ui/react";
import { FiHome, FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import type { IconType } from "react-icons/lib";
import { NavLink, Outlet } from "react-router-dom";
import { useColorMode, useColorModeValue } from "../../components/ui/color-mode";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { BsGrid3X3 } from "react-icons/bs";
import { LuMoon, LuSun } from "react-icons/lu";
import CookieService from "@/services/CookieService";

interface LinkItemProps {
  to: string;
  name: string;
  icon: IconType;
}

interface NavItemProps extends FlexProps {
  icon?: IconType;
  children: React.ReactNode;
  to: string;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, to: "/dashboard/" },
  { name: "Products", icon: HiOutlineViewColumns, to: "/dashboard/products" },
  { name: "Categories", icon: BsGrid3X3, to: "/dashboard/categories" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box transition="3s ease" bg={useColorModeValue("white", "gray.800")} borderRight="1px" borderRightColor={useColorModeValue("gray.200", "gray.700")} w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <NavItem to={"/"} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </NavItem>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem to={link.to} key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ to, icon, children, ...rest }: NavItemProps) => {
  return (
    <Box asChild style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <NavLink to={to}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "purple.500",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </NavLink>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const userName = CookieService.get("username");
    const onLogout = () => {
      CookieService.remove("jwt");
      location.reload();
    };
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex ml={{ base: 0, md: 60 }} px={{ base: 4, md: 4 }} height="20" alignItems="center" bg={useColorModeValue("white", "gray.900")} borderBottomWidth="1px" borderBottomColor={useColorModeValue("gray.200", "gray.700")} justifyContent={{ base: "space-between", md: "flex-end" }} {...rest}>
      <Button display={{ base: "flex", md: "none" }} onClick={onOpen} variant="outline" aria-label="open menu">
        <FiMenu />
      </Button>
      <NavItem to={"/"} display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </NavItem>

      <HStack spaceX={{ base: "0", md: "6" }}>
        <ClientOnly fallback={<Skeleton boxSize="8" />}>
          <IconButton onClick={toggleColorMode} variant="outline" size="md" _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.600" }}>
            {colorMode === "light" ? <LuSun /> : <LuMoon />}
          </IconButton>
        </ClientOnly>
        <Button size="lg" variant="ghost" aria-label="open menu">
          <FiBell />
        </Button>

        <Flex alignItems={"center"}>
          <Menu.Root>
            <Menu.Trigger py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar.Root>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src="https://bit.ly/sage-adebayo" />
                </Avatar.Root>
                <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spaceY="1px" ml="2">
                  <Text fontSize="sm">{userName || "userName"} </Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </Menu.Trigger>

            <Portal>
              <Menu.Positioner>
                <Menu.Content w={200} py={5} bg={useColorModeValue("white", "gray.900")} borderColor={useColorModeValue("gray.200", "gray.700")}>
                  <Menu.ItemGroup>
                    <Menu.Item value="profile">profile</Menu.Item>
                    <Menu.Item value="Settings">Settings</Menu.Item>
                    <Menu.Item value="Billing">Billing</Menu.Item>
                    <Menu.Item value="Sign out" onClick={onLogout}>
                      Sign out
                    </Menu.Item>
                  </Menu.ItemGroup>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Flex>
      </HStack>
    </Flex>
  );
};

const DashboardSidebar = () => {
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")} overflowX={"hidden"}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer.Root open={open} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer.Root>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardSidebar;
