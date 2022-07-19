import { FormEvent, useState, useEffect } from "react";
import { Center, Heading, Input, InputGroup, Button, InputRightElement, VStack, Divider, Tooltip, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link';
import * as EmailValidator from 'email-validator';


export default function LoginForm(props: LoginFormProps) {
    const [show, setShow] = useState(false);
    const toggleShowPassword = () => setShow(!show);

    const [email, setEmail] = useState('');
    const handleChangeEmail = (event: FormEvent<HTMLInputElement>) => {
        const currentValue = event.currentTarget.value;
        setEmail(currentValue);
        setEmailValid(EmailValidator.validate(currentValue));
    };

    const [password, setPassword] = useState('');
    const handleChangePassword = (event: FormEvent<HTMLInputElement>) => {
        const currentValue = event.currentTarget.value;
        setPassword(currentValue);
        setPasswordLongEnough(currentValue.length >= 6);
    };

    //Checks before login button is enabled
    const [emailValid, setEmailValid] = useState(false);
    const [passwordLongEnough, setPasswordLongEnough] = useState(false);
    const [signInValid, setSignInValid] = useState(false);
    useEffect(() => {
        setSignInValid(emailValid && passwordLongEnough);
    }, [emailValid, passwordLongEnough]);

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        if (signInValid) {
            props.handleSignInForm(email, password);
        }
    };

    return (
        <Center border='1px' borderColor='gray.300' backgroundColor='gray.200' p={8} m={8} borderRadius={8}>
            <VStack
                spacing={4}
                align='stretch'
                width='100%'
            >
                <Heading mx='auto'>Sign In</Heading>
                <Divider borderColor='gray.400' />
                <form onSubmit={submitForm}>
                    <Input
                        value={email}
                        onChange={handleChangeEmail}
                        placeholder='Enter email'
                        borderColor='gray.300'
                        backgroundColor='gray.100'
                    />
                </form>
                <form onSubmit={submitForm}>
                    <InputGroup>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            value={password}
                            onChange={handleChangePassword}
                            placeholder='Enter password'
                            borderColor='gray.300'
                            backgroundColor='gray.100'
                            id='email'
                            autoComplete='email'
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
                    {signInValid ? <Button onClick={submitForm} colorScheme={'green'}>Sign In</Button> :
                        <Tooltip hasArrow label={!emailValid ? 'Enter a valid email!' : 'Password must be at least 6 characters long!'} shouldWrapChildren mt='1'>
                            <Button width='100%' onClick={submitForm} isDisabled colorScheme={'green'}>Sign In</Button>
                        </Tooltip>}
                <Text align='center'>
                    Need an account? <Link href='/register' passHref><ChakraLink color='blue.600'>Register</ChakraLink></Link>.
                </Text>
            </VStack>
        </Center>
    );
}