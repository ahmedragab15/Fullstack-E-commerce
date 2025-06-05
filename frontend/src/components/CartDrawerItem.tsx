import { removeFromCart } from "@/app/features/cartSlice";
import type { IProduct } from "@/interface";
import { Box, Button, Flex, HStack, Image,  Stack, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useColorModeValue } from "./ui/color-mode";
import { useAppDispatch } from "@/app/store";

const CartDrawerItem = (product: IProduct) => {
  const dispatch = useAppDispatch();

  const removeItemHandler = (product: IProduct) => {
    dispatch(removeFromCart(product));
  };

  const bg = useColorModeValue("gray.100", "gray.800");

  return (
    <Box p={3} rounded="lg" bg={bg} boxShadow="lg" borderBottom={"1px solid"} borderColor={useColorModeValue("gray.200","gray.600")} mb={5} overflowY={"auto"}>
      <Flex gap={4}>
        <Image src={`${product.thumbnail?.formats?.thumbnail?.url}`} alt={product.title} boxSize="80px" rounded="md" objectFit="cover" />
        <Stack spaceX={1} flex="1">
          <HStack justifyContent="space-between">
            <Text fontWeight="medium" fontSize="sm" lineClamp={2}>
              {product.title}
            </Text>
            <Text fontSize="sm" color="green.500">
              ${product.price}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            Quantity: {product.quantity}
          </Text>
          <Button onClick={() => removeItemHandler(product)} size="sm" variant="surface" colorPalette="red"  alignSelf="flex-start">
          <MdDelete/>  Remove
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default CartDrawerItem;
