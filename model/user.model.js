const mongoose=require("mongoose");

const userSchma=mongoose.Schema({
   username:String,
   avatar:String,
   email:String,
   password:String
},{versionKey:false});

const userModel=mongoose.model("user",userSchma);

module.exports={userModel};
