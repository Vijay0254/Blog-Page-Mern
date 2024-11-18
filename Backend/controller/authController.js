const UserModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerController = async(req,res) =>{
    const { username, email, password } = req.body
    try{
        if(!username || !email || !password){
            return res.status(200).json({message: "Enter every details"})
        }
        const exist = await UserModel.findOne({email: email})
        if(exist){
            return res.status(200).json({message: "User exist"})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await UserModel({
            username: username,
            email: email,
            password: hashPassword
        })
        await newUser.save()
        return res.status(200).json({message: "User aded successfully"})
    }
    catch(err){
        console.log(`Error in Register Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const loginController = async(req,res) =>{
    const { email, password } = req.body
    try{
        const exist = await UserModel.findOne({email: email})
        if(exist){
            const verifyPassword = await bcrypt.compare(password, exist.password)
            if(verifyPassword){
                const token = jwt.sign({email: exist.email, username: exist.username}, process.env.SECRET_KEY, {expiresIn: "1d"})
                  await res.cookie("token", token, { 
                        secure: true, 
                        sameSite: 'None'
                      });

                return res.status(200).json({message: "User exist"})
            }
            else{
                return res.status(200).json({message: "Password is wrong"})
            }
        }
        else{
            return res.status(200).json({message: "User Not Found"})
        }
    }
    catch(err){
        console.log(`Error in Login Controller - ${err}`)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const verifyUser = async(req,res,next) =>{
   try{
        const token  = await req.cookies.token
       console.log("token:", token)
        if(token){
            const verified = jwt.verify(token, process.env.SECRET_KEY)
            if(verified){
                req.email = verified.email
                req.username = verified.username
                next()
            }
            else{
                return res.status(200).json({message: "Token is not Verified"})
            }
        }
        else{
            return res.status(200).json({message: "Token is missing"})
        }
   }
   catch(err){
        console.log(`Error in Verifying - ${err}`)
    }

}

const verifyUserController = (req,res) =>{
    return res.status(200).json({email: req.email, username: req.username})
}

const logoutController = async(req,res) =>{
    await res.clearCookie('token', { secure: true, sameSite: 'None' })
    return res.status(200).json({message: "Token Deleted Successfully"})

}

module.exports = { registerController, loginController, verifyUserController, logoutController, verifyUser }
