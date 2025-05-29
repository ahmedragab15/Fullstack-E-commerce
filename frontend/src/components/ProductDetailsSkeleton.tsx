import { Box,  Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductDetailsSkeleton = () => {
  return (
    <Box maxW={"sm"} mx={"auto"} mt={40} bg={"gray.700"} p={5} rounded={"md"}>
      <Skeleton height={200} />
      <SkeletonText mt={4} w={20} noOfLines={1} mx={"auto"} maxW={200} />
      <SkeletonText mt={4} noOfLines={1} />
      <SkeletonText mt={4} w={"full"} noOfLines={1} />
      <Skeleton mt={4} height={50} w={"full"} rounded={"lg"} />
    </Box>
  );
};

export default ProductDetailsSkeleton;
