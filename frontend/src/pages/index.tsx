import { homaImages } from "@/components/images";
import { Box, Button, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";

const Home = () => {
  return (
    <main>
      <section>
        <Container
          maxW={"full"}
          minH={"100vh"}
          spaceY={5}
          py={20}
          px={28}
          bgRepeat={"no-repeat"}
          bgSize={"cover"}
          bgPos={{ sm: "right", lg: "center" }}
          bgImg={`url(${homaImages.heroImg})`}
          position={"relative"}
        >
          <Heading size="7xl" fontWeight={"bold"} maxW={"2xl"} pt={20} letterSpacing={"wide"} color={"#000"}>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </Heading>
          <Text maxW={"lg"} color={"#000"}>
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of
            style.
          </Text>
          <Button size={"lg"} bg={"#000"} color={"#fff"} px={14} rounded={"3xl"}>
            Shop Now
          </Button>
          <Flex gap={10}>
            <Box>
              <Text textStyle="3xl" color={"#000"}>
                200+
              </Text>
              <Text textStyle="lg" color={"gray"}>
                International Brands
              </Text>
            </Box>
            <Box>
              <Text textStyle="3xl" color={"#000"}>
                2,000+
              </Text>
              <Text textStyle="lg" color={"gray"}>
                High-Quality Products
              </Text>
            </Box>
            <Box>
              <Text textStyle="3xl" color={"#000"}>
                30,000+
              </Text>
              <Text textStyle="lg" color={"gray"}>
                Happy Customers
              </Text>
            </Box>
          </Flex>
          <Image src={homaImages.vectors.vectorBig} alt="vector" fit="contain" position={"absolute"} top={"20"} right={"10%"} zIndex={"sticky"} />
          <Image src={homaImages.vectors.vectorSmall} alt="vector" fit="contain" position={"absolute"} top={"50%"} right={"43%"} zIndex={"sticky"} />
        </Container>
        <Flex bg="#000" w="100%" minH={100} p="4" color="white" justifyContent={"space-evenly"} gap={6} flexWrap={"wrap"}>
          <Image src={homaImages.brands.brand1} alt="versace logo" fit="contain" />
          <Image src={homaImages.brands.brand2} alt="zara logo" fit="contain" />
          <Image src={homaImages.brands.brand3} alt="gucci logo" fit="contain" />
          <Image src={homaImages.brands.brand4} alt="prada logo" fit="contain" />
          <Image src={homaImages.brands.brand5} alt="calvin klein logo" fit="contain" />
        </Flex>
      </section>
    </main>
  );
};

export default Home;
