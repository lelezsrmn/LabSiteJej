const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../authMiddleware'); // Assurez-vous d'importer le middleware
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/schema'); // Assurez-vous d'avoir un modèle utilisateur configuré
const mongoose = require('mongoose');

const CalendarEventSchema = new mongoose.Schema({
    nameImpression: String,
    description: String,
    dureeutilisation: String,
    machine: String
});

const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);

router.post('/calendarEvent', async (req, res) => {
    console.log('Received request with data:', req.body);
    const {nameImpression, description, dureeutilisation, machine} = req.body;
    try {
        const event = new CalendarEvent({
            nameImpression,
            description,
            dureeutilisation,
            machine
        });
        await event.save();
        console.log('Event saved to database:', event);
        res.send('Event saved successfully');
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).send('Error saving event');
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid password');
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
});

router.post('/adminOnlyRoute', verifyToken, verifyAdmin, (req, res) => {
    res.send('This is an admin only route');
});

router.get('/users', (req, res) => {


    const userData =
        [
            {
                "id": 1,
                "name": "jejman",
                "username": "jejmanle3",
                "email": "jejmanle3@gmail.com",
                "adress": {
                    "street": "rue giseles freund",
                    "suite": "suite 1",
                    "city": "paris",
                    "zipcode": "75001",
                },
                "phone": "0631332858"
            },
            {
                "id": 2,
                "name": "Émilie Dupont",
                "username": "emi_dupont",
                "email": "emilie.dupont@example.com",
                "address": {
                    "street": "12 Rue des Lilas",
                    "suite": "Apt. 7B",
                    "city": "Lyon",
                    "zipcode": "69003"
                },
                "phone": "0678945612"
            },
            {
                "id": 3,
                "name": "Alexandre Mercier",
                "username": "alex_mercier92",
                "email": "alex.mercier@mail.com",
                "address": {
                    "street": "27 Avenue du Parc",
                    "suite": null,
                    "city": "Marseille",
                    "zipcode": "13008"
                },
                "phone": "0612349876"
            }
        ]
    res.send((userData));
})

module.exports = router;