import React, { useState } from 'react';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { Center, Spinner } from '@chakra-ui/react'
import app from '../firebase/client'
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from '../components/SignIn';
import Header from '../components/Header'

export default function Home() {
  // User Authentication
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Header auth={auth}/>
      <Center width='100%' p={3}>
        {!user && !loading && <SignIn auth={auth}/>}
        {user && !loading && <></>}
        {loading && <Spinner size='xl'/>}
      </Center>
    </>
  )
}