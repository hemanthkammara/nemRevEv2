const mongoose=require("mongoose");


const blogSchma=mongoose.Schema({
   username:String,
   userId:String,
 title:String,
 content:String,
 date:String,
 category:String,
 likes:Number,
 Comments:[{username:String,content:String}]
   
},{versionKey:false});

const blogModel=mongoose.model("blog",blogSchma);

module.exports={blogModel};
