import React, { useState } from 'react';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("LoginPage - Submitting with", { username, password });
        try {
            const response = await axios.post('http://localhost:4000/login', {
                username,
                password
            });
            console.log("LoginPage - Response:", response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            console.log("localstorage :  ", localStorage.getItem('user'));
            // Stocker l'heure d'expiration du token
            const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
            localStorage.setItem('tokenExpiry', decodedToken.exp);

            setAlertMessage('Login successful!');
            setAlertSeverity('success');
            setTimeout(() => {
                window.location.href = '/';
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Login failed:', error);
            setAlertMessage('Login failed. Please check your credentials.');
            setAlertSeverity('error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                {alertMessage && (
                    <Alert severity={alertSeverity} className="mt-4">
                        <AlertTitle>{alertSeverity === 'success' ? 'Success' : 'Error'}</AlertTitle>
                        {alertMessage}
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
