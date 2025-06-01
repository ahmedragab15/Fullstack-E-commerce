import { closeDrawer, selectGlobal } from "@/app/features/globalSlice";
import { Button, CloseButton, Drawer, Portal, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import CartDrawerItem from "./CartDrawerItem";
import { clearCart, selectCart } from "@/app/features/cartSlice";

const CartDrawer = () => {
  const { isOpen } = useSelector(selectGlobal);
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);
  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const renderCartItems = cartItems.map((item) => <CartDrawerItem key={item.documentId} {...item} />);

  return (
    <Drawer.Root open={isOpen} onOpenChange={(e) => !e.open && dispatch(closeDrawer())}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Shopping Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{renderCartItems.length ? renderCartItems : <Text>Cart is Empty</Text>}</Drawer.Body>
            <Drawer.Footer>
              <Button variant="surface" onClick={() => dispatch(closeDrawer())}>
                Cancel
              </Button>
              <Button variant={"subtle"} colorPalette={"red"} onClick={clearCartHandler}>
                Clear All
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
export default CartDrawer;
