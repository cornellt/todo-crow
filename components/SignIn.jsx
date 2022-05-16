import React, { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Center, Heading, Input, InputGroup, Button, InputRightElement, VStack, HStack, Divider } from '@chakra-ui/react'
import SignUp from '../components/SignUp';
import * as EmailValidator from 'email-validator';

export default function SignIn(props) {
    const [user, loading, error] = useAuthState(props.auth);

    const [showSignUp, setShowSignUp] = useState(false);
    const toggleShowSignUp = () => setShowSignUp(!showSignUp);

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
        <Center>
            {showSignUp && <SignUp auth={props.auth} returnToSignIn={toggleShowSignUp} />}
            {!showSignUp &&
                <VStack
                    spacing={4}
                    align='stretch'
                    width='100%'
                >
                    <Heading mx='auto'>Sign In or Register</Heading>
                    <Divider borderColor='gray.200' />
                    <Input
                        value={emailValue}
                        onChange={handleChangeEmailInput}
                        placeholder='Enter email'
                    />
                    <form onSubmit={handleSignInForm}>
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
                    </form>
                    <Center>
                        <HStack>
                            <Button onClick={handleSignInForm}>Sign In</Button>
                            <Button onClick={toggleShowSignUp}>Register</Button>
                        </HStack>
                    </Center>
                </VStack>
            }
        </Center>
    );
}