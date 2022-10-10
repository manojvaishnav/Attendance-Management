const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const faculty = mongoose.Schema({
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
        required:true
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    class:{
        type:Array,
        default:[]
    }
});

faculty.pre('save', async function (next) {
    if (this.isModified('password')) {
        // console.log(`password before bcrypt ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10)
        // console.log(`password after bcrypt ${this.password}`);
    }

    next();
});

const newFaculty = new mongoose.model('faculty',faculty);

module.exports = newFaculty;