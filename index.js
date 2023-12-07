const express=require("express");
const cors=require("cors");
const {connect}=require("./db");
const {userRouter}=require("./routes/user.router");
const{blogRouter}=require("./routes/blog.router")
const app=express();

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use("/blogs",blogRouter);

app.get("/",(req,res)=>{
    res.send("works great")
})

app.listen(8080,async(req,res)=>{
    try{
        await connect

        console.log("server connected to DB")
        console.log("server running at port 8080")
    }catch(err){
        console.log(err)
    }
})