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
    email: string;
    handleChangeEmail: () => void;
    password: string;
    handleChangePassword: () => void;
    handleSignInForm: () => void;
    emailValid: boolean;
    passwordLongEnough: boolean;
    signInValid: boolean;
};

interface RegisterFormProps  {
    email: string;
    handleChangeEmail: () => void;
    emailValid: boolean;
    password: string;
    handleChangePassword: () => void;
    passwordLongEnough: boolean;
    confirmPassword: string;
    handleChangeConfirmPassword: () => void;
    passwordsMatch: boolean;
    registrationValid: boolean;
    handleSignUpForm: () => void;
};