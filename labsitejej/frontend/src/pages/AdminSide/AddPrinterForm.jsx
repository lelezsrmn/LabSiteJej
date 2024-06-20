import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';

const AddPrinterForm = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('libre');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            status,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/printers', data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Printer added successfully:', response.data);
            setName('');
            setStatus('libre');
        } catch (error) {
            console.error('Error adding printer:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Ajouter une nouvelle imprimante
            </Typography>
            <TextField
                label="Nom de l'imprimante"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Statut de l'imprimante</InputLabel>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <MenuItem value="libre">Libre</MenuItem>
                    <MenuItem value="en utilisation">En utilisation</MenuItem>
                    <MenuItem value="cassée">Cassée</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Ajouter
            </Button>
        </Box>
    );
};

export default AddPrinterForm;
