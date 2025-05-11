const express=require("express")
const router=express.Router()
const {Comments}=require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")
const { where } = require("sequelize")


router.get("/:postId",async (req,res)=>{
    //response.json("hello world")
    const postId=req.params.postId
    const comment=await Comments.findAll({where:{PostId:postId}})
    res.json(comment)

})
router.post("/",validateToken,async (req,res)=>{
    const comment=req.body
    //we use async and await to make sure all post is created before moving
    comment.username=req.user.username
    //i got an error with just creating a comment and return it
    // in the comment const it dosent have an id
    // seeCom return the id generated in the in the data base
    //and i want to return the id so ican delete it later after creating it
    const seeCom = await Comments.create(comment);
    res.json(seeCom);
})


router.delete("/:commentId",validateToken,
    async (req,res)=>{
        //response.json("hello world")
        const id=req.params.commentId
        await Comments.destroy({where:{id:id}})
        res.json("comment deleted")
        
    
    }
)

module.exports=router