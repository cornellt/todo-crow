import React, { useState } from 'react';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { Center, Heading, Input, InputGroup, Button, InputRightElement, VStack, HStack, Box, StackDivider } from '@chakra-ui/react'
import * as EmailValidator from 'email-validator'
import app from '../firebase/client'
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from '../components/signin';
import SignUp from '../components/signup';

export default function Home() {
  // User Authentication
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  return (
    <Center width='100%' p={3}>
      <HStack spacing='24px'>
        <SignIn auth={auth}></SignIn>
      </HStack>
    </Center>
  )
}