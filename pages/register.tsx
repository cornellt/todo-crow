import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useCreateUserWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/client';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
    const { push } = useRouter();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [userAuthState, loadingAuthState, errorAuthState] = useAuthState(auth);

    //create user in Firebase if registration is valid
    const handleSignUpForm = (email: string, password: string) => {
        createUserWithEmailAndPassword(email, password);
    };

    //redirect to '/' if user is already logged in
    useEffect(() => {
        if(userAuthState && !user) {
            push('/');
    }}, [userAuthState, push, user]);

    //registration toast
    const toast = useToast();

    useEffect(() => {
        //redirect to '/' with Toast popup upon successful registration
        if (!error && user) {
            // Signed in
            toast({
                title: 'Registration Successful',
                description: `You've been logged in automatically.`,
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top'
                });

            push('/');
        }

        //Toast for Registration error
        if (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: (error.code === 'auth/email-already-in-use' ? 'Email already in use.' : 'Account creation failed.'),
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top'
            });
        }
    }, [user, error, push, toast]);

    return (
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
                        <RegisterForm handleSignUpForm={handleSignUpForm} />
                    </Center>
                </>
            }
        </>);
}