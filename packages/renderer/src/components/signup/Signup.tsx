/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { FC, FormEvent} from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../GoBackButton/BackButton';
import type { signupData, signupDataFocus } from '../Hooks/stateInterface';
import { auth, db } from '../Hooks/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Error from '../Error/Error';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u


const Signup: FC = () => {
    const [usernameValid, setUsernameValid] = useState<boolean>(false);
    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [passwordValid, setPasswordValid] = useState<boolean>(false);
    const [repeatPasswordValid, setRepeatPasswordValid] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const [dataFocus, setDataFocus] = useState<signupDataFocus>({
        username: false,
        email: false,
        password: false,
        repeatPassword: false
    })
    const [data, setData] = useState<signupData>({
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    })
    console.log(auth?.currentUser)
    useEffect(() => {
        setUsernameValid(USERNAME_REGEX.test(data.username))
    }, [data.username, usernameValid])
    useEffect(() => {
        setEmailValid(EMAIL_REGEX.test(data.email))
    }, [data.email, emailValid])
    useEffect(() => {
        setPasswordValid(PASSWORD_REGEX.test(data.password));
        if (data.password.length > 0) {
            setRepeatPasswordValid(data.password === data.repeatPassword);
        }
    }, [data.password, data.repeatPassword])
    
    const changeValueData = (e: FormEvent<HTMLInputElement>): void => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setData((prevData) => ({...prevData, [name]: value}))
    }
    const onFocusState = (e: FormEvent<HTMLInputElement>): void => {
        const name = e.currentTarget.name;
        setDataFocus((prevData) => ({...prevData, [name]: true}))
    }
    const onBlurState = (e: FormEvent<HTMLInputElement>): void => {
        const name = e.currentTarget.name;
        setDataFocus((prevData) => ({...prevData, [name]: false}))
    }
 
   
    const singInFunction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, email, password } = data; 
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(result.user!, {
                displayName: username
            })
            // const userRef = collection(db, 'users');
            await setDoc(doc(db, 'users', result.user.uid), {
                uid: result.user.uid,
                displayName: username,
                email: email,
                groups: [

                ]
            })
            navigate('/chat')
        } catch (error: any) {
            console.log(error);
            setError(error.message)
        }
        
    }
    const canAdd = [usernameValid, passwordValid, emailValid, repeatPasswordValid].every(Boolean);
 
    return (
        <div className=' flex justify-center items-center h-full'>
            <BackButton />
            <div className='bg-white/20  w-[20rem] p-5 space-y-5'>
            {
                error && (
                    <Error error={error} />
                )
            }
                <form onSubmit={singInFunction}>  
                    <div className='space-y-5'>
                        <div>
                            <input type='text' onFocus={onFocusState} onBlur={onBlurState} className={`outline-none py-3 px-5 w-full rounded ${dataFocus.username && !usernameValid ? 'border-2 border-red-600' : 'border-2 border-white'}`} name='username' onChange={changeValueData} placeholder='Username' />
                            {
                                dataFocus.username && data.username && !usernameValid ? (
                                    <div className='py-1'>
                                        <p className='pSignup'>Minimum 4 letters</p>
                                        <p className='pSignup'>No special characters</p>                                
                                    </div>
                                ) : null
                            }
                        </div>
                        <div>
                            <input type='text' onFocus={onFocusState} onBlur={onBlurState} className={`outline-none py-3 px-5 w-full rounded ${dataFocus.email && !emailValid ? 'border-2 border-red-600' : 'border-2 border-white'}`}  name='email' onChange={changeValueData} placeholder='Email' />
                            {
                                dataFocus.email && data.email && !emailValid ? (
                                    <div className='py-1'>
                                        <p className='pSignup'>Valid email</p>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div>
                            <input type='password' onFocus={onFocusState} onBlur={onBlurState} className={`outline-none py-3 px-5 w-full rounded ${dataFocus.password && !passwordValid ? 'border-2 border-red-600' : 'border-2 border-white'}`}  name='password' onChange={changeValueData} placeholder='Password' />
                            {
                                dataFocus.password && data.password && !passwordValid ? (
                                    <div className='py-1'>
                                        <p className='pSignup' >4 to 24 characters.</p >
                                        <p className='pSignup'>Must include uppercase and lowercase letters.</p >
                                        <p className='pSignup'>Must include a number and a special character.</p >
                                        <p className='pSignup'>Special characters allowed: ! @ # $ %</p >
                                    </div>
                                ) : null
                            }
                        </div>
                        <div>
                            <input type='password' onFocus={onFocusState} onBlur={onBlurState} className={`outline-none py-3 px-5 w-full rounded ${dataFocus.repeatPassword && !repeatPasswordValid ? 'border-2 border-red-600' : 'border-2 border-white'}`}  name='repeatPassword' onChange={changeValueData} placeholder='Repeat password' />
                            {
                                dataFocus.repeatPassword && data.repeatPassword && !repeatPasswordValid ? (
                                    <>
                                        <div className='py-1'>
                                            <p className='pSignup'>Confirm password do not match password</p>
                                        </div>
                                    </>
                                ) : null
                            }
                        </div>
                    </div>
                    <div className='py-5'>
                        <button disabled={!canAdd} className='bg-red-600 w-full p-3 rounded text-white font-medium hover:bg-red-800 transition-all ease-out duration-200 disabled:bg-black disabled:cursor-not-allowed'>Login</button>
                    </div>              
                </form>
            </div>
        </div>
    )
}

export default Signup