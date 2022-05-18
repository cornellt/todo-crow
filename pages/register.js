import { useAuthState } from "react-firebase-hooks/auth";
import { Center, Spinner } from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/client';
import SignUp from '../components/SignUp';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import * as EmailValidator from 'email-validator';



export default function Register() {
    const [user, loading, error] = useAuthState(auth);

      //User Input Credentials
  const [email, setEmail] = useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }
  useEffect(() => {
    setEmailValid(EmailValidator.validate(email));
  }, [email]);

  const [password, setPassword] = useState('');
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const [confirmPassword, setConfirmPassword] = useState('');
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  useEffect(() => {
    setPasswordLongEnough(password.length >= 6);
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);


  //Checks before registration sent
  const [emailValid, setEmailValid] = useState(false);
  const [passwordLongEnough, setPasswordLongEnough] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);


  const [registrationValid, setRegistrationValid] = useState(false);
  useEffect(() => {
    setRegistrationValid(emailValid && passwordsMatch && passwordLongEnough);
  }, [emailValid, passwordsMatch, passwordLongEnough]);


  const handleSignUpForm = (event) => {
    event.preventDefault();

    if(registrationValid) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorMessage)
        });
      }
      else {
        console.log('Registration invalid!');
      }
  }

    return(
    <>
        <Header auth={auth}/>
        <Center width='100%' p={3}>
            <SignUp 
                email={email} 
                handleChangeEmail={handleChangeEmail} 
                emailValid={emailValid} 
                passwordsMatch={passwordsMatch} 
                passwordLongEnough={passwordLongEnough} 
                password={password} 
                handleChangePassword={handleChangePassword} 
                confirmPassword={confirmPassword} 
                handleChangeConfirmPassword={handleChangeConfirmPassword} 
                handleSignUpForm={handleSignUpForm} 
                registrationValid={registrationValid} />
        </Center>
        
    </>)
}