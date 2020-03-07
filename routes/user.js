const express= require('express');
const router = express.Router();
const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/drama";

let dbo;

MongoClient.connect(url, function(err, db) {
    if (err){
        console.log(err);
    }else{
        dbo = db.db("drama");
    }
});

router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.json({message:"logout 되었습니다."}); 
    });
});

router.post('/login',(req,res)=>{
    const myobj = req.body;
        dbo.collection("user").findOne({ userEmail: myobj.idEmail, userPw: myobj.idPw }, function (err, result) {
            if(result == null){
                console.log(err);
                res.json({message:'로그인 실패'});
            }else{
                console.log(result);
                req.session.email=result.userEmail;
                req.session.name=result.userName;
                //res.json({message:result.userName+"님 안녕하세요", data:true});
                dbo.collection("dramalist").find({}).toArray(function(err, allresult) {
                    if (err){
                        console.log(err);
                        res.json({message:false});
                    }else{
                        res.render('main',{title:"글쓰기 목록", name:req.session.name, allresult});
                    }
                });            
            }
        });  
});

router.post('/sign',(req,res)=>{
    const myobj = req.body;
    dbo.collection("user").insertOne(myobj, function(err, result) {
        if (err){
            console.log(err);
            res.json({message:"회원가입 실패"});
        }else{
            res.json({message:"회원가입 성공! 로그인 해주세요"});
        }
    });
});

module.exports=router;