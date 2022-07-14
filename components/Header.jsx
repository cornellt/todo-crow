import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { Heading, Flex, Spacer, Button } from '@chakra-ui/react'


export default function Header(props) {
    const [user, loading, error] = useAuthState(props.auth);

    const signUserOut = () => {
        signOut(props.auth);
    };

    return(      
        <Flex background='blue.600'>
            <Heading mx={3}>todo-crow</Heading>
            <Spacer/>
            {user && <Button my='1' mx='3' onClick={signUserOut} colorScheme='gray'>Log Out</Button>}
        </Flex>
    );
}