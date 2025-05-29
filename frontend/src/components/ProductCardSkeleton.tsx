import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Box w={"full"} padding={6} boxShadow={"lg"} bg={"gray.600"} rounded={"lg"}>
      <SkeletonCircle size={40} mx={"auto"} />
      <SkeletonText mt={4} w={20} noOfLines={1} mx={"auto"} />
      <SkeletonText mt={4} noOfLines={1} />
      <Flex justifyContent={"space-between"} gap={20}>
        <SkeletonText mt={4} w={"full"} noOfLines={1} />
        <SkeletonText mt={4} w={"full"} noOfLines={1} />
      </Flex>
      <Flex justifyContent={"space-between"} gap={20}>
        <SkeletonText mt={4} w={"full"} noOfLines={1} />
        <SkeletonText mt={4} w={"full"} noOfLines={1}  />
      </Flex>
      <SkeletonText mt={4} noOfLines={1} />
    </Box>
  );
};

export default ProductCardSkeleton;
