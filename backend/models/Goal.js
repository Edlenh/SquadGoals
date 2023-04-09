const mongoose = require('mongoose')
const Schema = mongoose.Schema

const goalSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    user_id:{
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    finishOn:{
        type: String,
        required: true
    },
    progress:{
        type: Number,
        required: true
    }
    
    //created on 
    //implement expirations
},{timestamps: true})

module.exports = mongoose.model('Goal', goalSchema)