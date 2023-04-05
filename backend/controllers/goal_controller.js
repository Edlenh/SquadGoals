const Goal = require('../models/Goal')
//import mongoose when dealing with params
const mongoose = require('mongoose')

//GET ALL
const getGoals = async(req,res)=>{
    const user_id = req.user._id
    const goals = await Goal.find({user_id}).sort({createdAt: -1})
    res.status(200).json(goals)
}
//get own users goals
// const getOwnGoals = async(req,res)=>{
//     const user_id = req.user_id
//     const goals = await Goal.find({user_id}).sort({createdAt: -1})
//     res.status(200).json(goals)
// }
//GET SINGLE
const singleGoal = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Goal Doesnt Exist"})
    }
}
//post one - Create
const createGoal = async(req,res)=>{
    const {title} = req.body
    try{
    const user_id = req.user._id
    const goal = await Goal.create({title, user_id})
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
    // getOwnGoals,
}