const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }
});

const eventSchema = new Schema({
    nameImpression: { type: String },
    description: { type: String },
    dureeUtilisation: { type: String },
    choiceMachine: { type: String },
    dateBegin: { type: Date }
});

const printerSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, enum: ['libre', 'en utilisation', 'cassée'], default: 'libre' }
});

const User = mongoose.model('User', userSchema);
const EventCalendar = mongoose.model('EventCalendar', eventSchema);
const Printer = mongoose.model('Printer', printerSchema);

module.exports = { User, EventCalendar, Printer };
