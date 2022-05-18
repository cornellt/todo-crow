import { useAuthState } from "react-firebase-hooks/auth";
import { Center, Spinner } from '@chakra-ui/react';
import { auth } from '../firebase/client';
import SignUp from '../components/SignUp';
import Header from '../components/Header';


export default function Register() {
  const [user, loading, error] = useAuthState(auth);

    return(
    <>
        <Header auth={auth}/>
        <Center width='100%' p={3}>
            <SignUp auth={auth} />
        </Center>
        
    </>)
}