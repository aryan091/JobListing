const { json } = require('body-parser');
const User = require('../models/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const registerUser= async(req,res) => {
    try {
       const { name , password , email , mobile} = req.body;

        if(!name || !password || !email || !mobile){
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }

        const isExistingUser = await User.findOne({email})
        if(isExistingUser){
            return res.status(400).json({
                message: "User already exists"
            })
        }

       const hashedPassword = await bcrypt.hash(password, 10)
        

        const userData = new User({
            name,
            password: hashedPassword,
            email,
            mobile
        })

        await userData.save();
        res.json({
            message: "User created successfully"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: error
        })
    }

}

const loginUser = async(req,res) => {
    try {
        const {email,password}  = req.body

        if(!password || !email ){
            return res.status(400).json({
                message: "Please fill all the fields"
            })
        }
        
        const userDetails = await User.findOne({email})
        if(!userDetails){
            return res.status(400).json({
                message: "User does not exist"
            })
        }

        const passwordMatch = await bcrypt.compare(password, userDetails.password)

        if(!passwordMatch){
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({userId: userDetails?._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})

        res.json({
            message: "Login successful",
            token:token,
            name:userDetails.name,
            userId: userDetails?._id,
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: error,
            
        })
    }
}

module.exports = { registerUser,loginUser }