import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import { auth } from '../firebase/client';
import SignIn from '../components/SignIn';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as EmailValidator from 'email-validator';

export default function Login() {
    const router = useRouter(); 

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [userAuthState, loadingAuthState, errorAuthState] = useAuthState(auth);

    const [email, setEmail] = useState('');
    const handleChangeEmail = (event) => setEmail(event.target.value);
    useEffect(() => {
        setEmailValid(EmailValidator.validate(email));
    }, [email]);

    const [password, setPassword] = useState('');
    const handleChangePassword = (event) => setPassword(event.target.value);
    useEffect(() => {
        setPasswordLongEnough(password.length >= 6);
    }, [password]);

    //Checks before login button is enabled
    const [emailValid, setEmailValid] = useState(false);
    const [passwordLongEnough, setPasswordLongEnough] = useState(false);
    const [signInValid, setSignInValid] = useState(false);
    useEffect(() => {
        setSignInValid(emailValid && passwordLongEnough);
    }, [emailValid, passwordLongEnough]);

    const handleSignInForm = () => {
        if (signInValid) {
            signInWithEmailAndPassword(email, password)
        }
        else {
            console.log("Sign in invalid!");
        }
    };

    //redirect to '/' if user is already logged in
    useEffect(() => {
        if(userAuthState && !user) {
            router.push('/');
    }}, [userAuthState, router, user]);

    //redirect to '/' after login
    useEffect(() => {
        if (!error && user) {
            // Signed in 
            router.push({
                pathname: '/',
                query: { result: 'login-success' }
            });
        }
    }, [user, error, router])

    //registration error toast
    const toast = useToast();
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
                <Header auth={auth}/>
                <Center p={3}>
                    <SignIn 
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