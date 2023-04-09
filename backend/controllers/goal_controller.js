const Goal = require('../models/Goal')
//import mongoose when dealing with params
const mongoose = require('mongoose')
const User = require('../models/User')

//get logged in user goal
const getGoals = async(req,res)=>{
    const user_id = req.user._id
    const goals = await Goal.find({user_id}).sort({createdAt: -1})
    res.status(200).json(goals)
}

//get friend goals
const getFriendGoals = async(req,res)=>{
    const user_id = req.user._id
    try{
        const user = await User.findById(user_id)
        .populate('goals') // populate the 'goals'
        .populate({
            path: "friends",
            populate: { path: 'goals' },
          })
          
        res.status(200).json(user);
        
    }catch(error){
        res.status(500).json({message: "Failed to get friend's goals", error: error.message})
    }
}



//post one - Create
const createGoal = async(req,res)=>{
    const {title, finishOn, progress} = req.body
    try{
    const user_id = req.user._id 
    const user = await User.findById(user_id);
    const goal = await Goal.create({title, finishOn, user_id, progress})
    await goal.save()
    user.goals.push(goal._id);
    await user.save()
    res.status(200).json(goal)
    
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//Put goal - update
const updateGoal = async(req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Goal Doesnt Exist'})
    }
    const goal = await Goal.findOneAndUpdate({_id:id},{
        ...req.body
    },{new:true})
    if(!goal){
        return res.status(404).json({error: 'No Goal Found'})
    }
    res.status(200).json(goal)
}

//delete goal - delete
const deleteGoal = async(req,res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Goal Doesnt Exist'})
    }
    const goal = await Goal.findOneAndDelete({_id:id})
    if(!goal){
        return res.status(404).json({error: 'No Goal Found'})
    }
    res.status(200).json(goal)
}

module.exports = {
    createGoal,
    getGoals,
    updateGoal,
    deleteGoal,
   getFriendGoals,
}