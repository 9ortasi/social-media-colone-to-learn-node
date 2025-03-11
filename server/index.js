//initilizing the server app
const express=require('express')
const  app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
//this will get all the files and tables so we can manage the database
const db=require("./models")

//routers calling 

const postRouter=require("./routes/Posts")
app.use("/posts",postRouter)

const commentsRouter=require("./routes/Comments")
app.use("/comments",commentsRouter)

const usersRouter=require("./routes/Users")
app.use("/auth",usersRouter)

const likesRouter=require("./routes/Likes")
app.use("/likes",likesRouter)

db.sequelize.sync().then(()=>{

//selecting a port and a call back for whenever you call the or use the server
app.listen(3001,()=>{console.log("server running on port 3001")});

});