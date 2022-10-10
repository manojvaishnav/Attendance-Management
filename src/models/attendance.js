const mongoose = require('mongoose');

const attendance = mongoose.Schema({
    date:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    present:{
        type:Array,
        default:[]
    }
});

const newAttendance = new mongoose.model('attendance',attendance);

module.exports = newAttendance;