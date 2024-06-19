import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, Button, TextField, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Navbar from '../../components/Navbar'

const PrinterDetails = () => {
    const { id } = useParams();
    const [printer, setPrinter] = useState(null);
    const [issueDescription, setIssueDescription] = useState('');
    const [dateReported, setDateReported] = useState(dayjs());
    const [message, setMessage] = useState('');
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        const fetchPrinterDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/printers/${id}`);
                setPrinter(response.data);
                calculateTimeRemaining(response.data.dateBegin, response.data.dureeUtilisation);
            } catch (error) {
                console.error('Error fetching printer details:', error);
            }
        };

        fetchPrinterDetails();
    }, [id]);

    const calculateTimeRemaining = (dateBegin, dureeUtilisation) => {
        const startTime = new Date(dateBegin);
        const endTime = new Date(startTime.getTime() + dureeUtilisation * 60 * 60 * 1000);
        const now = new Date();
        const timeDiff = endTime - now;
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            setTimeRemaining(`${hours}h ${minutes}m`);
        } else {
            setTimeRemaining('Utilisation terminée');
        }
    };

    const handleReportIssue = async () => {
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            if (!user) {
                setMessage('User not found in localStorage');
                return;
            }

            const response = await axios.post(`http://localhost:4000/printers/${id}/reportIssue`, {
                issueDescription,
                dateReported,
                reportedBy: user.username,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMessage('Issue reported successfully');
            setIssueDescription('');
        } catch (error) {
            console.error('Error reporting issue:', error);
            setMessage('Failed to report issue');
        }
    };

    if (!printer) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Navbar />
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    {printer.name}
                </Typography>
                <Paper elevation={3} className="p-4">
                    <Typography variant="h6" gutterBottom>
                        Status: {printer.status}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {printer.description}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Temps restant: {timeRemaining}
                    </Typography>
                    <Box mt={4}>
                        <Typography variant="h6" gutterBottom>
                            Report an Issue
                        </Typography>
                        <TextField
                            label="Issue Description"
                            value={issueDescription}
                            onChange={(e) => setIssueDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date Reported"
                                value={dateReported}
                                onChange={(newValue) => setDateReported(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                            />
                        </LocalizationProvider>
                        <Button variant="contained" color="primary" onClick={handleReportIssue}>
                            Report Issue
                        </Button>
                        {message && <Typography>{message}</Typography>}
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default PrinterDetails;
