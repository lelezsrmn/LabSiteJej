import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username,
            password,
            role,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/users', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('User added successfully:', response.data);
            setUsername('');
            setPassword('');
            setRole('user');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Ajouter un utilisateur</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Nom d'utilisateur</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Mot de passe</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Rôle</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    required
                >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                </select>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded mt-4"
            >
                Ajouter
            </button>
        </form>
    );
};

export default AddUserForm;
