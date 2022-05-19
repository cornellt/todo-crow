import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFirestore } from 'firebase/firestore/lite';
import { Center, useToast, Spinner } from '@chakra-ui/react';
import { auth } from '../firebase/client'
import { useAuthState } from "react-firebase-hooks/auth";
import Header from '../components/Header';
import Todos from '../components/Todos';

export default function Home() {
  const {query, push, isReady} = useRouter();

  const toast = useToast();
  const toastId = 'reg-success-toast';

  // User Authentication
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if(isReady && !toast.isActive(toastId) && !loading && user) {
      if(query.result === 'reg-success') {

      }
      else if(query.result === 'login-success') {
        toast({
          title: 'Login Successful',
          status: 'success',
          duration: 6000,
          isClosable: true,
          position: 'top',
          id: toastId
        });
      }
    }
  }, [user, toast, loading, query, isReady])

  useEffect(() => {
    if (!(user || loading)) {
      push('login');
    }
  }, [user, loading, push]);

  return (
    <>
      <Header auth={auth} />
      <Center p={3}>
        {user && !loading && <Todos/>}
        {loading && <Spinner size='xl' />}
      </Center>
    </>
  )
}