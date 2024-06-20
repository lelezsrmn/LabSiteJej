import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPrinterForm from './AddPrinterForm';
import AddUserForm from './AddUserForm';
import UserTable from './UserTable';
import Navbar from '../../components/Navbar';
import { Container, Grid, Paper, Typography, Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.default,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

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
            <CssBaseline />
            <Navbar />
            <Box sx={{ backgroundColor: '#e3f2fd', minHeight: '100vh', paddingTop: 4 }}>
                <Container>
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ marginBottom: 4 }}>
                        Tableau de bord admin
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <StyledPaper elevation={3}>
                                <Typography variant="h6" gutterBottom>
                                    Ajouter une imprimante
                                </Typography>
                                <AddPrinterForm />
                            </StyledPaper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledPaper elevation={3}>
                                <Typography variant="h6" gutterBottom>
                                    Ajouter un utilisateur
                                </Typography>
                                <AddUserForm />
                            </StyledPaper>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledPaper elevation={3}>
                                <Typography variant="h6" gutterBottom>
                                    Liste des utilisateurs
                                </Typography>
                                <UserTable />
                            </StyledPaper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default AdminDashboard;
