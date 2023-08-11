import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStatus from './../hooks/useAuthStatus';
import { Spinner } from '../components'




const PriveteRoute = () => {
    const { logedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <Spinner />
    }


    return logedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PriveteRoute