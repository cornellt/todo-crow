import { useState } from "react";
import { Center, Box, Input, Text, Button, InputRightElement, VStack, HStack, Divider } from '@chakra-ui/react'

export default function Todo(props) {



  return(
    <Box display='flex'>
      <Text my='auto'>{props.data.title}</Text>
      <Button mx='3' colorScheme={'red'} onClick={props.delete} id={props.data.id}>Delete</Button>
      
    </Box>)

}