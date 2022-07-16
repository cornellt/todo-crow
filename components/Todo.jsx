import { Checkbox, Box, Text, Button, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

export default function Todo(props) {
  const handleDelete = () => {
    props.delete(props.data.id);
  }

  return(
    <Box display='flex'>
      <Text my='auto'>{props.data.title}</Text>
      <Checkbox ml='3'></Checkbox>
      <IconButton mx='3' aria-label='Delete todo' colorScheme={'red'} onClick={handleDelete} icon={<DeleteIcon />} />
    </Box>)

}