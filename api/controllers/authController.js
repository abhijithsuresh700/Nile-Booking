import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res,next)=>{
    console.log(req.body,"register")
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({
            ...req.body,
            password: hash
        })
       const user =  await newUser.save();
       console.log(user,"after register")
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const login = async(req,res,next)=>{
    console.log(req.body,"body")
    try {
       const user =  await User.findOne({userName:req.body.userName});
       console.log(user,"user")
       if(!user){
        res.status(401).json("No user found")
        console.log("No user")
       }

       const isPassword = await bcrypt.compare(req.body.password, user.password)
       if(!isPassword){
        console.log(isPassword,"is passworddd")
           res.status(400).json("Wrong password")
       }
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT)
       const {isAdmin,password,...others}= user._doc
        res.cookie("Access_token", token,{httpOnly:true}).status(200).json({details:{...others}, isAdmin})
    } catch (error) {
        next(error)
    }
}
