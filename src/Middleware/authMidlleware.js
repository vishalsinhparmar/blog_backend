const jsontoken = require('jsonwebtoken')
const verifyUserLoggedin = (req,res,next)=>{
      const token =  req.headers.authorization?.split(" ")[1];
      console.log(token)
      if(!token){
        res.status(401).send({message:"user is unotherized"})
      }

       jsontoken.verify(token,"vishal234",(err,user)=>{
        if(err){
            res.status(401).send({message:"not user is logged please first logged in"})
        }else{
             req.user = user;
             console.log('the user is a',user)
             next();
        }

      });
    }
    module.exports = verifyUserLoggedin;