import { auth } from "./firebaseConfig";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";


export const GuardianLaSpage = () => {
    const location = useLocation();

    return (
        auth?.currentUser ? <Outlet /> : <Navigate to={'/'} state={{ from: location }} replace /> 
    )
}

export const SecondGuardianLaSpage = () => {
    const location = useLocation();

    return (
        auth?.currentUser ? <Navigate to='/' state={{ from: location}} replace /> : <Outlet />
    )
}