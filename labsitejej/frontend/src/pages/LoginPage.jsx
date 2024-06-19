import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

            // Stocker l'heure d'expiration du token
            const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
            localStorage.setItem('tokenExpiry', decodedToken.exp);

            window.location.href = '/';
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h1 className="text-xl font-bold mb-4">Login</h1>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded mt-4"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
