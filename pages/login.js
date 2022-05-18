import { useAuthState } from "react-firebase-hooks/auth";
import { Center } from '@chakra-ui/react';
import { auth } from '../firebase/client';
import SignIn from '../components/SignIn';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
    const router = useRouter(); 
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
    if(user) {
        router.push('index');
    }
    }, [user, loading, router]);

    return(
    <>
        <Header auth={auth}/>
        <Center width='100%' p={3}>
            <SignIn auth={auth}/>
        </Center>
        
    </>)
}