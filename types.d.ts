interface Todo {
    id: string;
    completed: boolean;
    createdAt: FieldValue;
    uid: string;
    title: string;
};

interface TodoProps {
    key: string;
    data: Todo;
    delete: (todoId: string) => void;
    toggle: (todoId: string, currentValue: boolean) => void;
};

interface LoginFormProps  {
    handleSignInForm: (email: string, password: string) => void;
};

interface RegisterFormProps  {
    handleSignUpForm: (email: string, password: string) => void;
};