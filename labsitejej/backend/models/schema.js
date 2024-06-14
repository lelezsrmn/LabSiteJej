const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String},
    email: {type:String},
    password: {type:String}
})

const EventSchema = new Schema({
    nomImpression: {type:String},
    description: {type:String},
    dureUtilisation: {type:String},
    choiceMachine: {type:String},
    dateBegin: {type:Date}
})

const Users = mongoose.model('Users', userSchema, 'users');
const EventCalendar = mongoose.model('EventCalendar', EventSchema, 'eventCalendar');

const mySchemas = {'Users':Users, 'EventCalendar':EventCalendar}

module.exports = mySchemas;