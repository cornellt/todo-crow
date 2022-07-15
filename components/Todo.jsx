import { useState } from "react";
import { Center, Box, Input, Text, Button, InputRightElement, VStack, HStack, Divider } from '@chakra-ui/react'

export default function Todo(props) {


  return(
    <Box>
      <Text>{props.data.title}<Button mx='3'>Delete</Button></Text>
    </Box>)

}