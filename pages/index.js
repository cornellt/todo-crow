import React, { useState } from 'react';
import { Center, Input, InputGroup, Button, InputRightElement } from '@chakra-ui/react'

export default function Home() {

  const [show, setShow] = useState(false);
  const handleShowPasswordInput = () => setShow(!show);

  const [emailValue, setEmailValue] = useState(' ');
  const handleChangeEmailInput = (event) => setEmailValue(event.target.value)

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  return (
  <Center bg='gray.400' h='300px' w='50%' mx='auto' my={3} color='white'>
    <form onSubmit={handleFormSubmit} >
      <InputGroup size='md'>
        <Input
          value={emailValue}
          onChange={handleChangeEmailInput}
          placeholder='Enter email'
          color='black'
        />
        <br/>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          color='white'
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleShowPasswordInput} colorScheme='blackAlpha' >
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  </Center>
  )
}
