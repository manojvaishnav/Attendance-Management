const mongoose = require('mongoose');

const subject = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    faculty:{
        type:String,
    }
});

const newSubject = new mongoose.model('subject',subject);

module.exports = newSubject;