const express = require("express")
const router = express.Router()
const { Users } = require("../models")

//const bcrypt=require("bcrypt")
//both are the same but bcrypt is depricated (still runs ig ) but faster
const bcrypt = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const { validateToken } = require("../middlewares/AuthMiddleware")

router.post("/", async (req, res) => {
    const { username, password } = req.body
    const user = await Users.findOne({ where: { username: username } });
    if (user) { return res.json({ error: "username exist" }); }
    //we use async and await to make sure all post is created before moving
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        }); 10
        res.json("succsess")
    })

})
router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find user
    const user = await Users.findOne({ where: { username: username } })
    if (!user) {
        return res.json({ error: "User not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { return res.json({ error: "Invalid credentials" }); }

    const accessToken = sign({ username: user.username, user: user.id }, "thisIsAPasswordForToken")

    res.json({ accessToken: accessToken, username: username, id: user.id });



});
router.get("/validToken", validateToken, async (req, res) => {
    //response.json("hello world")
    res.json(req.user)

})

module.exports = router