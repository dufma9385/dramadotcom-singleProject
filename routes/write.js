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

router.post('/getAllDrama',(req,res)=>{
    dbo.collection("dramalist").find({}).toArray(function(err, allresult) {
        if (err){
            console.log(err);
            res.json({message:false});
        }else{
            res.render('main',{title:"글쓰기 목록", name:req.session.name, allresult});
        }
    });
});
router.post('/delete', (req,res)=>{
    const myquery = { _id: mongo.ObjectId(req.body._id) };
    // console.log(req.body.dramatitle);
    // console.log(req.session.email);
    dbo.collection("comments").deleteOne(myquery, function(err, obj) {
        if (err){
            console.log(err);
            res.json({message:false});
        }else{
            dbo.collection("comments").find({dramatitle:req.body.dramatitle}).toArray(function(err, allresult) {
                if (err){
                    console.log(err);
                    res.json({message:false});
                }else{
                    res.json({message:"삭제되었습니다",allresult});
                    //res.render('comment',{allresult, message:"삭제되었습니다"});
                }
            });
        }
    });
    
});

router.post('/reviewUp',(req,res)=>{
    const myobj = req.body;
    if(req.body.review){
        dbo.collection("comments").insertOne({dramatitle:myobj.dramatitle, comment:myobj.review, commenter:req.session.email}, function(err, result) {
            if (err){
                console.log(err);
                res.json({message:false});
            }else{
                res.json({message:"등록되었습니다"});   
            }
        });
    }else{
        res.json({message:"글을 입력해 주세요"});
    }
    
});

router.post('/getAllComments',(req,res)=>{
    console.log(req.session.email);
    dbo.collection("comments").find({dramatitle:req.body.dramatitle}).toArray(function(err, allresult) {
        if (err){
            console.log(err);
            res.json({message:false});
        }else{
            res.json({allresult});
            //res.render('comment',{allresult});
        }
    });
});

router.post('/detail_view', (req,res)=>{
    if(req.session.email){
        const myquery = { _id: mongo.ObjectId(req.body._id)};
        //console.log(req.body);
        dbo.collection("dramalist").findOne(myquery,function(err, result) {
            if(result==null){
                console.log(err);
                res.json({message:"로그인 실패"});
            }else{
                res.render('main_detail',{title:"댓글", result, name:req.session.name});
            }
        });
    }else{
        res.json({message:"로그인 필요"});
    }
});
module.exports=router;