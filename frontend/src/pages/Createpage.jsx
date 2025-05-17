import { useProductStore } from '../store/product.js'
import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Createpage = () => {
  const toast = useToast()
  const [newProduct, setNewProduct] = useState(
    {
      name: "",
      price: "",
      image: ""
    }
  )

  const { createProduct } = useProductStore()

  const handelAddProduct = async () => {
    const { success, message } = await createProduct(newProduct)
    if (!success) {
      toast({
        title: "Error",
        description: "Product not created",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    else {
      toast({
        title: "Sucess",
        description: "Product created Successfully",
        Status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
   
  }

  return (
    <Container maxH={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"}>
          <VStack spacing={4}>
            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder='Price'
              name='price'
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder='Image URL'
              name='image'
              value={newProduct.image}
              onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button colorScheme='purple' onClick={handelAddProduct} w={"full"} border={"2px"} borderColor={"green.200"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Createpage
