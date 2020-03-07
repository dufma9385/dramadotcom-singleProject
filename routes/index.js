const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    
    res.render('index',{name:req.session.name, title:"main"});
});

module.exports = router;