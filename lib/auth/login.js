const express = require('express');
const tet=require("../token/.env")
const router=express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// for call 
dotenv.config({path:'lib/token/.env'});
const user={
    email:"minea@gmail.com",
    password:"@minea123",
}
/*
--> code error
const jwtVerify=(req,res,next)=>{
    try {
    const access_token=req.header(process.env.TOKEN_HEADER);
    jwt.verify(access_token, process.env.SECRET_KEY, (error,user) => {
        if(error)return res.json({message:"Unauthorization"});
        req.user=user;
        next();
    });
    } catch (error) {
        res.json({"error_message": error.message});
    }
}
"error_message": "name argument is required to req.get"
*/
//------------------------------------------------------code fix by Chat GPT
// need 3 parameters next parameter is a function
const jwtVerify = (req, res, next) => {
    try {
      const tokenHeader = process.env.TOKEN_HEADER;
      if (!req.headers[tokenHeader]) {
        return res.json({ message: "Unauthorized" });
      }
      const access_token = req.headers[tokenHeader];
      jwt.verify(access_token, process.env.SECRET_KEY, (error, user) => {
        if (error) {
          return res.json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      res.json({ "error_message": error.message });
    }
  };
  
router.post('/',(req,res) => {
    try {
        const{email,password} = req.body;
        if(!email||!password)
        return res.json({
            "message":"Missing Email or Password"
        });
        if(email==user.email&&password==user.password){           
            return res.json({
                "access_token":loginSucces(),
            });
        }
        return res.json({"message":"Unauthorization"});
        
    } catch (error) {
        res.json({"error_message": error.message});
    }
  
});
// call jwtVerify here as middleware before it can get user;
router.get('/user', jwtVerify ,(req,res) => {
    res.json({"name":"minea"});
});

function loginSucces(){
    return access_token=jwt.sign(user,process.env.SECRET_KEY);
}


module.exports=router;