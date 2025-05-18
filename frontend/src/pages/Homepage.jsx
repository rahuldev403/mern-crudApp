import ProductCard from '../components/productCard.jsx'
import { useProductStore } from '../store/product.js'
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  const { fetchProducts, products } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <Container maxW="100vw" p={4}>
      <VStack>
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontWeight='extrabold'
          fontSize={{ base: "27", sm: "34" }}
        >
          Current Products 👇
        </Text>
        <SimpleGrid columns={{
          base: 1, md: 2, lg: 3
        }}
        spacing={6}
        
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length == 0 && (
          <Text fontSize="xl" textAlign={"center"} fontWeight={"bold"} color={
            "gray.500"
          }>
            No products found 👎
            <Link to={"/create"}>
              <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}>
                Create a Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default Homepage
