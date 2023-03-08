import React, { FC, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import BackButton from "../GoBackButton/BackButton";


const HomeScreen: FC = () => {
    const navigate = useNavigate()
    const onClickGoBack = (): void => {
        navigate(-1);
    }
    return (
        <div className="flex items-center justify-center h-full">
            <div className="">
                <p className="text-2xl text-center md:text-4xl xl:text-5xl text-white">Welcome to The Conjured application</p>
                <div className="flex justify-center space-x-5 py-5 ">
                    <Link to='/login'>
                        <button className="button">
                            Login
                        </button>
                    </Link>
                    <Link to='/signup'>
                        <button className="button">
                            Sign up
                        </button>
                    </Link>
                    <Link to='/chat'>
                        <button className="button">
                            Chat
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default HomeScreen