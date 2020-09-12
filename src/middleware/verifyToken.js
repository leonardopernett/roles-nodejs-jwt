
const jwt = require('jsonwebtoken')
const {SECRET} = require('../config')
const User = require('../model/User')
const Role = require('../model/Roles')

exports.verifyToken =  async (req,res,next)=>{

   try {

   	 if(!req.headers.authorization){
    	return res.json('not authorization')
    }

    const token = req.headers.authorization
    const payload = jwt.verify(token, SECRET)

    if(!payload) return res.json('not authorization')

    req.userId= payload.id

    const user = await User.findOne({_id:req.userId},{password:0})

    if(!user) return res.status(400).json('user no found');
    next()

   } catch(e) {
   	return res.status(400).json('message not autorize');
   }

}

exports.isAdmin =  async (req,res,next)=>{
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id:{$in:user.roles}})

     roles.forEach(rol=>{
     	if(!rol.name==="admin"){
     		next() 
     		return
     	}
     })
   
   return res.json('no eres admin')
   
}

exports.isModerator =  async (req,res,next)=>{
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id:{$in:user.roles}})

     roles.forEach(rol=>{
     	if(rol.name==="moderator"){
     		next() 
     		return
     	}
     })
   
   return res.json('no eres moderator')
   
}