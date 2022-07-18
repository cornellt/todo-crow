import { Center, Spinner, useToast } from '@chakra-ui/react';
import { useCreateUserWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/client';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import { useState, useEffect, FormEvent } from 'react';
import * as EmailValidator from 'email-validator';
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

    //create user in Firebase if registration is valid
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
    }, [user, error, push, toast])

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
                        <RegisterForm
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
                        />
                    </Center>
                </>
            }
        </>)
}