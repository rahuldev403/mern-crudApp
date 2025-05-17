import { Container, Flex, HStack, Text, Button, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{
        base: "column"
        , sm: "row"
      }} >
        <Text
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontWeight='extrabold'
          fontSize={{ base: "22", sm: "28" }}
        >
          <Link to={"/"}> Product store 🛒 </Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              ➕
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "🌙" : "☀️"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
