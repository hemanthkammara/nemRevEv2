const{blogModel}=require("../model/blog.model");
const {auth}=require("../middleware/auth")
const express=require("express");
const { userModel } = require("../model/user.model");
const blogRouter=express.Router();

blogRouter.use(auth)

//blogs router for getting all blogs

blogRouter.get("/",async(req,res)=>{
    try{
        const{title,category,sort,order}=req.query;
        let filter={}
        if(category){
        filter.category=category;
        }
        let query=blogModel.find(filter)

        if(sort){
            const sortObj={};
            sortObj[sort]=order==="desc"?-1:1;
            query.sort(sortObj)

        }

        if(title){
                 query.or([{title:new RegExp(title,"i")}])
        }


        let blogs=await query
        res.status(200).send(blogs)

    }
    catch(err){
        res.status(400).send({"err":err})
    }
})

//blogs router for post a blog
blogRouter.use(auth)

blogRouter.post("/",async(req,res)=>{
    try{
        const blog=new blogModel(req.body);
        await blog.save()
        res.status(200).send(blog);
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})
blogRouter.patch("/:id",async(req,res)=>{
    const{id}=req.params
    const blog=await blogModel.findOne({_id:id})
    try{
        if(blog.userId==req.body.userId){
            await blogModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({"msg":`id ${id} updated successfully`})
        }else{
            res.status(200).send({"msg":"your not authorized to edit"})
        }
       
    }
    catch(err){
        res.status(400).send({"err":err})
    }
})
blogRouter.delete("/:id",async(req,res)=>{
    const{id}=req.params
    const blog=await blogModel.findOne({_id:id})
    try{
        if(blog.userId==req.body.userId){
            await blogModel.findByIdAndDelete({_id:id})
            res.status(200).send({"msg":`id ${id} deleted successfully`})
        }else{
            res.status(200).send({"msg":"your not authorized to edit"})
        }

    }
    catch(err){
        res.status(400).send({"err":err})
    }
})




module.exports={blogRouter}