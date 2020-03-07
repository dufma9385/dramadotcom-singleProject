const mongoose = require('mongoose');

const {Schema}=mongoose;

const listSchema= new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    ep:{
        type:Number,
        required:true,
    },
    actors:{
        type:String,
        required:true,
        unique:true
    },
    genre:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model('dramalist', listSchema);