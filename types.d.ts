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
    email: string;
    handleChangeEmail: (event: FormEvent<HTMLInputElement>) => void;
    emailValid: boolean;
    password: string;
    handleChangePassword: (event: FormEvent<HTMLInputElement>) => void;
    passwordLongEnough: boolean;
    confirmPassword: string;
    handleChangeConfirmPassword: (event: FormEvent<HTMLInputElement>) => void;
    passwordsMatch: boolean;
    registrationValid: boolean;
    handleSignUpForm: () => void;
};