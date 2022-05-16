import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Center, Heading, Text, Input, InputGroup, Button, InputRightElement, VStack, Alert, AlertIcon, StackDivider } from '@chakra-ui/react';
import * as EmailValidator from 'email-validator'

export default function SignUp(props) {
    const [user, loading, error] = useAuthState(props.auth);

    const [show, setShow] = useState(false);
    const toggleShowPassword = () => setShow(!show);
  
    const [emailValue, setEmailValue] = useState('');
    const handleChangeEmailInput = (event) => {
      setEmailValue(event.target.value);
      console.log()
    }
  
    const [passwordValue, setPasswordValue] = useState('');
    const handleChangePasswordInput = (event) => setPasswordValue(event.target.value);

    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const handleChangeConfirmPasswordInput = (event) => {
      setConfirmPasswordValue(event.target.value);
    };

    const [passwordInputsMatch, setPasswordInputsMatch] = useState(true);
    useEffect(() => {
      if(confirmPasswordValue !== '') {
        setPasswordInputsMatch(passwordValue === confirmPasswordValue);
        console.log("check")
      }
    }, [confirmPasswordValue, passwordValue]);

    const handleSignUpForm = (event) => {
        event.preventDefault();
    
        if(passwordValue === confirmPasswordValue) {
          if(passwordValue.length > 5 && EmailValidator.validate(emailValue)) {
            console.log('Email validated')
            createUserWithEmailAndPassword(props.auth, emailValue, passwordValue)
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
        else {

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
            <Heading mx='auto'>Register</Heading>
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
            <InputGroup>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                value={confirmPasswordValue}
                onChange={handleChangeConfirmPasswordInput}
                placeholder='Confirm password'
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
            {passwordInputsMatch && <Button onClick={handleSignUpForm}>Register</Button>}
            {!passwordInputsMatch && 
              <VStack>
                <Button isDisabled>Register</Button>
                <Alert status='error'>
                  <AlertIcon />
                  Your passwords do not match!
                </Alert>
              </VStack>
            }
            <Text mx='auto'>Already have an account? <Button onClick={props.returnToSignIn}>Sign in</Button> instead.</Text>
          </VStack>
      </Center>
    );
}