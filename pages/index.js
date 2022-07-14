import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFirestore } from 'firebase/firestore';
import { Center, Spinner } from '@chakra-ui/react';
import { auth, app } from '../firebase/client';
import { useAuthState } from "react-firebase-hooks/auth";
import Header from '../components/Header';
//import Todo from '../components/Todo';
import { useState } from 'react';

import { collection, addDoc, query, where, onSnapshot } from "firebase/firestore";

import { Input, Text, VStack} from '@chakra-ui/react';


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
  }, [user]);

  //redirect to login if user is not authenticated or loading
  useEffect(() => {
    if (!(user || loading)) {
      push('login');
    }
  }, [user, loading, push]);

  //cleanup upon deletion
  useEffect(() => {
    return(() => {
      unsubscribe && unsubscribe() && console.log('unsubbed!');
    })
  }, [])

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
          <VStack>
            <form onSubmit={addNewTodo}>
              <Input onChange={changeTodoInput} value={todoInput} w={'50vw'} borderColor='gray.300' backgroundColor='gray.100' placeholder='New Todo Item'/>
            </form>
              {todoList.map((item, index) =>
                <Text key={index}>{item.title}</Text>
              )}
            </VStack>
        }
        {loading && <Spinner size='xl' />}
      </Center>
    </>
  )
}