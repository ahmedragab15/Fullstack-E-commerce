import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import type { IProduct } from "@/interface";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  const { title, description, thumbnail, price } = product;
  const { colorMode } = useColorMode();

  return (
    <Card.Root overflow="hidden" border={"1px solid #a8b5c8"} bg={"none"} _hover={{ shadow: "md" }} borderRadius="lg" boxShadow="base">
      <Image boxSize={200} objectFit={"cover"} mx={"auto"} mt={3} borderRadius={"full"} src={`${import.meta.env.VITE_IMG_URL}${thumbnail?.formats?.thumbnail?.url}`} alt={title} />
      <Card.Body spaceY="3">
        <Card.Title fontSize={"md"} textAlign={"center"}>
          {title}
        </Card.Title>
        <Card.Description fontSize={"sm"} textAlign={"center"}>
          {description}
        </Card.Description>
        <Text color={"purple.500"} textStyle="3xl" fontWeight="medium" textAlign={"center"} letterSpacing="tight" mt="2">
          ${price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button asChild variant="outline" bg={colorMode === "dark" ? "#9f7aea" : "#e6f3fd"} color={colorMode === "dark" ? "#e6f3fd" : "#9f7aea"} size={"xl"} border={"none"} py={5} overflow={"hidden"} w={"full"} mt={6} _hover={{ bg: colorMode === "dark" ? "#e6f3fd" : "#9f7aea", color: colorMode === "dark" ? "#9f7aea" : "white", border: "transparent" }}>
          <Link to={`/product/${encodeURIComponent(title)}`}>View Details</Link>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
export default ProductCard;
