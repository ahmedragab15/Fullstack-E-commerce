import { addToCart } from "@/app/features/cartSlice";
import ErrorMessage from "@/components/ErrorMessage";
import ProductDetailsSkeleton from "@/components/ProductDetailsSkeleton";
import { useColorMode } from "@/components/ui/color-mode";
import { axiosInstance } from "@/config/fetchApi";
import type { IProduct } from "@/interface";
import { Box, Button, Card, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BsArrowLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const getProduct = async () => {
    try {
      const { data } = await axiosInstance.get(`/products/?populate=category&populate=thumbnail&fields=title,price,description,documentId&filters[slug][$eq]=${slug!}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading, data, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: getProduct,
    enabled: !!slug,
  });

  const goBack = () => navigate(-1);

  const addToCartHandler = () => {
    dispatch(addToCart(data?.data[0]));
  };

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!data?.data || data.data.length === 0) {
    return <PageNotFound />;
  }

  return (
    <>
      <Flex alignItems={"center"} maxW={"sm"} my={7} mx={"auto"} fontSize={"lg"} cursor={"pointer"} onClick={goBack}>
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Card.Root maxW={"sm"} mx={"auto"} mb={20} border={"1px solid #a8b5c8"} bg={"none"}>
        {data?.data.map((item: IProduct) =>
          item ? (
            <Box divideY="1px">
              <Card.Body key={item.documentId} spaceY="3">
                <Image src={`${item.thumbnail?.formats?.thumbnail?.url}`} alt={item.title} borderRadius={"lg"} h={200} maxW={"full"} objectFit={"contain"} />
                <Stack mt={6} spaceY={3}>
                  <Heading textAlign={"center"}>{item.title}</Heading>
                  <Text textAlign={"center"}>{item.description}</Text>
                  <Text color={"purple.500"} fontSize={"2xl"} textAlign={"center"}>
                    {item.category.title}
                  </Text>
                  <Text color={"purple.500"} fontSize={"2xl"} textAlign={"center"}>
                    ${item.price}
                  </Text>
                </Stack>
              </Card.Body>

              <Card.Footer>
                <Button variant="solid" onClick={addToCartHandler} bg={colorMode === "dark" ? "#9f7aea" : "#e6f3fd"} color={colorMode === "dark" ? "#e6f3fd" : "#9f7aea"} size={"lg"} textTransform={"uppercase"} p={8} border={"none"} py={5} overflow={"hidden"} w={"full"} mt={6} _hover={{ bg: colorMode === "dark" ? "#e6f3fd" : "#9f7aea", color: colorMode === "dark" ? "#9f7aea" : "white", border: "transparent" }}>
                  Add to cart
                </Button>
              </Card.Footer>
            </Box>
          ) : (
            <Text textAlign="center">No product found.</Text>
          )
        )}
      </Card.Root>
    </>
  );
};

export default ProductDetails;
