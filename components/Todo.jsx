import { Checkbox, Box, Text, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useState } from 'react';

export default function Todo(props) {
  const [isCompleted, setIsCompleted] = useState(props.data.completed);

  const handleDelete = () => {
    props.delete(props.data.id);
  }

  const toggleTodoStatus = () => {
    props.toggle(props.data.id, props.data.completed);
    setIsCompleted(!isCompleted);
  }

  return(
    <Box display='flex'>
      <Text my='auto'>{props.data.title}</Text>
      <Checkbox ml='3' onChange={toggleTodoStatus} isChecked={isCompleted}></Checkbox>
      <IconButton mx='3' aria-label='Delete todo' colorScheme={'red'} onClick={handleDelete} icon={<DeleteIcon />} />
    </Box>)

}