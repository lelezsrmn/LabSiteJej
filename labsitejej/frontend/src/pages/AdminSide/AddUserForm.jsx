import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

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
        <form onSubmit={handleSubmit}>
            <TextField
                label="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Rôle</InputLabel>
                <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                >
                    <MenuItem value="user">Utilisateur</MenuItem>
                    <MenuItem value="admin">Administrateur</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Ajouter
            </Button>
        </form>
    );
};

export default AddUserForm;
