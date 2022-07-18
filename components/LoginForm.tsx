import { FormEvent, useState } from "react";
import { Center, Heading, Input, InputGroup, Button, InputRightElement, VStack, Divider, Tooltip, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link';

interface LoginFormProps  {
    email: string;
    handleChangeEmail: () => void;
    password: string;
    handleChangePassword: () => void;
    handleSignInForm: () => void;
    emailValid: boolean;
    passwordLongEnough: boolean;
    signInValid: boolean;
};

export default function LoginForm(props: LoginFormProps) {
    const [show, setShow] = useState(false);
    const toggleShowPassword = () => setShow(!show);

    const submitForm = (event: FormEvent) => {
        event.preventDefault();
        if (props.signInValid) {
            props.handleSignInForm();
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
                        value={props.email}
                        onChange={props.handleChangeEmail}
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
                            value={props.password}
                            onChange={props.handleChangePassword}
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
                    {props.signInValid ? <Button onClick={submitForm} colorScheme={'green'}>Sign In</Button> :
                        <Tooltip hasArrow label={!props.emailValid ? 'Enter a valid email!' : 'Password must be at least 6 characters long!'} shouldWrapChildren mt='1'>
                            <Button width='100%' onClick={submitForm} isDisabled colorScheme={'green'}>Sign In</Button>
                        </Tooltip>}
                <Text align='center'>
                    Need an account? <Link href='/register' passHref><ChakraLink color='blue.600'>Register</ChakraLink></Link>.
                </Text>
            </VStack>
        </Center>
    );
}