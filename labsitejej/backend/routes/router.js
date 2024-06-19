const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../authMiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, EventCalendar, Printer } = require('../models/schema');
const mongoose = require('mongoose');

router.post('/printers', verifyToken, verifyAdmin, async (req, res) => {
    const { name, status } = req.body;
    try {
        const newPrinter = new Printer({ name, status });
        await newPrinter.save();
        res.json(newPrinter);
    } catch (error) {
        res.status(500).send('Error adding printer');
    }
});

// Route pour obtenir la liste des imprimantes
router.get('/printers', async (req, res) => {
    try {
        const printers = await Printer.find();
        res.json(printers);
    } catch (error) {
        res.status(500).send('Error fetching printers');
    }
});

router.post('/printers/:id/reportIssue', verifyToken, async (req, res) => {
    const { issueDescription, dateReported } = req.body;
    const userId = req.user._id;

    try {
        const printer = await Printer.findById(req.params.id);
        if (!printer) {
            return res.status(404).send('Printer not found');
        }

        printer.issues.push({
            description: issueDescription,
            reportedBy: userId,
            dateReported: dateReported || new Date(),
        });

        await printer.save();
        res.send('Issue reported successfully');
    } catch (error) {
        res.status(500).send('Error reporting issue');
    }
});

router.get('/printers/:id', async (req, res) => {
    try {
        const printer = await Printer.findById(req.params.id);
        if (!printer) {
            return res.status(404).send('Printer not found');
        }
        res.json(printer);
    } catch (error) {
        res.status(500).send('Error fetching printer details');
    }
});

// Route pour mettre à jour l'état d'une imprimante
router.put('/printers/:id', verifyToken, verifyAdmin, async (req, res) => {
    const { status } = req.body;
    try {
        const printer = await Printer.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(printer);
    } catch (error) {
        res.status(500).send('Error updating printer status');
    }
});

router.get('/checkPrintersUsage', async (req, res) => {
    try {
        const events = await EventCalendar.find();
        const printers = await Printer.find();

        printers.forEach(printer => {
            const isUsed = events.some(event => event.choiceMachine === printer.name);
            printer.status = isUsed ? 'en utilisation' : 'libre';
        });

        await Promise.all(printers.map(printer => printer.save()));

        res.json(printers);
    } catch (error) {
        res.status(500).send('Error checking printer usage');
    }
});

router.post('/calendarEvent', async (req, res) => {
    console.log('Received request with data:', req.body);
    const { nameImpression, description, dureeUtilisation, choiceMachine, dateBegin } = req.body;

    // Convertir dateBegin en heure locale pour le journal
    const localDateBegin = new Date(dateBegin).toLocaleString();

    try {
        const event = new EventCalendar({
            nameImpression,
            description,
            dureeUtilisation,
            choiceMachine,
            dateBegin
        });
        await event.save();
        console.log('Event saved to database:', event);
        console.log("-------------------------------------------");
        res.send('Event saved successfully');
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).send('Error saving event');
    }
});

router.get('/user', verifyToken, async (req, res) => {
    console.log('Fetching user data for:', req.user._id);
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Server error');
    }
});

router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

router.post('/users', verifyToken, verifyAdmin, async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role });
        console.log('New user created:', newUser);
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).send('Error adding user');
    }
});

router.post('/login', async (req, res) => {
    console.log('Login request received with data:', req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        console.log("User not found:", username);
        return res.status(400).send('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        console.log("Invalid password for user:", username);
        return res.status(400).send('Invalid password');
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful, token generated:', token);
    res.send({ token, role: user.role });
});

router.post('/adminOnlyRoute', verifyToken, verifyAdmin, (req, res) => {
    console.log('Admin only route accessed');
    res.send('This is an admin only route');
});

router.get('/events', async (req, res) => {
    const { date } = req.query;
    try {
        const events = await EventCalendar.find({
            dateBegin: {
                $gte: new Date(date).setHours(0, 0, 0, 0),
                $lt: new Date(date).setHours(23, 59, 59, 999),
            },
        });
        res.send(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events');
    }
});

module.exports = router;
