import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Center, Heading, Input, InputGroup, Button, InputRightElement, VStack, HStack, Box, StackDivider } from '@chakra-ui/react';

export default function SignUp(props) {
    const [user, loading, error] = useAuthState(props.auth);

    const [show, setShow] = useState(false);
    const handleShowPasswordInput = () => setShow(!show);
  
    const [emailValue, setEmailValue] = useState('');
    const handleChangeEmailInput = (event) => setEmailValue(event.target.value);
  
    const [passwordValue, setPasswordValue] = useState('');
    const handleChangePasswordInput = (event) => setPasswordValue(event.target.value);

    function handleSignUpFormSubmit(e) {
        e.preventDefault();
    
        if(EmailValidator.validate(emailValue) && passwordValue.length > 5) {
          createUserWithEmailAndPassword(auth, emailValue, passwordValue)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage)
          });
        }
        else if(passwordValue.length <= 5) {
          console.log('Password must be longer than 5 characters!')
        }
        else {
          console.log('Invalid email!');
        }
      }

    return(
        <Center>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
                width='100%'
            >
                <Heading mx='auto'>Sign Up</Heading>
                <Input
                    value={emailValue}
                    onChange={handleChangeEmailInput}
                    placeholder='Enter email'
                />
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    value={passwordValue}
                    onChange={handleChangePasswordInput}
                    placeholder='Enter password'
                />
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    value={passwordValue}
                    onChange={handleChangePasswordInput}
                    placeholder='Confirm password'
                />
            </VStack>
        </Center>
    );
}