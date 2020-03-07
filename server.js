const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    resave:false,
    saveUninitialized:true,
    secret : '현빈짱',
    cookie:{
        httpOnly:true,
        secure:false
    }
}));

app.use('/user', require('./routes/user'));
app.use('/write', require('./routes/write'));
app.use('/', require('./routes/index'));

app.listen(9090,()=>{
    console.log("server 9090 ready");
});
