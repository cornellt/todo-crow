import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/client';
import { Heading, Flex, Spacer, Button } from '@chakra-ui/react'


export default function Header() {
    const [user, loading, error] = useAuthState(auth);

    const signUserOut = () => {
        signOut(auth);
    };

    return(      
        <Flex background='blue.600'>
            <Heading mx={3}>todo-crow</Heading>
            <Spacer/>
            {user && <Button my='1' mx='3' onClick={signUserOut} colorScheme='gray'>Log Out</Button>}
        </Flex>
    );
}