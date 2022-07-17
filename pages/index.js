import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Center, Spinner } from '@chakra-ui/react';
import { auth } from '../firebase/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import Header from '../components/Header';
import TodoList from '../components/TodoList';

export default function Home() {
    const { push } = useRouter();

    // User Authentication
    const [user, loading] = useAuthState(auth);

    //redirect to login if user is not authenticated or loading
    useEffect(() => {
        if (!(user || loading)) {
            push('login');
        }
    }, [user, loading, push]);



    return (
        <>
            <Header />
            <Center p={3}>
                {user && <TodoList /> }
                {loading && <Spinner size='xl' /> }
            </Center>
        </>
    )
}