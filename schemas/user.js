const mongoose = require('mongoose');

const {Schema}=mongoose;

const userSchema= new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    pw:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('user', userSchema);