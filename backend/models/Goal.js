const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goalSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    // user_id:{
    //     type:String,
    //     required:true
    // },
    
    //created on 
    //implement expirations
},{timestamps: true})

module.exports = mongoose.model('Goal', goalSchema)