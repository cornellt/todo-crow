import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/client';
import { Image, Heading, Flex, Spacer, Button, useToast, propNames } from '@chakra-ui/react'


export default function Header() {
    const [user] = useAuthState(auth);

    const toast = useToast();

    const signUserOut = () => {
        signOut(auth)
        .then(() => {
            toast({
                title: 'Logged Out',
                status: 'info',
                duration: 2000,
                isClosable: true,
                position: 'top'
                });
        });


    };

    return(      
        <Flex background='purple.400'>
            <Image
                boxSize='3rem'
                objectFit='cover'
                src='crow.png'
                alt='todo-crow'
                m='1'
            />
            <Heading mx={3} my='auto'>todo crow</Heading>
            <Spacer/>
            {user && <Button my='auto' mx='3' onClick={signUserOut} colorScheme='gray'>Log Out</Button>}
        </Flex>
    );
}