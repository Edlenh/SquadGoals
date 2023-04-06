const User = require('../models/User')
const jwt = require('jsonwebtoken')

//set up with JWT

const createToken =(_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}

//login
const loginUser = async(req,res)=>{
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id)
        //assign the token to the user id
        res.status(200).json({email,token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
};

const signupUser = async(req,res)=>{
    const{email, username,password} = req.body
    try{
        const user = await User.signup(email, username, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
};
//user sign out
const signoutUser = async (req, res) => {
    try {
      res.clearCookie('jwt') // Clear the JWT token cookie
      res.status(200).json({ message: 'Signed out successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
};

const getUsers = async (req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = {signupUser, loginUser, getUsers, signoutUser}