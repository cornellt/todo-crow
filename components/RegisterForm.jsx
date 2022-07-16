import { useState } from 'react';
import Link from 'next/link';
import { Center, Heading, Text, Input, InputGroup, Button, InputRightElement, VStack, Alert, AlertIcon, Divider, Link as ChakraLink } from '@chakra-ui/react';

export default function RegisterForm(props) {
  const [emailBlurred, setEmailBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [confirmPasswordBlurred, setConfirmPasswordBlurred] = useState(false);

  const [showPasswords, setShowPasswords] = useState(false);
  const toggleShowPasswords = () => setShowPasswords(!showPasswords);

  const submitForm = (event) => {
    event.preventDefault();
    if (props.registrationValid) {
      props.handleSignUpForm();
    }
  };

  return (
    <VStack>
      {(!props.emailValid && emailBlurred && props.email.length > 0) &&
        <Alert status='error'>
          <AlertIcon />
          Email invalid! Please use a valid email address.
        </Alert>}
      {(!props.passwordsMatch && passwordBlurred && confirmPasswordBlurred && props.password.length > 0 && props.confirmPassword.length > 0) &&
        <Alert status='error'>
          <AlertIcon />
          Your passwords must match!
        </Alert>}
      {(!props.passwordLongEnough && passwordBlurred && confirmPasswordBlurred && props.password.length > 0) &&
        <Alert status='error'>
          <AlertIcon />
          Your password must be at least 6 characters long!
        </Alert>}
      <Center border='1px' borderColor='gray.300' backgroundColor='gray.200' p={8} m={8} borderRadius={8}>
        <VStack
          spacing={4}
          align='stretch'
          width='100%'
        >
          <Heading mx='auto'>Register</Heading>
          <Divider borderColor='gray.400' />
          <form onSubmit={submitForm}>
            <Input
              value={props.email}
              onChange={props.handleChangeEmail}
              onBlur={() => setEmailBlurred(true)}
              onFocus={() => setEmailBlurred(false)}
              placeholder='Enter email'
              borderColor='gray.300'
              backgroundColor='gray.100'
            />
          </form>
          <form onSubmit={submitForm}>
            <InputGroup>
              <Input
                pr='4.5rem'
                type={showPasswords ? 'text' : 'password'}
                value={props.password}
                onChange={props.handleChangePassword}
                onBlur={() => setPasswordBlurred(true)}
                onFocus={() => setPasswordBlurred(false)}
                placeholder='Enter password'
                borderColor='gray.300'
                backgroundColor='gray.100'
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  size='sm'
                  onClick={toggleShowPasswords}
                  tabIndex='-1'
                >
                  {showPasswords ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
          <form onSubmit={submitForm}>
            <InputGroup>
              <Input
                pr='4.5rem'
                type={showPasswords ? 'text' : 'password'}
                value={props.confirmPassword}
                onChange={props.handleChangeConfirmPassword}
                onBlur={() => setConfirmPasswordBlurred(true)}
                onFocus={() => setConfirmPasswordBlurred(false)}
                placeholder='Confirm password'
                borderColor='gray.300'
                backgroundColor='gray.100'
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  size='sm'
                  onClick={toggleShowPasswords}
                  tabIndex='-1'
                >
                  {showPasswords ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
          <Button onClick={submitForm} isDisabled={!props.registrationValid} colorScheme='blue'>Register</Button>
          <Text align='center'>
            Already have an account? <Link href='/login' passHref><ChakraLink color='green'>Sign In</ChakraLink></Link> instead.
          </Text>
        </VStack>
      </Center>
    </VStack>
  );
}