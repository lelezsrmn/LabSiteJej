import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const MesImpressions = () => {
    const [impressions, setImpressions] = useState([]);

    useEffect(() => {
        const fetchImpressions = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4000/user/impressions', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setImpressions(response.data);
                console.log('Fetched impressions:', response.data);
            } catch (error) {
                console.error('Error fetching impressions:', error);
            }
        };
        fetchImpressions();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-blue-950">
            <Navbar />
            <Box sx={{ backgroundColor: '#e3f2fd', minHeight: '100vh', paddingTop: 4 }}>
                <Container>
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ marginBottom: 4 }}>
                        Mes Impressions
                    </Typography>
                    <Grid container spacing={3}>
                        {impressions.map((impression, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <StyledPaper>
                                    <Typography variant="h6" gutterBottom>
                                        {impression.nameImpression}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Description: {impression.description}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Durée d'utilisation: {impression.dureeUtilisation} heures
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Date: {new Date(impression.dateBegin).toLocaleDateString()}
                                    </Typography>
                                </StyledPaper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </div>
    );
};

export default MesImpressions;
