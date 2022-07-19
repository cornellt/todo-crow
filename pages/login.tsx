import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import { auth } from '../firebase/client';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
    const { push } = useRouter(); 

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [userAuthState, loadingAuthState, errorAuthState] = useAuthState(auth);

    //handler for sign in form
    const handleSignInForm = (email: string, password: string) => {
        signInWithEmailAndPassword(email, password);
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
                duration: 2000,
                isClosable: true,
                position: 'top'
              });
            push('/');
        }
    }, [user, error, push, toast]);

    //show an Error toast if the login fails because of an incorrect email/password
    useEffect(() => {
        if (error) {
            toast({
                title: 'Login Unsuccessful',
                description: 'Email or Password is incorrect!',
                status: 'error',
                duration: 4000,
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
                    <LoginForm handleSignInForm={handleSignInForm} />
                </Center>
            </>
        }
    </>);
}