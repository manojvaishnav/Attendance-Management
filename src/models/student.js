const mongoose = require('mongoose');

const student = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    birth:{
        type:String,
        required:true,
    },
    id:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    semester:{
        type:String,
        required:true,
    },
});

const newStudent = new mongoose.model('student',student);

module.exports = newStudent;