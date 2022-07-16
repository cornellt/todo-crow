import { useState } from "react";
import { Checkbox, Box, Input, Text, Button, InputRightElement, VStack, HStack, Divider } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'


export default function Todo(props) {
  return(
    <Box display='flex'>
      <Text my='auto'>{props.data.title}</Text>
      <Checkbox ml='3'></Checkbox>
      <Button mx='3' colorScheme={'red'} onClick={props.delete} id={props.data.id}><DeleteIcon/></Button>
    </Box>)

}