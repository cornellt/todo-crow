import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFirestore } from 'firebase/firestore';
import { Center, Spinner } from '@chakra-ui/react';
import { auth, app } from '../firebase/client';
import { useAuthState } from "react-firebase-hooks/auth";
import Header from '../components/Header';
import Todo from '../components/Todo';
import { useState } from 'react';

import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";

import { Input, Button, VStack, Box, Divider } from '@chakra-ui/react';


export default function Home() {
  const { push } = useRouter();
  const db = getFirestore(app);

  // User Authentication
  const [user, loading, error] = useAuthState(auth);

  //Listener for Firestore Database
  const [unsubscribe, setUnsubscribe] = useState();

  //todo state
  const [todoList, setTodoList] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const changeTodoInput = (e) => {
    setTodoInput(e.target.value);
  };

  //update Firestore Database listener when 'user' changes and user.uid exists
  useEffect(() => {
    if(!user) return

    if(user.uid) {
      const q = query(collection(db, 'todos'), where('uid', '==', user.uid));
      setUnsubscribe(unsubscribe =>
        onSnapshot(q, (querySnapshot) => {
        const todos = querySnapshot.docs.map(doc => doc.data());
        setTodoList(todos);
      }));
    }
  }, [user, db]);

  //redirect to login if user is not authenticated or loading
  useEffect(() => {
    if (!(user || loading)) {
      push('login');
    }
  }, [user, loading, push]);

  const addNewTodo = async (e) => {
    e.preventDefault();
    try {
      const newTodoRef = await addDoc(collection(db, 'todos'), {
        uid: user.uid,
        title: todoInput,
        completed: false
      });

      console.log(`Document written with ID ${newTodoRef.id}`)
      setTodoInput(todoInput => '');
    } catch (e) {
      console.log(e)
    }

  };

  return (
    <>
      <Header />
      <Center p={3}>
        {user && !loading &&
          <VStack align='end'>
            <form onSubmit={addNewTodo}>
              <Box display='flex'>
                <Input onChange={changeTodoInput} value={todoInput} borderColor='gray.300' backgroundColor='gray.100' placeholder='New Todo Item'/>
                <Button mx='3' colorScheme={'green'}>Add Todo</Button>
              </Box>
            </form>
            <Divider/>
              {todoList.map((item, index) =>
                <Todo key={index} data={item}/>
              )}
          </VStack>
        }
        {loading && <Spinner size='xl' />}
      </Center>
    </>
  )
}