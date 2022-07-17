import { Checkbox, Box, Text, IconButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react';

export default function Todo(props) {
  const [isCompleted, setIsCompleted] = useState(props.data.completed);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const toast = useToast();

  const openDeleteDialog = () => {
    onOpen();
  }

  const handleDelete = () => {
    onClose();
    props.delete(props.data.id);

    toast({
      title: `"${props.data.title}" todo deleted!`,
      status: 'info',
      duration: 2000,
      isClosable: true,
      position: 'top'
  });
  }

  const toggleTodoStatus = () => {
    props.toggle(props.data.id, props.data.completed);
    setIsCompleted(!isCompleted);
  }

  return(
    <Box display='flex'>
      <Text my='auto' as={isCompleted ? 's' : ''}>{props.data.title}</Text>
      <Checkbox ml='3' onChange={toggleTodoStatus} isChecked={isCompleted}></Checkbox>
      <IconButton mx='3' aria-label='Delete todo' colorScheme={'red'} onClick={openDeleteDialog} icon={<DeleteIcon />} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Todo: {props.data.title}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this!
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => {
                handleDelete();
              }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>)

}