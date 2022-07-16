import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/client';
import { Image, Heading, Flex, Spacer, Button } from '@chakra-ui/react'


export default function Header() {
    const [user] = useAuthState(auth);

    const signUserOut = () => {
        signOut(auth);
    };

    return(      
        <Flex background='blue.600'>
            <Image
                boxSize='4rem'
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