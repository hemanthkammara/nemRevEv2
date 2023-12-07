const { userModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("check user router");
});




userRouter.post("/register", async (req, res) => {
  const { username, avatar, email, password } = req.body;

   const user=await userModel.findOne({email});

   if(user){
    res.status(200).send({"msg":"user already exists with this email"})
   }

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res.status(200).send({ msg: "not able to hash password" });
      } else {
        const user = new userModel({ username, avatar, email, password: hash });
        await user.save();
        res.status(200).send({"msg":"registered successfully"});
      }
    });
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

// user login route

userRouter.post("/login",async(req,res)=>{
    const { email, password } = req.body;

    try{
        console.log(email,password)
        const user=await userModel.findOne({email});
        console.log(user)
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                const token=jwt.sign({username:user.username,userId:user._id},"masai",{expiresIn: '7d' })
                console.log(token,"token")
                res.status(200).send({"token":token,"user":user})
            }else{
                res.send(err)
            }
            
        });

    }
   catch(err){
        res.status(200).send({"msg":"user not found please register"})
    }

})



module.exports = { userRouter };
