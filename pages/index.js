import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFirestore } from 'firebase/firestore/lite';
import { Center, Spinner } from '@chakra-ui/react';
import { auth } from '../firebase/client'
import { useAuthState } from "react-firebase-hooks/auth";
import Header from '../components/Header';

export default function Home() {
  const router = useRouter();
  // User Authentication
  const [user, loading, error] = useAuthState(auth);
  
  useEffect(() => {
    if(!(user || loading)) {
      router.push('login');
    }
  }, [user, loading, router]);
  

  return (
    <>
      <Header auth={auth}/>
      <Center width='100%' p={3}>
        {user && !loading && <></>}
        {loading && <Spinner size='xl'/>}
      </Center>
    </>
  )
}