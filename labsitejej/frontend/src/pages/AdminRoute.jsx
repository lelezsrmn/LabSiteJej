import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // Stockez le nom d'utilisateur lors de la connexion
    console.log("AdminRoute - Token:", token);
    console.log("AdminRoute - Username:", username);
    if (!token || username !== 'admin') {
        return <Navigate to="/Login" />;
    }
    return children;
};

export default AdminRoute;
