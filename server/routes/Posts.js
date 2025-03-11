const express=require("express")
const router=express.Router()
const {Posts,Likes}=require("../models")
const { where } = require("sequelize")
const { validateToken } = require("../middlewares/AuthMiddleware")
router.get("/",validateToken,async (req,res)=>{
    //response.json("hello world")
    const listOfPosts=await Posts.findAll({include:[Likes]})
    const likedPosts=await Likes.findAll({where:{userId:req.user.user}})
    res.json({listOfPosts:listOfPosts,likedPosts:likedPosts,username:req.user.username})

})
router.get("/byId/:id",validateToken,async (req,res)=>{
    //response.json("hello world")
    
    const id=req.params.id
    const singlePost=await Posts.findByPk(id)
    const likedPost=await Likes.findOne({where:{userId:req.user.user,PostId:id}})
    likeCount=await Likes.count({where:{PostId:id}})
    if(likedPost){
        res.json({singlePost:singlePost,likedPost:true,likeCount:likeCount})
    }
    else{res.json({singlePost:singlePost,likedPost:false,likeCount:likeCount})}

    //const Post=await Posts.findOne({where:{id:id}})
    

})

router.post("/",validateToken,async (req,res)=>{
    //response.json("hello world")
    //we will store everything in post
    console.log("this from")
    const username=req.user.username
    const post=req.body
    console.log("username")
    console.log(username)
    const newPost=await Posts.create({...post,username:username})
    res.json(newPost);

})

router.delete("/:id",validateToken,async (req,res)=>{
    
    const username=req.user.username
    const id=req.params.id
    const post=await Posts.findByPk(id)
    console.log(post.id)
    console.log(username)
    console.log(post.username)
    if(username==post.username){
        await Posts.destroy({where:{id:post.id}})
        res.json("deleted");}
        
    else{
        res.json("you can't delete someone else post");
    } 
})

module.exports=router