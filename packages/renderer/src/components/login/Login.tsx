import React, { useState, FormEvent } from 'react';
import BackButton from '../GoBackButton/BackButton';
import { loginData } from '../Hooks/stateInterface';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Hooks/firebaseConfig';
import Error from '../Error/Error';
import { useNavigate } from 'react-router-dom';
import { tooManyAttemps, unknownUser, wrongEmail, wrongPassword } from '../Hooks/errorMessages';

const Login: React.FC = () => {
    
    const [data, setData] = useState<loginData>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const changeValueData = (e: FormEvent<HTMLInputElement>): void => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setData((prevData) => ({...prevData, [name]: value}))
    }

    const singInFunction = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            if (email && password) {
                await signInWithEmailAndPassword(auth, email, password)
                navigate('/chat')
            }
        } catch (error: any) {
            const errorMessage = error.message;
            console.log(errorMessage)
            if(errorMessage == wrongEmail ) {
                setError('Invalid email')
            } else if (errorMessage == wrongPassword ) {
                setError('Wrong password')
            } else if (errorMessage == tooManyAttemps ) {
                setError('Too many attemps, try again later')
            }  else if ( errorMessage === unknownUser ) {
                setError("User doesn't exist")
            }
        }
    }

    return (
        <div className=' flex justify-center items-center h-full'>
            <BackButton />
            
            <div className='bg-white/20 w-[20rem] p-5 space-y-5'>
                {
                    error ? (
                        <Error error={error} />
                    ) : null
                }
                <form onSubmit={singInFunction}>
                <div className='space-y-5'>
                    <input type='text' className='outline-none py-3 px-5 w-full rounded' name='email' onChange={changeValueData} placeholder='Email' />
                    <input type='password' className='outline-none py-3 px-5 w-full rounded' name='password' onChange={changeValueData} placeholder='Password' />
                    <div className='' >
                        <button className='bg-red-600 w-full p-3 rounded text-white font-medium hover:bg-red-800 transition-all ease-out duration-200'>Login</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login