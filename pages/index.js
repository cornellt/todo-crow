import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Center, Spinner, Input, Button, VStack, Box, Divider, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { auth, app } from '../firebase/client';
import { useAuthState } from "react-firebase-hooks/auth";
import Header from '../components/Header';
import Todo from '../components/Todo';
import { useState } from 'react';



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
        const todos = querySnapshot.docs.map(doc => {
          const id = doc.id;
          const data = doc.data();
          return {id, ...data };
        });
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
    setTodoInput(todoInput => '');
    try {
      await addDoc(collection(db, 'todos'), {
        uid: user.uid,
        title: todoInput,
        completed: false
      });
    } catch (e) {
      console.log(e)
    }

  };

  const deleteTodo = async (todoId) => {
    
    console.log(`deleting ${todoId}...`)
    if(todoId) {
      try {
        await deleteDoc(doc(db, 'todos', todoId));
        console.log(`done deleting`)
      } catch(e) {
        console.log(e);
      }
    } 
  }

  return (
    <>
      <Header />
      <Center p={3}>
        {user && !loading &&
          <VStack align='end'>
            <form onSubmit={addNewTodo}>
              <Box display='flex'>
                <Input onChange={changeTodoInput} value={todoInput} borderColor='gray.300' backgroundColor='gray.100' placeholder='New Todo Item'/>
                <IconButton mx='2' aria-label='Add todo' colorScheme='green' icon={<AddIcon/>} />
              </Box>
            </form>
            <Divider/>
              {todoList.map((item, index) =>
                <Todo key={index} data={item} delete={deleteTodo}/>
              )}
          </VStack>
        }
        {loading && <Spinner size='xl' />}
      </Center>
    </>
  )
}