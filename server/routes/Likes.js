const express=require("express")
const router=express.Router()
const {Likes}=require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware")
const { where } = require("sequelize")


router.post("/",validateToken,async (req,res)=>{
    const {PostId}=req.body
    const UserId=req.user.user
    const found=await Likes.findOne({where:{PostId:PostId,UserId:UserId}})
    if(!found){
        await Likes.create({
            PostId:PostId,
            UserId:UserId});
        return res.json("liked");
    }
    await Likes.destroy({where:{PostId:PostId,UserId:UserId}})
    return res.json("unliked")    
})




module.exports=router