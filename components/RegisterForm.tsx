import { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { Center, Heading, Text, Input, InputGroup, Button, InputRightElement, VStack, Alert, AlertIcon, Divider, Link as ChakraLink } from '@chakra-ui/react';
import * as EmailValidator from 'email-validator';

export default function RegisterForm(props: RegisterFormProps) {
    const [emailBlurred, setEmailBlurred] = useState(false);
    const [passwordBlurred, setPasswordBlurred] = useState(false);
    const [confirmPasswordBlurred, setConfirmPasswordBlurred] = useState(false);

    const [showPasswords, setShowPasswords] = useState(false);
    const toggleShowPasswords = () => setShowPasswords(!showPasswords);

    //State for register form
    const [email, setEmail] = useState('');
    const handleChangeEmail = (event: FormEvent<HTMLInputElement>) => {
        const currentValue = event.currentTarget.value;
        setEmail(currentValue);
        setEmailValid(EmailValidator.validate(currentValue));
    }

    const [password, setPassword] = useState('');
    const handleChangePassword = (event: FormEvent<HTMLInputElement>) => {
        const currentValue = event.currentTarget.value;
        setPassword(currentValue);
        setPasswordLongEnough(currentValue.length >= 6);
    }

    const [confirmPassword, setConfirmPassword] = useState('');
    const handleChangeConfirmPassword = (event: FormEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value);
    };

    //If either password or confirmPassword change, check if they match and update passwordsMatch variable
    useEffect(() => {
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    //Checks before registration sent
    const [emailValid, setEmailValid] = useState(false);
    const [passwordLongEnough, setPasswordLongEnough] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [registrationValid, setRegistrationValid] = useState(emailValid && passwordLongEnough && passwordsMatch);

    //emailValid, passwordsMatch, and passwordLongEnough are the 3 requirements for valid Registration. If any of these variables change, update registrationValid accordingly
    useEffect(() => {
        setRegistrationValid(emailValid && passwordsMatch && passwordLongEnough);
    }, [emailValid, passwordsMatch, passwordLongEnough]);

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        if (registrationValid) {
            props.handleSignUpForm(email, password);
        }
    };

    return (
        <VStack>
            {(!emailValid && emailBlurred && email.length > 0) &&
                <Alert status='error'>
                    <AlertIcon />
                    Email invalid! Please use a valid email address.
                </Alert>}
            {(!passwordsMatch && passwordBlurred && confirmPasswordBlurred && password.length > 0 && confirmPassword.length > 0) &&
                <Alert status='error'>
                    <AlertIcon />
                    Your passwords must match!
                </Alert>}
            {(!passwordLongEnough && passwordBlurred && confirmPasswordBlurred && password.length > 0) &&
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
                            value={email}
                            onChange={handleChangeEmail}
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
                                value={password}
                                onChange={handleChangePassword}
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
                                    tabIndex={-1}
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
                                value={confirmPassword}
                                onChange={handleChangeConfirmPassword}
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
                                    tabIndex={-1}
                                >
                                    {showPasswords ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </form>
                    <Button onClick={submitForm} isDisabled={!registrationValid} colorScheme='blue'>Register</Button>
                    <Text align='center'>
                        Already have an account? <Link href='/login' passHref><ChakraLink color='green'>Sign In</ChakraLink></Link> instead.
                    </Text>
                </VStack>
            </Center>
        </VStack>
    );
}