import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Center, Heading, Input, InputGroup, Button, InputRightElement, VStack, HStack, Divider } from '@chakra-ui/react'
import * as EmailValidator from 'email-validator';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SignIn(props) {
    const router = useRouter();
    const [user, loading, error] = useAuthState(props.auth);

    const [emailValue, setEmailValue] = useState('');
    const handleChangeEmailInput = (event) => setEmailValue(event.target.value);

    const [passwordValue, setPasswordValue] = useState('');
    const handleChangePasswordInput = (event) => setPasswordValue(event.target.value);
    const [show, setShow] = useState(false);
    const toggleShowPassword = () => setShow(!show);


    function handleSignInForm(event) {
        event.preventDefault();

        if (passwordValue.length > 5 && EmailValidator.validate(emailValue)) {
            signInWithEmailAndPassword(props.auth, emailValue, passwordValue)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    console.log('nope')
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
    }


    return (
        <Center border='1px' borderColor='gray.300' backgroundColor='gray.200' p={8} m={8} borderRadius={8}>
            <VStack
                spacing={4}
                align='stretch'
                width='100%'
            >
                <Heading mx='auto'>Sign In or Register</Heading>
                <Divider borderColor='gray.400'/>
                <Input
                    value={emailValue}
                    onChange={handleChangeEmailInput}
                    placeholder='Enter email'
                    borderColor='gray.300'
                    backgroundColor='gray.100'
                />
                <form onSubmit={handleSignInForm}>
                    <InputGroup>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            value={passwordValue}
                            onChange={handleChangePasswordInput}
                            placeholder='Enter password'
                            borderColor='gray.300'
                            backgroundColor='gray.100'
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
                </form>
                <Center>
                    <HStack mt={3} mb={0}>
                        <Button onClick={handleSignInForm} colorScheme={'green'}>Sign In</Button>
                        <Link href='/register' passHref><Button colorScheme={'blue'}>Register</Button></Link>
                    </HStack>
                </Center>
            </VStack>
        </Center>
    );
}