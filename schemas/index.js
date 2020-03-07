const mongoose = require('mongoose');

module.exports=()=>{
    const connect=()=>{
        if(process.env.NODE_ENV !== 'production'){
            mongoose.set('debug',true);
        }
        mongoose.connect('mongodb://localhost:27017/drama',{dbName:'drama'},(err)=>{
            if(err){
                console.log("con error",err);
            }else{
                console.log('con ok');
            }
        });
    };
    connect();
    mongoose.connection.on('error',(err)=>{
        console.log('mongo db connection err',err);
    });
    mongoose.connection.on('disconnected',()=>{
        console.log("try again");
        connect();
    });

    require('./user');
    require('./dramalist');
    // require('./comments');
};