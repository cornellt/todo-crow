import { Input, VStack, Box, Divider, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Todo from '../components/Todo';
import { getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { app, auth } from '../firebase/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';



export default function TodoList(props) {
    const db = getFirestore(app);

    // User Authentication
    const [user] = useAuthState(auth);

    //todo state
    const [todoList, setTodoList] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const changeTodoInput = (event) => {
        setTodoInput(event.target.value);
    };
    
    //update Firestore Database listener when 'user' changes and user.uid exists
    useEffect(() => {
        if (!user || !db) return
        if (user.uid && db) {
            const q = query(collection(db, 'todos'), where('uid', '==', user.uid));
            onSnapshot(q, (querySnapshot) => {
                const todos = querySnapshot.docs.map(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    return { id, ...data };
                });

                setTodoList(todos);
            });
        }
    }, [user, db]);

    const addNewTodo = async (event) => {
        event.preventDefault();
        setTodoInput('');

        try {
            await addDoc(collection(db, 'todos'), {
                uid: user.uid,
                title: todoInput,
                completed: false,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.log(error)
        }

    };

    const deleteTodo = async (todoId) => {
        if (todoId) {
            try {
                await deleteDoc(doc(db, 'todos', todoId));
            } catch (error) {
                console.log(error);
            }
        }
    }

    const toggleTodo = async (todoId, currentValue) => {
        if (todoId) {
            try {
                await setDoc(doc(db, 'todos', todoId), { completed: !currentValue }, { merge: true });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <VStack align='end'>
            <form onSubmit={addNewTodo}>
                <Box display='flex'>
                    <Input onChange={changeTodoInput} value={todoInput} borderColor='gray.300' backgroundColor='gray.100' placeholder='New Todo Item' />
                    <IconButton mx='3' aria-label='Add todo' colorScheme='green' onClick={addNewTodo} icon={<AddIcon />} />
                </Box>
            </form>
            <Divider />
            {todoList.filter(todo => !todo.completed).map(incompleteTodo =>
                <Todo key={incompleteTodo.id} data={incompleteTodo} delete={deleteTodo} toggle={toggleTodo} />
            )}
            {todoList.filter(todo => todo.completed).map(completeTodo =>
                <Todo key={completeTodo.id} data={completeTodo} delete={deleteTodo} toggle={toggleTodo} />
            )}
        </VStack>
    )
}