const jwt = require("jsonwebtoken");

const auth=(req,res,next)=>{
   // console.log(res.headers)
    const token=req.headers.authorization.split(" ")[1];
console.log(token)
    if(token){
        console.log(token)
        jwt.verify(token, 'masai', function(err, decoded) {
          if(decoded){
            console.log(decoded,"decoded");
            req.body.username=decoded.username;
            req.body.userId=decoded.userId

            next()

          }
          else{
            res.status(200).send({"msg":"token expired please login"});

          }
          });

    }
    else{
        res.status(200).send({"msg":"please login"})
    }
}

module.exports={auth}