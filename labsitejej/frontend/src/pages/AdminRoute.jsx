import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const AdminRoute = ({ component: Component }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/LoginPage" />;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken.role === 'admin' ? <Component /> : <Navigate to="/" />;
};

export default AdminRoute;
