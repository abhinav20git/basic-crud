const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
async function signup (req,res){
    try{
    //get the email from req body
    const {email,password}=req.body;
    const hashedPassword = bcrypt.hashSync(password,8);
    //create user with data
    await User.create({email,password:hashedPassword});
    //respond  
    res.sendStatus(200);
    }catch(e){
        console.log(e.message);
        res.sendStatus(400);
    } 
};

async function login(req,res){
    try{
    //get password from req body
    const {email,password} = req.body;
    //check if email exist in db
    const user=await User.findOne({email});
    if(!user) return res.sendStatus(401);
    //check if password matches user password in db
    const passwordMatch=bcrypt.compareSync(password,user.password);
    if(!passwordMatch) return res.sendStatus(401);
    //create a jwt token
    const exp=Date.now()+1000*60*60*24*30;
    const token=jwt.sign({sub:user._id,exp },process.env.SECRET)
    //set the cookie
    res.cookie("Authorization",token,{
        expires:new Date(exp),
        httpOnly:true,
        sameSite:"lax",
        secure:process.env.NODE_ENV === "production",
    })
    //send the status
    
    res.sendStatus(200);
}catch(e) {
    console.log("Error");
    res.sendStatus(400);
}
};

function logout(req,res){
        res.clearCookie("Authorization");
        res.sendStatus(200);
};

function checkAuth(req,res){
    console.log(req.user);
    res.sendStatus(200);
}
module.exports={
    signup,
    login,
    logout,
    checkAuth,
}