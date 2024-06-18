const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Charger les variables d'environnement

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/', router);

const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_URI, dbOptions)
    .then(async () => {
        console.log("DB Connected !!");

        // Check if an admin user exists, if not, create one
        const { User } = require('./models/schema');
        const adminExists = await User.findOne({ role: 'admin' });
        console.log("Admin exists:", adminExists);
        if (!adminExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin', salt); // default password 'admin'

            const adminUser = new User({
                username: 'admin',
                password: hashedPassword,
                role: 'admin',
            });

            try {
                await adminUser.save();
                console.log("Default admin user created.");
            } catch (err) {
                console.error("Error creating default admin user:", err);
            }
        }
    })
    .catch(err => console.log("DB Connection Error:", err));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
