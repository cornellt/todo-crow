import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Center, Heading, Text, Input, InputGroup, Button, InputRightElement, VStack, Alert, AlertIcon, Divider } from '@chakra-ui/react';
import * as EmailValidator from 'email-validator';

export default function SignUp(props) {
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

  const [passwordInputsMatchAndValid, setPasswordInputsMatchAndValid] = useState(true);
  useEffect(() => {
    if(confirmPasswordValue !== '' && passwordValue.length > 5) {
      setPasswordInputsMatchAndValid(passwordValue === confirmPasswordValue);
    }
  }, [confirmPasswordValue, passwordValue]);

  const [emailAndPasswordAreValid, setEmailAndPasswordAreValid] = useState(false);
  useEffect(() => {
    if(EmailValidator.validate(emailValue) && passwordInputsMatchAndValid) {
      setEmailAndPasswordAreValid(true);
    }
    else {
      setEmailAndPasswordAreValid(false);
    }
   }, [passwordInputsMatchAndValid, emailAndPasswordAreValid, emailValue]);


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
  }
  return(
    <Center border='1px' borderColor='gray.300' backgroundColor='gray.100'p={8} m={8} borderRadius={8}>
        <VStack
          spacing={4}
          align='stretch'
          width='100%'
        >
          <Heading mx='auto'>Register</Heading>
          <Divider borderColor='gray.200' />
          <Input
            value={emailValue}
            onChange={handleChangeEmailInput}
            placeholder='Enter email'
            borderColor='gray.300'
          />
          <InputGroup>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              value={passwordValue}
              onChange={handleChangePasswordInput}
              placeholder='Enter password'
              borderColor='gray.300'
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
              borderColor='gray.300'
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
          <Button onClick={handleSignUpForm} isDisabled={!emailAndPasswordAreValid} colorScheme='blue'>Register</Button>
          {!passwordInputsMatchAndValid && 
            <VStack>
              <Alert status='error'>
                <AlertIcon />
                Your passwords do not match!
              </Alert>
            </VStack>
          }
          <Text mx='auto'>
            Already have an account? <Link href='login' passHref><Button p={0}> Sign in </Button></Link> instead.
          </Text>
        </VStack>
    </Center>
  );
}