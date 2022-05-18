import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Center, Heading, Text, Input, InputGroup, Button, InputRightElement, VStack, Alert, AlertIcon, Divider, Link as ChakraLink} from '@chakra-ui/react';

export default function SignUp(props) {
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [confirmPasswordBlurred, setConfirmPasswordBlurred] = useState(false);

  const [showPasswords, setShowPasswords] = useState(false);
  const toggleShowPasswords = () => setShowPasswords(!show);

  return(
    <VStack>
      {(!props.emailValid && emailBlurred && props.email.length > 0) &&
        <VStack>
          <Alert status='error'>
            <AlertIcon />
            Email invalid! Please use a valid email.
          </Alert>
        </VStack>
      }
      {(!props.passwordsMatch && passwordBlurred && confirmPasswordBlurred) &&
        <VStack>
          <Alert status='error'>
            <AlertIcon />
            Your passwords must match!
          </Alert>
        </VStack>
      }
      {(!props.passwordLongEnough && passwordBlurred && props.password.length > 0) &&
        <VStack>
          <Alert status='error'>
            <AlertIcon />
            Your password must be at least 6 characters long!
          </Alert>
        </VStack>
      }
      <Center border='1px' borderColor='gray.300' backgroundColor='gray.200' p={8} m={8} borderRadius={8}>
        <VStack
          spacing={4}
          align='stretch'
          width='100%'
        >
          <Heading mx='auto'>Register</Heading>
          <Divider borderColor='gray.400' />
          <Input
            value={props.email}
            onChange={props.handleChangeEmail}
            onBlur={() => setEmailBlurred(true)}
            placeholder='Enter email'
            borderColor='gray.300'
            backgroundColor='gray.100'
          />
          <InputGroup>
            <Input
              pr='4.5rem'
              type={showPasswords ? 'text' : 'password'}
              value={props.password}
              onChange={props.handleChangePassword}
              onBlur={() => {setPasswordBlurred(true)}}
              placeholder='Enter password'
              borderColor='gray.300'
              backgroundColor='gray.100'
            />
            <InputRightElement width='4.5rem'>
              <Button
                h='1.75rem'
                size='sm'
                onClick={toggleShowPasswords}
              >
                {showPasswords ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup>
            <Input
              pr='4.5rem'
              type={showPasswords ? 'text' : 'password'}
              value={props.confirmPassword}
              onChange={props.handleChangeConfirmPassword}
              onBlur={() => {setConfirmPasswordBlurred(true)}}
              placeholder='Confirm password'
              borderColor='gray.300'
              backgroundColor='gray.100'
            />
            <InputRightElement width='4.5rem'>
              <Button
                h='1.75rem'
                size='sm'
                onClick={toggleShowPasswords}
              >
                {showPasswords ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button onClick={props.handleSignUpForm} isDisabled={!props.registrationValid} colorScheme='blue'>Register</Button>
          <Text mx='auto'>
            Already have an account? <Link href='/login' passHref><ChakraLink>Sign In</ChakraLink></Link> instead.
          </Text>
        </VStack>
      </Center>
    </VStack>
  );
}