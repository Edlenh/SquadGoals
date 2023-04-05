const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAutho = async(req,res,next)=>{
    const {autho} = req.headers

    if(!autho){
        return res.status(401).json({error: 'Authorized Token Required'})
    }
    const token = autho.split(' ')[1]

    try{
        const{_id}= jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error: 'User not authorized'})
    }
}

module.exports = requireAutho