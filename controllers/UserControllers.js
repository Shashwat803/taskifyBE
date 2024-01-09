const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const registerUser = async(req, res)=>{
    try {
        const {username, email, password} = req.body
        if(!username || !email || !password){
            res.status(404).json({message: "Required Field should not be empty"})
        }
        const userExist = await User.findOne({email})
        if(userExist){
            return  res.status(409).json({message:"Email already exist!"})
        }
     const hashPassword = await bcrypt.hash(password, 10)  
     const user = await User.create({
        username,
        email,
        password:hashPassword
     })
     if(user){
        const token = jwt.sign({
            user:{
             username:user.username,
             email:user.email,
             id:user.id
            }
         }, process.env.TOKEN_SECRET, {expiresIn:'1h'})
         res.status(201).json({token})
     }
    } catch (error) {
        res.status(409)
        throw new Error(error)
    }
}

const loginUser = async(req, res)=>{
try {
    const{email, password} = req.body
 if(!email || !password){
    res.status(404).json({message: "Required Field should not be empty"})
}
const user = await User.findOne({email})
if(user && (await bcrypt.compare(password, user.password))){
  const token = jwt.sign({
       user:{
        username:user.username,
        email:user.email,
        id:user.id
       }
    }, process.env.TOKEN_SECRET, {expiresIn:'1h'})
    res.status(201).json({token})
}else{
    res.status(401).json({message:"Invalid Email and Password"})
    
} 
} catch (error) {
    res.status(400)
    throw new Error(error)
}
}

const currentUser = (req, res)=>{
try {
    res.json({user:req.user})
} catch (error) {
    res.status(404)
    throw new Error(error)
}
}

const message = (req, res)=>{
res.send("Hello message")
}


module.exports = {registerUser, loginUser, currentUser, message}