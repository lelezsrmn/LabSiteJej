import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPrinterForm from './AddPrinterForm';
import AddUserForm from './AddUserForm';
import UserTable from './UserTable';
import Navbar from '../../components/Navbar';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
    
const AdminDashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Fetched user data:', response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <Navbar />
            <Box sx={{ backgroundColor: '#e3f2fd', minHeight: '100vh', paddingTop: 4 }}>
                <Container>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Tableau de bord admin
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} className="p-4">
                                <Typography variant="h6" gutterBottom>
                                    Ajouter une imprimante
                                </Typography>
                                <AddPrinterForm />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={3} className="p-4">
                                <Typography variant="h6" gutterBottom>
                                    Ajouter un utilisateur
                                </Typography>
                                <AddUserForm />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} className="p-4">
                                <Typography variant="h6" gutterBottom>
                                    Liste des utilisateurs
                                </Typography>
                                <UserTable />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default AdminDashboard;
