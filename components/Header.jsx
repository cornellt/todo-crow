import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { Center, Flex, Spacer, InputGroup, Button, InputRightElement, VStack, HStack, Box, StackDivider } from '@chakra-ui/react'


export default function Header(props) {
    const [user, loading, error] = useAuthState(props.auth);

    const signUserOut = () => {
        signOut(props.auth);
    };

    return(      
        <Flex background='blue.600' height={['6vh', '5vh', '4vh']}>
            <Spacer/>
            {user && <Button my='auto' mx='3' onClick={signUserOut}>Log Out</Button>}
        </Flex>
    );
}