import ErrorMessage from "@/components/ErrorMessage";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { axiosInstance } from "@/config/fetchApi";
import type { IProduct } from "@/interface";
import { Container, Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const Products = () => {
  const getProductList = async () => {
    try {
      const { data, status } = await axiosInstance.get("/products?populate=thumbnail&populate=category");
      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });
  
  if (isLoading)
    return (
      <Grid templateColumns="repeat(auto-fill, minmax(300px,1fr))" justifyItems={"center"} gap="6" margin={30}>
        {Array.from({ length: 16 }, (_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </Grid>
    );
  if (error) return <ErrorMessage error={error} />;

  return (
    <Container>
      <Grid templateColumns="repeat(auto-fill, minmax(300px,1fr))" gap="6" margin={30}>
        {data?.data.map((product: IProduct) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </Grid>
    </Container>
  );
};
export default Products;
