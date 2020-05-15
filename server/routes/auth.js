const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req,res) => {
   
    const { error } = registerValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");
    const userNameExist = await User.findOne({username: req.body.username});
    if(userNameExist) return res.status(400).send("Username already exists");

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: password
    });
    try{
        await user.save();
        res.send({user: user.id})
    }catch(err){
        res.status(400).send(err);
    }
});

router.post("/login", async (req,res) => {
    
    const { error } = loginValidation(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send("Username or password is wrong");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Username or password is wrong");

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.send({"jwt" : token});
});



module.exports = router;