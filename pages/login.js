import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import { auth } from '../firebase/client';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as EmailValidator from 'email-validator';

export default function Login() {
    const { push } = useRouter(); 

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [userAuthState, loadingAuthState, errorAuthState] = useAuthState(auth);

    const [email, setEmail] = useState('');
    const handleChangeEmail = (event) => {
        const currentValue = event.target.value;
        setEmail(currentValue);
        setEmailValid(EmailValidator.validate(currentValue));
    }

    const [password, setPassword] = useState('');
    const handleChangePassword = (event) => {
        const currentValue = event.target.value;
        setPassword(currentValue);
        setPasswordLongEnough(currentValue.length >= 6);
    }

    //Checks before login button is enabled
    const [emailValid, setEmailValid] = useState(false);
    const [passwordLongEnough, setPasswordLongEnough] = useState(false);
    const [signInValid, setSignInValid] = useState(false);
    useEffect(() => {
        setSignInValid(emailValid && passwordLongEnough);
    }, [emailValid, passwordLongEnough]);

    //handler for sign in form
    const handleSignInForm = () => {
        if (signInValid) {
            signInWithEmailAndPassword(email, password);
        }
        else {
            console.log("Sign in invalid!");
        }
    };

    //redirect to '/' if user is already authenticated
    useEffect(() => {
        if(userAuthState && !user) {
            push('/');
    }}, [userAuthState, push, user]);

    //login toast
    const toast = useToast();

    //redirect to '/' with Toast popup after successful login
    useEffect(() => {
        if (!error && user) {
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 6000,
                isClosable: true,
                position: 'top'
              });
            push('/');
        }
    }, [user, error, push, toast])

    //show an Error toast if the login fails because of an incorrect email/password
    useEffect(() => {
        if (error) {
            toast({
                title: 'Login Unsuccessful',
                description: 'Email or Password is incorrect!',
                status: 'error',
                duration: 6000,
                isClosable: true,
                position: 'top'
            });
        }
    }, [error, toast]);

    return(
    <>
        {(loading || loadingAuthState) &&
            <Center mt={'25vh'}>
                <Spinner size='xl' />
            </Center>
        }
        {!(loading || loadingAuthState) && !user && !userAuthState &&
            <>
                <Header />
                <Center p={3}>
                    <LoginForm 
                        email={email}
                        handleChangeEmail={handleChangeEmail}
                        password={password}
                        handleChangePassword={handleChangePassword}
                        handleSignInForm={handleSignInForm}
                        emailValid={emailValid}
                        passwordLongEnough={passwordLongEnough}
                        signInValid={signInValid}
                    />
                </Center>
            </>
        }
    </>)
}