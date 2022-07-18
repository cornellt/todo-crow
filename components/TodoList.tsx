import { Input, VStack, Box, Divider, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Todo from './Todo';
import { FieldValue, getFirestore, collection, addDoc, query, where, onSnapshot, deleteDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { app, auth } from '../firebase/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState, FormEvent, MouseEvent } from 'react';

export interface Todo {
    id: string;
    completed: boolean;
    createdAt: FieldValue;
    uid: string;
    title: string;
};

export default function TodoList() {
    const db = getFirestore(app);

    // User Authentication
    const [user] = useAuthState(auth);

    //todo state
    const [todoList, setTodoList] = useState<Todo[]>([]);
    const [todoInput, setTodoInput] = useState('');
    const changeTodoInput = (event: FormEvent<HTMLInputElement>) => {
        setTodoInput(event.currentTarget.value);
    };

    //update Firestore Database listener when 'user' changes and user.uid exists
    useEffect(() => {
        if (!user || !db) return
        if (user.uid && db) {
            const q = query(collection(db, 'todos'), where('uid', '==', user.uid));
            onSnapshot(q, (querySnapshot) => {
                const todos = querySnapshot.docs.map(doc => {
                    const id = doc.id;
                    const { completed, createdAt, uid, title } = doc.data()
                    
                    return { id, title, completed, createdAt, uid };
                });

                setTodoList(todos);
            });
        }
    }, [user, db]);

    const addTodo = async (event: MouseEvent | FormEvent) => {
        event.preventDefault();
        const input = todoInput;
        setTodoInput('');

        try {
            await addDoc(collection(db, 'todos'), {
                uid: user?.uid,
                title: input,
                completed: false,
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.log(error)
        }

    };

    const deleteTodo = async (todoId: string) => {
        try {
            await deleteDoc(doc(db, 'todos', todoId));
        } catch (error) {
            console.log(error);
        }
    }

    const toggleTodo = async (todoId: string, currentValue: boolean) => {
        try {
            await setDoc(doc(db, 'todos', todoId), { completed: !currentValue }, { merge: true });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <VStack align='end'>
            <form onSubmit={addTodo}>
                <Box display='flex'>
                    <Input onChange={changeTodoInput} value={todoInput} borderColor='gray.300' backgroundColor='gray.100' placeholder='New Todo Item' />
                    <IconButton mx='3' aria-label='Add todo' colorScheme='green' onClick={addTodo} icon={<AddIcon />} />
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