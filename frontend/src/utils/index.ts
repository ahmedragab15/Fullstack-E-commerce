import { toaster } from "@/components/ui/toaster";
import type { IProduct } from "@/interface";

export const quantityHandler = (cartItems: IProduct[], addItem: IProduct) => {
  cartItems = cartItems.map((item) => ({ ...item, quantity: item.quantity || 1 }));
  const existItem = cartItems.find((item) => item.documentId === addItem.documentId);
  if (existItem) {
    toaster.success({
      title: "Item is Already in the cart",
      description: "Quantity has Increased",
    });
    return cartItems.map((item) => (item.documentId === addItem.documentId ? { ...item, quantity: item.quantity + 1 } : item));
  }
  toaster.success({
    title: "Item Added to cart Successfully",
  });
  return [...cartItems, { ...addItem, quantity: 1 }];
};
