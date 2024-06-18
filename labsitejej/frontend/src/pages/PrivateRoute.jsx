import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    console.log("PrivateRoute - Token:", token);
    console.log("PrivateRoute - Token Expiry:", tokenExpiry);

    if (token && tokenExpiry) {
        const currentTime = Date.now() / 1000;
        if (currentTime < tokenExpiry) {
            return children;
        } else {
            console.log("PrivateRoute - Token expired");
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiry');
            return <Navigate to="/login" />;
        }
    } else {
        console.log("PrivateRoute - No token found, redirecting to /login");
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
