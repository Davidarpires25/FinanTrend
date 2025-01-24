import React, {  ReactNode } from 'react'
import { useAuth } from '../Context/userAuth';
import {Navigate, useLocation } from 'react-router-dom';

type Props = {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ children }: Props): JSX.Element => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    return (

        <>
            (
            {
                isLoggedIn() ?
                    (
                        <>{children}</>
                    ) : (
                        <Navigate to="/login" state={{ from: location }} replace></Navigate>
                    )};

            );

        </>
    );
}
export default ProtectedRoute;