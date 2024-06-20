const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const impressionSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    nameImpression: { type: String, required: true },
    description: { type: String, required: true },
    dureeUtilisation: { type: String, required: true },
    dateBegin: { type: Date, required: true },
    choiceMachine: { type: String, required: true },
});



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

const issueSchema = new Schema({
    description: { type: String, required: true },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dateReported: { type: Date, default: Date.now }
});

const printerSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String },
    dateBegin: { type: Date },
    dureeUtilisation: { type: Number },
    issues: [issueSchema]
});

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    languages: { type: [String], required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const EventCalendar = mongoose.model('EventCalendar', eventSchema);
const Printer = mongoose.model('Printer', printerSchema);
const Project = mongoose.model('Project', projectSchema);
const Impression = mongoose.model('Impression', impressionSchema);

module.exports = { User, EventCalendar, Printer, Project, Impression };
