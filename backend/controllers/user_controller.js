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
        console.error(error);
        res.status(400).json({error: error.message})
    }
};
//user sign out (i dont think i need this route )
// const signoutUser = async (req, res) => {
//     try {
//       res.clearCookie('jwt') // Clear the JWT token cookie
//       res.status(200).json({ message: 'Signed out successfully' })
//     } catch (error) {
//       res.status(500).json({ error: error.message })
//     }
// };

const getUsers = async (req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const addFriend = async (req,res)=>{
    try{
        const user_id = req.params.user_id;
        const friend_email = req.params.friend_email
      
        const user = await User.addFriend(user_id, friend_email)
        res.json({message: 'Added Friend!', user})
    }catch(error){
        res.status(404).json({error:'Friend Not Found'})
    }
}


module.exports = {signupUser, loginUser, getUsers, addFriend}