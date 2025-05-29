import ProductDetailsSkeleton from "@/components/ProductDetailsSkeleton";
import { useColorMode } from "@/components/ui/color-mode";
import { axiosInstance } from "@/config/fetchApi";
import type { IProduct } from "@/interface";
import { Box, Button, Card, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const getProduct = async () => {
    const encodedSlug = encodeURIComponent(slug!);
    try {
      const { data } = await axiosInstance.get(`/products/?populate=category&populate=thumbnail&filters[title][$eq]=${encodedSlug}`);
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

  if (isLoading) return <ProductDetailsSkeleton />;
  if (error) return <h3>{error?.message}</h3>;

  console.log(data);

  return (
    <>
      <Flex alignItems={"center"} maxW={"sm"} my={7} fontSize={"lg"} cursor={"pointer"} onClick={goBack}>
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Card.Root maxW={"sm"} mx={"auto"} mb={20} border={"1px solid #a8b5c8"} bg={"none"}>
        {data?.data.map((item: IProduct) => (
          <Box divideY="1px">
            <Card.Body key={item.documentId}>
              <Image
                src={`${import.meta.env.VITE_IMG_URL}${item.thumbnail?.formats?.thumbnail?.url}`}
                alt={item.title}
                borderRadius={"lg"}
                h={200}
                maxW={"full"}
                objectFit={"contain"}
              />
              <Stack mt={6} spaceY={3}>
                <Heading textAlign={"center"}>{item.title}</Heading>
                <Text textAlign={"center"}>{item.description}</Text>
                <Text color={"blue.100"} fontSize={"2xl"} textAlign={"center"}>
                  {item.category.title}
                </Text>
                <Text color={"blue.300"} fontSize={"2xl"} textAlign={"center"}>
                  ${item.price}
                </Text>
              </Stack>
            </Card.Body>

            <Card.Footer>
              <Button variant="solid" onClick={() => {}} bg={colorMode === "dark" ? "#9f7aea" : "#e6f3fd"} color={colorMode === "dark" ? "#e6f3fd" : "#9f7aea"} size={"lg"} textTransform={"uppercase"} p={8} border={"none"} py={5} overflow={"hidden"} w={"full"} mt={6} _hover={{ bg: colorMode === "dark" ? "#e6f3fd" : "#9f7aea", color: colorMode === "dark" ? "#9f7aea" : "white", border: "transparent" }}>
                Add to cart
              </Button>
            </Card.Footer>
          </Box>
        ))}
      </Card.Root>
    </>
  );
};

export default ProductDetails;
