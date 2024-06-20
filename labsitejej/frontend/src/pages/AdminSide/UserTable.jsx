import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const UserTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 150 },
    ];

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Liste des utilisateurs
            </Typography>
            <DataGrid
                rows={users.map(user => ({ id: user._id, ...user }))}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </Box>
    );
};

export default UserTable;
