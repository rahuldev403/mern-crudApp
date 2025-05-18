import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { useProductStore } from '../store/product'

const ProductCard = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const [updated, setUpdated] = useState(product)
  const { deleteProduct, updateProduct } = useProductStore()

  const handelDelete = async (id) => {
    const { success, message } = await deleteProduct(id)
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
    else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
  }
  const handelToast = () => {
    toast({
      title: "Sucess",
      description: "product updated successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }
  const textColor = useColorModeValue("gray.600", "gray.200")
  const bg = useColorModeValue("white", "gray.800")
  return (
    <Box shadow={'lg'} rounded={'lg'} overflow={'hidden'} transition={'all 0.3s'} _hover={{ transform: "translateY(-5px)", shadow: "xl" }} bg={bg} color={textColor} p={2}>
      <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} rounded={'lg'} />
      <Box>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize={"xl"} mb={4}>
          ${product.price}
        </Text>
        <HStack>
          <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
          <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={() => handelDelete(product._id)} />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              Update Product
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <Input placeholder='Product Name' name="name" value={updated.name} onChange={(e) => setUpdated({ ...updated, name: e.target.value })} />
                <Input placeholder='Price' name='price' type='number' value={updated.price} onChange={(e) => setUpdated({ ...updated, price: e.target.value })} />
                <Input placeholder='Image_URL' name='image' value={updated.image} onChange={(e) => setUpdated({ ...updated, image: e.target.value })} />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme='blue'
                mr={3}
                onClick={async () => {
                  const { success, message } = await updateProduct(product._id, updated);
                  if (success) {
                    handelToast();
                    onClose();
                  } else {
                    toast({
                      title: "Error",
                      description: message,
                      status: "error",
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                }}
              >
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  )
}

export default ProductCard
