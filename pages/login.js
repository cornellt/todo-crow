import { useAuthState } from "react-firebase-hooks/auth";
import { Center } from '@chakra-ui/react';
import { auth } from '../firebase/client';
import SignIn from '../components/SignIn';
import Header from '../components/Header';


export default function Login() {
  const [user, loading, error] = useAuthState(auth);

    return(
    <>
        <Header auth={auth}/>
        <Center width='100%' p={3}>
            <SignIn auth={auth}/>
        </Center>
        
    </>)
}