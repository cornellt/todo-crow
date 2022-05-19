import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useCreateUserWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/client';
import SignUp from '../components/SignUp';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [userAuthState, loadingAuthState, errorAuthState] = useAuthState(auth);


    //State for register form
    const [email, setEmail] = useState('');
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    useEffect(() => {
        setEmailValid(EmailValidator.validate(email));
    }, [email]);

    const [password, setPassword] = useState('');
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const [confirmPassword, setConfirmPassword] = useState('');
    const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };
    useEffect(() => {
        setPasswordLongEnough(password.length >= 6);
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);


    //Checks before registration sent
    const [emailValid, setEmailValid] = useState(false);
    const [passwordLongEnough, setPasswordLongEnough] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [registrationValid, setRegistrationValid] = useState(false);
    useEffect(() => {
        setRegistrationValid(emailValid && passwordsMatch && passwordLongEnough);
    }, [emailValid, passwordsMatch, passwordLongEnough]);

    const handleSignUpForm = () => {
        if (registrationValid) {
            createUserWithEmailAndPassword(email, password);
        }
        else {
            console.log('Registration invalid!');
        }
    }

    //redirect to '/' if user is already logged in
    useEffect(() => {
        if(userAuthState && !user) {
            router.push('/');
    }}, [userAuthState, router, user]);

    //registration error toast
    const toast = useToast();

    //redirect to '/' with 'reg-success' Toast popup upon successful registration
    useEffect(() => {
        if (!error && user) {
            // Signed in 
            toast({
                title: 'Registration Successful',
                description: `You've been logged in automatically.`,
                status: 'success',
                duration: 6000,
                isClosable: true,
                position: 'top',
              });

            router.push({
                pathname: '/',
                query: { result: 'reg-success' }
            });
        }
    }, [user, error, router, toast])

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: (error.code === 'auth/email-already-in-use' ? 'Email already in use.' : 'Account creation failed.'),
                status: 'error',
                duration: 6000,
                isClosable: true,
                position: 'top'
            });
        }
    }, [error, toast]);

    return (
        <>
            {(loading || loadingAuthState) &&
                <Center mt={'25vh'}>
                    <Spinner size='xl' />
                </Center>
            }
            {!(loading || loadingAuthState) && !user && !userAuthState &&
                <>
                    <Header auth={auth} />
                    <Center p={3}>
                        <SignUp
                            email={email}
                            handleChangeEmail={handleChangeEmail}
                            emailValid={emailValid}
                            password={password}
                            handleChangePassword={handleChangePassword}
                            passwordLongEnough={passwordLongEnough}
                            confirmPassword={confirmPassword}
                            handleChangeConfirmPassword={handleChangeConfirmPassword}
                            passwordsMatch={passwordsMatch}
                            registrationValid={registrationValid}
                            handleSignUpForm={handleSignUpForm}
                            error={error}
                        />
                    </Center>
                </>
            }
        </>)
}