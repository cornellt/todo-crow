import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Center, Heading, Input, InputGroup, Button, InputRightElement, VStack, HStack, Box, Divider } from '@chakra-ui/react'

export default function SignIn(props) {
    const [user, loading, error] = useAuthState(props.auth);


    const [emailValue, setEmailValue] = useState('');
    const handleChangeEmailInput = (event) => setEmailValue(event.target.value);
  
    const [passwordValue, setPasswordValue] = useState('');
    const handleChangePasswordInput = (event) => setPasswordValue(event.target.value);
    const [show, setShow] = useState(false)
    const toggleShowPassword = () => setShow(!show)


    function handleSignInFormSubmit(event) {
        event.preventDefault();
    
        if(EmailValidator.validate(emailValue) && passwordValue.length > 5) {
          signInWithEmailAndPassword(auth, emailValue, passwordValue)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        }
      }

    return(
        <Center>
            <VStack
                spacing={4}
                align='stretch'
                width='100%'
            >
                <Heading mx='auto'>Log In</Heading>
                <Divider borderColor='gray.200' />
                <Input
                    value={emailValue}
                    onChange={handleChangeEmailInput}
                    placeholder='Enter email'
                />
                <InputGroup>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        value={passwordValue}
                        onChange={handleChangePasswordInput}
                        placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button 
                            h='1.75rem' 
                            size='sm' 
                            onClick={toggleShowPassword}
                        >
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </VStack>
        </Center>
    );
}

