const Goal = require('../models/Goal')
//import mongoose when dealing with params
const mongoose = require('mongoose')
const User = require('../models/User')

//GET ALL
const getGoals = async(req,res)=>{
    const user_id = req.user._id
    const goals = await Goal.find({user_id}).sort({createdAt: -1})
    res.status(200).json(goals)
}
//get own friend goals
const getFriendGoals = async(req,res)=>{
    try{
        const user = await User.findById('64323a65a01b9f06a3e2c345')
        .populate('goals') // populate the 'goals'
        .exec();
    //   .populate({
    //     path: 'friends',
    //     populate: { path: 'goals' },
    //   });
        // const user = await User.findById(req.user._id).populate('friends')
        // const friendEmails = user.friends.map(friend => friend.friend_email); // Extract friend email addresses
        // const friendgoals = await Goal.find({user_id}).sort({createdAt: -1})
        res.status(200).json(user);
        
    }catch(error){
        res.status(500).json({message: "Failed to get friend's goals", error: error.message})
    }
}

const getData = async (req,res) => {
    try {
        const user = await User.findById(req.user._id)
        .populate('goals')
        .populate({
          path: 'friends',
          populate: { path: 'goals' },
        });
        const goals = user.goals
      res.status(200).json(goals);
    } catch (err) {
      res.status(500).json({message: "No Friend's GOals",error: error.message})
    }
  };


//post one - Create
const createGoal = async(req,res)=>{
    const {title, finishOn, progress} = req.body
    try{
    const user_id = req.user._id
    const goal = await Goal.create({title, finishOn, user_id, progress})
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
   getData ,
}